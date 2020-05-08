<template>
  <div class="tm_app content">
    <div class="tm_skr">
      <span style="font-size:0.18rem;color:#0f0f0f;margin-top:0.16rem;margin-right:0.2rem">收款人</span>
      <div class="tm_input">
        <span style="font-size:0.15rem;color:#0f0f0f;margin-right:0.1rem"></span>
        <span style="font-size:0.15rem;color:#0f0f0f;margin-right:0.1rem"></span>
        <van-field
          type="number"
          v-model="value"
          @blur="verifyPhone(value)"
          placeholder="请输入收款人手机号（手机号自动识别真实姓名）"
        />
      </div>
    </div>

    <div class="tm_money">
      <p style="font-size:0.18rem;color:#0f0f0f;">可转账金额（元）</p>
      <p class="moneyColor clo-g">￥{{qdMoney}}</p>
      <p class="moneyColor zzje">
        <span style="font-size:0.18rem;color:#0f0f0f;">转账金额</span>
        <van-field type="number" v-model="value1" placeholder="请输入转账金额" />
        <span style="font-size:0.18rem;" class="clo-g">账户全转</span>
      </p>
      <div class="monetSel">
        <div
          class="selDemo"
          v-for="(item,i) of moneyList"
          :key="i"
          :class="moneySelNum===i?'onsel':''"
          @click="moneySelNum=i"
        >{{item.title}}</div>
      </div>
    </div>

    <div class="zzsm">
      <div class="textBor">
        <textarea v-model="text" placeholder="转账说明："></textarea>
      </div>
    </div>

    <van-button style="margin-top:0.4rem" class="btn" type="primary" size="large">确认转账</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moneyList: [
        //选择金额列表
        { money: 100, title: "100元" },
        { money: 300, title: "300元" },
        { money: 500, title: "500元" },
        { money: 1000, title: "1000元" }
      ],
      moneySelNum: -1, //选中的金额
      qdMoney:'0.00',  //签到金

      

      value: "",
      value1: "",
      text: ""
    };
  },
  created(){
    let { getuserinfo } = this.$store.getters;
    this.qdMoney = JSON.parse(getuserinfo).money5;
  },
  methods: {
    verifyPhone(phone) {
      if (phone.length !== 11) {
        this.tc("电话号码格式不正确");
      } else {
        let ad_data = {
          method: "get.user.name.by.mobile",
          mobile:phone
        };
        this.$post("/api/v1/user", ad_data)
          .then(res => {
            let {messag,data} = res;
            // console.log(res);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style lang="scss">
.btn.van-button--primary {
  background-color: $sss-color;
  border-radius: 10px;
}
</style>

<style lang="scss" scoped>
.tm_app {
  padding: 0.1rem;
  text-align: initial;
  .tm_skr {
    padding: 0.02rem 0.06rem;
    padding-bottom: 0.12rem;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    .tm_input {
      flex: 1;
      .van-field {
        padding: 0;
      }
    }
  }
  .tm_money {
    margin-top: 0.05rem;
    padding: 0.08rem 0.06rem;
    padding-bottom: 0;
    background-color: #fff;
    border-radius: 10px;
    .moneyColor {
      font-size: 0.18rem;
      padding: 0.11rem 0;
      border-bottom: 1px solid #f2f2f2;
    }
    .zzje {
      display: flex;
      flex-direction: row;
      align-items: center;
      .van-field {
        padding: 0;
        padding-left: 0.21rem;
        flex: 1;
        .van-field__control {
          border-width: 0;
        }
      }
    }
    .monetSel {
      padding: 0.15rem 0.06rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .selDemo {
        width: 23%;
        height: 0.4rem;
        border: 1px solid $sss-color;
        border-radius: 5px;
        text-align: center;
        line-height: 0.38rem;
        font-size: 0.12rem;
        color: $sss-color;
      }
      .onsel {
        background-color: $sss-color;
        color: #fff;
      }
    }
  }
  .zzsm {
    margin-top: 0.05rem;
    padding: 0.08rem 0.06rem;
    background-color: #fff;
    border-radius: 10px;
    .textBor {
      width: 100%;
      height: 0.7rem;
      border: 1px solid #f2f2f2;
      border-radius: 10px;
      overflow: hidden;
      textarea {
        width: 100%;
        height: 0.71rem;
        padding: 0.06rem 0.07rem;
        border: 0;
      }
    }
  }
}
</style>