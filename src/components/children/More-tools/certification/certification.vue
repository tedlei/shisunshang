<template>
  <div class="content">
    <div class="certification">
      <!-- <van-form @submit="onSubmit" ref="sub"> -->
      <p class="tips">身份信息(必填)</p>
      <van-field v-model="username" name="username" placeholder="真实姓名" />
      <van-field v-model="number1" type="number" name="number" placeholder="您的身份证号码(将做加密处理)" />
      <p class="tips">您的手机号码(必填)</p>
      <van-field v-model="phone" type="number" name="number" placeholder="填写一致的手机号码" />
      <p class="tips">身份证正反面(必填)</p>
      <div class="unload_pic">
        <div class="zheng">
          <div class="box">
            <!-- <van-uploader v-model="ZfileList" :after-read="ZafterRead" :max-count="1"/> -->
            <uploader :maxCount="1" @imgUpData="imgUpData" :imgUrl="imgList[0]"></uploader>
            <p>上传身份证正面</p>
          </div>

          <p class="m_b_10">示例</p>
          <img src="../../../../assets/img/Zidcard.png" />
        </div>
        <div class="fan clearfix">
          <div class="box">
            <!-- <van-uploader v-model="FfileList" :after-read="FafterRead" :max-count="1"/> -->
            <uploader :maxCount="1" @imgUpData="imgUpDataTwo" :imgUrl="imgList[1]"></uploader>
            <p>上传身份证反面</p>
          </div>

          <p class="m_b_10">示例</p>
          <img src="../../../../assets/img/Fidcard.png" />
        </div>
      </div>

      <!-- </van-form> -->
      <div v-if="remark" class="text_re">{{remark}}</div>

      <van-button type="primary" size="large" v-if="isBtnClick" @click="TapCommit">提交</van-button>

      <div class="explain">
        <p class="ttl">为什么要实名认证？</p>
        <p>实名认证的目的是验证所绑定的账户是否属于本人。 有两方面的好处：</p>
        <p>一是确保账户中的资金只可能被提现到本人的银行卡中，保障 资金安全；</p>
        <p>二是账户的实名关系保证了在投资后所得到的电子合同的合法 性，保障合法权益。需要在首次投资前进行实名认证，仅需要 输入真实姓名和身份证号码。</p>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "../../../../assets/js/bus";
import uploader from "../../imgOSS/uploader.vue";
import imgUpload from "../../../../api/imgUpload.js";
export default {
  name: "certification",
  components: { uploader },
  data() {
    return {
      username: "", //真实姓名
      number1: "", //身份证号
      phone: "", //手机号
      ZfileList: [],
      FfileList: [],

      imgList:[],   //图片路径
      isBtnClick:false,   //按钮是否显示
      remark:'',    //审核不通过提示消息
    };
  },
  created() {
    this.getUserrzxx();
  },
  methods: {
    tc(message,type){
      this.$notify({ type: type?type:'warning', message});
    },

    //获取用户认证信息
    async getUserrzxx() {
      let ad_data = { method: "get.user.auth.item" };
      let data = await this.$post("/api/v1/userAuth", ad_data);
      if (data && data.data) {
        console.log(data.data,123456)
        let {truename,id_number,mobile,front_img,after_img,status,remark} = data.data;
        this.username = truename;
        this.number1 = id_number;
        this.phone = mobile;
        this.imgList = [front_img,after_img];
        if(status===0||status===1){
          this.isBtnClick = 0;
          this.remark = '';
        }else{
          this.isBtnClick = true;
          if(status===2) this.remark = remark;
          else this.remark = '';
        }
      }
    },

    //上传正面照
    imgUpData(file) {
      this.ZfileList = file;
    },

    //上传反面照
    imgUpDataTwo(file) {
      this.FfileList = file;
    },

    //保存提交表单
    async TapCommit() {
      let { username, number1, phone, ZfileList, FfileList ,isBtnClick,imgList} = this;
      let front_img,after_img;
      if (!this.verifyName(username)) {
        this.tc("真实姓名未填写或格式错误");
        return;
      }
      if (!this.verifyCardCode(number1)) {
        this.tc("身份证号未填写或格式错误");
        return;
      }
      if (!this.verifyPhone(phone)) {
        this.tc("手机号未填写或格式错误");
        return;
      }
      if (ZfileList.length <= 0) {
        this.tc("身份证正面照未上传");
        return;
      }
      if (FfileList.length <= 0) {
        this.tc("身份证反面照未上传");
        return;
      }
      // let listImg = [...ZfileList,...FfileList];
      // let data = await imgUpload(listImg);
      if(ZfileList[0].file){
        let arr = await imgUpload(ZfileList);
        front_img = arr[0];
      }else front_img = imgList[0]

      if(FfileList[0].file){
        let arr = await imgUpload(FfileList);
        after_img = arr[0];
      }else after_img = imgList[1]
      if (!front_img||!after_img) {
        this.tc("图片提交失败，请重新点击提交");
        return;
      }
      let ad_data = {
        method: "add.user.auth.item",
        truename: username,
        mobile: phone,
        id_number: number1,
        front_img,
        after_img
      };
      let res = await this.$post("/api/v1/userAuth", ad_data);
      if (res) {
        this.tc("认证信息提交成功",'success');
        setTimeout(()=>{
          this.$router.back(-1);
        },500)
      }
    }
  },
  mounted() {
    // this.$store.commit("sendAtc", true);
    // // 用$on事件来接收参数
    // var _this = this;
    // Bus.$on("Atc", data => {
    //   if (data == true) {
    //     // _this.$refs.sub.submit();
    //   }
    // });
  },
  destroyed() {
    // Bus.$off("Atc");
    // this.$store.commit("sendAtc", false);
  }
};
</script>

<style scoped lang="scss">
.content {
  .certification {
    .tips {
      padding: 0.1rem 0.16rem;
      text-align: left;
      color: #000;
    }

    .unload_pic {
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      padding: 0.2rem 0.1rem;

      .zheng,
      .fan {
        width: 48%;

        /deep/ .van-uploader__upload {
          margin: 0;
          margin-bottom: 0.1rem;
        }
      }

      .box {
        margin-bottom: 0.2rem;
        padding: 0.2rem;
        background-color: #f2f2f2;
      }

      img {
        width: 80%;
      }
    }
  }

  .text_re{
    padding:20px 10px;
    color:red;
    text-align: left;
  }

  .explain {
    margin: 0 0.1rem;
    padding: 0.2rem 0;

    p {
      color: #999999;
      text-align: left;
    }

    p.ttl {
      color: #0f0f0f;
      text-align: center;
      margin-bottom: 0.2rem;
    }
  }
}
</style>
