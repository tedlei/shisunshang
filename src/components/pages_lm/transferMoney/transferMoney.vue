<template>
  <div class="tm_app content">
    <template v-if="zzShow">
      <div class="tm_skr">
        <span style="font-size:0.18rem;color:#0f0f0f;margin-top:0.16rem;margin-right:0.2rem">收款人</span>
        <div class="tm_input">
          <span
            style="font-size:0.15rem;color:#0f0f0f;margin-right:0.1rem"
          >{{phone&&userName&&phone.length===11?userName:''}}</span>
          <span
            style="font-size:0.15rem;color:#0f0f0f;margin-right:0.1rem"
          >{{phone&&userName&&phone.length===11?phone:''}}</span>
          <van-field
            type="number"
            v-model="phone"
            @blur="verifyPhone(phone)"
            placeholder="请输入收款人手机号（手机号自动识别真实姓名）"
          />
        </div>
      </div>

      <div class="tm_money">
        <p style="font-size:0.18rem;color:#0f0f0f;">可转账金额（元）</p>
        <p class="moneyColor clo-g">￥{{qdMoney}}</p>
        <p class="moneyColor zzje">
          <span style="font-size:0.18rem;color:#0f0f0f;">转账金额</span>
          <van-field type="number" v-model="zzMoney" placeholder="请输入转账金额" />
          <span style="font-size:0.18rem;" class="clo-g" @click="tapAll">账户全转</span>
        </p>
        <div class="monetSel">
          <div
            class="selDemo"
            v-for="(item,i) of moneyList"
            :key="i"
            :class="moneySelNum===i?'onsel':''"
            @click="selMoney(item.money,i)"
          >{{item.title}}</div>
        </div>
      </div>

      <div class="zzsm">
        <div class="textBor">
          <textarea v-model="zzExplain" placeholder="转账说明："></textarea>
        </div>
      </div>

      <van-button
        style="margin-top:0.4rem"
        class="btn"
        type="primary"
        size="large"
        @click="tapZz"
      >确认转账</van-button>
    </template>
    <template v-else>
      <div class="succMain"> 
        <div class="succIcon">
          <van-icon name="success" size='0.4rem' color='#fff' />
        </div>
        <p class="succTitle">充值金转账成功</p>
        <p class="succSeach">
          你可在
          <span>我的-财务记录</span>
          中进行查看.
        </p>
      </div>
      <van-button
        style="margin-top:0.4rem"
        class="btn"
        type="primary"
        size="large"
        @click="$router.go(-1)"
      >确定</van-button>

      <van-button
        style="margin-top:0.4rem"
        class="btn"
        type="primary"
        size="large"
        @click="$router.push('/')"
      >返回首页</van-button>
    </template>
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
      qdMoney: "0.00", //转账金
      userName: "", //用户姓名
      phone: "", //输入的手机号
      zzMoney: "", //要转账金额
      zzExplain: "", //转账说明
      zzShow:true,   //转账成功
    };
  },
  created() {
    let { getuserinfo } = this.$store.getters;
    this.qdMoney = JSON.parse(getuserinfo).money1;
  },
  methods: {
    //验证手机号
    verifyPhone(phone) {
      if (phone.length !== 11) {
        this.tc("电话号码格式不正确");
      } else {
        let ad_data = {
          method: "get.user.name.by.mobile",
          mobile: phone
        };
        this.$post("/api/v1/user", ad_data)
          .then(res => {
            console.log(res);
            if (res.data) this.userName = res.data;
            else this.tc("改手机号未绑定账户，请检查手机号是否正确");
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },

    //选择金额时
    selMoney(money, i) {
      if (this.qdMoney > money) {
        this.zzMoney = money;
        this.moneySelNum = i;
      } else {
        this.tc("您的金额不够！");
      }
    },

    //账户全转
    tapAll() {
      this.zzMoney = this.qdMoney;
    },

    //点击转账时
    tapZz() {
      let { qdMoney, phone, zzMoney, zzExplain } = this;
      let ad_data = {
        method: "add.trans.money.tomember.item",
        money: zzMoney,
        member_mobile: phone,
        desc:zzExplain
      };
      if (!phone) {
        this.tc("请输入手机号");
        return;
      }
      if (!parseInt(qdMoney) > 0) {
        this.tc("您没有充值金可使用");
        return;
      }
      if (!parseInt(zzMoney) > 0) {
        this.tc("请输入要转账的金额");
        return;
      }
      this.$post("/api/v1/UserTrans", ad_data)
        .then(res => {
          if(res.data){
            this.zzShow = false;
          }
          // console.log(res, 123);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  watch: {
    phone(value) {
      this.userName = "";
    },
    zzMoney(value) {
      this.moneySelNum = -1;
    }
  }
};
</script>

<style lang="scss">
.btn.van-button--primary {
  background-color: $sss-color;
  border-radius: 10px;
}
.moneyColor .van-cell:not(:last-child)::after {
  border: 0;
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
  .succMain{
    width: 100%;
    // height: 1.41rem;
    padding-top: 0.32rem;
    padding-bottom: 0.21rem;
    background-color: #fff;
    border-radius:10px;
    .succIcon{
      width: 0.44rem;
      height: 0.44rem;
      margin: 0 auto;
      border-radius: 50%;
      background-color: $sss-color;
      text-align: center;
      line-height: 0.44rem;
    }
    .succTitle{
      margin-top: 0.1rem;
      font-size: 0.18rem;
      color: #100808;
      text-align: center;
    }
    .succSeach{
      margin-top: 0.1rem;
      font-size: 0.14rem;
      color: #B8B8B8;
      text-align: center;
      span{
        color:$sss-color;
      }
    }
  }
}
</style>