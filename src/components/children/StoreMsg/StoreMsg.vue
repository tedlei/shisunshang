<template>
  <div>
    <div class="content">
      <div class="store_banner" style="font-size: 0">
        <van-image width="100%" height="3rem" fit="fill" :src="shops.imgurl" />
      </div>
      <div class="common_box store_msg">
        <div class="name">
          <div style="display: flex;flex: 1;align-items: center">
            <span class="left_name fontWrap fontWrapOne">{{shops.name}}</span>

            <div class="cx_box_s" v-if="shops.is_promotion == 1" @click="Previewcode(false,'cx')">
              <img :src="imgUrl" v-if="imgUrl" />
              <!-- <p class="cx_name">{{shops.name}}</p>
              <img src="../../../assets/img/cx.jpg" />
              <div class="cx_btm">
                <p class="cx_t">石笋山生态平台</p>
                <p class="cx_time">{{shops.utime}}</p>
                <img src="../../../assets/img/zhang.png" class="zhang" />
              </div>-->
            </div>
          </div>

          <span class="cx_jin">商家促销金:{{shops.promotion_money}}</span>
        </div>
        <div class="time">营业时间：{{shops.bus_hours}}</div>
        <div class="adress">
          <span>地址：{{shops.address}}</span>
          <!-- <span class="clo-g juli">距你3.63公里</span> -->
        </div>
      </div>

      <div class="common_box s_code">
        <span>商家二维码</span>
        <div style="display:flex;align-items: center">
          <div
            style="display: inline-block;margin-right: 0.1rem"
            id="qrCode"
            ref="qrCode"
            class="qrconde"
            @click="Previewcode(false,'qrcode')"
          ></div>

          <!--  -->
          <!--  v-show="false" -->
          <van-icon name="arrow" style="font-size: 0.14rem" />
        </div>
      </div>

      <router-link
        v-if="shops.is_promotion == 1"
        class="uploadpic"
        :to="{path:'/uploadpic',query:{store_id: shops.id}}"
      >
        <div class="uploadpic_text">上传小票</div>
      </router-link>

      <div class="common_box introduce">
        <p>{{shops.bus_scope}}</p>
        <div class="introduce_img">
          <div class="img_main">
            <div
              style="width:30%;margin-left:2.48%;margin-top:0.1rem;"
              v-for="(item,index) in shops.album"
              :key="index"
              :id="'imgHeight'+index"
              :ref="'imgHeight'+index"
              @click="Preview(index)"
            >
              <img style="width:100%;height:100%" :src="item" @load="heightImg(index)" />
            </div>
          </div>
        </div>
        <!-- <van-row class="introduce_img" :gutter="20" @click="Preview">
          <van-col style="width:33.333333%" v-for="(item,index) in shops.album" :key="index" :span="24">
            <div class="grid-content bg-purple">
              <img :src="item" />
            </div>
          </van-col>
        </van-row>-->
      </div>

      <div class="common_box record_integral" v-if="shops.pay_list && shops.pay_list.length > 0">
        <div class="record_ttl clo-g">
          <span>上传人数：{{shops.pay_count}}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span>分发金额：{{shops.pay_total_money}}</span>
        </div>
        <div class="record_content">
          <ul>
            <li>
              <div style="display: flex;align-items: center">
                <van-icon name="label" class="tip" />
                <div>{{shops.pay_list[0].add_time}}</div>
              </div>
              <div>￥:{{shops.pay_list[0].money}}</div>
            </li>
          </ul>
        </div>
      </div>

      <div id="Posters" class="qrCodeMax" v-show="qrCodeShow" @click="Previewcode(true)">
        <div class="PostersImg" v-show="showTwo">
          <img src="../../../assets/img/sjhbb.jpg" alt />
        </div>
        <div class="qrCodeMaxRule" v-show="showTwo">
          <h2>规则说明</h2>
          <h6>{{shops.name}}联合石笋山生态平台推出消费多少送多少活动</h6>
          <h6>最高赠送2000元！</h6>
          <h6 style="color:rgb(39,221,147)">活动细则：</h6>
          <h6>顾客扫描商家二维码后，可凭消费小票在商家获得最高2000元的平台签到金（每天限一次）；</h6>
          <h6>消费2000元以下，消费多少送多少平台签到金，</h6>
          <h6>消费2000元以上可最高获得2000元平台签到金</h6>
          <h6>活动时间：2020年5月1日起</h6>
          <h6 style="color:rgb(39,221,147)">注意事项：</h6>
          <h6 style="text-align: left;">1、所有赠送的签到金仅限于石笋山生态平台使用，顾客区限购物1：1抵扣购物金，邮费、报价金自理；</h6>
          <h6 style="text-align: left;">2、顾客与商家必须对上传票据的真实性负责。一经平台审核发现问题，平台有权对顾客与商家的平台账号做封号处理。</h6>
          <h3 style="margin: 0.35rem 0 0.2rem 0;">扫一扫，上传小票</h3>
        </div>
        <div
          style="z-index: 99999;border: 3px solid #fff;"
          id="qrCode2"
          v-show="codes&&showTwo"
          class="qrconde"
          ref="qrCode2"
        ></div>
        <h4 style="z-index: 99999;margin: 0.15rem 0 0.2rem 0;" v-show="showTwo">本活动的最终解释权归石笋山生态平台所有</h4>
        <div class="Return" style="z-index: 99999;">返回</div>
        <!-- <div class="PostersImg" v-show='!showTwo'>
                <img :src="hbUrl" alt="">
        </div>-->
      </div>

      <div class="qrCodeMax" v-show="cxImgShow" @click="Previewcode(true,'cx')">
        <img :src="imgUrl" v-if="imgUrl">
      </div>

    </div>

    <div class="footer">
      <a :href="'tel:' + shops.mobile">
        <div class="left_hujiao">
          <van-icon name="phone-o" />
          <span style="margin:0 0.1rem">呼叫</span>
        </div>
      </a>

      <!-- <div class="right_daohang">
       <van-icon name="aim"/>
       <span style="margin:0 0.1rem">导航</span>
      </div>-->
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import Uploadpic from "../uploadpic/uploadpic";
import QRCode from "qrcodejs2";
import html2canvas from "html2canvas";

