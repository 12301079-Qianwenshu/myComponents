export const binarySearch = (list, func) => {
  let left = 0;
  let right = list.length - 1;

  while (left <= right) {
      let mid = (left + right) / 2;
      if (func(list[mid]) === 0) {
          return mid;
      }
      else if (func(list[mid]) < 0) {
          left = mid + 1;
      }
      else {
          right = mid - 1;
      }
  }

  return -1;
}

export const random = (from, to) => {
  if (!to) {
    to = from;
    from = 0;
  }
  return parseInt(Math.random() * (to - from) + from);
};

export const mergeApi = (api = {}, ...prefix) => {
  for (let key in api) {
    if (typeof api[key] === 'object') {
      mergeApi(api[key], ...prefix);
    } else {
      prefix.forEach((item) => api[key] = `${item}${api[key]}`);
    }
  }

  return api;
}

export const convertQueryString = (params) => {
  if (!params) {
    return '';
  }
  var query = '';
  for (let key in params) {
    if (params[key] || params[key] === 0) {
      if (query.indexOf('?') === -1) {
        query = query + `?${key}=${params[key]}`;
      } else {
        query = query + `&${key}=${params[key]}`;
      }
    }
  }
  return query;
}

export const deepCopy = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  let result = Array.isArray(obj.slice && obj.slice()) ? [] : {};
  if (result instanceof Array) {
    for (let i = 0; i < obj.length; i++) {
      result[i] = deepCopy(obj[i]);
    }
  } else {
    for (let key in obj) {
      result[key] = deepCopy(obj[key]);
    }
  }

  return result;
}

export const compile = (...obj) => {
  try {
    for (let i = 0; i < obj.length; i++) {
      if (i != obj.length - 1 && JSON.stringify(obj[i]) !== JSON.stringify(obj[i + 1])) {
        return false;
      }
    }
    return true;
  } catch (e) {
    return false;
  }
}


export const formatOracleDate = (date) => {
  return date;
}

export const findAll = (list = [], fn) => {
  const result = [];
  list.forEach((item, index) => {
    if (fn(item, index)) {
      result.push(item);
    }
  });
  return result;
}

export const uuid = () => {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

export const findParentDom = (dom, fn) => {
  try {
    if (fn(dom)) {
      return dom;
    } else {
      return findParent(dom.parentElement, fn);
    }
  } catch (e) {
    return;
  }
}

export const mergeUrl = (url, params = {}) => {
  const reg = /\{[^}]+\}/g;
  return url.replace(reg, (match) => {
    const r = /{|}/g;
    const key = match.replace(r, '');
    const value = params[key];

    if (value === 0) {
      return 0;
    }

    return value || '';
  });
}

/**
 * js日期格式化，timestamp支持10位或13位的时间戳，或是时间字符串
 * @param{string} format传进来的字符串，Y-m-d H:i:s每个字母所代表的意思详见代码
 * @param{int string}timestamp 要格式化的时间 默认为当前时间可以是日期形式的字符串，可以是10位或13位的时间戳
 * @return {string} 格式化的时间字符串
 */
