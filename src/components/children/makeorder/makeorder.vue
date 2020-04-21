<template>
  <div class="content">
    <!--提醒框 -->
    <div
      class="tips"
      v-show="orderData.address_default=='' && $store.getters.getreceivingAddress.name==undefined && isTips"
    >
      <span class="clo-g">应国家快递实名制规定，收件人须填写真实信息。</span>
      <i class="el-icon-circle-close" @click="isTips=!isTips"></i>
    </div>
    <!--  地址  -->
    <div class="common_box adress">
      <router-link :to="{path:'/mine/Address',query:{id: 'makeorder'}}" class="common commonTwo">
        <div class="left">
          <i style="margin-top:0.15rem" class="el-icon-location"></i>
          <span>
            <!-- {{$store.getters.getreceivingAddress.name?'有':orderData.address_default}} -->
            <p style="color:red"
               v-if="orderData.address_default=='' && $store.getters.getreceivingAddress.name==undefined">请选择收货地址</p>
            <p v-else-if="orderData.address_default!=''">
              {{$store.getters.getreceivingAddress.name?$store.getters.getreceivingAddress.name:
              orderData==''?'':orderData.address_default.name}}&nbsp;
              {{$store.getters.getreceivingAddress.name?$store.getters.getreceivingAddress.phone:
              orderData==''?'':orderData.address_default.phone}}
            </p>
            <p v-if="orderData.address_default!=''" class="fontWrap fontWrapOne">
              {{$store.getters.getreceivingAddress.name?$store.getters.getreceivingAddress.province:
              orderData==''?'':orderData.address_default.province}}&nbsp;
              {{$store.getters.getreceivingAddress.name?$store.getters.getreceivingAddress.city:
              orderData==''?'':orderData.address_default.city}}&nbsp;
              {{$store.getters.getreceivingAddress.name?$store.getters.getreceivingAddress.area:
              orderData==''?'':orderData.address_default.area}}&nbsp;
              {{$store.getters.getreceivingAddress.name?$store.getters.getreceivingAddress.address:
              orderData==''?'':orderData.address_default.address}}
            </p>
          </span>
        </div>
        <div class="right">
          <i class="el-icon-arrow-right"></i>
        </div>
      </router-link>
    </div>

    <!-- 商品详情 -->
    <div class="common_box allmsg" v-for="(shop,index) in orderData.shops" :key="index">
      <!-- 店铺名称 -->
      <router-link :to="{path:'/storeDetails',query:{id: shop.id}}" class="common m_b_10">
        <div class="left">
          <img src="../../../assets/img/stoe.png" style="width: 18px">
          <span>
            <p class="fontWrap fontWrapOne">
              {{shop.shop.shop_name}}
            </p>
          </span>
        </div>
        <div class="right">
          <i class="el-icon-arrow-right"></i>
        </div>
      </router-link>
      <!-- 商品卡片 -->
      <router-link :to="{path:'/goodsdetails',query:{id: goods.id}}"
                   v-for="(goods,index1) of shop.goods" :key="index1">
        <div class="card">
          <van-image
            width="1rem"
            height="1rem"
            fit="cover"
            :src="goods.imgsrc"
          />
          <div class="cardMsg">
            <p class="fontWrap fontWrapTwo">
              {{goods.name}}
            </p>
            <span class="fontWrap fontWrapOne">购买方式：
            {{buy_types[goods.buy_type]}}
          </span>
            <div>￥
              {{goods.price}}
            </div>
            <div class="cardMsgNum">X
              {{goods.total_num}}
            </div>
          </div>
        </div>
      </router-link>
      <div class="price">
        <div class="left">
          <span>商品金额</span>
          <span class="clo-g shopgoodman">￥
            {{orderData.shops[index].total_goods_money_old}}
          </span>
        </div>
        <div class="right">
          <span>签到金</span>
          <span style="color:#0f0f0f !important;" class="clo-g">￥
            {{orderData.shops[index].total_qd_money}}
          </span>
        </div>
        <div class="right">
          <span>充值金</span>
          <span class="clo-g">+￥
            {{orderData.shops[index].total_goods_money}}
          </span>
        </div>
        <div class="right">
          <span>保价金</span>
          <span class="clo-g">+￥
            {{orderData.shops[index].total_offer_money}}
          </span>
        </div>
        <div class="right">
          <span>运费</span>
          <span class="clo-g">+￥
            {{orderData.shops[index].total_postage}}
          </span>
        </div>

        <div class="" style="text-align: right;border-top: 1px solid #f2f2f2">
          <span style="font-weight: bold">小计:</span>
          <span class="">￥
            {{orderData.shops[index].total_postage + orderData.shops[index].total_offer_money+orderData.shops[index].total_goods_money}}
          </span>
        </div>

      </div>
    </div>
    <div style="padding-bottom: 0.5rem;" class="common_box allmsg">
      <div class="common delivery">
        <div class="left">
          配速方式
        </div>
        <div class="right">
          物流配送
        </div>
      </div>
      <div class="common liuyan">
        <div style="width: max-content;min-width: 70px;">买家留言：</div>
        <van-field v-model="input" placeholder="(选填)可输入20字买家留言"/>
      </div>
      <router-link
        :to="{path:'/mine/invoice',query:{state:'0'}}"
        class="common m_b_10">
        <div>发票信息</div>
        <div class="right">
          <!-- <span v-if="this.infor == 1">不开具发票</span> -->
          <span v-if="this.infor == 1">不开具发票</span>
          <span v-else>{{$store.getters.getinvoice.title}}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </router-link>
      <!-- <div v-show='$store.state.IvcMsg!=1' style="color:rgb(153, 153, 153);" class="common m_b_10">
        <div>发票抬头名称：</div>
        <div class="right"></div>
      </div> -->
      <a class="common m_b_10">
        <div>充值金</div>
        <div class="right">
          <span style="color:#999999;" class="Check">可使用充值金
            {{parseFloat(orderData.user_money).toFixed(2)}}
            <!-- {{orderData.user_money='0.00'?'我是0':'bushi'}} -->
            元
          </span>
          <van-switch v-show="orderData.user_money>0?true:false"
                      v-model="checked"
                      size="0.2rem"
                      active-color="#009900"
                      inactive-color="#999999"/>
        </div>
      </a>
      <div class="price">
        <div class="left">
          <span>商品金额</span>
          <span class="clo-g shopgoodman">￥
            {{orderData.total_price_old}}
          </span>
        </div>
        <div class="right">
          <span>签到金</span>
          <span style="color:#0f0f0f !important;" class="clo-g">￥
            {{orderData.total_qd_price}}
          </span>
        </div>
        <div class="right">
          <span>充值金</span>
          <span class="clo-g">+￥
            {{orderData.total_price}}
          </span>
        </div>
        <div class="right">
          <span>保价金</span>
          <span class="clo-g">+￥
            {{orderData.total_offer_price}}
          </span>
        </div>
        <div class="right">
          <span>运费</span>
          <span class="clo-g">+￥
            {{orderData.total_postage}}
          </span>
        </div>

      </div>
    </div>
    <!--  底部提交  -->
    <div class="clearfix bot_submit">
      <div class="left_text">实付款：￥
        {{!checked?orderData.order_pay_price:orderData.user_money>=orderData.order_pay_price?0:orderData.order_pay_price-orderData.user_money}}
      </div>
      <div class="right_btn" @click="useSingin">
        提交订单
      </div>
    </div>
    <loading v-show="isloading"></loading>
  </div>
