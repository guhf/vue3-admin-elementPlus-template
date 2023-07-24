/**
 * 数字帮助类
 * Created by guhf on 24/12/20.
 */

/**
 * 格式金额，默认保留两位小数，并格式化为千分位
 * @param {number} numerical 要格式化的数字
 * @param {number} decimals 保留几位小数
 * @returns {string} decPoint 小数点符号
 * @returns {string} thousandsSep 千分位符号
 * @returns {string} roundtag 舍入参数("ceil" 向上取,"floor"向下取,"round" 四舍五入)，默认:round
 */
export function formatMoney(numerical: string | number, decimals = 2, decPoint = '.', thousandsSep = ',', roundtag: 'ceil' | 'floor' | 'round' = 'round') {
  numerical = Number(`${numerical}`.replace(/[^0-9+-Ee.]/g, ''))
  const n = !Number.isFinite(+numerical) ? 0 : +numerical
  const prec = !Number.isFinite(+decimals) ? 0 : Math.abs(decimals)
  const sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep
  const dec = typeof decPoint === 'undefined' ? '.' : decPoint
  let s = [] as string[]
  const toFixedFix = function (n: number, prec: number) {
    const k = 10 ** prec

    return `${Number.parseFloat(Math[roundtag](Number.parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k}`
  }
  s = (prec ? toFixedFix(n, prec) : `${Math.round(n)}`).split('.')
  const re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, `$1${sep}$2`)
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

/**
 * 数字格式化
 * @param {number} numerical 要格式化的数字
 */
export function formatNumber(numerical: string | number) {
  return Number.isNaN(numerical) ? 0 : Number(numerical)
}

/**
 * 格式化单位为分的金额
 * @param {number} 金额/单位分
 */
export function formatCentsMoney(cents: string | number) {
  if (typeof cents !== 'number') {
    return '0.00'
  }
  return formatMoney(cents / 100, 2, '.', ',')
}
