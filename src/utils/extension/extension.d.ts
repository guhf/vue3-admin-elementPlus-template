
declare global{
  interface String {
    isInteger(): boolean
    isNumber(): boolean
    toInt(): Number
    toNumber(): any
    toNumberFixed(): any
  }

  interface Array<T> {
    add(item: T): void
    remove(item: T): void
    addRange(items: T[]): void
    removeRange(items: T[]): void
  }
}

export {}
