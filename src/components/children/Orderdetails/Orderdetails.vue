<template>
  <div class="content">
    <!-- 一楼状态图片 -->
    <div style="position: relative;color: #fff">
      <img src="../../../assets/img/icon3.png">
      <span style="position: absolute;left: 50px;transform: translateY(-50%);top: 50%">
        {{orderData.status=='0'?'待付款':orderData.status=='1'?'待发货':orderData.status=='2'?'待收货':orderData.status=='3'?'待评价':'已取消'}}
      </span>
    </div>
    <!-- 收货地址 -->
    <div class="common_box adress">
      <div class="common">
        <div class="left">
          <van-icon name="location-o"/>
          <span>
            <p>{{orderData.name}}&nbsp;{{orderData.phone}}</p>
            <p style="color:#999999">{{orderData.province}}&nbsp;{{orderData.city}}&nbsp;{{orderData.area}}</p>
            <p style="color:#999999">{{orderData.address}}</p>
          </span>
        </div>
        <div class="right">
          <!-- <van-icon name="arrow" /> -->
        </div>
      </div>
    </div>
    <!-- 店铺商品详情 -->
    <div class="common_box">
      <div to="" class="common m_b_10 common_border">
        <div class="left">
          <img src="../../../assets/img/stoe.png" style="width: 0.18rem">
          <span>
            <p>{{orderData.shop.shop_name}}</p>
          </span>
        </div>
        <div class="clo-g right">
          {{orderData.status=='0'?'待付款':orderData.status=='1'?'待发货':orderData.status=='2'?'待收货':orderData.status=='3'?'待评价':'已取消'}}
        </div>
      </div>
      <div class="common goods " v-for="(item,index) of orderData.goods" @click="tapDetail(item.goods_id)" :key="index">
        <div class="left_img">
          <van-image
            width="0.8rem"
            height="0.8rem"
            fit="cover"
            :src="item.thumb"
          />
        </div>
        <div class="center_text">
          <div class="fontWrap fontWrapTwo">
            {{item.name}}
          </div>
          <div>
            <div style="color: rgb(153, 153, 153);">
              <!-- <span class="fontWrap fontWrapOne">规格：默认
                {{item.sku}}
              </span>  -->
              <span class="fontWrap fontWrapOne">购买方式：
                  {{buy_types[item.buy_type]}}
                </span>
              <span>数量:
                  {{item.num}}
                </span>
            </div>
            <div class="right_price">
              ￥{{item.price}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 配速方式 -->
    <div class="common_box">
      <div class="common">
        <div class="left">
          配速方式
        </div>
        <div class="right">
          物流配送
        </div>
      </div>
    </div>
    <!-- 发票信息 -->
    <div class="common_box">
      <div class="common m_b_10">
        <div>发票信息</div>
        <div class="right">
          <span style="color: #ff0000;margin-right: 10px">{{orderData.is_invoice==0?'未开具发票':orderData.invoice_detail.title}}</span>
          <span>
            <!-- {{}} -->
          </span>
        </div>
      </div>
    </div>
    <!-- 商品费用算法 -->
    <div class="common_box">
      <div class="common">
        <div class="left">
          商品总额
        </div>
        <div style="color:#009900;" class="right">
          ￥
          {{orderData.total_goods_money}}
        </div>
      </div>
      <div class="common">
        <div class="left">
          配送费
        </div>
        <div class="right">
          +￥
          {{orderData.total_postage}}
        </div>
      </div>
      <div class="common">
        <div class="left">
          保价费
        </div>
        <div class="right">
          +￥
          {{orderData.total_offer_money}}
        </div>
      </div>
      <div class="common">
        <div class="left">
          充值金
        </div>
        <div class="right">
          -￥
          {{orderData.pay_cz_money}}
        </div>
      </div>
      <div class="common">
        <div class="left">
          待付款金额
        </div>
        <div style="color:#009900" class="right">
          ￥
          {{orderData.total_money}}
        </div>
      </div>
      <div class="common">
        <div class="left">
          签到金
        </div>
        <div class="right">
          ￥
          {{orderData.total_qd_money}}
        </div>
      </div>
    </div>
    <!-- <div class="common_box">
      <div class="common service">
        <router-link to="">
          <span>联系客服</span>
        </router-link>
        <router-link to="">
        </router-link>
      </div>
    </div> -->
    <!-- 订单描述.. -->
    <div class="common_box">
      <div class="common">
        <div class="left">
          订单编号：<span style="color:#999999; width: 70%" class="fontWrap fontWrapOne">
            {{orderData.order}}
          </span>...
        </div>
        <!-- <div class="clo-g right copy">
          复制
        </div> -->
      </div>
      <div class="common">
        <div class="left">
          创建时间：<span style="color:#999999">
            {{orderData.add_time}}
          </span>
        </div>
      </div>
      <div class="common">
        <div class="left">
          支付方式：<span style="color:#999999">
            {{orderData.paytype}}
          </span>
        </div>
      </div>
      <div class="common">
        <div class="left">
          买家留言：<span style="color:#999999">
            {{orderData.remark}}
          </span>
        </div>
      </div>
    </div>
    <!--  待付款取消订单和付款  -->
    <div class="delet" v-if="orderData.status=='0'">
      <div @click="cancelOrder">取消订单</div>
      <div @click="payment">付款</div>
    </div>
    <div class="hrDiv" v-if="orderData.status=='0'"></div>
  </div>
</template>

<script>
    export default {
        name: "Orderdetails",
        data() {
            return {
                jsApiParameters: {},
                buy_types: {customer: '顾客购买', vip: '会员购买', retail: '零售专区', shop: '商家专区'},
                orderData: {
                    invoice_detail: {
                        title: ''
                    },
                    goods: [],
                    shop: {}
                },
                oderPay: '',//付款成功跳转传参
            }
        },
        methods: {
            //获取订单数据
            getData() {
                let _id = this.$route.query.id;
                let ad_data = {
                    method: 'get.order.item',
                    order_id: _id
                };
                this.$post('/api/v1/order', ad_data)
                    .then((res) => {
                        console.log(res)
                        this.orderData = res.data;
                    }).catch(function (error) {
                    console.log(error);
                });
            },

            //取消订单
            cancelOrder() {
                let id = this.$route.query.id;
                let ad_data = {
                    method: 'cancel.order.item',
                    order_id: id
                };
                this.$post('/api/v1/order', ad_data)
                    .then((res) => {
                        console.log(res)
                        if (res.status == 200) {
                            this.$toast.success('订单已取消');
                            // this.getData(1);
                            this.$router.back(-1)
                        } else {
                            this.$toast.success('取消失败');
                        }
                    }).catch(function (error) {
                    console.log(error);
                });

            },

            //付款
            payment() {
                let _id = this.$route.query.id;
                let ad_data = {
                    method: 'continue.buy.order',
                    order_id: _id
                }
                this.$post('/api/v1/order', ad_data)
                    .then((res) => {
                        console.log(res);
                        if (res.data.is_wx_pay == 1) {
                            console.log(res.data.payment)
                            this.jsApiParameters = res.data.payment;
                            this.oderPay = res.data.pay_no;
                            this.callpay();
                        }
                    }).catch(function (error) {
                    console.log(error);
                });
            },

            //微信支付
            jsApiCall() {
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    this.jsApiParameters,
                    function (res) {
                        if (res.err_msg.indexOf(":ok") > 0) {
                            //跳转到支付成功页面
                            this.$router.push({path: '/goodsdetails/successfulPayment', query: {id: this.oderPay}});
                        } else {
                            //取消付款跳转
                        }
                    }
                );
            },
            callpay() {
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', this.jsApiCall);
                        document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall);
                    }
                } else {
                    this.jsApiCall();
                }
            },

            //跳转到详情
            tapDetail(id) {
                this.$router.push('/goodsdetails?id=' + id);
            }
        },
        created() {
            // console.log(this.$route.query.id)
            if (this.$route.query.id == undefined) {
                this.$router.push({path: '/'});
                return;
            }
            this.getData();
        },
    }
