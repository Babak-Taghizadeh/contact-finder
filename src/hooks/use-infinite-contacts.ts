import { useInfiniteQuery } from "@tanstack/react-query";
import { getRequest } from "@/utils/get-request";
import { Contact } from "@/types/types";

interface ContactResponse {
  meta: {
    skipped: number;
    limit: number;
    total: number;
    criteria: Record<string, unknown>;
  };
  items: Contact[];
}

export const useInfiniteContacts = (initialLimit = 10) => {
  return useInfiniteQuery<ContactResponse>({
    queryKey: ["contacts"],
    queryFn: ({ pageParam = 0 }) =>
      getRequest<ContactResponse>("passenger", {
        queryParams: {
          limit: initialLimit,
          skip: (pageParam as number) * initialLimit,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce(
        (sum, page) => sum + page.items.length,
        0
      );
      return loadedCount < lastPage.meta.total ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });
};
