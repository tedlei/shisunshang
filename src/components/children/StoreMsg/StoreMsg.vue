<template>
  <div class="content">
    <div class="store_banner">
      <van-image width="100%" height="3rem" fit="fill" :src="shops.imgurl" />
    </div>
    <div class="common_box store_msg">
      <div class="name">
        <span class="left_name fontWrap fontWrapOne">{{shops.name}}</span>
        <img src="../../../assets/img/lian.png" v-if="shops.is_promotion == 1" />
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
          class="qrconde"
          @click="Previewcode(false)"
        ></div>

        <!--  -->
        <!--  v-show="false" -->
        <van-icon name="arrow" style="font-size: 0.14rem" />
      </div>
    </div>

    <div class="common_box introduce">
      <p>{{shops.bus_scope}}</p>
      <van-row class="introduce_img" :gutter="20" @click="Preview">
        <van-col v-for="(item,index) in shops.album" :key="index" :span="24">
          <div class="grid-content bg-purple">
            <img :src="item" />
          </div>
        </van-col>
      </van-row>
      <router-link
        v-if="shops.is_promotion == 1"
        class="common_btn"
        :to="{path:'/uploadpic',query:{store_id: shops.id}}"
        style="border-radius: 0.4rem;color: #fff !important;margin: 0.3rem 0"
      >上传小票</router-link>
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

    <div class="qrCodeMax" v-show="qrCodeShow" @click="Previewcode(true)">
      <div id="qrCode2" class="qrconde" ref="qrCode2"></div>
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
      qrCodeShow:false,
    };
  },
  methods: {
    getData() {
      let ad_data = {
        method: "get.user.store.item",
        id: this.$route.query.id
      };
      this.$post("/api/v1/userStore", ad_data)
        .then(res => {
          this.shops = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //生成商家二维码
    creatQrCode() {
      let QRcodeDomainName = location.href;
      let arr = QRcodeDomainName.split('/')
      let url = arr[0]+'//'+arr[2]+'/uploadpic?store_id='+this.$route.query.id
      console.log(url)
      let qrCode = new QRCode("qrCode", {
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
        width: 260,
        height: 260,
        colorDark: "#000000",
        colorLight: "#ffffff",
        // render: 'table',
        correctLevel: QRCode.CorrectLevel.H
      });
      var canvas=document.getElementsByTagName('canvas')[1];
      var img = convertCanvasToImage(canvas);
      document.getElementById('qrCode2').innerHTML = '';
      document.getElementById('qrCode2').appendChild(img)
      function convertCanvasToImage(canvas) {
          //新Image对象，可以理解为DOM
          var image = new Image();
          // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
          // 指定格式 PNG
          image.src = canvas.toDataURL("image/png");
          return image;
      }
    },
    createPicture() {
      html2canvas(this.$refs.qrCodeDiv, {
        backgroundColor: null,
        width: 400,
        height: 400
      }).then(canvas => {
        let imgData = canvas.toDataURL("image/jpeg");

        this.imgData = imgData;
      });
    },
    //图片阅览
    Preview: function() {
      ImagePreview(this.shops.album);
    },
    Previewcode: function(boo) {
      if(boo){
        setTimeout(()=>{
          this.qrCodeShow = false;
        },1000)
      }else this.qrCodeShow = true;
    }


  },
  mounted() {
    this.getData();
    this.$nextTick(function() {
      this.creatQrCode();
    });
  }
};
</script>

<style scoped lang="scss">
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

      img {
        margin: 0 0.1rem;
        width: 0.5rem;
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
  .qrCodeMax {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    // .qrconde {
    //   width: 70%;
    //   // width: 3rem;
    //   // height: 3rem;
    // }
  }
}
</style>
