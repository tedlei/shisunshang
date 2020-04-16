<template>
  <div class="content upg_app">
    <div class="upg_img" v-if="userInfo">
      <van-image class="upg_bj" fit="contain" :src="require('../../../assets/img/zxsjbg.jpg')" />
      <div class="upg_com">
        <div class="img_b">
          <van-image class="van-image1" :src="userInfo.portrait" />
        </div>
        <p style="font-size:0.17rem;color:#fff;margin-top:0.185rem">{{userInfo.weixinname}}</p>
        <p style="font-size:0.13rem;color:#fff;margin-top:0.14rem">会员当前等级：{{userInfo.level_name}}</p>
      </div>
    </div>

    <!-- <div class="upg_btn">
        <div class="upg_x"></div>
        <div class="btn_btn_div">
            <div class="btn" v-for="(item,i) of btnList" :key="i" :class="(i===btnNum?'btn_height':'')||(i?'bl':'br')" @click="tapSelect(i)">
                <div class="icon" :style="{backgroundImage:'url('+item.imgUrl+')',backgroundSize:'cover'}">
                    {{item.iconTitle}}
                </div>
                <span style="margin-left:0.2rem;font-size:0.17rem;color:#010101,font-weight: bold;">{{item.title}}</span>
            </div>
        </div>
    </div>-->

    <div class="upg_font">
      <span class="font1">限时送</span>
      <span style="margin:0 0.09rem;color:#D8D8D8;">|</span>
      <span style="font-size:0.13rem;color:#333;">买超级会员，享受多项特权</span>
    </div>

    <div class="upg_list">
      <template v-for="(item,i) of topUpList">
        <upgList
          class="list_set"
          :isShowRicon="item.isShowRicon"
          :item="item"
          :topUpNum="topUpNum"
          :i="i"
          :key="i"
          :userMoney="userMoney"
          @tapSel="tapSel"
        ></upgList>
      </template>
    </div>

    <div class="upg_check">
      <van-checkbox checked-color="#07c160" v-model="autoHmoney">
        <span style="font-size:0.15rem;color:#999;">到期自动续费，可随时取消</span>
      </van-checkbox>
    </div>

    <div class="upg_btn_kt">
      <div class="btn" @click="tapKthu">开通会员</div>
    </div>

    <div class="upg_explain">
      <!-- :style="{backgroundImage:'url('+require('../../../assets/img/czBg1.png')+') '}" -->
      <!-- <div class="upg_d d-t-l"></div>
      <div class="upg_d d-t-r"></div>
      <div class="upg_d d-b-l"></div>
      <div class="upg_d d-b-r"></div> -->
      <img class="exp_img" :src="require('../../../assets/img/sjsm.png')" alt />
      <div class="upg_p_list" v-for="(item,i) of titleList" :key="i">
        <div class="upg_dd"></div>
        <p class="upg-l-p" v-html="item"></p>
      </div>
      <!-- <div class="upg_p_list">
        <div class="upg_dd"></div>
        <p class="upg-l-p"></p>
      </div>
      <div class="upg_p_list">
        <div class="upg_dd"></div>
        <p class="upg-l-p"></p>
      </div> -->
    </div>
  </div>
</template>

