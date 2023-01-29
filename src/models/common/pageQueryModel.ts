/**
 * 分页查询参数
 */
export interface PageQuery extends Record<string, string | number | undefined> {
  pageIndex: number
  pageSize?: number
  orderBy?: string
}
