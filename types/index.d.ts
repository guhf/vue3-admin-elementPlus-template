declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T
  [key: string]: any
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null

type ElRef<T extends HTMLElement = HTMLDivElement> = import('./global').Nullable<T>;

interface CommonTable extends InstanceType<typeof import('element-plus').ElTable> {
  reloadData: Function
}

interface ConstTree extends InstanceType<typeof import('element-plus').ElTree> {
  getCheckData: () => import('element-plus/es/components/tree/src/tree.type').TreeData
}

interface CommonDialog extends InstanceType<typeof import('element-plus').ElDialog> {
  open: Function
  close: Function
}
