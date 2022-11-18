
/**
 * 树状数据节点
 */
export declare interface TreeItem {
  id: string
  label: string
  checked?: boolean
  children?: TreeItem[]
}

/**
 * 树状数据
 */
export declare type Tree = TreeItem[]