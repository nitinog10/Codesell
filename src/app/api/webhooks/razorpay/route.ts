import crypto from "crypto";
import { NextResponse } from "next/server";
import { hasDatabaseUrl } from "@/lib/env";
import { markOrderPaidAndFulfill } from "@/lib/fulfillment";
import { prisma } from "@/lib/prisma";
import { verifyRazorpayWebhookSignature } from "@/lib/razorpay";

export const runtime = "nodejs";

type RazorpayWebhook = {
  event?: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        notes?: Record<string, string>;
      };
    };
    order?: {
      entity?: {
        id?: string;
        notes?: Record<string, string>;
      };
    };
  };
};

function providerEventId(rawBody: string, payload: RazorpayWebhook) {
  return (
    payload.payload?.payment?.entity?.id ??
    payload.payload?.order?.entity?.id ??
    crypto.createHash("sha256").update(rawBody).digest("hex")
  );
}

function appOrderId(payload: RazorpayWebhook) {
  return (
    payload.payload?.payment?.entity?.notes?.orderId ??
    payload.payload?.order?.entity?.notes?.orderId
  );
}

export async function POST(request: Request) {
  if (!hasDatabaseUrl()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  try {
    if (!verifyRazorpayWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid signature." },
      { status: 400 }
    );
  }

  const payload = JSON.parse(rawBody) as RazorpayWebhook;
  const eventId = providerEventId(rawBody, payload);
  const eventType = payload.event ?? "unknown";

  const existing = await prisma.webhookEvent.findUnique({
    where: { providerEventId: eventId }
  });

  if (existing?.processed) {
    return NextResponse.json({ received: true });
  }

  await prisma.webhookEvent.upsert({
    where: { providerEventId: eventId },
    update: {
      eventType,
      payload: payload as unknown as object
    },
    create: {
      provider: "razorpay",
      providerEventId: eventId,
      eventType,
      payload: payload as unknown as object
    }
  });

  try {
    if (eventType === "payment.captured" || eventType === "order.paid") {
      const orderId = appOrderId(payload);

      if (orderId) {
        await markOrderPaidAndFulfill({
          orderId,
          paymentId: payload.payload?.payment?.entity?.id ?? eventId,
          paymentMethod: "razorpay"
        });
      }
    }

    await prisma.webhookEvent.update({
      where: { providerEventId: eventId },
      data: { processed: true, error: null }
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    await prisma.webhookEvent.update({
      where: { providerEventId: eventId },
      data: {
        error: error instanceof Error ? error.message : "Unknown webhook error."
      }
    });

    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
