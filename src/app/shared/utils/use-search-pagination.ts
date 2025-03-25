import {computed, signal} from '@angular/core';

export function useSearchablePaginatedList<T>(dataSource: () => T[], options?: {
  pageSize?: number;
  searchFn?: (item: T, term: string) => boolean;
}) {
  const searchTerm = signal('');
  const currentPage = signal(0);
  const pageSize = signal(options?.pageSize ?? 10);

  const filteredData = computed(() => {
    const term = searchTerm().toLowerCase();
    const fn = options?.searchFn ?? ((item: T, term: string) =>
        JSON.stringify(item).toLowerCase().includes(term)
    );
    return dataSource().filter(item => fn(item, term));
  });

  const paginatedData = computed(() => {
    const start = currentPage() * pageSize();
    return filteredData().slice(start, start + pageSize());
  });

  return {
    searchTerm,
    currentPage,
    pageSize,
    filteredData,
    paginatedData,
    setSearchTerm: (term: string) => {
      searchTerm.set(term.toLowerCase());
      currentPage.set(0);
    },
    setPage: (pageIndex: number, size?: number) => {
      currentPage.set(pageIndex);
      if (size !== undefined) pageSize.set(size);
    }
  };
}
