export interface PaginatedResponse<T> {
  data: T;
  total: number;
  page: number;
}

export interface GetParams {
  page: number;
  limit: number;
}
