const DEFAULT_BASE = "https://superadmin.moocads.com/api/v1";

export function getMoocadsBaseUrl(): string {
  return process.env.MOOCADS_API_BASE?.replace(/\/$/, "") ?? DEFAULT_BASE;
}

export function getMoocadsTenantToken(): string | undefined {
  return process.env.MOOCADS_TENANT_TOKEN;
}

export function buildMoocadsHeaders(extra?: HeadersInit): Headers {
  const headers = new Headers(extra);
  const token = getMoocadsTenantToken();
  if (token) headers.set("X-Tenant-Token", token);
  const origin = process.env.MOOCADS_REQUEST_ORIGIN;
  if (origin) headers.set("Origin", origin);
  return headers;
}

export async function moocadsUpstream(
  path: string,
  init?: RequestInit
): Promise<Response> {
  const base = getMoocadsBaseUrl();
  const url = path.startsWith("http") ? path : `${base}${path.startsWith("/") ? "" : "/"}${path}`;
  const headers = buildMoocadsHeaders(init?.headers as HeadersInit);
  if (init?.body instanceof FormData) {
    headers.delete("Content-Type");
  }
  return fetch(url, { ...init, headers });
}
