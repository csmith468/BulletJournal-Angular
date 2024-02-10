export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    minDate: string;
    maxDate: string;
    minDateInRange: string;
    maxDateInRange: string;
}

export class PaginatedResult<T> {
    result?: T;
    pagination?: Pagination;
}