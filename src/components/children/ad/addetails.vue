<template>
  <div class="content">
    <header>
      <div>
        <img :src="portrait ? portrait : '../../../assets/img/news_head.png'" />
        <span>{{weixinname}}</span>
      </div>
      <div>{{add_time}}</div>
    </header>
    <div class="main_text">{{desc}}</div>
    <div style="width:100%;height:35px;">
      <div class="font_fx"></div>
    </div>

    <van-popup
      v-model="shareshow"
      :style="{ background:'none',padding:'0.1rem',width:'100%',borderRadius:'5px',height:'100%'}"
      @click="closepop"
      >
      <div style="text-align: right">
        <img style="width:auto;" src="../../../assets/img/zhi.png" class="zhi" />
      </div>
      <div style="color: #fff;">
        <strong>立即分享给好友吧</strong>
        <p>点击屏幕右上角将本页面分享给好友</p>
      </div>
    </van-popup>
    <div class="btn">
      <van-button style="margin:20px 0" type="primary" @click.stop="tapShare(Advertisement.id)">立即分享</van-button>
    </div>
  </div>
</template>

<script>
import Bus from "../../../assets/js/bus";
import wechatAuth from '../../../assets/js/wechatConfig'
export default {
  name: "addetails",
  data() {
    return {
      desc: "",
      add_time: "",
      weixinname: "",
      portrait: "",
      Advertisement: {},
      shareshow:false,
    };
  },
  created(){
    let {id,type} = this.$route.query;
    this.getdetails(id);
    // if(type) this.tapShare(id);
  },
  methods: {
    getdetails: function() {
      let _this = this,
        admsg = {
          method: "get.weixin.ad.item",
          id: _this.$route.query.id
        };
      this.$post("/api/v1/weixinAd", admsg)
        .then(response => {
          this.Advertisement = response.data;
          _this.desc = response.data.desc;
          _this.add_time = response.data.add_time;
          _this.weixinname = response.data.user.weixinname;
          _this.portrait = response.data.user.portrait;
          Bus.$emit("title", response.data.title);
          let user = JSON.parse(localStorage.getItem("userinfo"));
          this.shareConfig(user);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    closepop: function() {
      this.shareshow = false;
    },

    //点击分享时
    tapShare: function(e) {
      this.shareshow = true;
      let userinfo = JSON.parse(this.$store.getters.getuserinfo);
      if (userinfo) {
        let shareConfig = {
          title: "国健生态平台",
          desc: "国健生态平台!Come on.!",
          link:
            location.host +
            "/goodsdetails" +
            "?id=" +
            e +
            "&state=" +
            userinfo.referee_number,
          imgUrl:
            "http://gj.wjeys.com/public/up/gj_wjeys_com-2-2-20191216184918-14_106_130_91-615694.jpg"
        };
        let url = location.href;
        wechatAuth(url, shareConfig);
      }
    },

    //
    shareConfig(userinfo) {
      let ua = window.navigator.userAgent.toLocaleLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        var url = "";
        if (this.is_ios()) {
          url = sessionStorage.getItem("ios_share_url").split("#")[0];
        } else {
          url = "http://" + location.host + this.$route.fullPath;
        }
        let goods = {
          title: this.Advertisement.share_title,
          desc: this.Advertisement.share_desc,
          imgUrl: this.Advertisement.share_img
        };
        this.wechatAuth(url, this.$route, userinfo, goods);
      }
    },
    is_ios() {
      var u = navigator.userAgent;
      if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        return true;
      } else {
        return false;
      }
    }
  },
  destroyed() {
    Bus.$emit("title", "");
  }
};
</script>

<style scoped lang="scss">
.content {
  background-color: #fff;
  // margin-bottom: 0.6rem;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.1rem;

    img {
      width: 40px;
      border-radius: 50%;
      margin-right: 0.1rem;
    }
  }

  .main_text {
    padding: 10px;
    text-align: justify;
  }
  .font_fx {
    width: 0.5rem;
    height: 0.25rem;
    float: right;
    text-align: center;
    line-height: 0.25rem;
    font-size: 0.14rem;
    color: #009900;
  }
}
.btn{
  background-color: #f2f2f2;
}
</style>
