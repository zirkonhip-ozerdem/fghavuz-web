const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

type ApiEnvelope<T> = {
  success: boolean;
  data: T;
  message: string | null;
};

/** Thin fetch wrapper for the fghavuz-admin (Laravel) `{success, data, message}` API envelope. */
export async function apiGet<T>(
  path: string,
  params: Record<string, string | number | boolean | undefined> = {},
): Promise<T> {
  const url = new URL(`${API_BASE_URL}${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {next: {revalidate: 60}});

  if (!response.ok) {
    throw new Error(`FGPOOL API request failed (${response.status}): ${url.pathname}`);
  }

  const payload = (await response.json()) as ApiEnvelope<T>;

  if (!payload.success) {
    throw new Error(payload.message ?? `FGPOOL API request failed: ${url.pathname}`);
  }

  return payload.data;
}
