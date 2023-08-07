import { useMessageWarning } from '..'
import type { FormInstance } from 'element-plus'

/**
 * 表单验证
 * @param formEl 表单
 * @param message 验证失败提醒信息
 * @returns
 */
export const useValidateForm = async (formEl: FormInstance | undefined, message = '请检查信息是否填写完整') => {
  if (!formEl) return

  return formEl.validate((isValid: boolean) => {
    if (isValid) {
      return true
    } else {
      useMessageWarning(message)
      return false
    }
  })
}

/**
 * 表格删除验证
 * @param tableData 表格数据
 * @param message 验证失败提醒信息
 * @returns
 */
export const useValidateTableDel = (tableData: any[], message = '请先选择需要删除的数据！') => {
  const ids = tableData.map((item) => {
    return item.id
  })

  if (ids.length < 1) {
    useMessageWarning(message)
    return
  }

  return ids
}
