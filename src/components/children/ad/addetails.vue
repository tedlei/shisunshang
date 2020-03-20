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

    export default {
        name: "addetails",
        data() {
            return {
                desc: '',
                add_time: '',
                weixinname: '',
                portrait: '',
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
                        _this.desc = response.data.desc
                        _this.add_time = response.data.add_time
                        _this.weixinname = response.data.user.weixinname
                        _this.portrait = response.data.user.portrait
                        console.log(response)
                    }).catch(function (error) {
                    console.log(error);
                });
            }
        },
        mounted() {
            this.getdetails()
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
