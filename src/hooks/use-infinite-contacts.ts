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

interface UseInfiniteContactsOptions {
  initialLimit?: number;
  searchQuery?: string;
}

export const useInfiniteContacts = ({
  initialLimit = 10,
  searchQuery = "",
}: UseInfiniteContactsOptions = {}) => {
  return useInfiniteQuery({
    queryKey: ["contacts", searchQuery],
    queryFn: ({ pageParam = 0 }) => {
      const queryParams: Record<string, unknown> = {
        limit: initialLimit,
        skip: pageParam * initialLimit,
      };

      if (searchQuery) {
        queryParams.sort = "createdAt DESC";

        const isPhoneSearch = /^\d/.test(searchQuery);

        queryParams.where = JSON.stringify(
          isPhoneSearch
            ? { phone: { contains: searchQuery } }
            : { last_name: { contains: searchQuery } }
        );
      }

      return getRequest<ContactResponse>("passenger", {
        queryParams,
      });
    },
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
