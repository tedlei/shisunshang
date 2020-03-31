<template>
  <div class="content">
    <div class="Recharge_box">
      <ul>
        <li v-for="(item,index) in lists" :key="index">
          <img :src="require('../../../assets/img/recharge_icon'+(Number(index)+1)+'.png')" class="icon">
          <div class="Recharge_msg">
            <div class="text1">
              <strong>充值￥{{item.money}}</strong>
              <span :class="'clo' + index">限充{{item.xc_num}}次</span>
            </div>
            <div class="text2">

              <img :src="require('../../../assets/img/recharge_z'+(Number(index)+1)+'.png')" class="icon2">
              <span>
                <div>送{{item.give_money}}元，签到金实际到账{{item.money+item.give_money}}元</div>
                <div v-if="item.give_goods !=''">送{{item.give_goods}}</div>
              </span>
            </div>
          </div>
          <img :src="item.rechargebtn" class="icon3"
               @click="pay(index)">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Recharge",
        data() {
            return {
                lists: [
                    {
                        rechargebtn: ''
                    }
                ],
            }
        },
        methods: {
            getlist: function () {
                let _this = this
                let msg = {
                    method: 'get.qd.recharge.list'
                }
                this.$post('/api/v1/UserRecharge', msg)
                    .then((response) => {
                        for (let i in response.data) {
                            response.data[i].rechargebtn = require('../../../assets/img/recharge_btn' + (Number(i) + 1) + '.png')
                        }
                        console.log(response.data)
                        _this.lists = response.data;

                    }).catch(function (error) {
                    console.log(error);
                });
            },
            pay: function (e) {
                let _this = this
                let jsApiParameters = {};
                let msg = {
                    method: 'add.recharge.qd.item',
                    id: e
                };
                this.$post('/api/v1/UserRecharge', msg)
                    .then((response) => {
                        if (response.status == 200) {
                            jsApiParameters = response.data.payment;
                            callpay();
                        } else {

                        }
                        console.log(response)
                    }).catch(function (error) {
                    console.log(error);
                });

                //调用微信JS api 支付
                function jsApiCall() {

                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest',
                        jsApiParameters,
                        function (res) {
                            if (res.err_msg = "get_brand_wcpay_request:ok") {
                                //跳转到支付成功页面
                                alert("支付成功");
                            } else if (res.err_msg = "get_brand_wcpay_request:fail") {
                                alert("支付失败");
                            }

                        }
                    );
                }

                function callpay() {
                    console.log(WeixinJSBridge)
                    if (typeof WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                            document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                        }
                    } else {
                        jsApiCall();
                    }
                }
            }
        },
        mounted() {
            this.getlist()
        }
    }
</script>

<style scoped lang="scss">
  .content {
    .Recharge_box ul {
      padding: 0 0.1rem;

      li {
        margin-top: 0.33rem;
        position: relative;
        background-color: #fff;
        border-radius: 4px;
        padding: 0.05rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .icon {
          position: absolute;
          left: 0.2rem;
          width: 0.3rem;
          top: -0.13rem;
        }

        .Recharge_msg {
          padding-left: 0.15rem;
          text-align: left;

          .text1 {
            margin-bottom: 0.05rem;
            font-size: 0.16rem;

            strong {
              margin-right: 0.1rem;
            }

            .clo0 {
              color: #ff5e6c;
            }

            .clo1 {
              color: #ffc76e;
            }

            .clo2 {
              color: #c562fe;
            }

            .clo3 {
              color: #ff4f89;
            }
          }

          .text2 {
            font-size: 0.12rem;
            display: flex;
            align-items: self-start;

            .icon2 {
              width: 0.16rem;
              margin-right: 0.05rem;
            }
          }

        }

        .icon3 {
          width: 1.2rem;
        }
      }
    }
  }
</style>