<script>
import upgList from "./upgList.vue";
export default {
  components: { upgList },
  data() {
    return {
      jsApiParameters: {},
      topUpList: [], //充值选项列表
      topUpNum: 0, //控制充值选项
      userMoney: 0, //用户余额
      autoHmoney: false, //自动续费
      userInfo: null, //用户信息
      titleList: [
        "一、免费注册体验平台会员：平台赠送168元签到金。成功为平台分享一个体验顾客平台奖励10元签到金，签到金到平台直接购买商品。",
        "二、升级90元平台会员：<br/>1、平台赠送云阖·永川秀芽【初心】，价值298元+送200元签到金。<br/>2、成功分享一个普通会员公司奖励升级会员费的30%，领取4、6、8、10C随机分红3元。",
        "三、升级代理商420元：<br/>1、平台赠送价值788元的纯天然红心猕猴桃原浆红酒【寻味匠心】一瓶+“云阖”永川秀芽·炒青（绿茶）一包（250克）价值98元,+送1000元签到现金。<br/>2、成功分享一个代理公司奖励代理费的30%、二级 10%，领取4、6、8、10、12、14、16C随机分红3元。",
        "四、升级合伙人1080元：<br/>1、平台赠送价值788元的纯天然红心猕猴桃原浆红酒【寻味匠心】一瓶+云阖·情山飘雪红茶一包（120克）价值258元+云阖·永川秀芽【初心】价值298元+送3000元签到现金+两天一夜4A级风景区吃住免费旅游，价值468元（公司统一组织，允许带一个朋友）<br/>2、成功分享一个合伙人公司奖励升级合伙人费的30%、二D 10%、三D 10%。领取4、6、8、10、12、14、16、18、20、22C随机分红3元。"
      ]
    };
  },
  created() {
    let { getuserinfo } = this.$store.getters;
    if (getuserinfo) this.userInfo = JSON.parse(getuserinfo);
    this.getPageInfo();
  },
  methods: {
    //获取页面信息
    getPageInfo() {
      let ad_data = {
        method: "get.user.upgrade.list"
      };
      this.$post("/api/v1/userLevel", ad_data)
        .then(res => {
          // console.log(res);
          let { list, user_money } = res.data;
          this.topUpList = list;
          this.userMoney = user_money;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //切换充值模式
    tapSel(i) {
      this.topUpNum = i;
    },

    getUserInfo() {
      let ad_data = {
        method: "get.user.info"
      };
      this.$post("/api/v1/user", ad_data)
        .then(res => {
          this.$store.commit("userinfo", JSON.stringify(res.data));
          let { getuserinfo } = this.$store.getters;
          if (getuserinfo) this.userInfo = JSON.parse(getuserinfo);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //开通会员
    tapKthu() {
      let { topUpList, topUpNum, autoHmoney } = this;
      let _this = this;
      if (topUpList[topUpNum].is_prohibit) {
        _this.tc( "您已开通此等级或之上的会员，请勿重复选择");
        return;
      }
      _this.$dialog
        .confirm({
          title: "提示",
          message: "是否开通" + topUpList[topUpNum].name
        })
        .then(() => {
          let ad_data = {
            method: "buy.user.level",
            level: topUpList[topUpNum].id,
            day: topUpList[topUpNum].day,
            is_level_renew: autoHmoney ? "1" : "0"
          };
          _this
            .$post("/api/v1/userLevel", ad_data)
            .then(res => {
              if (res.status == 200 && res.data.is_wx_pay == 1) {
                    this.jsApiParameters = res.data.payment;
                    this.callpay();
              } else if (res.status == 200 && res.data.is_wx_pay == 0){
                _this.tc("会员开通成功","success");
                this.$router.back(-1);
                _this.getUserInfo();
              }else{
                // this.$dialog.alert({
                //     title: '提交失败',
                //     message: res.message
                // })
              }
              // if (res.data) {
              //   _this.tc("会员开通成功","success");
              //   _this.getUserInfo();
              //   this.$router.back(-1);
              
              // }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          _this.tc("用户取消操作" );
        });
    },

    //微信支付
    jsApiCall(){
	    	WeixinJSBridge.invoke(
	    		'getBrandWCPayRequest',
	    		this.jsApiParameters,
	    		(res)=>{
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              //跳转到支付成功页面
              this.getUserInfo();
              this.$router.back(-1);
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
  computed: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
.upg_app {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  overflow-y: auto;
  .upg_img {
    width: 100%;
    position: relative;
    .upg_bj {
      width: 100%;
    }
    .upg_com {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .img_b {
        width: 0.55rem;
        height: 0.55rem;
        border: 1px solid #f2f2f2;
        border-radius: 50%;
        overflow: hidden;
        .van-image1 {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .upg_btn {
    width: 100%;
    height: 0.96rem;
    position: relative;
    .upg_x {
      width: 100%;
      border-bottom: 1px solid #e9e9e9;

      position: absolute;
      bottom: 0;
      z-index: 100;
    }
    .btn_btn_div {
      width: 100%;
      position: absolute;
      bottom: 0;
      z-index: 1001;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      .btn {
        width: 1.93rem;
        height: 0.43rem;
        border: 1px solid rgba(233, 233, 233, 1);
        background-color: rgba(246, 246, 246, 1);
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          width: 0.2rem;
          height: 0.16rem;
          text-align: center;
          line-height: 0.15rem;
          font-size: 0.11rem;
          color: #fff;
        }
      }
      .btn_height {
        height: 0.53rem;
        padding-top: 0.1rem;
        background-color: #fff;
        border-bottom-color: #fff;
      }
      .bl {
        border-left: 0;
        border-top-left-radius: 0;
      }
      .br {
        border-right: 0;
        border-top-right-radius: 0;
      }
    }
  }
  .upg_font {
    padding: 0.22rem 0.14rem;
    display: flex;
    align-items: center;
    .font1 {
      font-size: 0.18rem;
      font-weight: bold;
      color: $sss-color;
      font-style: italic;
    }
  }
  .upg_list {
    width: 100%;
    padding: 0 0.14rem;
    display: flex;
    flex-wrap: wrap;
    // .list_set:nth-child(){

    // }
    .list_set:not(:nth-child(3n-2)) {
      margin-left: 5%;
    }
  }
  .upg_check {
    margin-top: 0.24rem;
    margin-left: 0.14rem;
  }
  .upg_btn_kt {
    padding: 0.38rem 0.14rem;
    padding-bottom: 0;
    .btn {
      width: 100%;
      height: 0.48rem;
      // margin:0.38rem auto;
      // margin-bottom: 0;
      background-color: $sss-color;
      border-radius: 0.24rem;
      text-align: center;
      line-height: 0.48rem;
      font-size: 0.15rem;
      line-height: 0.48rem;
      color: #fff;
    }
    .btn:active {
      opacity: 0.8;
    }
  }
  .upg_explain {
    width: 3.33rem;
    // height: 2.4rem;
    padding-bottom: 0.2rem;
    margin: 0.41rem auto;
    background-size: 98% 98%;
    background-repeat: no-repeat;
    background-position: center center;
    position: relative;
    .upg_d {
      width: 4px;
      height: 4px;
      background-color: $sss-color;
      border-radius: 50%;
      position: absolute;
    }
    .d-t-l,
    .d-t-r {
      top: 0;
    }
    .d-b-l,
    .d-b-r {
      bottom: 0;
    }
    .d-t-l,
    .d-b-l {
      left: 0;
    }
    .d-t-r,
    .d-b-r {
      right: 0;
    }
    .exp_img {
      width: 70%;
      margin-top: 0.2rem;
      text-align: center;
    }
    .upg_p_list {
      padding: 0.17rem 0;
      padding-bottom: 0;
      display: flex;
      // align-items: top;
      .upg_dd {
        margin-top: 5px;
        width: 8px;
        height: 8px;
        background-color: $sss-color;
        border-radius: 50%;
      }
      .upg-l-p {
        flex: 1;
        margin-left: 0.15rem;
        font-size: 0.14rem;
        color: #54524c;
        text-align: left;
        // text-indent: 2em;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
      }
    }
    // margin-bottom: 0;

    // padding:0.41rem 0.21rem;
    // padding-bottom: 0;
    // .upex_main{
    //     width: 100%;
    //     height: ;
    // }
  }
}
</style>