import Stripe from "stripe";
import { NextResponse } from "next/server";
import { hasDatabaseUrl } from "@/lib/env";
import { markOrderPaidAndFulfill, markOrderRefundedAndRevoke } from "@/lib/fulfillment";
import { prisma } from "@/lib/prisma";
import { constructStripeEvent } from "@/lib/stripe";

export const runtime = "nodejs";

function getOrderIdFromSession(session: Stripe.Checkout.Session) {
  return session.metadata?.orderId ?? session.client_reference_id ?? undefined;
}

export async function POST(request: Request) {
  if (!hasDatabaseUrl()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }

  const body = await request.text();
  let event: Stripe.Event;

  try {
    event = constructStripeEvent(body, request.headers.get("stripe-signature"));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid signature." },
      { status: 400 }
    );
  }

  const existing = await prisma.webhookEvent.findUnique({
    where: { providerEventId: event.id }
  });

  if (existing?.processed) {
    return NextResponse.json({ received: true });
  }

  await prisma.webhookEvent.upsert({
    where: { providerEventId: event.id },
    update: {
      eventType: event.type,
      payload: event as unknown as object
    },
    create: {
      provider: "stripe",
      providerEventId: event.id,
      eventType: event.type,
      payload: event as unknown as object
    }
  });

  try {
    if (event.type === "checkout.session.completed") {
      const checkoutSession = event.data.object as Stripe.Checkout.Session;
      const orderId = getOrderIdFromSession(checkoutSession);

      if (orderId) {
        await markOrderPaidAndFulfill({
          orderId,
          paymentId:
            typeof checkoutSession.payment_intent === "string"
              ? checkoutSession.payment_intent
              : checkoutSession.id,
          paymentMethod: "stripe"
        });
      }
    }

    if (event.type === "checkout.session.async_payment_failed") {
      const checkoutSession = event.data.object as Stripe.Checkout.Session;
      const orderId = getOrderIdFromSession(checkoutSession);

      if (orderId) {
        await prisma.order.update({
          where: { id: orderId },
          data: { status: "FAILED", paymentMethod: "stripe" }
        });
      }
    }

    if (event.type === "charge.refunded") {
      const charge = event.data.object as Stripe.Charge;
      const paymentIntent =
        typeof charge.payment_intent === "string" ? charge.payment_intent : null;

      if (paymentIntent) {
        const order = await prisma.order.findUnique({
          where: { paymentId: paymentIntent }
        });

        if (order) {
          await markOrderRefundedAndRevoke(order.id);
        }
      }
    }

    await prisma.webhookEvent.update({
      where: { providerEventId: event.id },
      data: { processed: true, error: null }
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    await prisma.webhookEvent.update({
      where: { providerEventId: event.id },
      data: {
        error: error instanceof Error ? error.message : "Unknown webhook error."
      }
    });

    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