export function dateFormat(format, timestamp) {
  if (timestamp == "" || timestamp == null || format == "") return ""

  //如果传进来的是 日期的字符串形式，变回时间戳
  if (typeof (timestamp) == "string") {
    //兼容ios
    var timestamp = timestamp.replace("T", " ")
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      timestamp = timestamp.replace(/\-/g, "/");
    }
    if (timestamp.indexOf("-") !== false || timestamp.indexOf("/") !== false) timestamp = new Date(timestamp).getTime()
  }
  //如果传进来的是10位的时间戳 变成13位的
  if (timestamp.toString().length == 10) timestamp = timestamp * 1000
  //如果到这一步，依然不是13位的时间戳，说明数据有问题
  timestamp = parseInt(timestamp)
  if (timestamp.toString().length != 13) return ""

  var a, jsdate = new Date(timestamp);
  var pad = function (n, c) {
    if ((n = n + "").length < c) {
      return new Array(++c - n.length).join("0") + n;
    } else {
      return n;
    }
  };
  var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var txt_ordin = {
    1: "st",
    2: "nd",
    3: "rd",
    21: "st",
    22: "nd",
    23: "rd",
    31: "st"
  };
  var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"
  ];
  var f = {
    // Day
    d: function () {
      return pad(f.j(), 2)
    }, //2位天,02
    D: function () {
      return f.l().substr(0, 3)
    }, //星期单词的前三位
    j: function () {
      return jsdate.getDate()
    }, //天2
    l: function () {
      return txt_weekdays[f.w()]
    }, //星期英文
    N: function () {
      return f.w() + 1
    }, //星期的某一天的数字 星期日为1
    S: function () {
      return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
    },
    w: function () {
      return jsdate.getDay()
    }, //星期的某一天的数字 星期日为0
    z: function () {
      return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0
    }, //当前时间是一年中的第几天
    // Month
    F: function () {
      return txt_months[f.n()]
    }, //月份英文
    m: function () {
      return pad(f.n(), 2)
    }, //2位月02
    M: function () {
      return f.F().substr(0, 3)
    }, //月份英文前三个字母
    n: function () {
      return jsdate.getMonth() + 1
    }, //月2
    t: function () { //当前月总共有多少天
      var n;
      if ((n = jsdate.getMonth() + 1) == 2) {
        return 28 + f.L();
      } else {
        if (n & 1 && n < 8 || !(n & 1) && n > 7) {
          return 31;
        } else {
          return 30;
        }
      }
    },
    // Year
    L: function () {
      var y = f.Y();
      return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0
    },
    //年
    Y: function () {
      return jsdate.getFullYear()
    },
    y: function () {
      return (jsdate.getFullYear() + "").slice(2)
    },
    // Time
    a: function () {
      return getHours(jsdate) > 11 ? "pm" : "am"
    },
    A: function () {
      return f.a().toUpperCase()
    },
    B: function () {
      // peter paul koch:
      var off = (jsdate.getTimezoneOffset() + 60) * 60;
      var theSeconds = (getHours(jsdate) * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
      var beat = Math.floor(theSeconds / 86.4);
      if (beat > 1000) beat -= 1000;
      if (beat < 0) beat += 1000;
      if ((String(beat)).length == 1) beat = "00" + beat;
      if ((String(beat)).length == 2) beat = "0" + beat;
      return beat;
    },
    g: function () {
      return getHours(jsdate) % 12 || 12
    },
    G: function () {
      return getHours(jsdate)
    },
    h: function () {
      return pad(f.g(), 2)
    },
    H: function () {
      return pad(getHours(jsdate), 2)
    },
    i: function () {
      return pad(jsdate.getMinutes(), 2)
    },
    s: function () {
      return pad(jsdate.getSeconds(), 2)
    },
    //u not supported yet
    // Timezone
    //e not supported yet
    //I not supported yet
    O: function () {
      var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
      if (jsdate.getTimezoneOffset() > 0) t = "-" + t;
      else t = "+" + t;
      return t;
    },
    P: function () {
      var O = f.O();
      return (O.substr(0, 3) + ":" + O.substr(3, 2))
    },
    //T not supported yet
    //Z not supported yet
    // Full Date/Time
    c: function () {
      return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()
    },
    //r not supported yet
    U: function () {
      return Math.round(jsdate.getTime() / 1000)
    }
  };
  //兼容ios 
  function getHours(dateObj) {
    //因为上边已经将UTC的时间进行了转换，把T去了，所以这里用同样的方法即可
    return dateObj.getHours();

    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      return dateObj.getUTCHours();
    } else {
      return dateObj.getHours();
    }
  }

  var ret = ""
  return format.replace(/[\\]?([a-zA-Z])/g, function (t, s) {
    if (t != s) {
      // escaped
      ret = s;
    } else if (f[s]) {
      // a date function exists
      ret = f[s]();
    } else {
      // nothing special
      ret = s;
    }
    return ret;
  });
}

export const findParent = (dom, fn) => {
  try {
    if(fn(dom))
    {
      return dom;
    }else{
      return findParent(dom.parentElement, fn);
    }
  }catch(e) {
    return;
  }
}

