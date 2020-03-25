<template>
  <div class="content">
    <!--提醒框 -->
    <div class="tips" v-show="isTips">
      <span class="clo-g">应国家快递实名制规定，收件人须填写真实信息。</span>
      <i class="el-icon-circle-close" @click="isTips=!isTips"></i>
    </div>
    <div class="common_box adress">
      <router-link to="/mine/Address" class="common">
        <div class="left">
          <i class="el-icon-location"></i>
          <span>
            <p>大哥&nbsp;15320495341</p>
            <p class="fontWrap fontWrapOne">重庆市&nbsp;江北区&nbsp;五里店</p>
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
      <router-link to="business/storemsg" class="common m_b_10">
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
      <div class="card" v-for="(goods,index1) of shop.goods" :key="index1">
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
          <span class="fontWrap fontWrapOne">规格：
            {{goods.goods_attr}}
          </span>
          <div>￥
            {{goods.price}}
          </div>
          <div class="cardMsgNum">X
            {{goods.total_num}}
          </div>
        </div>
      </div>
    </div>
    <div  class="common_box allmsg">
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
          <span v-if="this.infor == 1">不开具发票</span>
          <span v-else>开具发票</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </router-link>
      <router-link to="" class="common m_b_10">
        <div>签到金</div>
        <div class="right">
          <span class="Check">
            {{orderData.total_qd_price}}
            元</span>
        </div>
      </router-link>
      <a class="common m_b_10">
        <div>充值金</div>
        <div class="right">
          <span style="color:#999999;" class="Check">可使用充值金
            {{orderData.user_qd_money}}
            元</span>
          <van-switch v-model="checked" size="0.2rem" active-color="#009900" inactive-color="#999999"/>
        </div>
      </a>
      <div class="price">
        <div class="left">
          <span>商品金额</span>
          <span class="clo-g">￥
            {{orderData.total_price}}
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
        {{orderData.order_pay_price}}
      </div>
      <div class="right_btn" @click="uploadOrder">
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
                isloading: false,
                goods_id: '',
                goods_num: '',
                goods_sku_id: [],
                infor: 2,
                buy_type: '',
                isTips: true,
                input: '',
                checked: true,
                orderData: {
                    shops: [
                         {  total_num:'',
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
              let ad_data = {
                  method: 'get.buy.goods.now',
                  goods_id: goods_id,
                  goods_num: goods_num,
                  // goods_sku_id: goods_sku_id,
                  buy_type: buy_type,
              };
              this.$post('/api/v1/order', ad_data)
              .then((res) => {
                console.log(res);
                // return false;
                if(res.status==200){
                  this.orderData = res.data;
                }else{
                  this.$router.back(-1);
                  this.$toast(res.message);
                }
              }).catch(function (error) {
                console.log(error);
              });
          },

          //购物车入口跳转获取订单
          getDataTwo () {
              let list = this.$route.query.id
              let ad_data = {
                  method: 'get.buy.goods.cart',
                  goods: list,
              };
              // console.log(ad_data)
              this.$post('/api/v1/order', ad_data)
              .then((res) => {
                  console.log(res);
                  if(res.status==200){
                    this.orderData = res.data;
                    console.log(this.orderData)
                  }else{
                    this.$router.back(-1);
                    this.$toast(res.message);
                  }
              }).catch(function (error) {
                console.log(error);
              });
          },

          //提交订单
          uploadOrder() {
            if(this.$route.query.iscart == 1) {
              this.ploadOrderTwo();
            }else{
                let goods_id = this.$route.query.id;
                let goods_num = this.$route.query.num;
                // let goods_sku_id = this.$route.query.goods_sku_id.join('_');
                let buy_type = this.$route.query.buy_type;
                let address_id = this.orderData.address_default.id;
                let is_cz_price = this.checked ? 1 : 0;
                // console.log(address_id);
                //发票信息
                let invoice_detail = [];
                    invoice_detail['type'] = '1';
                    invoice_detail['title'] = '啊啊';
                    invoice_detail['number'] = '2321321';
                    invoice_detail['company_address'] = '重庆';
                    invoice_detail['conpany_phone'] = '1354578452';
                    invoice_detail['conpany_bank'] = '农业';
                    invoice_detail['conpany_bank_number'] = '重庆';
                let ad_data = {
                    method: "buy.goods.now",
                    goods_id: goods_id,
                    goods_num: goods_num,
                    // goods_sku_id: goods_sku_id,
                    buy_type: buy_type,
                    address_id: address_id,
                    is_cz_price: is_cz_price,
                    remark: this.input,
                    is_invoice: '1',  //发票信息0不要
                    invoice_detail: invoice_detail
                };
                // console.log(ad_data);
                this.isloading = true;
                this.$post('/api/v1/order', ad_data)
                .then((res) => {
                  console.log(res)
                  if (res.status == 200 && res.data.is_wx_pay == 1) {
                    this.isloading = false;
                    if(res.data.is_wx_pay == 1){
                      console.log(res.data.payment)
                    	this.jsApiParameters = res.data.payment;
                      this.callpay();
                    }
                  } else if (res.status == 200 && res.data.is_wx_pay == 0){
                    this.isloading = false;
                    this.$dialog.alert({
                        title: '付款成功',
                        message: '使用充值金付款成功'
                    }).then((res) => {
                        if (res == 'confirm') {
                          this.$router.push({path: '/goodsdetails/order', query: {id: '2'}});
                        }
                    })
                  }else{
                    this.isloading = false;
                    this.$dialog.alert({
                        title: '提交失败',
                        message: '请重新提交'
                    })
                  }
                }).catch(function (error) {
                  console.log(error);
                });
            }
          },

          //购物车提交
          ploadOrderTwo() {
            let is_cz_price = this.checked ? 1 : 0;
            let address_id = this.orderData.address_default.id;
            let invoice_detail = [];
                invoice_detail['type'] = '1';
                invoice_detail['title'] = '啊啊';
                invoice_detail['number'] = '2321321';
                invoice_detail['company_address'] = '重庆';
                invoice_detail['conpany_phone'] = '1354578452';
                invoice_detail['conpany_bank'] = '农业';
                invoice_detail['conpany_bank_number'] = '重庆';
            let ad_data = {
                method: "buy.goods.cart",
                goods: this.$route.query.id,
                address_id: address_id,
                is_cz_price: is_cz_price,
                remark: this.input,
                is_invoice: '1',  //发票信息0不要
                invoice_detail: invoice_detail
            };
            console.log(ad_data)
            this.$post('/api/v1/order', ad_data)
            .then((res) => {
                console.log(res);
                if (res.status == 200 && res.data.is_wx_pay == 1) {
                    this.isloading = false;
                    if(res.data.is_wx_pay == 1){
                      console.log(res.data.payment)
                    	this.jsApiParameters = res.data.payment;
                      this.callpay();
                    }
                  } else if (res.status == 200 && res.data.is_wx_pay == 0){
                    this.isloading = false;
                    this.$dialog.alert({
                        title: '付款成功',
                        message: '使用充值金付款成功'
                    }).then((res) => {
                        if (res == 'confirm') {
                          this.$router.push({path: '/goodsdetails/order', query: {id: '2'}});
                        }
                    })
                  }else{
                    this.isloading = false;
                    this.$dialog.alert({
                        title: '提交失败',
                        message: '请重新提交'
                    })
                  }
            }).catch(function (error) {
              console.log(error);
            });
          },

          jsApiCall(){
	          	WeixinJSBridge.invoke(
	          		'getBrandWCPayRequest',
	          		this.jsApiParameters,
	          		function(res){
	          			if(  res.err_msg.indexOf(":ok")>0 ){
	          				//跳转到支付成功页面
	          				// this.$dialog.alert({
                    //     title: '提交成功',
                    //     message: '请在订单有效时间内前往订单详情页面付款'
                    // }).then((res) => {
                    //     if (res == 'confirm') {
                    //         this.$router.push({path: '/goodsdetails/order', query: {id: '1'}});
                    //     }
                    // })
	          			}else{

                  }
	          		
	          		}
	          	);
	        },

	        callpay(){
		        if (typeof WeixinJSBridge == "undefined"){
		            if( document.addEventListener ){
		                document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);
		            }else if (document.attachEvent){
		                document.attachEvent('WeixinJSBridgeReady', this.jsApiCall); 
		                document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall);
		            }
		        }else{
		            this.jsApiCall();
		        }
	        },
        },
        mounted() {
          // console.log(this.$route.query.id)
          // console.log(this.$route.query.buy_type)
          if(this.$route.query.buy_type){
            this.goods_id = this.$route.query.id;
            this.goods_num = this.$route.query.num;
            // this.goods_sku_id = this.$route.query.goods_sku_id;
            this.buy_type = this.$route.query.buy_type;
            this.getDATA();
            // Bus.$on('info', (data) => {
            //     this.infor = Number(data)
            //     console.log(this.infor)
            // })
          }else{
            this.getDataTwo();
            console.log('购物车')
          }
        },
        created() {

        },

    }
</script>

<style scoped lang="scss">
  .content {
    margin-bottom: 0.45rem;

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
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.1rem 0;
        border-bottom: 1px solid #f2f2f2;
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

</style>
