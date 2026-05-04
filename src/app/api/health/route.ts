import { NextResponse } from "next/server";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const checks = {
    app: "ok",
    database: "not_configured" as "ok" | "error" | "not_configured"
  };

  if (!hasDatabaseUrl()) {
    return NextResponse.json({ status: "degraded", checks }, { status: 200 });
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = "ok";
    return NextResponse.json({ status: "ok", checks }, { status: 200 });
  } catch {
    checks.database = "error";
    return NextResponse.json({ status: "error", checks }, { status: 503 });
  }
}
