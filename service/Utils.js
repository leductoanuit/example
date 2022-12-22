// @flow
import _ from 'lodash';
import moment from 'moment';

const assign = (obj: any, ...sources: Array<any>): any => {
  return _.assign(obj, ...sources);
};

// const get = (obj: any, path: any, defVal: any): any = {
//   return _.get(obj,path, defVal);
// }

const get = (obj: any, path: Array<string> | string, defVal?: any): any => {
  return _.get(obj, path, defVal);
};

const getVals: (
  objs: any[],
  path: Array<string> | string,
  defVals?: any[],
) => any[] = (objs: any[], path: Array<string> | string, defVals?: any[]) => {
  if (!_.isArray(objs)) {
    return defVals || [];
  }
  return objs.map((it) => _.get(it, path));
};

const isObject = (val: any): boolean => {
  return _.isObject(val);
};

const isArray = (val: any): boolean => {
  return _.isArray(val);
};

const isDate = (obj: any): boolean => {
  return _.isDate(obj);
};

const isString = (obj: any): boolean => {
  return _.isString(obj);
};

const isNum: (val: any) => boolean = (val: any) => {
  return _.isNumber(val);
};

const avg: (val: any[]) => any = (val: any[]) => {
  if (!val || val.length < 1) {
    return 0;
  }
  return _.sum(val) / val.length;
};

const median: (arr: any[]) => any[] = (arr: any[]) => {
  console.log('calc median, arr=', arr);
  let nums: any[] = arr ? [...arr] : [];
  if (nums.length < 1) {
    return [];
  }
  // arr.forEach((it) => {
  //   if (!nums.includes(it)) {
  //     nums = [...nums, it];
  //   }
  // });
  // console.log('Non duplicated array: ', [...nums]);
  const mid = Math.floor(nums.length / 2);
  // nums = [...nums].sort((a, b) => a - b);
  // console.log('sorted array: ', [...nums], ' mid position ', mid);
  // let res =
  //   nums.length % 2 !== 0
  //     ? nums.slice(mid, mid + 1)
  //     : nums.slice(mid - 1, mid + 1);
  let res = [nums[mid]];
  console.log('Result: ', [...res]);
  return res;
};

const round = (num: any, scale?: number): number => {
  if (!isNum(num)) {
    num = Number(num) || 0;
  }
  scale = scale || 2;
  // console.log('scale', scale, 'num', num);
  return _.round(num, scale);
};

const fmtDecimal = (num: number, scale: number = 2): string => {
  num = Number(num);
  if (!_.isNumber(num)) {
    return '' + num;
  }
  num = _.round(num, scale);
  let snum: string = num.toString();
  let pos = snum.indexOf('.');
  if (pos < 0) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  let s1 = snum.substr(0, pos);
  let s2 = snum.substr(pos);
  return s1.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + s2;
};

const parseTime = (str: string, fmt?: any): any => {
  if (!fmt) {
    fmt = 'HH:mm:ss';
  }
  let dateObj = moment(str, fmt).toDate();
  return dateObj;
};

const jsDateToStr = (jsDate: any, fmt?: any): string => {
  if (!jsDate) {
    return '';
  }
  if (!fmt) {
    fmt = 'YYYY-MM-DD HH:mm:ss';
  }
  return moment(jsDate).format(fmt);
};

const toJsDate = (str: string, defVal: any): any => {
  if (str === null || str === undefined) {
    return defVal || null;
  }
  const dateObj = moment(str, 'YYYY-MM-DD HH:mm:ss').toDate();
  return dateObj;
};

const toLocalDate = (jsDate: any): any => {
  if (jsDate === null || jsDate === undefined) {
    return jsDate;
  }
  let now = new Date();
  let offset = now.getTimezoneOffset();
  const dateObj = moment(jsDate)
    .add(-1 * offset, 'minutes')
    .toDate();
  return dateObj;
};

const toServerDate = (jsDate: any): any => {
  if (jsDate === null || jsDate === undefined) {
    return jsDate;
  }
  let now = new Date();
  let offset = now.getTimezoneOffset();
  const dateObj = moment(jsDate).add(offset, 'minutes').toDate();
  return dateObj;
};

const addDays = (srcD: any, nbDays: number, fmt?: string): string | any => {
  let newD = moment(srcD).add(nbDays, 'd');
  if (fmt) {
    return newD.format(fmt);
  }
  return newD.toDate();
};

const addMonths = (srcD: any, nbMonths: number, fmt?: string): string | any => {
  let newD = moment(srcD).add(nbMonths, 'months');
  if (fmt) {
    return newD.format(fmt);
  }
  return newD.toDate();
};

const getDateInfo: (srcD: any) => any = (srcD: any) => {
  let newD = moment(srcD);
  return {
    year: newD.year(),
    month: newD.month() + 1,
    day: newD.date(),
    hour: newD.hour(),
    minute: newD.minute(),
    second: newD.second(),
    ms: newD.milliseconds(),
    days: newD.daysInMonth(),
  };
};

const toNum = (str: any): number => {
  if (_.isNumber(str)) {
    return str;
  }
  if (!_.isString(str)) {
    return 0;
  }
  if (_.isEmpty(str)) {
    return 0;
  }
  str = str.replace(/[,]+/, '');
  let num = _.toNumber(str);
  return num;
};

