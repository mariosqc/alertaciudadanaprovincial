import { useEffect, useMemo, useState } from "react";
import store from "store";

interface Pagination<T> {
  perPage: number;
  take: number;
  skip: number;
  total: number;
  items: T[];
}

interface UsePaginationProps<T> {
  skip: number;
  allItems: T[];
  name: string;
}

function paginationStore<T>(pagination: Pagination<T>, name: string) {
  const { items, ...newPagination } = pagination;
  store.set(`${name}-table-pagination`, newPagination);
}

export const usePagination = <T,>({ skip, allItems, name }: UsePaginationProps<T>) => {
  const [allItemsInternal, setAllItemsInternal] = useState<T[]>([]);
  const [perPage, setPerPage] = useState(skip);
  const [pagination, setPagination] = useState<Pagination<T>>({
    perPage: skip,
    items: [],
    take: 0,
    skip,
    total: 0,
  });

  // useMemo(() => {
  //   const paginationStored: Pagination<T> = store.get(`${name}-table-pagination`);
  //   setPagination((prev) => ({ ...paginationStored, items: prev.items }));
  // }, []);

  function initialPagination(skip: number) {
    const pagination = { perPage: skip, skip, take: 0, items: allItems.slice(0, skip), total: allItems.length };
    setPagination(pagination);
  }

  function prevPage() {
    if (pagination.take) {
      const paginationItem: Pagination<T> = {
        ...pagination,
        take: pagination.take - pagination.perPage,
        skip: pagination.skip - pagination.perPage,
        items: allItemsInternal.slice(pagination.take - pagination.perPage, pagination.skip - pagination.perPage),
      };
      paginationStore(paginationItem, name);
      setPagination(paginationItem);
    }
  }

  function nextPage() {
    const paginationItem: Pagination<T> = {
      ...pagination,
      take: pagination.take + pagination.perPage,
      skip: pagination.skip + pagination.perPage,
      items: allItemsInternal.slice(pagination.take + pagination.perPage, pagination.skip + pagination.perPage),
    };
    paginationStore(paginationItem, name);
    setPagination(paginationItem);
  }

  function changeNumberPerPage(newSkip: number) {
    setPerPage(newSkip);

    const pagination = {
      perPage: newSkip,
      skip: newSkip,
      take: 0,
      items: allItemsInternal.slice(0, newSkip),
      total: allItems.length,
    };
    paginationStore(pagination, name);
    setPagination(pagination);
  }

  useEffect(() => {
    if (allItems.length) {
      setAllItemsInternal(allItems);
      initialPagination(skip);
    }
  }, [allItems]);

  return { allItems: allItemsInternal, perPage, pagination, prevPage, nextPage, changeNumberPerPage };
};
