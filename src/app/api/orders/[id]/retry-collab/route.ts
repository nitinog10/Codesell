import { CollabStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { fulfillPaidOrder } from "@/lib/fulfillment";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Login required." }, { status: 401 });
  }

  if (!hasDatabaseUrl()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }

  const { id } = await params;
  const order = await prisma.order.findFirst({
    where: {
      id,
      userId: session.user.id
    }
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  if (order.status !== "PAID") {
    return NextResponse.json({ error: "Order is not paid." }, { status: 400 });
  }

  await prisma.order.update({
    where: { id: order.id },
    data: {
      collabStatus: CollabStatus.PENDING,
      collabError: null
    }
  });

  await fulfillPaidOrder(order.id);

  return NextResponse.json({ ok: true });
}
