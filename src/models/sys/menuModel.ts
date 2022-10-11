import { BaseModel } from '../baseModel'

export declare interface Menu extends BaseModel {
  menuCode?: string
  menuName?: string
  menuType?: number
  path?: string
  parentId?: string
  apiUrl?: string
  authority?: string
  icon?: string
  component?: string
  sortNo?: number
}

export declare interface MenuTreeItem extends Menu {
  children: MenuTreeItem[]
  btns: MenuTreeItem[]
}

export declare type MenuTree = MenuTreeItem[]

export declare interface PermissionTreeItem extends Menu {
  children: PermissionTreeItem[]
  btns: PermissionTreeItem[]
  checked: boolean
}

export declare type PermissionTree = PermissionTreeItem[]

