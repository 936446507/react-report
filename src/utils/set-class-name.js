/**
 * 设置className
 * @param classObj Object
*/

import { checkDataType } from './check-data-type'

const setClassName = (classObj) => {
  if (checkDataType(classObj) !== 'Object') return ''

  return Object.entries(classObj)
  .filter(item => item[item.length - 1])
  .map(item => item[0])
  .join(' ')
}

export {
  setClassName
}
