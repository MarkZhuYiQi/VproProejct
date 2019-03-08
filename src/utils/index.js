/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option = false) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}
export function genNonDuplicateID() {
  return (String(Math.floor(Math.random() * 10000))) + String(new Date().getTime())
}
/**
 * 该函数用来复制对象内容，如果直接那个使用obja=objb，实际上并不是传递值，而是地址，所以a的改变直接导致b也改变了！！！
 * 该函数可以理解为对值的传递。
 * 首先创建一个空对象，然后迭代传入的对象，检查键值对，如果值是对象，那么判断是否是数组，根据数组和对象，创建不同的初值。
 * 然后递归，继续检查值下面的
 * @param p
 * @param c
 * @returns {*|{}}
 */
export function deepCopy(p, c) {
  c = c || {}
  for (const i in p) {
    if (!p.hasOwnProperty(i)) {
      continue
    }
    if (typeof p[i] === 'object') {
      c[i] = (p[i].constructor === Array) ? [] : {}
      deepCopy(p[i], c[i])
    } else {
      c[i] = p[i]
    }
  }
  return c
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
export function dateFormat(time, fmt) {
  // author: meizz
  time = new Date(parseInt(time + '000'))
  const o = {
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'h+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
    'S': time.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

export function currency(str) {
  let res = ''
  if (str.indexOf('.') >= 0) {
    res = str.replace(/\.(\d+)/g, function(match, index) {
      if (index.length < 2) {
        for (let i = 0; i <= match.length - index.length; i++) {
          index = index.toString()
          index += '0'
        }
        return '.' + index
      } else {
        return match.substr(0, 3)
      }
    })
    return res
  } else {
    return str + '.00'
  }
}

/**
 * 将评论中所有的id拿出来
 * @param obj
 * @returns {Array}
 */
export function getCommentsId(obj) {
  // const ids = [11, 14]
  // console.log([11, 14, 15].filter(v => {
  //   console.log(ids.indexOf(v) === -1)
  //   return ids.indexOf(v) === -1
  // }))
  const ids = []
  obj.map(item => {
    if (item.parents !== null && item.parents.length > 0) {
      ids.concat(item.parents.map(comment => {
        return comment.vproCommentId
      }).filter(v => {
        return ids.indexOf(v) === -1
      }))
    }
    if (ids.indexOf(item.vproCommentId) === -1) ids.push(item.vproCommentId)
    return ids
  })
  return ids
}
