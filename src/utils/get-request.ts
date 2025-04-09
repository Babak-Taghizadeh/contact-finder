import apiClient from "@/lib/api/api-client";

type RequestConfig = {
  pathVariables?: Record<string, string | number>;
  queryParams?: Record<string, unknown>;
};

export async function getRequest<T>(
  url: string,
  config?: RequestConfig
): Promise<T> {
  let finalUrl = url;
  if (config?.pathVariables) {
    for (const [key, value] of Object.entries(config.pathVariables)) {
      finalUrl = finalUrl.replace(`:${key}`, String(value));
    }
  }

  const response = await apiClient.get<T>(finalUrl, {
    params: config?.queryParams,
  });

  return response.data;
}
