/**
  * num           {number||string}       需要转换的数字
  * isSeparate    {boolean}              是否需要分隔符 默认false
  * decPlace      {number}               小数位数 默认保留两位
  * isSymbol      {boolean}              是否需要正号
*/
function formateNum({num, isSeparate = true, decPlace, isSymbol}) {
  let integer = 0 // 整数部分
  let decimals = 0 // 小数部分
  let result = '' // 返回值
  let isplus = true // 是否是正数
  let minLength = 3
  let stringNum = typeof num === 'number' ? num : Number(num)
  // 判断是否是数字
  if (isNaN(stringNum)) {
    console.log('Error: 数字格式错误！')
    return 0
  }
  // 判断正负数
  if (stringNum > 0) {
    isplus = true
    minLength = 3
  } else {
    isplus = false
    minLength = 4
  }
  // 处理小数位数
  if (decPlace || decPlace === 0) {
    stringNum = stringNum.toFixed(decPlace)
  } else {
    stringNum = stringNum.toFixed(2)
  }
  // 需要分隔符则循环添加
  if (isSeparate) {
    const numArr = stringNum.split('.')
    integer = numArr[0]
    decimals = numArr[1] || 0
    while (integer.length > minLength) {
      result = ',' + integer.slice(-3) + result
      integer = integer.slice(0, integer.length - 3)
    }
    if (integer) {
      result = integer + result
    }
    if (decimals) {
      result = result + '.' + decimals
    }
  } else {
    result = stringNum
  }
  // 是否需要加正负号
  if (isSymbol && isplus) {
    result = '+' + result
  }
  return result
}
export default formateNum
