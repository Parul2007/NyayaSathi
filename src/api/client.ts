export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not configured. Set it in web/.env.");
  }

  const url = `${API_BASE_URL}${path}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }

  return (await res.json()) as T;
}

export const api = {
  health: () => request<{ status: string }>("/health"),
};


