
// /**
//  * 判断是否为一个整数
//  */
// Object.prototype.isInteger = function () {
//   return Math.floor(this as any) === this;
// }

/**
 * 判断是否为一个数字
 */
String.prototype.isNumber = function(): boolean {
  console.log(this)
  console.log(Number(this))
  console.log(isNaN(Number(this)))

  return !isNaN(Number(this))
}

export {}

// Object.prototype.toInt = function () {
//   let ret = { times: 1 as number, num: 0 as number }
//   let isNegative = this < 0
//   if (this.isInteger()) {
//       ret.num = this as number
//       return ret
//   }
//   let strfi = this + ''
//   let dotPos = strfi.indexOf('.')
//   let len = strfi.slice(dotPos + 1).length
//   let times = Math.pow(10, len)
//   let intNum = parseInt(String(Math.abs(this as number) * times + 0.5), 10)
//   ret.times = times
//   if (isNegative) {
//       intNum = -intNum
//   }
//   ret.num = intNum
//   return ret
// }
