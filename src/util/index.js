import dayjs from 'dayjs';
import md5 from 'js-md5';
import qs from 'qs';
const salt = atob('MjI3YTBjNGNjMDEzMDI3ZjQ2NGY3YzUwZTNjNzAxMWY=');

function getUrlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = encodeURI(window.location.search)
    .substr(1)
    .match(reg);
  if (r !== null) return decodeURI(r[2]);
  return null;
}

function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

const now = () => dayjs().format('YYYY-MM-DD HH:mm:ss');
const ymd = () => dayjs().format('YYYYMMDD');
const getTimestamp = dayjs().unix();

const handleErr = e => {
  const rec_time = now();
  let errName = '';
  switch (e.name) {
    case 'ReferenceError':
      errName = '找不到对象';
      break;
    case 'TypeError':
      errName = '错误地使用了类型或对象的方法';
      break;
    case 'RangeError':
      errName = '使用内置对象的方法时，参数超范围';
      break;
    case 'SyntaxError':
      errName = '语法错误';
      break;
    case 'EvalError':
      errName = '错误地使用了Eval';
      break;
    case 'URIError':
      errName = 'URI错误';
      break;
    default:
      errName = '其它错误';
      break;
  }
  const errContent = String(e.stack)
    .replace(/\'/g, "\\'")
    .replace(/\n/g, '<br>');
  const err_desc = `【${errName}】${errContent}`;
  const err_url = window.location.href;
  return {
    rec_time,
    err_desc,
    err_url,
    device_platform: navigator.platform,
    device_user_agent: navigator.userAgent,
    device_app_version: navigator.appVersion
  };
};

const getValidStr = openid => {
  const timestamp = dayjs().unix();
  let hash = md5.create();
  hash.update(openid + timestamp + salt);
  const token = hash.hex();
  return {
    token,
    timestamp,
    openid
  };
};

export default {
  getUrlParam,
  now,
  ymd,
  isWeiXin,
  handleErr,
  getValidStr,
  getTimestamp
};
