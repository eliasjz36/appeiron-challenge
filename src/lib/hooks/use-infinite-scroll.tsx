/* eslint-disable camelcase */
// useInfiniteScroll.ts

import { useCallback, useEffect, useRef, useState } from 'react';

import { toast } from 'sonner';

interface UseInfiniteScrollProps<T> {
  fetchFunction: (
    page: number,
  ) => Promise<{ results: T[]; total_pages: number }>;
  initialData: T[];
}

export function useInfiniteScroll<T>({
  fetchFunction,
  initialData,
}: UseInfiniteScrollProps<T>) {
  const [items, setItems] = useState<T[]>(initialData);
  const [page, setPage] = useState<number>(2);
  console.log('page, page', page);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  const loadMoreItems = useCallback(async () => {
    try {
      const { results, total_pages } = await fetchFunction(page);

      setItems((prevItems) => [...prevItems, ...results]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(page < total_pages);
    } catch (error) {
      toast.error('Failed to load more items');
    }
  }, [fetchFunction, page]);

  useEffect(() => {
    if (!lastItemRef.current) return;

    const currentObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreItems();
        }
      },
      {
        rootMargin: '100px',
      },
    );

    if (lastItemRef.current) {
      currentObserver.observe(lastItemRef.current);
    }

    observer.current = currentObserver;
  }, [loadMoreItems, hasMore]);

  return {
    items,
    lastItemRef,
  };
}
