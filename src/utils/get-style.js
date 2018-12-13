export function getStyle(obj, style, isGetNum = true) {
  let result = null
  if (window.getComputedStyle) {
    result = window.getComputedStyle(obj, null)[style]    // 非IE
  } else {
    result = obj.currentStyle[style]  // IE
  }
  if (isGetNum) {
    result = +result.split('px')[0]
  }
  return result
}
