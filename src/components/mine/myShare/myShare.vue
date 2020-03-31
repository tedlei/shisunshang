<template>
  <div class="content">
    <div class="mycode">
      <div class="common_btn" @click="show = true">邀请好友扫码下载APP</div>

      <div class="qrcode">
        <div id="qrCode" ref="qrCode"></div>
      </div>
      <p>扫此二维码下载APP</p>
    </div>

    <van-action-sheet
      v-model="show"
      :round="false"
      :actions="actions"
      cancel-text="取消"
      @cancel="onCancel"
      :style="{'color':'#009900'}"
    />
  </div>
</template>

<script>
    import QRCode from 'qrcodejs2'

    export default {
        name: "myShare",
        data() {
            return {
                show: false,
                actions: [
                    {name: '复制推广二维码', color: '#009900'},
                    {name: '分享给好友', color: '#009900'},
                    {name: '保存到相册', color: '#009900'},
                ]
            }
        },
        created() {

        },
        methods: {
            onCancel: function () {
                this.show = false
            },
            creatQrCode() {
                let phone = JSON.parse(this.$store.getters.getuserinfo).phone;
                let source = 'myShare'
                let qrCode = new QRCode('qrCode', {
                    text: 'http://m.wjeys.com/?source=' + source + '?state=' + phone, // 需要转换为二维码的内容
                    width: 150,
                    height: 150,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H
                })
            },
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
        margin-bottom: 0.2rem;
      }
    }

    .qrcode {
      display: inline-block;
      padding: 0.08rem;
      background-color: #fff;

    }
  }
</style>
