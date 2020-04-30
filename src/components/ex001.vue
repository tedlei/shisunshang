<template>
  <div>
    <div v-show="!show" class>
      <div class="erweima">
        <!-- <qrcode :url="urls" 
                    :iconurl="portrait" 
                    :wid="170" 
                    :hei="170"
                    :imgwid="50"
                    :imghei="50">
        </qrcode>-->
      </div>
      <img src="../assets/img/zjhb1.jpg" @load="tuxiang" ref="tuxiang" alt />
    </div>
    <canvas
      v-show="show"
      id="myCanvas"
      :width="cwidth"
      :height="chetght"
      style="border:1px solid #c3c3c3;"
    ></canvas>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
// import qrcode from 'vue_qrcodes'
export default {
  data() {
    return {
      imgSrc: require("../assets/img/zjhb1.jpg"),
      w: 0,
      h: 0,
      can: null,
      qrCodeW: 40,
      qrCodeLoca: { w: 50, h: 50 }
    };
  },
  methods: {
    //获取海报背景图片并在canvas上画出
    loadImg() {
      let { scrollWidth, scrollHeight } = this.$refs.imgRef;
      let demo = document.getElementById("myCanvas");
      let can = demo.getContext("2d");
      let img = new Image();
      this.can = can;
      this.w = scrollWidth;
      this.h = scrollHeight;
      img.src = this.imgSrc;
      img.onload = () => {
        can.drawImage(img, 0, 0, scrollWidth, scrollHeight);
        this.creatQrCode(scrollWidth);
      };
    },

    //生成二维码
    creatQrCode(w) {
      let url = "www.baidu.com";
      let wh = (w / 100) * this.qrCodeW;
      let qrCode = new QRCode("qrcode", {
        text: url, // 需要转换为二维码的内容
        width: wh,
        height: wh,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
      var canvas = document.getElementsByTagName("canvas")[0];
      // console.log(canvas)
      this.convertCanvasToImage(canvas, wh);
    },
    methods: {
      tuxiang(e) {
        this.cwidth = this.$refs.tuxiang.width;
        this.chetght = this.$refs.tuxiang.height;
        this.huatule();
      },
      huatule() {
        var c = document.getElementById("myCanvas");
        var cxt = c.getContext("2d");
        var img = new Image();
        img.src = require("../assets/img/zjhb1.jpg");
        // img.style = "width:" + this.cwidth + 'px;' + "height:" + this.chetght + 'px';
        let w = this.cwidth;
        let h = this.chetght;
        console.log(w);
        img.onload = function() {
          cxt.drawImage(img, 0, 0, w, h);
        };
        this.show = true;
        // console.log(img);
      }
    },
    created() {
      let userinfo = JSON.parse(this.$store.getters.getuserinfo);
      this.portrait = userinfo.portrait;
    },
    mounted() {
      // this.huatule();
    }
  }
};
</script>
<style lang="scss" scoped>
.erweima {
  position: absolute;
}
</style>