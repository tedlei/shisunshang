<template>
  <div class="content">
    <div class="mycode">
      <!-- <div class="common_btn">我要分享</div> -->

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
                let arr = location.href.split('/')
                let QRcodeDomainName = arr[0]+"//"+arr[2]
                let userinfo = JSON.parse(this.$store.getters.getuserinfo);
                this.urls = QRcodeDomainName + '/?state=' + userinfo.referee_number
                let qrCode = new QRCode('qrCode', {
                    text: QRcodeDomainName + '/?state=' + userinfo.referee_number, // 需要转换为二维码的内容
                    width: 200,
                    height: 200,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H
                })
                var canvas=document.getElementsByTagName('canvas')[0];
                var img = convertCanvasToImage(canvas);
                document.getElementById('qrCode').innerHTML = '';
                document.getElementById('qrCode').appendChild(img)
                function convertCanvasToImage(canvas) {
                    //新Image对象，可以理解为DOM
                    var image = new Image();
                    // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
                    // 指定格式 PNG
                    image.src = canvas.toDataURL("image/png");
                    return image;
                }
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
