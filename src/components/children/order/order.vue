<template>
  <div class="orders">
    <van-tabs class="nav" v-model="active" swipe-threshold="3" line-width="calc(29.3333% - 4px)"
              title-active-color="#009900" title-inactive-color="#fff" animated @click="getNum">
      <van-tab v-for="(item,index) in navItems" :key="index" :title="item.text">
        <div class="content" :style="{'height':content_H}">
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="tips"
            @load="onLoad"
            :immediate-check="false"
          >
            <van-row class="introduce_img" :gutter="10">
              <div class="common_boxTwo item" v-for="(items,indexs) in item.wholeData" :key="indexs">
                <!-- 店铺标题 -->
                <div class="title">
                  <div class="left_store">
                    <router-link to="">
                      <img src="../../../assets/img/stoe.png" style="width: 0.18rem">
                      <span class="storename">
                {{items.shop.shop_name}}
              </span>
                    </router-link>
                  </div>
                  <span class="state">
            {{items.status==0?'待付款':items.status==1?'待发货':items.status==2?'待收货':items.status==3?'待评价':''}}
            </span>
                </div>
                <router-link :to="{path:'/goodsdetails/Orderdetails',query: {id: items.id}}"
                             v-for="(goodsItem,index1) in items.goods" :key="index1">
                  <!--商品 卡片 -->
                  <div class="goods">
                    <div class="left_img">
                      <van-image
                        width="1rem"
                        height="1rem"
                        fit="cover"
                        :src="goodsItem.thumb"
                      />
                    </div>
                    <div class="center_text">
                      <div>
                        <div class="goodsItemName">
                          {{goodsItem.name}}
                          <!-- 瀑布流滚动加载，用于展示长列表，当11111列表即将滚动到底部时，会触发事件并加载更多列表项。 -->
                        </div>
                        <div>￥
                          {{goodsItem.price}}
                        </div>
                      </div>
                      <div class="Specifications" style="color: #999999">
                        <!-- <span>规格：默认
                          {{goodsItem.sku}}
                        </span> -->
                        <span>购买方式：
                  {{buy_types[goodsItem.buy_type]}}
                </span>
                        <span>数量：{{goodsItem.num}}</span>
                      </div>
                    </div>
                  </div>

                </router-link>
                <!-- 店铺合计 -->
                <div class="clearfix total_box">
                  <div class="add_time" v-show="numBoder==1">
                    {{items.add_time}}
                  </div>
                  <div class="right_total">
                    <span style="margin-right: 20px">共{{items.goods.length}}件商品</span>
                    <span>合计：￥{{items.total_money}}</span>
                  </div>
                </div>
                <div class="clearfix submit_box">
                  <div class="left_dtime"
                       v-if="num==1 && items.status==0 && new Date(items.add_time).getTime() > new Date().getTime() ||
                       num == 0 && items.status==0 && new Date(items.add_time).getTime() > new Date().getTime()"
                  >
                    剩
                    {{items.add_time | formaTimestamp}}
                    订单关闭
                  </div>

                  <van-row class="btn_box">
                    <van-row>
                      <!-- 待付款 -->
                      <div class="btnDiv" v-show="num==1 && items.status==0 || num == 0 && items.status==0">

                        <router-link
                          :to="{path:'/goodsdetails/Orderdetails',query: {id: items.id}}">
                          <van-button plain type="primary" size="small" color="#009900">订单详情</van-button>
                        </router-link>
                        <van-button type="primary" size="small" color="#009900" @click="payment(items.id)">立即付款
                        </van-button>
                        <van-button plain type="primary" size="small" color="#009900" @click="cancelOrder(items.id,index)">
                          取消订单
                        </van-button>
                      </div>

                      <!--  待发货-->
                      <div v-show="num==2 && items.status==1 || num == 0 && items.status==1">
                        <router-link style="margin-right:0.05rem;"
                                     :to="{path:'/goodsdetails/Orderdetails',query: {id: items.id}}">
                          <van-button plain type="primary" size="small" color="#009900">订单详情</van-button>
                        </router-link>
                        <van-button type="primary" size="small" color="#009900" @click="ReminderShipment(items.id)">
                          提醒发货
                        </van-button>
                      </div>
                      <!--                      待收货-->
                      <div v-show="num==3 && items.status==2||num == 0 && items.status==2">
                        <van-button plain type="primary" size="small" color="#009900"
                                    @click="ViewLogistics(items.postnumber)">
                          查看物流
                        </van-button>
                        <van-button type="primary" size="small" color="#009900" @click="Confirmreceipt(items.id,index)">确认收货
                        </van-button>

                      </div>
                      <!--                      立即评价-->
                      <div v-show="num==4 && items.status==3||num == 0 && items.status==3">
                        <router-link :to="{path:'/goodsdetails/evaluate',query: {id: items.id}}">
                          <van-button plain type="primary" size="small" color="#009900">立即评价</van-button>
                        </router-link>

                      </div>

                    </van-row>

                  </van-row>

                </div>
              </div>
            </van-row>
          </van-list>

          <!--  空  -->
          <Empty v-show="item.wholeData.length > 0 ? false:true"></Empty>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
    import Headerback from "../../headerback/headerback";
    import Empty from "../empty/empty";
    import clientW from "../../../assets/js/conmon"

    export default {
        name: "order",
        components: {Empty, Headerback},
        data() {
            return {
                num: 0,
                numBoder: 0,
                tips: '',
                isKnoorder: false,
                isNoorder: false,
                loading: false,   //是否正在获取数据
                finished: false,   //数据是否获取完成
                active: Number(this.$route.query.orderid), //默认情况下启用第一个标签
                pages: 0,
                flag: true,
                content_H: '',
                jsApiParameters: {},
                is: 'num',
                jsApiParameters: {},
                shouhou: '',
                buy_types: {customer: '顾客购买', vip: '会员购买', retail: '零售专区', shop: '商家专区'},
                navItems: [{text: '全部', wholeData: []}, {text: '待付款', wholeData: []}, {
                    text: '待发货',
                    wholeData: []
                }, {text: '待收货', wholeData: []}, {text: '待评价', wholeData: []}],
                orderAllItem: [],
                wholeData: [],
                oderPay: '',//付款成功跳转传参
            }
        },
        methods: {
            //点击切换
            getNum(index) {
                this.flag = true
                this.num = index;
                this.numBoder = index;
                this.pages = 0;
                this.getOderData(index);
                this.$router.replace({query: {orderid: index}})
            },
            //下拉无限加载
            onLoad() {
                // 异步更新数据
                this.flag = false
                this.getOderData(this.num);
            },
            //订单列表
            async getOderData(index) {
                this.isNoorder = false;
                let _this = this;
                let ad_data = {
                    method: 'get.order.list',
                    page: this.pages,
                    page_size: 20,
                    // type:
                };
                if (index != undefined && index != 0) {
                    ad_data = {
                        method: 'get.order.list',
                        type: index - 1,
                        page: this.pages,
                        page_size: 20,
                    }
                }
                this.$post('/api/v1/order', ad_data)
                    .then((response) => {
                        if (_this.flag) {
                            console.log(index)
                            if (response.status == 200) {
                                this.loading = true;
                                this.finished = true;
                                if (response.data) {
                                    _this.navItems[index].wholeData = response.data;
                                    console.log(_this.navItems[index])
                                    this.pages = response.data.length;

                                } else {
                                    this.list = []
                                    this.finished = true;
                                }
                                // 加载状态结束
                                setTimeout(() => {
                                    this.loading = false;
                                    this.finished = true;
                                }, 1000)
                            } else {
                                _this.$toast(response.message)
                            }
                            _this.tips = ''
                            if (response.data.length == 0) {
                                this.isNoorder = false;
                                this.isKnoorder = true;
                            } else {
                                this.isKnoorder = false;
                                this.isNoorder = true;
                            }
                        } else {
                            if (response.status == 200) {
                                if (response.data) {
                                    _this.navItems[index].wholeData = _this.navItems[index].wholeData.concat(response.data);
                                } else {
                                    this.finished = true;
                                }
                                // 加载状态结束
                                this.loading = false;
                                this.pages += response.data.length;
                                // 数据全部加载完成
                                if (response.data.length < 20) {
                                    _this.tips = '没有更多了'
                                    this.finished = true;
                                }
                            } else {
                                _this.$toast(response.message)
                            }
                        }


                    }).catch(function (error) {
                    console.log(error);
                });
            },

            //取消订单（砍）
            cancelOrder(id,index) {
                let ad_data = {
                    method: 'cancel.order.item',
                    order_id: id
                };

                this.$post('/api/v1/order', ad_data)
                    .then((res) => {
                        console.log(res)
                        if (res.status == 200) {
                            this.$toast.success('订单已取消');
                            this.getOderData(index);
                        } else {
                            this.$toast.success('取消失败');
                        }
                    }).catch(function (error) {
                    console.log(error);
                });
            },

            //付款按钮
            payment(id) {
                let _id = id;
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

            //提醒发货
            ReminderShipment() {
                this.$toast('功能暂未上线')
            },

            //查看物流
            ViewLogistics(id) {
                location.href = "https://m.kuaidi100.com/result.jsp?nu=" + id;
            },
            //确认收货
            Confirmreceipt(id,index) {
                let ad_data = {
                    method: 'confirm.order.goods.item',
                    order_id: id
                }
                this.$post('/api/v1/order', ad_data)
                    .then((res) => {
                        this.getOderData(index);
                    }).catch(function (error) {
                    console.log(error);
                });
            },


        },
        created() {

        },
        mounted() {
            this.content_H = (clientW.clientWw()[1] / clientW.clientWw()[2] - 0.99) * clientW.clientWw()[2] + 'px'
            let Index = this.$route.query.orderid;
            this.num = Index;
            this.getOderData(Index)
            this.is = this.$route.query.orderid == 4 ? 'index' : 'num';



        }
    }
</script>

<style scoped lang="scss">

  .orders {
    position: absolute;
    top: 0.47rem;
    bottom: 0;
    width: 100%;

    > > > .nav {
      .van-tabs__nav {
        background-color: #009900;
      }

      .van-tabs__wrap {
        height: auto;
        padding: 0.1rem;
        background-color: #f2f2f2;
      }

      .van-tab {
        line-height: 0.3rem;
        z-index: 9;
      }

      .van-tabs__nav--line {
        padding-bottom: 0;
        border-radius: 0.3rem;
        border: 1px solid #f2f2f2;
      }

      .van-tabs__line {
        background-color: #fff;
        top: 2px;
        bottom: 2px;
        height: auto;
        border-radius: 0.3rem;
      }

      .van-list {
        padding: 0 0.1rem;
      }
    }

    .content {
      position: relative;
      top: 0;

      .common_boxTwo {
        background-color: #fff;
        padding: 0.1rem 0;
        margin-bottom: 0.1rem;
        border-radius: 5px;
      }

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.1rem;

        .state {
          color: #009900;
        }
      }

      .goods {
        display: flex;
        align-items: center;
        margin: 0.1rem 0;
        padding: 0.1rem;

        .left_img {
          width: 0.9rem;
          margin-right: 0.1rem;
        }

        .center_text {
          width: 100%;
          margin-left: 0.08rem;

          > div:first-child {
            display: flex;
            width: 100%;
            justify-content: space-between;

            .goodsItemName {
              text-align: justify;
              margin-right: 0.1rem;
              flex: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2; //超出几行显示
            }
          }

          .Specifications {
            display: flex;
            text-align: left;
            justify-content: space-between;

            > span:first-child {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1; //超出几行显示
            }
          }
        }
      }

      .total_box {
        margin: 0 0.1rem 0.1rem 0;

        .add_time {
          float: left;
        }

        .right_total {
          float: right;
        }
      }

      .submit_box {
        line-height: 0.4rem;
        margin-right: 0.1rem;

        .left_dtime {
          margin-left: 0.1rem;
          color: #009900;
          float: left;
        }

        .btn_box {
          float: right;

          a {
            display: inline-block;
          }

          .left_s_btn {
            border-color: #009900;
            color: #009900;
          }

          .right_s_btn {
            background-color: #009900;
            color: #fff;
          }
        }
      }
    }
  }


</style>
