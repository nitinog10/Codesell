import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { hasDatabaseUrl } from "@/lib/env";
import { fromDbProduct } from "@/lib/products";
import { prisma } from "@/lib/prisma";
import { productInputSchema } from "@/lib/validators";

export const runtime = "nodejs";

async function requireAdminResponse() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Login required." }, { status: 401 });
  }

  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  if (!hasDatabaseUrl()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }

  return null;
}

function productData(input: ReturnType<typeof productInputSchema.parse>) {
  return {
    name: input.name,
    slug: input.slug,
    description: input.description,
    longDesc: input.longDesc || null,
    price: input.price,
    currency: input.currency,
    repoOwner: input.repoOwner,
    repoName: input.repoName,
    repoUrl: input.repoUrl,
    imageUrl: input.imageUrl || null,
    screenshots: input.screenshots,
    tags: input.tags,
    techStack: input.techStack,
    isActive: input.isActive,
    featured: input.featured,
    demoUrl: input.demoUrl || null
  };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const errorResponse = await requireAdminResponse();

  if (errorResponse) {
    return errorResponse;
  }

  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ product: fromDbProduct(product) });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const errorResponse = await requireAdminResponse();

  if (errorResponse) {
    return errorResponse;
  }

  const parsed = productInputSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid product payload." },
      { status: 400 }
    );
  }

  const { id } = await params;
  const product = await prisma.product.update({
    where: { id },
    data: productData(parsed.data)
  });

  return NextResponse.json({ product: fromDbProduct(product) });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const errorResponse = await requireAdminResponse();

  if (errorResponse) {
    return errorResponse;
  }

  const { id } = await params;

  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    const product = await prisma.product.update({
      where: { id },
      data: { isActive: false }
    });

    return NextResponse.json({ ok: true, archived: true, product: fromDbProduct(product) });
  }
}