</script>

<style scoped lang="scss">
  .content {
    padding-bottom: 0.2rem;

    .hrDiv {
      height: 0.3rem;
    }

    i {
      font-size: 0.18rem;
    }

    .common_box {
      text-align: left;
      padding: 0.1rem 0;

      .common {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.1rem 0.05rem 0.1rem;
      }

      .common_border {
        border-bottom: 1px solid #f2f2f2;
      }

      .left {
        display: flex;
        align-items: center;

        i, img {
          margin-right: 10px;
          color: #999999;
        }

      }

      .right {
        i {
          color: #999999;
        }

      }

    }

    .service {
      a {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          margin-right: 5px;
          color: #999999;
        }
      }
    }

    .copy {
      width: 0.5rem;
      text-align: center;
      border: 1px solid #009900;
      border-radius: 0.05rem;
    }

    .goods {
      display: flex;

      .left_img {
        width: 90px;
        margin-right: 10px;
      }

      .center_text {
        width: calc(100% - 90px);

        > div:first-child {
          height: 0.4rem;
        }

        > div:nth-child(2) {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          .right_price {
            text-align: right;
          }
        }

      }
    }

    .delet {
      width: 100%;
      position: fixed;
      bottom: 0;
      display: flex;
      line-height: 0.45rem;
      color: #fff;

      > div {
        width: 50%;
      }

      > div:first-child {
        background-color: #333333;
      }

      > div:nth-child(2) {
        background-color: $sss-color;
      }
    }
  }


</style>
