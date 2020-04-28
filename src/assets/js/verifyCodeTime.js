import Vue from 'vue'
import hint from '../../components/pages_lm/hint/hint.vue'
import inputH from '../../components/pages_lm/inputHint/inputHint.vue'
import mapLoca from '../../components/pages_lm/mapLocaSel/mapLocaSel.vue'
import { get } from '../../api/https.js'
import wx from 'weixin-js-sdk'
const Hint = Vue.extend(hint)
const InputH = Vue.extend(inputH)
const MapLoca = Vue.extend(mapLoca)

let Api = {
    //初始化
    init() {
        this.prototype.codeTime = Api.codeTime;
        this.prototype.verifyCardCode = Api.verifyCardCode;
        this.prototype.verifyName = Api.verifyName;
        this.prototype.verifyPhone = Api.verifyPhone;
        this.prototype.verifyCode = Api.verifyCode;
        this.prototype.tc = Api.tc;
        this.prototype.inputHint = Api.inputHint;
        this.prototype.getLocation = Api.getLocation;
        this.prototype.mapLocaSel = Api.mapLocaSel;

    },
    setItem(name, value) {
        let type = typeof value;
        if (type === 'object' && !value) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(name, value);
    },
    getItem(name) {
        return localStorage.getItem(name);
    },

    //获取验证码时间
    codeTime(itemNum, isTime, fn) {
        if (fn && this[itemNum] > 0) return;
        let endItem = Api.getItem('endItem');
        let item = new Date().getTime();
        let num = 60;
        endItem = endItem ? endItem : 0;
        if (!fn) num = 0;
        if (item < endItem) num = Math.ceil((endItem - item) / 1000);
        if (num >= 60) {
            Api.setItem('endItem', item + 60000);
            fn();
        }
        let seti = setInterval(() => {
            if (!this[isTime]) {
                num = 0;
                Api.setItem('endItem', 0);
                this[isTime] = true;
            }
            this[itemNum] = num;
            if (num <= 0) {
                clearInterval(seti);
            }
            num--;
        }, 1000);
    },

    //验证身份证
    verifyCardCode(value) {
        let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
        return idcardReg.test(value)
    },

    //验证姓名
    verifyName(value) {
        var idcard = /^[\u4e00-\u9fa5]{2,6}$/;
        return idcard.test(value);
    },

    //验证手机号
    verifyPhone(value) {
        var idcard = /^1[3456789]\d{9}$/;
        return idcard.test(value);
    },

    //验证验证码
    verifyCode(value) {
        var idcard = /^\d{6}$/;
        return idcard.test(value);
    },

    tc(message, type = 'fail', duration = 1500) {
        if (message.length > 27) message = message.slice(0, 25) + '…';
        const toastDom = new Hint({
            el: document.createElement('hint'),
            data() {
                return {
                    text: message,
                    type,
                    show: true
                }
            }
        })
        // 把 实例化的 toast.vue 添加到 body 里
        document.body.appendChild(toastDom.$el)
        // 过了 duration 时间后隐藏
        setTimeout(() => { toastDom.show = false }, duration)
    },

    /**
     * 
     * @param {*回调函数} obj 
     * @param {*最大值} max 
     * @param {*最小值} min 
     */
    inputHint(obj, max, min) {
        const toastDom = new InputH({
            el: document.createElement('inputId'),
            data() {
                return {
                    show: true,
                    value: '',
                    max: max ? max : 1,   //最大值
                    min: min ? min : 0,   //最小值
                    obj   //回调
                }
            }
        })
        // // 把 实例化的 toast.vue 添加到 body 里
        document.body.appendChild(toastDom.$el)
    },

    //地图位置点选
    mapLocaSel(fun){
        const toastDom = new MapLoca({
            el: document.createElement('mapLoca'),
            data() {
                return {
                    show: true,
                    fun   //回调函数
                }
            }
        })
        // // 把 实例化的 toast.vue 添加到 body 里
        document.body.appendChild(toastDom.$el)
    },

    //获取当前位置
    async getLocation(fun, boo) {
        let href = location.href;
        let arr = href.split('/')
        let url = arr[0] + '//' + arr[2]
        let data = await get("wxshare/wxconfig/myapi.php?urlparam=" + encodeURIComponent(url))
        let authRes = data.data;
        wx.config({
            debug: false,
            appId: authRes.appId,
            timestamp: authRes.timestamp,
            nonceStr: authRes.nonceStr,
            signature: authRes.signature,
            jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareAppMessage", "onMenuShareTimeline", "getLocation", 'openLocation']
        });
        wx.ready(() => {
            wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    console.log(res,13243654365465)
                    if (!boo) fun(res)
                    else {
                        wx.openLocation({
                            latitude: res.latitude, // 纬度，浮点数，范围为90 ~ -90
                            longitude: res.location, // 经度，浮点数，范围为180 ~ -180。
                            name: '', // 位置名
                            address: '', // 地址详情说明
                            scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
                            infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                        })
                    }
                },
                fail: function (err) {
                    fun(null);
                }


            });
        })
    }
}



export { Api }