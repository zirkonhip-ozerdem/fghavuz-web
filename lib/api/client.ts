const DEFAULT_API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://fghavuz-admin-production.up.railway.app/api/v1"
    : "http://localhost:8000/api/v1";
const API_TIMEOUT_MS = 3500;

type ApiEnvelope<T> = {
  success: boolean;
  data: T;
  message: string | null;
};

export function getApiBaseUrl() {
  return (process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, "");
}

function firstValidationError(errors: unknown): string | null {
  if (!errors || typeof errors !== "object") {
    return null;
  }

  for (const value of Object.values(errors as Record<string, unknown>)) {
    if (Array.isArray(value)) {
      const first = value.find((item) => typeof item === "string");
      if (typeof first === "string") {
        return first;
      }
    }

    if (typeof value === "string") {
      return value;
    }
  }

  return null;
}

export async function readApiError(response: Response) {
  const text = await response.text();
  let payload: unknown = null;

  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = null;
  }

  const record = payload && typeof payload === "object"
    ? payload as Record<string, unknown>
    : null;

  const message =
    firstValidationError(record?.errors) ||
    (typeof record?.message === "string" ? record.message : null) ||
    (text && !record ? text : null) ||
    `API isteği başarısız oldu (${response.status}).`;

  return {message, payload, text};
}

/** Thin fetch wrapper for the Laravel `{success, data, message}` API envelope. */
export async function apiGet<T>(
  path: string,
  params: Record<string, string | number | boolean | undefined> = {},
): Promise<T> {
  const url = new URL(`${getApiBaseUrl()}${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      next: {revalidate: 60},
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`FGPOOL API request failed (${response.status}): ${url.pathname}`);
    }

    const payload = await response.json();

    if (Array.isArray(payload)) {
      return payload as T;
    }

    if (!payload || typeof payload !== "object") {
      return payload as T;
    }

    if (!("success" in payload)) {
      if ("data" in payload) {
        return payload.data as T;
      }

      return payload as T;
    }

    const envelope = payload as ApiEnvelope<T>;

    if (!envelope.success) {
      throw new Error(envelope.message ?? `FGPOOL API request failed: ${url.pathname}`);
    }

    return envelope.data;
  } finally {
    clearTimeout(timeout);
  }
}
