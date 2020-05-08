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
        <p style="font-size:0.13rem;color:#fff;margin-top:0.14rem">充值余额：{{userMoney}}</p>
      </div>
    </div>
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
      <img class="exp_img" :src="require('../../../assets/img/sjsm.png')" alt />
      <div class="upg_p_list" v-html="content"></div>
    </div>

    <van-dialog v-model="show" title="声明和条款" width="95%" show-cancel-button @confirm="tapKt">
      <div style="padding:0.1rem 0.2rem;text-align:left;color:rgb(38,38,38);font-size:0.15rem;">
        购物服务需要您同意
        <span @click="tapbtn(1)" style="color:rgb(0,122,255);">《用户协议》</span>和
        <span @click="tapbtn(2)" style="color:rgb(0,122,255);">《隐私政策》</span>方可使用。在使用过程中需要使用网络、电话、存储、账户、应用列表信息、读取联系人/
        短信/通话记录/日历，您是否同意？
      </div>
    </van-dialog>
    <!-- <deal></deal> -->
  </div>
</template>

<script>
import upgList from "./upgList.vue";
import deal from "./deal.vue";
import Bus from '../../../assets/js/bus.js'
export default {
  components: { upgList, deal },
  data() {
    return {
      jsApiParameters: {},
      topUpList: [], //充值选项列表
      topUpNum: 0, //控制充值选项
      userMoney: 0, //用户余额
      autoHmoney: false, //自动续费
      userInfo: null, //用户信息
      content: "", //说明
      show: false
    };
  },
  created() {
    let { getuserinfo } = this.$store.getters;
    if (getuserinfo) this.userInfo = JSON.parse(getuserinfo);
    this.getPageInfo();
    this.getSm();
    Bus.$on('upgr',res=>{
      let {topUpNum,autoHmoney} = res;
      this.topUpNum = topUpNum;
      this.autoHmoney = autoHmoney;
      this.show = true;
    })
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
          //值留2位小数 多余去掉
          let x_user_money =
            user_money.split(".")[1].length > 2
              ? user_money.split(".")[1].substring(0, 2)
              : user_money.split(".")[1];
          this.userMoney = user_money.split(".")[0] + "." + x_user_money;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //获取说明
    getSm() {
      let ad_data = {
        method: "get.upgrade.item"
      };
      this.$post("/api/v1/news", ad_data)
        .then(res => {
          // console.log(res.data);
          this.content = res.data.content;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //切换充值模式
    tapSel(i) {
      this.topUpNum = i;
    },
    //获取用户数据
    getUserInfo() {
      let ad_data = {
        method: "get.user.info"
      };
      this.$post("/api/v1/user", ad_data)
        .then(res => {
          this.$store.commit("userinfo", JSON.stringify(res.data));
          localStorage.setItem("userinfo", JSON.stringify(res.data));
          let { getuserinfo } = this.$store.getters;
          if (getuserinfo) this.userInfo = JSON.parse(getuserinfo);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //点击开通会员
    tapKthu() {
      let { topUpList, topUpNum } = this;
      if (topUpList[topUpNum].is_prohibit) {
        this.tc("您已开通此等级或之上的会员，请勿重复选择");
        return;
      }
      this.show = true;
    },

    //开通会员
    tapKt() {
      let { topUpList, topUpNum, autoHmoney } = this;
      let _this = this;
      let ad_data = {
        method: "buy.user.level",
        level: topUpList[topUpNum].id,
        day: topUpList[topUpNum].day,
        is_level_renew: autoHmoney ? "1" : "0"
      };
      _this.$post("/api/v1/userLevel", ad_data)
      .then(res => {
        if (res.status == 200 && res.data.is_wx_pay == 1) {
          this.jsApiParameters = res.data.payment;
          this.callpay();
        } else if (res.status == 200 && res.data.is_wx_pay == 0) {
          _this.tc("会员开通成功", "success");
          this.$router.back(-1);
          _this.getUserInfo();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    },

    //微信支付
    jsApiCall() {
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        this.jsApiParameters,
        res => {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            //跳转到支付成功页面
            this.getUserInfo();
            this.$router.back(-1);
          } else {
          }
        }
      );
    },
    callpay() {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            this.jsApiCall,
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", this.jsApiCall);
          document.attachEvent("onWeixinJSBridgeReady", this.jsApiCall);
        }
      } else {
        this.jsApiCall();
      }
    },

    //点击用户协议或隐私政策
    tapbtn(num) {
      let {topUpNum,autoHmoney} = this
      this.$router.push({ path: "/deal",query:{topUpNum,autoHmoney,num}});
    }
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
  -webkit-overflow-scrolling: touch;
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
    .exp_img {
      width: 70%;
      margin-top: 0.2rem;
      text-align: center;
    }
    .upg_p_list {
      padding: 0.17rem 0;
      padding-bottom: 0;
      text-align: left;
    }
  }
}
</style>
