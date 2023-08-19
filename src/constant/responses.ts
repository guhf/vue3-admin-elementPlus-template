/**
 * 响应码
 */
export enum ResponseCode {
  /**
   * 成功
   */
  OK = 200,

  /**
   * 验证失败
   */
  ValidateFail = 203,

  /**
   * 失败
   */
  Failed = 400,

  /**
   * 未登录/token失效
   */
  Unauthorized = 401,

  /**
   * 没有权限
   */
  Forbidden = 403,

  /**
   * 不存在
   */
  NotFound = 404,

  /**
   * 未实现
   */
  Unrealized = 410,

  /**
   * 无效凭证
   */
  PreconditionFailed = 412,

  /**
   * 系统异常
   */
  Error = 500,

  /**
   * 系统错误
   */
  Unavailable = 503,
}
