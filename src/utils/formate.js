/*
  * formateDate(date, "yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
  * formateDate(date, "yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
  * formateDate(date, "yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
  * formateDate(date, "yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
  * formateDate(date, "yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
  * HH: 24小时进制, hh: 12小时进制
*/
const formateDate = ({date = new Date(), fmt = 'yyyy-MM-dd HH:mm:ss'}) => {
  if (
    typeof date === 'string' &&
    date.replace(/[^\d]/g, '') !== ''
  ) {
    date = new Date(date)
  }
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  let week = {
    '0': '/u65e5',
    '1': '/u4e00',
    '2': '/u4e8c',
    '3': '/u4e09',
    '4': '/u56db',
    '5': '/u4e94',
    '6': '/u516d'
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[date.getDay() + ''])
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

/**
  * num           {number||string}       需要转换的数字
  * isSeparate    {boolean}              是否需要分隔符 默认true
  * decPlace      {number}               小数位数 默认保留两位
  * isSymbol      {boolean}              是否需要正号
*/
const formateNum = ({num, isSeparate = true, decPlace, isSymbol}) => {
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

const toSuperNumber = (n, plusSymBol = false, decimalNums = 2) => {
  var num = Number(n)
  if (Number.isNaN(num) || n === '') return ''
  if (num === 0) return '0.00'
  // 判断正负，分离并保留符号
  var flag = num > 0 ? '+' : ''
  var arr = num.toFixed(decimalNums).split('.')
  // 千分号替换
  var commaExp = /(\d)(?=(\d{3})+$)/g
  arr[0] = arr[0].replace(commaExp, function($1) {
    return $1 + ','
  })
  return plusSymBol ? flag + arr.join('.') : arr.join('.')
}

const integerNum = num => {
  num = typeof num === 'number' ? num : Number(num)

  return isNaN(num) || num <= 0 ? 0 : parseInt(num, 10)
}

export {
  formateDate,
  formateNum,
  toSuperNumber,
  integerNum
}