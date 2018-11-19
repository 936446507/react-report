const objectUtils = {
  /**
   * 修改对象项
   * @param object (object)
   * @param newItem   (object)
   * @returns {*} 返回新对象
  */
  modifyItem(object, newItem) {
    return Object.assign({}, object, newItem)
  }
}

const arrayUtils = {
  /**
   * 在指定索引位置增加新元素，未指定index时添加到最后面
   * @param array (array)
   * @param newItem   (object)
   * @param index (int)
   * @returns {*} 返回新数组
   */
  addItem(array, newItem, index) {
    index = index ? index : array.length
    return (
      [
        ...array.slice(0, index),
        newItem,
        ...array.slice(index + 1)
      ]
    )
  },
  /**
   * 删除指定id的元素
   * @param array
   * @param id
   * @returns {[*,*]} 返回新数组
   */
  delItem(array, id) {
    const findIndex = array.findIndex(item => item.id === id)

    return [
      ...array.slice(0, findIndex),
      ...array.slice(findIndex + 1)
    ]
  },
  /**
   * 替换数组中指定的元素
   * @param array
   * @param id
   * @param newItem (object)
   * @returns {[*,*,*]} 返回新数组
   */
  modifyItem(array, id, newItem) {
    const findIndex = array.findIndex(item => item.id === id)

    return [
      ...array.slice(0, findIndex),
      {
        ...array[findIndex],
        ...newItem
      },
      ...array.slice(findIndex + 1)
    ]
  }
}

export {
  objectUtils,
  arrayUtils
}