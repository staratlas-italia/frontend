import { APP_BASE_URL } from "~/common/constants";

const request = async <Res>(
  url: string,
  config?: RequestInit
): Promise<Res> => {
  const response = await fetch(url, config);

  return response.json();
};

export const createApiClient = (apiUrl: string) => ({
  get: <Res>(
    endpoint: string,
    options?: { headers?: RequestInit["headers"] }
  ) => {
    const { headers } = options || {};

    return request<Res>(
      `${apiUrl}${endpoint}`,
      headers ? { headers } : undefined
    );
  },
  post: <Res, TBody = Record<string, any>>(
    endpoint: string,
    {
      body,
      headers,
      signal,
    }: { body?: TBody; headers?: RequestInit["headers"]; signal?: AbortSignal }
  ) =>
    request<Res>(`${apiUrl}${endpoint}`, {
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      method: "POST",
      signal,
    }),
});

export const api = createApiClient(APP_BASE_URL);
