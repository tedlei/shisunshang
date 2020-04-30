<template>
  <div class="app_test" id="app_id">
    <!-- <img class="qrcode aaaa" :src="imgSrc" alt ref="imgRef" @load="loadImg" />
    <div class="qrcode aaaa" id="qrcode" :style="{width:canW/100*qrCodeW+'px',height:canW/100*qrCodeW+'px',backgroundColor:'#000'}"></div>
    <canvas class="qrcode aaaa " v-show="canW&&canH" id="myCanvas" :width="canW" :height="canH" style="background:#000;"></canvas> -->
    <poster :imgSrc='imgSrc' :qrCodeW="qrCodeW" :qrCodeDrawing="qrCodeDrawing" :qrCodeUrl='qrCodeUrl'></poster>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import qrcode from 'vue_qrcodes'
export default {
  components:{poster},
  data() {
    return {
      imgSrc: require("../assets/img/zjhb1.jpg"),   //海报背景图片路径
      qrCodeW: 40,    //二维码大小
      qrCodeDrawing: { w: 50, h: 50 },  //二维码中心位置
      qrCodeUrl:'www.baidu.com',  //二维码内容
      // canW: 0,  //海报宽度
      // canH: 0,   //海报高度
      // can: null,   //画布对象
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
      this.canW = scrollWidth;
      this.canH = scrollHeight;
      img.src = this.imgSrc;
      img.onload = () => {
        can.drawImage(img, 0, 0, scrollWidth, scrollHeight);
        this.creatQrCode(scrollWidth);
      };
    },

    //生成二维码
    creatQrCode(w) {
      let wh = (w / 100) * this.qrCodeW
      let qrCode = new QRCode("qrcode", {
        text: this.qrCodeUrl, // 需要转换为二维码的内容
        width: wh,
        height: wh,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
      var canvas = document.getElementsByTagName("canvas")[0];
      this.convertCanvasToImage(canvas,wh);
    },

    //把生成二维码在canvas上画出
    convertCanvasToImage(canvas,wh) {
      let can = this.can;
      let {w,h} = this.qrCodeDrawing
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      can.drawImage(image, this.canW/100*w-(wh/2), this.canH/100*h-(wh/2), wh, wh);
      can.strokeStyle="#fff";
      can.lineWidth=5
      can.strokeRect(this.canW/100*w-(wh/2)-2,this.canH/100*h-(wh/2)-2,wh+4,wh+4);
      var canvas = document.getElementsByTagName("canvas")[1];
      this.getImg(canvas)
    },

    //把canvas转化为图片并显示
    getImg(canvas){
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      document.getElementById('app_id').appendChild(image);
    }

  }
};
</script>
<style lang="scss" scoped>
.app_test {
  width: 100%;
  position: relative;
  .aaaa{
    opacity: 0;
  }
  .qrcode{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10001;
  }
}
</style>