export default {
  name: "StoreMsg",
  components: { Uploadpic },
  data() {
    return {
      shops: {},
      imgData: "",
      name: "重庆石笋山公司",
      starttime: "09:00",
      endtime: "18:00",
      adress: "重庆市江北区金渝大道168号",
      qrCodeShow: false,
      cxImgShow:false,
      codes: false,
      cx: false,
      showTwo: true,
      hbUrl: "",
      imgUrl: ""
    };
  },
  methods: {
    //图片生成
    cxlmImg() {
      let img = new Image();
      let canvas = document.createElement("canvas");
      let can = canvas.getContext("2d");
      img.onload = () => {
        let { width, height } = img;
        canvas.width = width;
        canvas.height = height;
        can.drawImage(img, 0, 0, width, height);
        let img1 = new Image();
        img1.onload = () => {
          can.drawImage(
            img1,
            width * 0.65,
            height * 0.65,
            width * 0.12,
            width * 0.12
          );
          can.font = width * 0.0578 + "px bold 黑体";
          can.fillStyle = "#000";
          can.textAlign = "center";
          can.fillText("石笋山旅游景区", width * 0.5, height * 0.27);
          can.font = width * 0.0266 + "px bold 黑体";
          can.fillText("石笋山生态平台", width * 0.72, height * 0.72);
          can.fillText("二零二零年四月十七日", width * 0.72, height * 0.78);
          this.imgUrl = canvas.toDataURL("image/png");
        };
        img1.src = require("../../../assets/img/zhang.png");
      };
      img.src = require("../../../assets/img/cx.jpg");
    },
    getData() {
      let ad_data = {
        method: "get.user.store.item",
        id: this.$route.query.id
      };
      this.$post("/api/v1/userStore", ad_data)
        .then(res => {
          this.shops = res.data;
          // console.log(res.data)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //生成商家二维码
    creatQrCode() {
      let QRcodeDomainName = location.href;
      let _this = this;
      let arr = QRcodeDomainName.split("/");
      let url =
        arr[0] + "//" + arr[2] + "/uploadpic?store_id=" + this.$route.query.id;
      // console.log(url)
      let qrCode = new QRCode(this.$refs.qrCode, {
        text: url, // 需要转换为二维码的内容
        width: 25,
        height: 25,
        colorDark: "#000000",
        colorLight: "#ffffff",
        // render: 'table',
        correctLevel: QRCode.CorrectLevel.H
      });
      qrCode = new QRCode("qrCode2", {
        text: url, // 需要转换为二维码的内容
        width: 140,
        height: 140,
        colorDark: "#000000",
        colorLight: "#ffffff",
        // render: 'table',
        correctLevel: QRCode.CorrectLevel.H
      });

      var canvas = document.getElementsByTagName("canvas")[1];
      var img = convertCanvasToImage(canvas);
      // _this.loadImg(img.src);
      document.getElementById("qrCode2").innerHTML = "";
      document.getElementById("qrCode2").appendChild(img);
      function convertCanvasToImage(canvas) {
        //新Image对象，可以理解为DOM
        var image = new Image();
        // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
        // 指定格式 PNG
        image.src = canvas.toDataURL("image/png");
        return image;
      }
    },
    //图片阅览
    Previewcx: function() {},
    Preview: function(num) {
      ImagePreview(this.shops.album, num);
    },

    Previewcode: function(boo, e) {
      if (e === "cx") {
        // this.cx = true;
        this.cxImgShow = !boo;
        return
      }
      if (!boo && e == "qrcode") {
        this.codes = true;
        this.qrCodeShow = true;
      } else {
        this.qrCodeShow = false;
        this.codes = false;
        this.cx = false;
      }
    },

    //获取图片
    heightImg(num) {
      let doc1 = this.$refs["imgHeight" + num][0];
      let doc = document.getElementById("imgHeight" + num);
      doc.style.height = doc1.scrollWidth + "px";
    },
    loadImg(url) {
      let img = new Image();
      let canvas = document.createElement("canvas");
      let can = canvas.getContext("2d");
      img.onload = () => {
        let { width, height } = img;
        canvas.width = width;
        canvas.height = height;
        can.drawImage(img, 0, 0, width, height);
        let img1 = new Image();
        img1.onload = () => {
          can.drawImage(
            img1,
            width * 0.65,
            height * 0.65,
            width * 0.2,
            width * 0.2
          );
          // can.font = width*0.0578 +"px bold 黑体";
          // can.fillStyle = "#000";
          // can.textAlign = "center";
          // can.fillText("石笋山旅游景区", width*0.5, height*0.27);
          // can.font = width*0.0266 +"px bold 黑体";
          // can.fillText("石笋山生态平台", width*0.72, height*0.72);
          // can.fillText("二零二零年四月十七日", width*0.72, height*0.78);
          this.hbUrl = canvas.toDataURL("image/png");
          // console.log(this.hbUrl,54141)
        };
        img1.src = url;
      };
      img.src = require("../../../assets/img/sjhbb.jpg");
    },

    olad() {
      // console.log(this.$refs.zjhb.width*20);
      let Poster = document.getElementById("Posters");
      // console.dir(Poster.offsetWidth);
      // console.dir(Poster.offsetHeight);
      // this.h = Poster.offsetHeight
      let opts = {
        useCORS: true,
        width: Poster.offsetWidth,
        height: this.h,
        logging: false,
        // scale:1,
        dpi: window.devicePixelRatio
      };
      window.scrollTo(0, 0);
      html2canvas(Poster, opts).then(canvas => {
        let imgUri = canvas.toDataURL("image/jpeg", 1); // 获取生成的图片的url
        // console.log(imgUri);
        // this.hbUrl = imgUri;
        // this.showTwo = false;
      });
    }
  },
  created() {
    this.cxlmImg();
    this.getData();
  },
  mounted() {
    this.$nextTick(function() {
      this.creatQrCode();
    });
    // setTimeout(() => {
    //     this.creatQrCode();
    // },1000);
  },
  destroyed() {}
};
</script>

<style scoped lang="scss">
.Return {
}
.content {
  padding-bottom: 0.5rem;

  .store_banner {
    background-color: #fff;
  }

  .store_msg {
    text-align: left;
    padding: 0.15rem;

    .name {
      font-size: 0.18rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      img {
        width: 0.48rem;
      }

      .cx_box_s {
        position: relative;
        font-size: 0.02rem;
        text-align: center;
        margin: 0 0.1rem;
        .cx_name {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          top: 0.03rem;
        }

        .cx_btm {
          position: absolute;

          right: 0.03rem;
          bottom: 0.04rem;
          line-height: 1.4;
          font-size: 0.015rem;
          .zhang {
            top: 20%;
            transform: translate(-50%, -50%);
            position: absolute;
            width: 0.08rem;
            height: auto;
            margin: 0 auto;
            line-height: inherit;
          }
        }
      }

      .cx_jin {
        background-color: #009900;
        line-height: 0.2rem;
        border-radius: 0.2rem;
        color: #fff;
        padding: 2px 0.05rem;
        font-size: 0.12rem;
        width: max-content;
      }
    }

    .time {
      margin: 0.1rem 0;
      color: #999999;
    }

    .adress {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .s_code {
    margin-top: 0.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .introduce {
    p {
      text-align: justify;
      line-height: 2;
      margin-bottom: 0.1rem;
    }

    .introduce_img {
      padding: 0.1rem 0;

      .img_main {
        padding-bottom: 0.1rem;
        width: 100%;
        background: rgba(0, 0, 0, 0.05);
        // border-radius: 5px;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
}

.qrCodeMax {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  overflow: scroll;
  .Return {
    position: absolute;
    top: 0;
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    color: #fff;
    text-align: left;
    padding: 0 0.2rem;
    background: rgba(0, 0, 0, 0.05);
  }
  .PostersImg {
    width: 100%;
    position: absolute;
    top: 0;
  }
  .qrCodeMaxRule {
    padding: 0 0.2rem;
    padding-top: 2rem;
    z-index: 99999;
    letter-spacing: 0.01rem;
    > h2:first-child {
      margin-bottom: 0.1rem;
    }
    > h6 {
      line-height: 0.2rem;
    }
  }
  .cx_box {
    position: relative;

    .cx_name {
      font-weight: bold;
      position: absolute;
      top: 0.5rem;
      left: 0;
      right: 0;
      font-size: 0.2rem;
    }

    .cx_btm {
      position: absolute;
      right: 0.5rem;
      bottom: 0.4rem;
      font-size: 0.1rem;

      .zhang {
        width: 0.5rem;
        transform: translate(-50%, -50%);
        position: absolute;
        top: 50%;
      }

      .cx_time {
      }
    }
  }
}

.record_integral {
  .record_ttl {
    font-size: 0.16rem;
  }

  .record_content {
    padding: 0.1rem;
    border: 1px dashed #009900;
    border-radius: 5px;
    margin-top: 0.1rem;

    ul {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.05rem 0;

        > .tip {
          margin-right: 5px;
          color: #009900;
        }
      }
    }
  }
}

.uploadpic {
  color: #fff !important;
  right: 0;
  bottom: 1rem;
  display: block !important;
  z-index: 1;
  font-size: 0.1rem;
  margin: 0.1rem;
  line-height: 0.4rem;

  .uploadpic_text {
    background-color: rgba(0, 153, 0, 0.7);
    border-radius: 5px;
  }
}

.footer {
  color: #fff;
  font-size: 0.18rem;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100%;

  > a {
    width: 100%;
  }

  .left_hujiao {
    background-color: #333;
    line-height: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .right_daohang {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #009900;
    line-height: 0.5rem;
    width: 50%;
  }
}
</style>
