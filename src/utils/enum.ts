
/**
 * 枚举值转枚举描述
 * @param enums 枚举集合
 * @param value 枚举值
 * @returns
 */
export const enumToDescription = (enums: any[], value : number) => {
  if (!enums) {
    return ''
  }

  return enums.find((item : any) => {
    if (Number(item.value) === value) {
      return item.label
    }
  }).label
}
