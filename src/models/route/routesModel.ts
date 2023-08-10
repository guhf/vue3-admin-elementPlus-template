export interface Meta {
  affix?: boolean // 固定
  title: string
  icon?: string
  /** 菜单类型 */
  menuType?: number
  tagName: string
  activeMenu?: string
  hidden?: boolean
  /** 只有一个子级是是否加载父级 */
  alwaysShow?: boolean
  /** 排序号 */
  sortNo?: number
}

export declare interface Route {
  // extends RouteRecordRaw
  id: string
  /** 父级Id */
  parentId?: string
  /** 名称 */
  name: string
  /** 地址 */
  path: string
  /** Component */
  component: string
  /** 元数据 */
  meta: Meta
  /** 权限码 */
  authority: string
  /** children */
  children?: Route[]
}

export declare type Routes = Route[]
