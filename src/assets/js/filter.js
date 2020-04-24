import Vue from 'vue'

Vue.filter('moneyFormat', function (val) {
  val = val.toString().replace(/\$|\,/g, '');
  if (isNaN(val)) {
    val = "0";
  }
  let sign = (val == (val = Math.abs(val)));
  val = Math.floor(val * 100 + 0.50000000001);
  let cents = val % 100;
  val = Math.floor(val / 100).toString();
  if (cents < 10) {
    cents = "0" + cents
  }
  for (let i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
    val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3));
  }

  return (((sign) ? '' : '-') + val + '.' + cents);
});

// 日期字符串转时间戳
Vue.filter('formaTimestamp', function (date) {
  let dates = date.substring(0, 19).replace(/-/g, '/')//必须把日期'-'转为'/'

  let timestamp = Math.floor((new Date(dates).getTime() - new Date().getTime()) / 1000);

  let H = Math.floor(timestamp / 3600);
  let M = Math.floor((timestamp % 3600) / 60);
  let S = timestamp % 3600 - M * 60;
  let Hours = H > 0 ? H + '小时' : '';
  let Minute = M > 0 ? M + '分' : '';
  let second = S > 0 ? S + '秒' : '';

  timestamp = timestamp > 0 ? Hours + Minute + second : '';

  return timestamp
});


Vue.filter('formaDate', function (value, fmt) {
  let date = new Date(value);
  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "w+": date.getDay(), //星期
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o) {
    if (k === 'w+') {
      if (o[k] === 0) {
        fmt = fmt.replace('w', '周日');
      } else if (o[k] === 1) {
        fmt = fmt.replace('w', '周一');
      } else if (o[k] === 2) {
        fmt = fmt.replace('w', '周二');
      } else if (o[k] === 3) {
        fmt = fmt.replace('w', '周三');
      } else if (o[k] === 4) {
        fmt = fmt.replace('w', '周四');
      } else if (o[k] === 5) {
        fmt = fmt.replace('w', '周五');
      } else if (o[k] === 6) {
        fmt = fmt.replace('w', '周六');
      }
    } else if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
});


