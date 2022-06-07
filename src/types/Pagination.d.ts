declare module "@alerta-ciudadana/entity" {
  interface Pagination<T> {
    perPage: number;
    take: number;
    skip: number;
    total: number;
    items: T[];
  }
  interface PaginatioContext<T> {
    pagination: Pagination<T>;
    prevPage(): void;
    nextPage(): void;
    goToFirstPage(): void;
    goToLastPage(): void;
    changeNumberPerPage(perPage: number): void;
  }
}
