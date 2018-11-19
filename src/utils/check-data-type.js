const checkDataType = data => {
  return Object.prototype.toString.call(data).replace(/\[object\s|\]/g, '')
}

export {
  checkDataType
}
