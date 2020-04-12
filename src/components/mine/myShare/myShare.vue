<template>
  <div class="content">
    <div class="mycode">
      <div class="common_btn">我要分享</div>

      <div class="qrcode">
        <div id="qrCode" ref="qrCode"></div>
      </div>
      <div style="margin-bottom: 0.2rem;font-size: 0.16rem;font-weight: bold">长按图片分享给好友</div>
      <van-button square  type="primary" class="" v-clipboard:copy="urls"
           v-clipboard:success="onCopy"
           v-clipboard:error="onError" @click="select(1)">复制推广二维码
      </van-button>
      <p>推广网址：<span>{{urls}}</span></p>
      <p>识别二维码加入团队</p>
    </div>
    <input type="text" v-model="urls" hidden/>

    <!--    -->
  </div>
</template>

<script>
    import QRCode from 'qrcodejs2'

    export default {
        name: "myShare",
        data() {
            return {
                urls: ''
            }
        },
        created() {

        },
        methods: {
            select() {
                this.show = false;
            },
            onCopy: function (e) {
                this.$toast('复制成功！')
            },
            onError(e) {
                this.$toast('复制失败！')
            },
            creatQrCode() {
                let userinfo = JSON.parse(this.$store.getters.getuserinfo);
                let QRcodeDomainName = this.$store.getters.getQRcodeDomainName;
                this.urls = QRcodeDomainName + '?state=' + userinfo.referee_number
                let qrCode = new QRCode('qrCode', {
                    text: QRcodeDomainName + '?state=' + userinfo.referee_number, // 需要转换为二维码的内容
                    width: 200,
                    height: 200,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H
                })
            },
            //    复制

        },
        mounted() {
            this.$nextTick(function () {
                this.creatQrCode()
            })
        },
    }
</script>

<style scoped lang="scss">
  .content {
    .mycode {
      padding: 0.7rem 0.3rem 0 0.3rem;

      .common_btn {

      }
    }

    .content_div {
      line-height: 0.5rem;
      border-bottom: 1px solid #f2f2f2;
    }

    .qrcode {
      display: inline-block;
      padding: 0.08rem;
      background-color: #fff;
      margin: 0.3rem 0;
    }
  }
</style>
