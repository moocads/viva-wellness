import { NextRequest, NextResponse } from "next/server";
import { getMoocadsTenantToken, moocadsUpstream } from "@/lib/moocads-fetch";

export async function POST(req: NextRequest) {
  if (!getMoocadsTenantToken()) {
    return NextResponse.json(
      { error: "MOOCADS_TENANT_TOKEN is not set. Add it to .env.local." },
      { status: 503 }
    );
  }
  const formData = await req.formData();
  const res = await moocadsUpstream("/upload/file", {
    method: "POST",
    body: formData,
  });
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") ?? "application/json" },
  });
}
