export function clientWw() {
  let wd = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  let Hd = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  let clientW = wd <= 320 ? 80 : 100;
  let Arrays = new Array(wd, Hd, clientW);
  return Arrays
};

export default {clientWw}