const reFmtDate = (str: string, fmt?: string, toLocal?: boolean): string => {
  if (_.isEmpty(str)) {
    return str;
  }
  if (_.isEmpty(fmt)) {
    fmt = 'DD/MM/YYYY';
  }
  if (toLocal === undefined) {
    toLocal = true;
  }
  let jsDate = toJsDate(str);
  if (toLocal) {
    jsDate = toLocalDate(jsDate);
  }
  return jsDateToStr(jsDate, fmt);
};

const getWeeksOfMonth: (opts: any) => any = (opts: any): any => {
  opts = opts || {};
  let {date, year, month} = opts;
  let mm = moment();
  if (date) {
    mm = moment(date);
  } else if (year !== undefined && month !== undefined) {
    mm = moment().year(year).month(month).date(1);
  }
  let nbDays = mm.daysInMonth();
  let res = [];
  let curWeek = {};
  let wom = 0;
  for (let dayInd = 1; dayInd <= nbDays; dayInd++) {
    let dow = mm.date(dayInd).day();
    if (dayInd === 1 || dow === 0) {
      wom++;
      curWeek = {
        wom,
        domFrom: dayInd,
        dowFrom: dow + 1,
        dtFrom: mm.toDate(),
      };
    } else if (dayInd === nbDays || dow === 6) {
      curWeek = {
        ...curWeek,
        domTo: dayInd,
        dowTo: dow + 1,
        dtTo: mm.toDate(),
      };
      res = [...res, curWeek];
    }
  }
  return res;
};

const isEmpty = (val: any): boolean => {
  // return (
  //   val === undefined ||
  //   val === null ||
  //   (_.isString(val) && val.trim().length < 1)
  // );
  return _.isEmpty(val);
};

const adjustPercField = (obj: any, fds: any, toPerc: boolean): any => {
  if (!_.isArray(fds)) {
    fds = [fds];
  }
  let newObj = {...obj};
  for (let fd of fds) {
    let val = Number(newObj[fd]) || 0;
    val = toPerc ? val * 100 : val / 100;
    newObj[fd] = val;
  }
  return newObj;
};

const downloadFile: (url: any) => any = (url: any) => {
  console.log('Downloading: ', url);
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  // Prevent from affecting the page
  iframe.style.height = '0';
  // prevent affecting the page
  iframe.src = url;
  if (document.body) {
    document.body.appendChild(iframe);
  }
  // This line must be, the iframe will be hung on the dom tree to send a request
  // Delete after 5 minutes (onload method does not work for download links, just pick your feet first)
  setTimeout(() => {
    iframe.remove();
  }, 5 * 60 * 1000);
};

const Utils = {
  assign,
  get,
  getVals,
  isObject,
  isArray,
  isDate,
  isString,
  isNum,
  avg,
  median,
  round,
  fmtDecimal,
  parseTime,
  jsDateToStr,
  toJsDate,
  toLocalDate,
  toServerDate,
  addDays,
  addMonths,
  getDateInfo,
  toNum,
  reFmtDate,
  getWeeksOfMonth,
  isEmpty,
  adjustPercField,
  downloadFile,
};

const showError = ({
  errors,
  error,
  summary,
  detail,
  toast,
  t,
  severity,
  sticky,
}: {
  errors?: any[],
  error?: any,
  summary?: string,
  detail?: string,
  toast: any,
  t?: any,
  severity?: string,
  sticky?: boolean,
}) => {
  summary = summary || 'Error';
  severity = severity || 'error';
  let life = 7000;
  sticky = sticky === undefined ? false : sticky;
  if (detail) {
    toast.show({severity, summary, detail, sticky, life});
    return;
  }
  if (errors || error) {
    let err: {[string]: string};
    if (errors) {
      err = errors[0];
    } else if (error) {
      err = error;
    }
    // $FlowFixMe[incompatible-use]
    let {userMsg, message} = err;
    let detail: any = null;
    if (userMsg) {
      detail = userMsg;
    } else if (message) {
      detail = message;
    }
    detail = detail || 'Internal server error';
    if (detail && toast) {
      toast.show({severity, summary, detail, sticky, life});
    }
    return;
  }
};

const showInfo = ({
  summary,
  detail,
  toast,
  sticky,
}: {
  summary?: string,
  detail?: string,
  toast: any,
  sticky?: boolean,
}) => {
  let severity = 'info';
  let life = 7000;
  sticky = sticky === undefined ? false : sticky;
  summary = summary || 'Information';
  if (toast) {
    toast.show({
      severity,
      summary,
      detail,
      life,
      sticky,
    });
  }
};

const showWarning = ({
  summary,
  detail,
  toast,
  sticky,
}: {
  summary?: string,
  detail?: string,
  toast: any,
  sticky?: boolean,
}) => {
  let severity = 'warn';
  let life = 7000;
  sticky = sticky === undefined ? false : sticky;
  summary = summary || 'Warning';
  if (toast) {
    toast.show({
      severity,
      summary,
      detail,
      life,
      sticky,
    });
  }
};

const UIUtils = {showError, showInfo, showWarning};
export {Utils, UIUtils};
