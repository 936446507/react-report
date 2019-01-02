export const getUrlParams = function() {
  let href = window.location.href
  let regExp = /(\w+)=(\w+)/ig
  let pos = href.indexOf('?')
  if (pos !== -1) {
    let params = {}
    href.replace(regExp, function(match, matchExp1, matchExp2) {
      params[matchExp1] = matchExp2
    })
    return params
  }
  return null
}

export default getUrlParams
