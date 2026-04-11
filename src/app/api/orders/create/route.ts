import { CollabStatus, OrderStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { canUseMockPayments, hasDatabaseUrl, selectedPaymentProvider } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { createOrderSchema } from "@/lib/validators";
import { createStripeCheckoutSession } from "@/lib/stripe";
import { createRazorpayOrder } from "@/lib/razorpay";
import { absoluteUrl } from "@/lib/utils";
import { fromDbProduct } from "@/lib/products";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Login with GitHub first." }, { status: 401 });
  }

  if (!hasDatabaseUrl()) {
    return NextResponse.json(
      { error: "DATABASE_URL is required to create orders." },
      { status: 503 }
    );
  }

  const parsed = createOrderSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid order payload." }, { status: 400 });
  }

  const products = await prisma.product.findMany({
    where: {
      id: { in: parsed.data.productIds },
      isActive: true
    }
  });

  if (products.length !== parsed.data.productIds.length) {
    return NextResponse.json(
      { error: "One or more products are unavailable." },
      { status: 404 }
    );
  }

  const currencies = new Set(products.map((product) => product.currency));

  if (currencies.size > 1) {
    return NextResponse.json(
      { error: "Products with different currencies cannot be checked out together." },
      { status: 400 }
    );
  }

  const totalAmount = products.reduce((sum, product) => sum + product.price, 0);
  const currency = products[0]?.currency ?? "INR";

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      totalAmount,
      currency,
      items: {
        create: products.map((product) => ({
          productId: product.id,
          price: product.price
        }))
      }
    }
  });

  const provider = selectedPaymentProvider();
  const checkoutProducts = products.map(fromDbProduct);

  if (provider === "stripe") {
    const checkoutSession = await createStripeCheckoutSession({
      orderId: order.id,
      products: checkoutProducts,
      buyerEmail: session.user.email
    });

    return NextResponse.json({
      provider: "stripe",
      url: checkoutSession.url
    });
  }

  if (provider === "razorpay") {
    const razorpayOrder = await createRazorpayOrder({
      orderId: order.id,
      amount: totalAmount,
      currency
    });

    return NextResponse.json({
      provider: "razorpay",
      keyId: process.env.RAZORPAY_KEY_ID,
      orderId: razorpayOrder.id,
      appOrderId: order.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      buyerName: session.user.name,
      buyerEmail: session.user.email
    });
  }

  if (canUseMockPayments()) {
    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: OrderStatus.PAID,
        paymentMethod: "mock",
        collabStatus: CollabStatus.SENT
      }
    });

    return NextResponse.json({
      provider: "mock",
      url: absoluteUrl(`/checkout/success?orderId=${order.id}&mock=1`)
    });
  }

  return NextResponse.json(
    { error: "No payment provider is configured." },
    { status: 500 }
  );
}
