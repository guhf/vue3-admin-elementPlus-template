import { useMessageWarning } from '..'
import type { FormInstance } from 'element-plus'

/**
 * 表单验证
 * @param formEl 表单
 * @param message 验证失败提醒信息
 * @returns
 */
export const useValidate = async (formEl: FormInstance | undefined, message = '请检查信息是否填写完整') => {
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
