<template>
  <div class="content">
    <header>
      <div>
        <img :src="portrait ? portrait : '../../../assets/img/news_head.png'">
        <span>
            {{weixinname}}
          </span>
      </div>
      <div>
        {{add_time}}
      </div>

    </header>
    <div class="main_text">
      {{desc}}
    </div>
  </div>
</template>

<script>
    import Bus from "../../../assets/js/bus";

    export default {
        name: "addetails",
        data() {
            return {
                desc: '',
                add_time: '',
                weixinname: '',
                portrait: '',
                Advertisement: {}
            }
        },
        methods: {
            getdetails: function () {
                let _this = this,
                    admsg = {
                        method: 'get.weixin.ad.item',
                        id: _this.$route.query.id
                    }
                this.$post('/api/v1/weixinAd', admsg)
                    .then((response) => {
                        console.log(response);
                        this.Advertisement = response.data;
                        _this.desc = response.data.desc
                        _this.add_time = response.data.add_time
                        _this.weixinname = response.data.user.weixinname
                        _this.portrait = response.data.user.portrait
                        Bus.$emit('title', response.data.title);
                        let user = JSON.parse(localStorage.getItem("userinfo"));
                        this.shareConfig(user);
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            shareConfig(userinfo) {
                let ua = window.navigator.userAgent.toLocaleLowerCase();
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    // console.log('我是商品分享了')
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
                    // console.log(goods);
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
            Bus.$emit('title', '')
        },
        mounted() {
            this.getdetails();
        }
    }
</script>

<style scoped lang="scss">
  .content {
    background-color: #fff;

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
  }

</style>
