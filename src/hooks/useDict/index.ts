import type { Options } from '~/models/common/optionModel'
import { useDictStore } from '~/store/dict'

/**
 * 字典信息
 * @param dictCode 字典编号
 */
export const useDict = (dictCode = '') => {
  let dicts = useDictStore().getDictData(dictCode)

  return dicts
}

/**
 * 根据value查找label值
 * @param options options
 * @param value value值
 * @param labelName label名称
 * @param valueName value名称
 */
export const useValueToLabel = (options: Options, value: string | number | boolean | undefined, labelName = 'label', valueName = 'value') => {
  let valOption = options.find((item) => {
    return String(item[valueName]) == String(value)
  })

  return valOption ? valOption[labelName] : ''
}
