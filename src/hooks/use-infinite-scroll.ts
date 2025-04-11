// hooks/use-infinite-scroll.ts
import { useCallback, useEffect, useRef } from "react";
import { throttle } from "lodash-es";
import type { InfiniteQueryObserverResult } from "@tanstack/react-query";

interface UseInfiniteScrollProps {
  fetchNextPage: (options?: {
    pageParam?: unknown;
    cancelRefetch?: boolean;
  }) => Promise<InfiniteQueryObserverResult<unknown, unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  throttleDelay?: number;
  rootMargin?: string;
}

export const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  throttleDelay = 500,
  rootMargin = "200px",
}: UseInfiniteScrollProps) => {
  const throttledFetch = useCallback(
    throttle(() => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, throttleDelay),
    [fetchNextPage, hasNextPage, isFetchingNextPage, throttleDelay]
  );

  useEffect(() => {
    return () => {
      throttledFetch.cancel();
    };
  }, [throttledFetch]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage || !node) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            throttledFetch();
          }
        },
        { rootMargin }
      );

      observer.current.observe(node);
    },
    [throttledFetch, isFetchingNextPage]
  );

  return { lastElementRef };
};
