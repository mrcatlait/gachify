export interface PageResponse<Type> {
  data: Type[]
  meta: {
    limit: number
    offset: number
    count: number
    total: number
  }
}
