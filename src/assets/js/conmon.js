export function clientWw() {
  let wd = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  let clientW = wd <= 320 ? 80 : 100;
  return clientW
};

export default {clientWw}
