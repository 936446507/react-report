function integerNum(num) {
  num = typeof num === 'number' ? num : Number(num)

  return isNaN(num) || num <= 0 ? 0 : parseInt(num)
}

export default integerNum