</template>

<script>
    import loading from "../../loading/loading";
    import Bus from "../../../assets/js/bus";

    export default {
        name: "makeorder",
        components: {
            loading,
        },
        data() {
            return {
                activeNames: ['1'],
                isloading: false,
                goods_id: '',
                goods_num: '',
                goods_sku_id: [],
                buy_types: {customer: '顾客购买', vip: '会员购买', retail: '零售专区', shop: '商家专区'},
                infor: this.$store.state.IvcMsg,
                buy_type: '',
                isTips: true,
                input: '',
                checked: false,
                orderData: {
                    address_default: {
                        name: ''
                    },
                    shops: [
                        {
                            total_num: '',
                            goods: [
                                {
                                    id: '',
                                    name: '',
                                    goods_sku: {
                                        goods_attr: ''
                                    }
                                },
                            ],
                            shop: {
                                shop_name: ''
                            }
                        }
                    ]
                },
                oderPay: '',
            }
        },
        computed: {},
        methods: {
            //获取订单
            getDATA() {
                let goods_id = this.$route.query.id;
                let goods_num = this.$route.query.num;
                // let goods_sku_id = this.$route.query.goods_sku_id.join('_');
                let buy_type = this.$route.query.buy_type;
                let address_id = this.$store.getters.getreceivingAddress.id;
                let ad_data = {
                    method: 'get.buy.goods.now',
                    goods_id: goods_id,
                    goods_num: goods_num,
                    // goods_sku_id: goods_sku_id,
                    buy_type: buy_type,
                    address_id: address_id ? address_id : 0,
                };
                this.$post('/api/v1/order', ad_data)
                    .then((res) => {
                        // console.log(res);
                        // return false;
                        if (res.status == 200) {
                            this.orderData = res.data;

                        } else {
                            this.$router.back(-1);
                            this.$toast(res.message);
                        }
                    }).catch(function (error) {
                    console.log(error);
                });
            },

            //购物车入口跳转获取订单
            getDataTwo() {
                let list = this.$route.query.id;
                let address_id = this.$store.getters.getreceivingAddress.id;
                let ad_data = {
                    method: 'get.buy.goods.cart',
                    goods: list,
                    address_id: address_id ? address_id : 0,
                };
                // console.log(ad_data)
                this.$post('/api/v1/order', ad_data)
                    .then((res) => {
                        console.log(res);
                        if (res.status == 200) {
                            this.orderData = res.data;
                            // console.log(this.orderData)
                        } else {
                            this.$router.back(-1);
                            this.$toast(res.message);
                        }
                    }).catch(function (error) {
                    console.log(error);
                });
            },

            //是否使用签到金
            useSingin() {
                let orderData = parseFloat(this.orderData.user_money)
                if (orderData > 0) {
                    this.$dialog.confirm({
                        message: '有可使用充值金,是否使用'
                    })
                        .then(() => {
                            setTimeout(() => {
                                this.checked = true;
                                this.uploadOrder()
                            }, 100);
                        })
                        .catch(() => {
                            this.uploadOrder()
                        });

                } else this.uploadOrder()
            },

            //提交订单
            uploadOrder() {
                if (this.$route.query.iscart == 1) {
                    this.ploadOrderTwo();
                } else {
                    let goods_id = this.$route.query.id;
                    let goods_num = this.$route.query.num;
                    // let goods_sku_id = this.$route.query.goods_sku_id.join('_');
                    let buy_type = this.$route.query.buy_type;
                    let address_id = this.$store.getters.getreceivingAddress.id ? this.$store.getters.getreceivingAddress.id : this.orderData.address_default.id;
                    let is_cz_price = this.checked ? 1 : 0;
                    // console.log(address_id);
                    //发票信息
                    let invoice = this.$store.getters.getinvoice;
                    let invoice_detail = [];
                    if (invoice.type == '2') {
                        invoice_detail['type'] = invoice.type;
                        invoice_detail['title'] = invoice.title;
                    } else {
                        invoice_detail['type'] = invoice.type;
                        invoice_detail['title'] = invoice.title;
                        invoice_detail['number'] = invoice.number;
                        invoice_detail['company_address'] = invoice.company_address;
                        invoice_detail['conpany_phone'] = invoice.conpany_phone;
                        invoice_detail['conpany_bank'] = invoice.conpany_bank;
                        invoice_detail['conpany_bank_number'] = invoice.conpany_bank_number;
                    }
                    let ad_data = {
                        method: "buy.goods.now",
                        goods_id: goods_id,
                        goods_num: goods_num,
                        // goods_sku_id: goods_sku_id,
                        buy_type: buy_type,
                        address_id: address_id,
                        is_cz_price: is_cz_price,
                        remark: this.input,
                        is_invoice: this.$store.state.IvcMsg == 1 ? '0' : '1',  //发票信息0不要
                        invoice_detail: this.$store.state.IvcMsg == 1 ? [] : invoice_detail
                    };
                    // console.log(ad_data);
                    // return;
                    this.isloading = true;
                    this.$post('/api/v1/order', ad_data)
                        .then((res) => {
                            console.log(res)
                            if (res.status == 200 && res.data.is_wx_pay == 1) {
                                this.isloading = false;
                                if (res.data.is_wx_pay == 1) {
                                    console.log(res.data.payment)
                                    this.jsApiParameters = res.data.payment;
                                    this.oderPay = res.data.pay_no;
                                    this.callpay();
                                }
                            } else if (res.status == 200 && res.data.is_wx_pay == 0) {
                                this.isloading = false;
                                this.$dialog.alert({
                                    title: '付款成功',
                                    message: '使用充值金付款成功'
                                }).then((res) => {
                                    if (res == 'confirm') {
                                        this.$router.push({path: '/goodsdetails/order', query: {orderid: '2'}});
                                    }
                                })
                            } else {
                                this.isloading = false;
                                // this.$dialog.alert({
                                //     title: '提交失败',
                                //     message: res.message
                                // })
                            }
                        }).catch(function (error) {
                        console.log(error);
                    });
                }
            },

            //购物车订单提交
            ploadOrderTwo() {
                let is_cz_price = this.checked ? 1 : 0;
                let address_id = this.$store.getters.getreceivingAddress.id ? this.$store.getters.getreceivingAddress.id : this.orderData.address_default.id;
                let invoice_detail = [];
                let invoice = this.$store.getters.getinvoice;
                // console.log(invoice);
                if (invoice.type == '2') {
                    invoice_detail['type'] = invoice.type;
                    invoice_detail['title'] = invoice.title;
                } else {
                    invoice_detail['type'] = invoice.type;
                    invoice_detail['title'] = invoice.title;
                    invoice_detail['number'] = invoice.number;
                    invoice_detail['company_address'] = invoice.company_address;
                    invoice_detail['conpany_phone'] = invoice.conpany_phone;
                    invoice_detail['conpany_bank'] = invoice.conpany_bank;
                    invoice_detail['conpany_bank_number'] = invoice.conpany_bank_number;
                }
                let ad_data = {
                    method: "buy.goods.cart",
                    goods: this.$route.query.id,
                    address_id: address_id,
                    is_cz_price: is_cz_price,//is_qd_price
                    remark: this.input,
                    is_invoice: this.$store.state.IvcMsg == 1 ? '0' : '1',  //发票信息0不要
                    invoice_detail: this.$store.state.IvcMsg == 1 ? [] : invoice_detail
                };
                // console.log(ad_data)
                this.$post('/api/v1/order', ad_data)
                    .then((res) => {
                        console.log(res);
                        if (res.status == 200 && res.data.is_wx_pay == 1) {
                            this.isloading = false;
                            if (res.data.is_wx_pay == 1) {
                                console.log(res.data.payment)
                                this.jsApiParameters = res.data.payment;
                                this.callpay();
                            }
                        } else if (res.status == 200 && res.data.is_wx_pay == 0) {
                            this.isloading = false;
                            this.$dialog.alert({
                                title: '付款成功',
                                message: '使用充值金付款成功'
                            }).then((res) => {
                                if (res == 'confirm') {
                                    this.$router.push({path: '/goodsdetails/order', query: {orderid: '2'}});
                                }
                            })
                        } else {
                            this.isloading = false;
                            // this.$dialog.alert({
                            //     title: '提交失败',
                            //     message: '请重新提交'
                            // })
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
                    (res) => {
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            //跳转到支付成功页面
                            this.$router.push({path: '/goodsdetails/successfulPayment', query: {id: this.oderPay}});
                        } else {
                            this.$router.push({path: '/goodsdetails/order', query: {orderid: '1'}});
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
        },
        mounted() {
            // console.log(this.$route.query.id)
            if (this.$route.query.buy_type) {
                this.goods_id = this.$route.query.id;
                this.goods_num = this.$route.query.num;
                this.buy_type = this.$route.query.buy_type;
                this.getDATA();
            } else {
                this.getDataTwo();
                // console.log('购物车')
            }
        },
        created() {
            console.log(this.$store.state.IvcMsg);
            // console.log(this.$store.getters.getreceivingAddress.id)
        },

    }
</script>

<style scoped lang="scss">
  .content {
    i {
      font-size: 0.18rem;
    }

    .tips {
      padding: 0 0.1rem;
      background-color: #ffebea;
      display: flex;
      justify-content: space-between;
      /*align-items: center;*/
      line-height: 0.4rem;

      i {
        line-height: 0.4rem;
        color: #999999;
      }
    }

    .common_box {
      text-align: left;

      .common {
        border-bottom: 1px solid #f2f2f2;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.1rem 0;
      }

      .commonTwo {
        border: 0;
      }

      .left {
        display: flex;
        align-items: center;

        i, img {
          margin-right: 0.1rem;
          color: #999999;
        }

      }

      .right {
        i {
          color: #999999;
        }
      }
    }

    .liuyan .el-input /deep/ input {
      background: none;
    }

    .price {
      padding: 0.1rem 0;

      .left, .right {
        display: flex;
        justify-content: space-between;
      }
    }

    .bot_submit {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 50;
      line-height: 0.45rem;
      color: #ffff;

      .left_text {
        padding-left: 0.1rem;
        background-color: #333;
        float: left;
        width: 50%;
        text-align: left;
      }

      .right_btn {
        background-color: #009900;
        float: right;
        width: 50%;
      }
    }

  }

  .card {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0.05rem 0;

    .cardMsg {
      width: 70%;
      position: relative;
      margin-left: 0.05rem;

      > span {
        display: block;
        margin: 0.05rem 0 0.13rem 0;
        color: #999999;
        font-size: 0.12rem;
      }

      .cardMsgNum {
        position: absolute;
        right: 0;
        color: #999999;
        bottom: -0.07rem;
      }

      > div:nth-child(3) {
        color: $sss-color;
      }
    }
  }

  .Check {
    display: inline-block;
    font-size: 0.14rem;
    // transform: scale(0.95);
  }

  .shopgoodman {
    text-decoration: line-through;
    color: #999999 !important;
  }
</style>
