export interface IResponse<T extends object> {
  data: T
  totalCount?: number
}

export interface QueryParams {
  page: number
  pageSize: number
  sortBy?: string
  sortDirection: 'asc' | 'desc'
  q?: string
  [key: string]: unknown
}
