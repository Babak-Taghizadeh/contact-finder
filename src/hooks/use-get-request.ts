import { getRequest } from "@/utils/get-request";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type UseGetRequestOptions<T> = UseQueryOptions<T> & {
  pathVariables?: Record<string, string | number>;
  queryParams?: Record<string, unknown>;
};

export function useGetRequest<T>(
  key: string[],
  url: string,
  options?: Omit<UseGetRequestOptions<T>, "queryKey" | "queryFn">
) {
  return useQuery<T>({
    queryKey: [...key, options?.pathVariables, options?.queryParams],
    queryFn: () =>
      getRequest<T>(url, {
        pathVariables: options?.pathVariables,
        queryParams: options?.queryParams,
      }),
    ...options,
  });
}
