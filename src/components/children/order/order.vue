<template>
  <div>
    <div class="navigation" v-show="this.$route.query.orderid != 4">
      <ul class="clearfix">
        <li v-for="(item,index) in navItems" :key="index" :style="numBoder==index?'border-bottom: 3px solid #009900;':''" class="numactive" @click="getNum(index)">{{item}}</li>
      </ul>
    </div>

    <div class="content" :style="{'padding-top':shouhou}">
      <div class="common_box item" v-for="(item,index) in wholeData" :key="index">
        <!-- 店铺标题 -->
        <div class="title">
          <div class="left_store">
            <router-link to="">
              <img src="../../../assets/img/stoe.png" style="width: 0.18rem">
              <span class="storename">
                {{item.shop.shop_name}}
              </span>
            </router-link>
          </div>
          <span class="state">
            {{item.status==0?'待付款':item.status==1?'待发货':item.status==2?'待收货':item.status==3?'待评价':'已取消'}}
            </span>
        </div>
        <router-link :to="{path:'/goodsdetails/Orderdetails',query: {id: item.id}}" v-for="(goodsItem,index1) in item.goods" :key="index1">
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
                <span>规格：默认
                  <!-- {{goodsItem.sku}} -->
                </span>
                <span>数量:{{goodsItem.num}}</span>
              </div>
            </div>
          </div>
        </router-link>
        <!-- 店铺合计 -->
        <div class="clearfix total_box">
          <div class="add_time" v-show="numBoder==1">
            {{item.add_time}}
          </div>
          <div class="right_total">
            <span style="margin-right: 20px">共{{item.goods.length}}件商品</span>
            <span>合计：￥{{item.total_money}}</span>
          </div>

        </div>
        <div class="clearfix submit_box">
          <!-- <div class="left_dtime" v-show="num==1">
            剩
            {{}}
            自动关闭
          </div> -->
          <div class="left_dtime" v-show="isshouhou">
            <span>正在办理退款</span>
            <span>退款金额￥268.00</span>
          </div>
          <el-row class="btn_box">
            <el-row v-show="!isshouhou">
              <div v-show="num==1">
                <router-link :to="{path:'/goodsdetails/Orderdetails',query: {id: item.id}}">
                    <van-button plain type="primary" size="small" color="#009900">订单详情</van-button>
                </router-link>
                <van-button type="primary" size="small" color="#009900" @click="payment(item.id)">付款</van-button>
              </div>
              <div v-show="num==2">
                <!-- <van-button plain type="primary" size="small" color="#009900" @click="cancelOrder(item.id)">取消订单</van-button> -->
                <van-button type="primary" size="small" color="#009900">提醒发货</van-button>
              </div>
              <div v-show="num==3">
                <van-button plain type="primary" size="small" color="#009900">查看物流</van-button>
                <van-button type="primary" size="small" color="#009900">确认收货</van-button>
              </div>
              <div v-show="num==4">
                <router-link :to="{path:'/goodsdetails/evaluate',query: {id: item.id}}">
                  <van-button plain type="primary" size="small" color="#009900">立即评价</van-button>
                </router-link>
                <van-button type="primary" size="small" color="#009900">再来一单</van-button>
              </div>
            </el-row>
            <el-row v-show="isshouhou">
              <van-button type="primary" size="small" color="#009900">查看详情</van-button>
            </el-row>
          </el-row>

        </div>
      </div>
    </div>
    <div v-show="isNoorder">
      <Empty></Empty>
    </div>
    <div v-show="!isNoorder">
      没有更多订单了
    </div>
  </div>
</template>

