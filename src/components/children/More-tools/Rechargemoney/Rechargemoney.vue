<template>
  <div class="content">
    <div class="r_c_box money_box">
      <div class="money_text">
        <p>充值金额（元）</p>
        <div class="clo-g" style="display: flex;align-items: center">
          ￥
          <van-field
            readonly
            clickable
            :value="dang"
            @touchstart.native.stop="show = true"
            :style="{'padding-left':'0'}"
          />

        </div>
      </div>
      <ul class="card">
        <li v-for="(item,index) in chooselist" :key="index" :class="num==index?'active':''" @click="onClick(index)">
          {{item}}元
        </li>
      </ul>
    </div>
    <div class="r_c_box pay_box">
      <p>支付方式</p>
      <van-radio-group v-model="radio">
        <van-cell-group>
          <div class="pay_item">
            <img src="../../../../assets/img/wx_icon.png" style="width: 24px">
            <van-cell title="微信支付" clickable @click="radio = '1'">

              <van-radio slot="right-icon" name="1"/>
            </van-cell>
          </div>
          <div class="pay_item">
            <img src="../../../../assets/img/zfb_icon.png" style="width: 24px">
            <van-cell title="支付宝支付" clickable @click="radio = '2'">
              <van-radio slot="right-icon" name="2"/>
            </van-cell>
          </div>
        </van-cell-group>
      </van-radio-group>
    </div>

    <van-number-keyboard
      v-model="dang"
      :show="show"
      @blur="show = false"
    />


    <div class="common_btn" style="margin: 0.3rem 0.1rem 0 0.1rem;" @click="pay">立即充值</div>
  </div>
</template>

<script>
    export default {
        name: "Rechargemoney",
        data() {
            return {
                chooselist: ['100', '300', '500', '1000'],
                num: 0,
                radio: '1',
                dang: '',
                show: false,
                jsApiParameters: {}
            }
        },
        methods: {
            //切换金额
            onClick(index) {
                this.num = index;
                this.dang = this.chooselist[this.num]
                console.log(this.dang)
            },
            pay: function () {
                let parms = {
                    method: 'add.recharge.cz.item',
                    money: this.dang
                }
                this.$post('/api/v1/UserRecharge', parms)
                .then((response) => {
                  if(res.data.is_wx_pay == 1){
                    this.jsApiParameters = res.data.payment;
                    this.callpay();
                  }
                  
                }).catch(function (error) {
                console.log(error);
                })
            },


            jsApiCall(){
	          	WeixinJSBridge.invoke(
	          		'getBrandWCPayRequest',
	          		this.jsApiParameters,
	          		function(res){
	          			if(  res.err_msg.indexOf(":ok")>0 ){
	          				//跳转到支付成功页面
                    this.$router.push({path: '/goodsdetails/successfulPayment', query: {id: this.oderPay}});
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
            this.dang = this.chooselist[this.num]
            this.$store.commit('sendRrecord', true);
        },
        destroyed() {
            this.$store.commit('sendRrecord', false);
        }
    }
</script>

<style scoped lang="scss">
  .content {
    .r_c_box {
      margin-top: 0.1rem;
      background-color: #fff;
      padding: 0.1rem;
    }

    .money_box {
      .money_text {
        text-align: left;
        margin-bottom: 0.2rem;

        p {
          font-size: 0.15rem;
        }

        div {
          font-size: 0.23rem;
        }

        /deep/ .van-field__control {
          color: #009900;
        }
      }

      .card {
        display: flex;
        justify-content: space-between;

        li {
          width: 24%;
          border: 1px solid #009900;
          color: #009900;
          line-height: 0.5rem;
          border-radius: 3px;
          font-size: 0.16rem;
        }

        li.active {
          background-color: #009900;
          color: #fff;
        }
      }
    }

    .pay_box {
      text-align: left;

      .pay_item {
        display: flex;
        align-items: center;
      }

      /deep/ .van-radio__icon--checked .van-icon {
        background-color: #009900;
        border-color: #009900;
      }

    }
  }
</style>
