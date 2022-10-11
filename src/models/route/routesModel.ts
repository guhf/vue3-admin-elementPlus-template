export interface Meta {
  affix?: boolean // 固定
  title: string
  icon?: string
  tagName: string
  activeMenu?: string
  hidden?: boolean
  alwaysShow?: boolean // 只有一个子级是是否加载父级
}

export declare interface Route {
  id: string
  parentId?: string
  name: string
  path: string
  component: string
  meta: Meta
  menuType?: number
  authority: string // 权限码
  children?: Route[]
}

export declare type Routes = Route[]
