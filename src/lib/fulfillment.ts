import { CollabStatus, OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { addReadOnlyCollaborator, removeCollaborator } from "@/lib/github";
import {
  sendAdminAlertEmail,
  sendCollabInviteEmail,
  sendPurchaseConfirmationEmail
} from "@/lib/email";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown error";
}

export async function fulfillPaidOrder(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: true,
      items: {
        include: {
          product: true
        }
      }
    }
  });

  if (!order) {
    throw new Error(`Order ${orderId} was not found.`);
  }

  if (order.status !== OrderStatus.PAID) {
    throw new Error(`Order ${orderId} is not paid.`);
  }

  if (order.collabStatus === CollabStatus.SENT) {
    return order;
  }

  const products = order.items.map((item) => ({
    name: item.product.name,
    repoUrl: item.product.repoUrl
  }));

  await sendPurchaseConfirmationEmail({
    to: order.user.email,
    buyerName: order.user.name ?? order.user.username,
    products,
    orderId: order.id
  });

  const failures: string[] = [];

  for (const item of order.items) {
    try {
      await addReadOnlyCollaborator(item.product, order.user.username ?? "");
    } catch (error) {
      failures.push(`${item.product.repoOwner}/${item.product.repoName}: ${errorMessage(error)}`);
    }
  }

  if (failures.length > 0) {
    const collabError = failures.join("; ");

    const failedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        collabStatus: CollabStatus.FAILED,
        collabError
      },
      include: {
        user: true,
        items: { include: { product: true } }
      }
    });

    await sendAdminAlertEmail({
      orderId: order.id,
      error: collabError,
      products
    });

    return failedOrder;
  }

  const fulfilledOrder = await prisma.order.update({
    where: { id: order.id },
    data: {
      collabStatus: CollabStatus.SENT,
      collabError: null
    },
    include: {
      user: true,
      items: { include: { product: true } }
    }
  });

  await sendCollabInviteEmail({
    to: order.user.email,
    buyerName: order.user.name ?? order.user.username,
    products
  });

  return fulfilledOrder;
}

export async function markOrderPaidAndFulfill({
  orderId,
  paymentId,
  paymentMethod
}: {
  orderId: string;
  paymentId?: string | null;
  paymentMethod: string;
}) {
  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: OrderStatus.PAID,
      paymentId: paymentId ?? undefined,
      paymentMethod
    }
  });

  return fulfillPaidOrder(orderId);
}

export async function markOrderRefundedAndRevoke(orderId: string) {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: OrderStatus.REFUNDED
    },
    include: {
      user: true,
      items: {
        include: {
          product: true
        }
      }
    }
  });

  for (const item of order.items) {
    await removeCollaborator(item.product, order.user.username ?? "");
  }

  return order;
}
