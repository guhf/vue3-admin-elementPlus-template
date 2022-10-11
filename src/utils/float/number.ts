/**
 * 数字帮助类
 * Created by guhf on 24/12/20.
 */

/**
* 格式金额，默认保留两位小数，并格式化为千分位
* @param {number} number 要格式化的数字
* @param {number} decimals 保留几位小数
* @returns {string | null} dec_point 小数点符号
* @returns {string | null} thousands_sep 千分位符号
* @returns {string | null} roundtag 舍入参数("ceil" 向上取,"floor"向下取,"round" 四舍五入)，默认:round
*/
export function formatMoney(number, decimals, dec_point, thousands_sep, roundtag) {
  if (!number) {
    number = 0
  }
  if (!decimals) {
    decimals = 2// 默认保留2位小数
  }
  if (!dec_point) {
    dec_point = '.'
  }
  if (!thousands_sep) {
    thousands_sep = ','
  }
  if (!roundtag) {
    roundtag = 'round'
  }
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  roundtag = roundtag || 'ceil' // "ceil","floor","round"
  const n = !isFinite(+number) ? 0 : +number
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  const sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep
  const dec = (typeof dec_point === 'undefined') ? '.' : dec_point
  let s = ''
  const toFixedFix = function(n, prec) {
    const k = Math.pow(10, prec)

    return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k
  }
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  const re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

/**
* 数字格式化
* @param {number} number 要格式化的数字
*/
export function formatNumber(number) {
  return isNaN(number) ? 0 : Number(number)
}

/**
* 格式化单位为分的金额
* @param {number} 金额/单位分
*/
export function formatCentsMoney(centsNumber) {
  if (typeof centsNumber !== 'number') {
    return '0.00'
  }
  return formatMoney((centsNumber / 100), 2, '.', ',')
}
