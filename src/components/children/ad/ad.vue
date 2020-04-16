<template>
  <div class="content">
    <ul class="ad_list">
      <li v-for="(item,index) in adlists" :key="index">
        <div class="ad_a" @click="tapTz({path:'/mine/ad/addetails',query:{id:item.id}})">

        <!-- <router-link :to="{path:'/mine/ad/addetails',query:{id:item.id}}"> -->
          <div class="left_img">
            <van-image
              width="0.8rem"
              height="0.8rem"
              fit="cover"
              :src="item.img"
              style="display: block"
            />
          </div>
          <div class="right_msg">
            <div class="name">
              <div class="tt" style="font-weight: bold;">{{item.title}}</div>
              <div class="tt_name">{{item.desc}}</div>
            </div>
            <div class="time">
              <span>时间：{{item.add_time}}</span>
              <span>来源：{{item.users_id}}</span>
              <i
                class="el-icon-share"
                style="font-size:0.2rem;float:right;"
                @click.stop="share(item.id)"
              ></i>
            </div>
          </div>
        <!-- </router-link> -->
        </div>
      </li>
    </ul>

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
  </div>
</template>

<script>
import wechatAuth from '../../../assets/js/wechatConfig'
export default {
  name: "ad",
  props: ["dmsg"],
  data() {
    return {
      shareshow: false,
      adlists: []
    };
  },
  methods: {
    //跳转
    tapTz(value){
      this.$router.push(value);
    },

    //获取数据
    getad: function() {
      let _this = this,
        admsg = {
          method:
            _this.dmsg == "myad"
              ? "get.weixin.ad.user.list"
              : "get.weixin.ad.list"
        };
      this.$post("/api/v1/weixinAd", admsg)
        .then(response => {
          _this.adlists = response.data.items;
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    closepop: function() {
      this.shareshow = false;
    },
    //分享
    share: function(e) {
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
    }
  },
  mounted() {
    this.getad();
  }
};
</script>

<style scoped lang="scss">
.content {
  .ad_list {
    background-color: #fff;
    padding: 0.1rem;
    text-align: left;

    li {
      margin-bottom: 0.2rem;
      padding-bottom: 0.1rem;
      border-bottom: 1px solid #f2f2f2;
      .ad_a {
        display: flex;
        align-items: center;
        .right_msg {
          padding-left: 0.15rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .name {
            .tt_name {
              font-size: 0.12rem;
              margin: 0.05rem 0 0.1rem 0;
            }
          }

          .time {
            color: #999999;
            font-size: 0.12rem;
          }
        }
      }
    }
    li:nth-last-child(1) {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
  }
}
</style>
