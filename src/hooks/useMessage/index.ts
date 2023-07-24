import { ElMessage, ElMessageBox } from 'element-plus'

// #region 确认框

interface confirmOptions {
  message?: string
  title?: string
  confirmButtonText?: string
  cancelButtonText?: string
  type?: '' | 'success' | 'warning' | 'info' | 'error'
}

/**
 * 确认框
 * @param options 确认框参数
 * @returns
 */
export const useConfirm = (options: confirmOptions) => {
  return ElMessageBox.confirm(options.message || '', options.title || '提示', {
    confirmButtonText: options.confirmButtonText || '确定',
    cancelButtonText: options.cancelButtonText || '取消',
    type: options.type || 'warning',
  })
}

/**
 * 删除确认框
 * @param options 确认框参数
 * @returns
 */
export const useConfirmDel = (options: confirmOptions = {}) => {
  options.message = options.message || '确定删除选中的数据吗？'
  return useConfirm(options)
}

// #endregion

// #region 消息提示

interface messageOptions {
  msg: string
  type: 'success' | 'warning' | 'info' | 'error'
}

/**
 * 消息提示
 * @param options 消息参数
 * @returns
 */
export const useMessage = (options: messageOptions) => {
  return ElMessage({
    message: options.msg || '',
    type: options.type || 'info',
  })
}

/**
 * 成功消息
 * @param options 消息参数
 * @returns
 */
export const useMessageSuccess = (msg = '成功') => {
  return useMessage({ msg, type: 'success' })
}

/**
 * 警告消息
 * @param options 消息参数
 * @returns
 */
export const useMessageWarning = (msg = '警告') => {
  return useMessage({ msg, type: 'warning' })
}

/**
 * 错误消息
 * @param options 消息参数
 * @returns
 */
export const useMessageError = (msg = '错误') => {
  return useMessage({ msg, type: 'error' })
}

// #endregion