<script>

  import Headerback from "../../headerback/headerback";
  import Empty from "../empty/empty";

  export default {
    name: "order",
    components: {Empty, Headerback},

    data() {
      return {
        num: 0,
        numBoder: 0,
        isNoorder: false,
        jsApiParameters: {},
        is: 'num',
        jsApiParameters:{},
        shouhou: '',
        isshouhou: false,
        navItems: this.$route.query.orderid == 4 ? ['办理中', '退款成功', '退款成功', '退款成功', '退款成功'] : ['全部', '待付款', '待发货', '待收货', '待评价'],
        orderAllItem: [
          {
            storename: '富锦旗舰店',
            state: 2,
            price: '268.00',
            goodsimg: 'c_goods',
            detailes: '富锦年货特产坚果零食大礼包万事如意混合坚果公司送礼盒装',
            guige: '1000*10',
            num: 1,
            total: '268.00',
            totalnum: 1,
            add_time: '2020-01-13 10：02：42',
          },
          {
            storename: '富锦旗舰店',
            state: 2,
            price: '268.00',
            goodsimg: 'c_goods',
            detailes: '富锦年货特产坚果零食大礼包万事如意混合坚果公司送礼盒装',
            guige: '1000*10',
            num: 1,
            total: '268.00',
            totalnum: 1,
            add_time: '2020-01-13 10：02：42',
          },
          {
            storename: '富锦旗舰店',
            state: 2,
            price: '268.00',
            goodsimg: 'c_goods',
            detailes: '富锦年货特产坚果零食大礼包万事如意混合坚果公司送礼盒装',
            guige: '1000*10',
            num: 1,
            total: '268.00',
            totalnum: 1,
            add_time: '2020-01-13 10：02：42',
          },
          {
            storename: '富锦旗舰店',
            state: 2,
            price: '268.00',
            goodsimg: 'c_goods',
            detailes: '富锦年货特产坚果零食大礼包万事如意混合坚果公司送礼盒装',
            guige: '1000*10',
            num: 1,
            total: '268.00',
            totalnum: 1,
            add_time: '2020-01-13 10：02：42',
          }
        ],
        wholeData:[
          {
            id: '',
            goods: [
              {
                name: ''
              }
            ],
            shop: {
              name: ''
            }
          },
        ],
      }
    },
    methods: {
      getNum (index) {
        this.num = index;
        this.numBoder = index;

        this.getOderData(index);
      },
      getOderData (index) {
        let ad_data = {
          method: 'get.order.list',
          // type:
        };
        if(index != undefined && index != 0){
          ad_data = {
            method: 'get.order.list',
            type: index-1
          }
          // console.log(ad_data);
        }
        // console.log(ad_data);
        this.$post('/api/v1/order', ad_data)
        .then((res) => {
          // console.log(res)
          console.log(res.data)
          if(res.data.length==0){
            this.isNoorder = true;
          }else{
            this.isNoorder = false;
          }
          this.wholeData = res.data;
        }).catch(function (error) {
            console.log(error);
        });
     },
     cancelOrder (id) {
        let ad_data = {
          method: 'cancel.order.item',
          order_id: id
        };
        console.log(ad_data)
        this.$post('/api/v1/order', ad_data)
        .then((res) => {
          console.log(res)
          if(res.status==200){
            this.$toast.success('订单已取消');
            this.getOderData(2);
          }else{
            this.$toast.success('取消失败');
          }
        }).catch(function (error) {
            console.log(error);
        });
     },
     //支付
      payment ( id ) {
        let _id = id;
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
      this.getOderData();
    },
    mounted() {
      this.is = this.$route.query.orderid == 4 ? 'index' : 'num';
      this.isshouhou = this.$route.query.orderid == 4 ? true : false;
      this.shouhou = this.$route.query.orderid == 4 ? '0.43rem' : '1.01rem';
      if(this.$route.query.orderid == 'evaluate'){
        this.getNum(4);
      }else{
        this.getNum(this.$route.query.orderid);
        console.log(this.$route.query.orderid)
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    .numactive{
      border-bottom: 3px solid #009900;
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .state {
        color: #009900;
      }
    }
    .goods {
      display: flex;
      margin: 0.1rem 0;
      .left_img {
        width: 0.9rem;
        margin-right: 0.1rem;
      }
      .center_text {
        width: 100%;
        >div:first-child{
          padding: 0 0.05rem;
          display: flex;
          width: 100%;
          justify-content: space-between;
          .goodsItemName{
            text-align: left;
            width: 70%;
            overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2; //超出几行显示
            margin-bottom: 0.4rem;
          }
        }
        .Specifications{
          display: flex;
          text-align: left;
          >span:first-child{
            width: 70%;
            overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:1; //超出几行显示
          }
        }
      }
    }

    .total_box {
      margin: 0.1rem 0;

      .add_time {
        float: left;
      }

      .right_total {
        float: right;
      }
    }

    .submit_box {
      line-height: 0.4rem;

      .left_dtime {
        color: #009900;
        float: left;
      }

      .btn_box {
        float: right;
        a{
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
</style>
