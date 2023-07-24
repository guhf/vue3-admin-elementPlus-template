import type { BaseModel } from '../baseModel'

/** 菜单 */
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

/** 菜单树项 */
export declare interface MenuTreeItem extends Menu {
  children: MenuTreeItem[]
}

/** 菜单树集合 */
export declare type MenuTree = MenuTreeItem[]
