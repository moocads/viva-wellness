import { NextRequest, NextResponse } from "next/server";
import { getMoocadsTenantToken, moocadsUpstream } from "@/lib/moocads-fetch";

function misconfigured() {
  return NextResponse.json(
    { error: "MOOCADS_TENANT_TOKEN is not set. Add it to .env.local." },
    { status: 503 }
  );
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  if (!getMoocadsTenantToken()) return misconfigured();
  const { slug } = await context.params;
  const search = req.nextUrl.search;
  const res = await moocadsUpstream(`/content/${encodeURIComponent(slug)}${search}`, {
    method: "GET",
  });
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") ?? "application/json" },
  });
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  if (!getMoocadsTenantToken()) return misconfigured();
  const { slug } = await context.params;
  const body = await req.text();
  const res = await moocadsUpstream(`/content/${encodeURIComponent(slug)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") ?? "application/json" },
  });
}
