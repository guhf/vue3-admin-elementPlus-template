import { FormInstance } from 'element-plus'
import { useMessageWarning } from '../web/message'
import { ValidateFieldsError } from 'async-validator'

/**
 * 表单验证
 * @param formEl 表单
 * @param message 验证失败提醒信息
 * @returns
 */
export const useValidate = async (formEl: FormInstance | undefined, message = '请查看信息是否填写完整') => {
  if (!formEl) return

  return await formEl.validate((isValid: boolean, invalidFields?: ValidateFieldsError) => {
    if (isValid) {
      return true
    } else {
      useMessageWarning(message)
      return false
    }
  })
}
