import { NextRequest, NextResponse } from "next/server";
import { getMoocadsTenantToken, moocadsUpstream } from "@/lib/moocads-fetch";

function misconfigured() {
  return NextResponse.json(
    { error: "MOOCADS_TENANT_TOKEN is not set. Add it to .env.local." },
    { status: 503 }
  );
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ slug: string; id: string }> }
) {
  if (!getMoocadsTenantToken()) return misconfigured();
  const { slug, id } = await context.params;
  const res = await moocadsUpstream(
    `/content/${encodeURIComponent(slug)}/${encodeURIComponent(id)}`,
    { method: "GET" }
  );
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") ?? "application/json" },
  });
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ slug: string; id: string }> }
) {
  if (!getMoocadsTenantToken()) return misconfigured();
  const { slug, id } = await context.params;
  const body = await req.text();
  const res = await moocadsUpstream(
    `/content/${encodeURIComponent(slug)}/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body,
    }
  );
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") ?? "application/json" },
  });
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ slug: string; id: string }> }
) {
  if (!getMoocadsTenantToken()) return misconfigured();
  const { slug, id } = await context.params;
  const body = await req.text();
  const res = await moocadsUpstream(
    `/content/${encodeURIComponent(slug)}/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body,
    }
  );
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") ?? "application/json" },
  });
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ slug: string; id: string }> }
) {
  if (!getMoocadsTenantToken()) return misconfigured();
  const { slug, id } = await context.params;
  const res = await moocadsUpstream(
    `/content/${encodeURIComponent(slug)}/${encodeURIComponent(id)}`,
    { method: "DELETE" }
  );
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") ?? "application/json" },
  });
}
