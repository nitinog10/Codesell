import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { hasDatabaseUrl } from "@/lib/env";

export type OrderWithItems = Prisma.OrderGetPayload<{
  include: {
    user: true;
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

const orderInclude = {
  user: true,
  items: {
    include: {
      product: true
    }
  }
} satisfies Prisma.OrderInclude;

export async function getOrdersForUser(userId: string) {
  if (!hasDatabaseUrl()) {
    return [] as OrderWithItems[];
  }

  return prisma.order.findMany({
    where: { userId },
    include: orderInclude,
    orderBy: { createdAt: "desc" }
  }) as Promise<OrderWithItems[]>;
}

export async function getOrderForUser(orderId: string, userId: string) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  return prisma.order.findFirst({
    where: { id: orderId, userId },
    include: orderInclude
  }) as Promise<OrderWithItems | null>;
}

export async function getOrderById(orderId: string) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  return prisma.order.findUnique({
    where: { id: orderId },
    include: orderInclude
  }) as Promise<OrderWithItems | null>;
}

export async function getAllOrders() {
  if (!hasDatabaseUrl()) {
    return [] as OrderWithItems[];
  }

  return prisma.order.findMany({
    include: orderInclude,
    orderBy: { createdAt: "desc" },
    take: 100
  }) as Promise<OrderWithItems[]>;
}

export async function getAdminStats() {
  if (!hasDatabaseUrl()) {
    return {
      revenue: 0,
      paidOrders: 0,
      pendingOrders: 0,
      failedCollabs: 0,
      products: 0
    };
  }

  const [paidOrders, pendingOrders, failedCollabs, products, paidAggregate] =
    await Promise.all([
      prisma.order.count({ where: { status: "PAID" } }),
      prisma.order.count({ where: { status: "PENDING" } }),
      prisma.order.count({ where: { collabStatus: "FAILED" } }),
      prisma.product.count(),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { status: "PAID" }
      })
    ]);

  return {
    revenue: paidAggregate._sum.totalAmount ?? 0,
    paidOrders,
    pendingOrders,
    failedCollabs,
    products
  };
}
