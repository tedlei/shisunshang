<template>
  <div class="content">
    <div style="position: relative;color: #fff">
      <img src="../../../assets/img/icon3.png">
      <span style="position: absolute;left: 50px;transform: translateY(-50%);top: 50%">
        {{orderData.status=='0'?'待付款':orderData.status=='1'?'待发货':orderData.status=='2'?'待收货':orderData.status=='3'?'待评价':'已取消'}}
      </span>
    </div>
    <div class="common_box adress">
      <router-link to="" class="common">
        <div class="left">
          <i class="el-icon-location"></i>
          <span>
            <p>大哥&nbsp;15320495341</p>
            <p style="color:#999999">重庆市&nbsp;江北区&nbsp;五里店</p>
          </span>
        </div>
        <div class="right">
          <i class="el-icon-arrow-right"></i>
        </div>
      </router-link>
    </div>

    <div class="common_box">
      <div to="" class="common m_b_10">
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
      <div class="common goods" v-for="(item,index) of orderData.goods" :key="index">
        <div class="left_img">
          <van-image
            width="0.8rem"
            height="0.8rem"
            fit="cover"
            :src="item.thumb"
          />
        </div>
        <div class="center_text">
          <a href="/goodsdetails/order" class="link_div router-link-active">
            <div class="fontWrap fontWrapTwo">
              {{item.name}}
            </div>
            <div style="color: rgb(153, 153, 153);">
              <span class="fontWrap fontWrapOne">规格：默认
                <!-- {{item.sku}} -->
              </span> 
              <span>数量:
                {{item.num}}
              </span>
            </div>
          </a>
          <div data-v-46727266="" class="right_price">
            ￥{{item.price}}
          </div>
        </div>
      </div>
      
    </div>
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
          <i class="el-icon-service"></i>
          <span>联系客服</span>
        </router-link>
        <router-link to="">
          <i class="el-icon-phone"></i>
          <span>拨打电话</span>
        </router-link>
      </div>
    </div> -->

    <div class="common_box">
      <div class="common">
        <div class="left">
          订单编号：<span style="color:#999999; width: 60%" class="fontWrap fontWrapOne">
            {{orderData.order}}
          </span>...
        </div>
        <div class="clo-g right copy">
          复制
        </div>
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
    
<!--  删除  -->
    <div class="delet" v-if="orderData.status=='0'">
      <div @click="cancelOrder">取消订单</div>
      <div @click="payment">付款</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Orderdetails",
    data() {
      return {
        jsApiParameters: {},
        orderData:{
          invoice_detail: {
            title: ''
          },
          goods:[],
          shop: {}
        }
      }
    },
    methods: {
      //获取订单数据
      getData ( ) {
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
      cancelOrder () {
        let id = this.$route.query.id;
        let ad_data = {
          method: 'cancel.order.item',
          order_id: id
        };
        this.$post('/api/v1/order', ad_data)
        .then((res) => {
          console.log(res) 
          if(res.status==200){
            this.$toast.success('订单已取消');
            // this.getData(1);
            this.$router.back(-1)
          }else{
            this.$toast.success('取消失败');
          }
        }).catch(function (error) {
            console.log(error);
        });
        
      }, 

      //支付
      payment () {
        let _id = this.$route.query.id;
        let ad_data = {
          method: 'continue.buy.order',
          order_id: _id
        }
        this.$post('/api/v1/order', ad_data)
        .then((res) => {
          console.log(res);
          
          if(res.data.is_wx_pay == 1){
            console.log(res.data.payment)
          	this.jsApiParameters = res.data.payment;
            this.callpay();
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
	      			
	      		}else{
              //取消付款跳转
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
    created () {
      console.log(this.$route.query.id)
      if(this.$route.query.id==undefined){
        this.$router.push({path:'/'});
        return;
      }
      this.getData();
    },
  }
</script>

<style scoped lang="scss">
  .content {
    padding-bottom: 50px;
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
        // border-bottom: 1px solid #f2f2f2;
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
    .copy{
      width: 0.5rem ;
      text-align: center;
      border: 1px solid #009900;
      border-radius: 0.05rem;
    }

    .goods {
      display: flex;
      margin: 10px 0;

      .left_img {
        width: 90px;
        margin-right: 10px;
      }

      .center_text {
        width: calc(100% - 90px);
        display: flex;
        padding: 10px 0;

        .link_div {
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-right: 10px;
        }

      }
    }
    .delet{
      width: 100%;
      position: fixed;
      bottom: 0;
      display: flex;
      line-height: 0.45rem;
      color: #fff;
      >div{
        width: 50%;
      }
      >div:first-child{
        background-color: #333333;
      }
      >div:nth-child(2){
        background-color: $sss-color;
      }
    }
  }


</style>
