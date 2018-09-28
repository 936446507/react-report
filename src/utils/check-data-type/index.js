export function checkDataType(data) {
  return Object.prototype.toString.call(data).replace(/\[object\s|\]/g, '')
}
