/**
 * @description: 将对象转化为URL的？后的参数
 * @param {Object} paramObj
 * @return {String}
 */
export function formateObjToUrlParamStr(paramObj) {
  const data = []
  for (let attr in paramObj) {
    data.push(`${attr}=${encodeURIComponent(paramObj[attr])}`)
  }
  return data.join('&')
}

/**
 * @description: 获取url的参数转换成对象
 * @param {String} url
 * @return {Object}
 */
export function getUrlParam(url) {
  let qs = url ? url.split('?')[1] : location.search.substring(1),
    params = null
  if (qs) {
    params = {}
    qs.split('&').forEach(item => {
      let _item = item.split('=')
      params[_item[0]] = decodeURIComponent(_item[1])
    })
  }
  return params
}

/**
 * @description: 链接拼接时忽略base_url末尾的/字符
 * @param {String} url
 * @return {String}
 */
export function domainIgnoreSlash(str) {
  if (!str) return
  const len = str.length
  if (str.charAt(len - 1) === '/') {
    return str.substring(0, len - 1)
  } else {
    return str
  }
}
