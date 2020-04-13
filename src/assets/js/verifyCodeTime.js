import Vue from 'vue'
import hint from '../../components/pages_lm/hint/hint.vue'
const Hint = Vue.extend(hint)

let Api = {
    //初始化
    init() {
        this.prototype.codeTime = Api.codeTime;
        this.prototype.verifyCardCode = Api.verifyCardCode;
        this.prototype.verifyName = Api.verifyName;
        this.prototype.verifyPhone = Api.verifyPhone;
        this.prototype.verifyCode = Api.verifyCode;
        this.prototype.tc = Api.tc;
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
    codeTime(itemNum,isTime, fn) {
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
            if(!this[isTime]) {
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
        let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
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

    }
}

export { Api }