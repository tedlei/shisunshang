<template>
  <div>
    <div class="content">
      <div class="store_banner" style="font-size: 0">
        <van-image width="100%" height="3rem" fit="fill" :src="shops.imgurl"/>
      </div>
      <div class="common_box store_msg">
        <div class="name">
          <div style="display: flex;flex: 1">
            <span class="left_name fontWrap fontWrapOne">{{shops.name}}</span>
            <img src="../../../assets/img/cx.jpg" v-if="shops.is_promotion == 1" @click="Previewcode(false,'cx')">
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
          <van-icon name="arrow" style="font-size: 0.14rem"/>
        </div>
      </div>

      <div class="common_box introduce">
        <p>{{shops.bus_scope}}</p>
        <div class="introduce_img">
          <div class="img_main">
            <div style="width:30%;margin-left:2.48%;margin-top:0.1rem;"
                 v-for="(item,index) in shops.album"
                 :key="index" :id="'imgHeight'+index" :ref="'imgHeight'+index" @click="Preview(index)">
              <img style="width:100%;height:100%" :src="item" @load="heightImg(index)"/>
            </div>
          </div>
        </div>
        <!-- <van-row class="introduce_img" :gutter="20" @click="Preview">
          <van-col style="width:33.333333%" v-for="(item,index) in shops.album" :key="index" :span="24">
            <div class="grid-content bg-purple">
              <img :src="item" />
            </div>
          </van-col>
        </van-row> -->
      </div>

      <div class="common_box record_integral" v-if="shops.pay_list.length > 0">
        <div class="record_ttl clo-g">
          <span>上传人数：{{shops.pay_count}}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span>分发金额：{{shops.pay_total_money}}</span>
        </div>
        <div class="record_content">
          <ul>
            <li>
              <div style="display: flex;align-items: center">
                <van-icon name="label" class="tip"/>
                <div>{{shops.pay_list[0].add_time}}</div>
              </div>
              <div>
                ￥:{{shops.pay_list[0].money}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="qrCodeMax" v-show="qrCodeShow" @click="Previewcode(true)">
      <div id="qrCode2" v-show="codes" class="qrconde" ref="qrCode2"></div>
      <div v-show="cx" class="cx_box">
        <p class="cx_name">{{shops.name}}</p>
        <img src="../../../assets/img/cx.jpg">
        <div class="cx_btm">
          <p class="cx_t">石笋山生态平台</p>
          <p class="cx_time">{{shops.utime}}</p>
          <img src="../../../assets/img/zhang.png" class="zhang">
        </div>

      </div>

    </div>
    <div class="footer">
      <a :href="'tel:' + shops.mobile">
        <div class="left_hujiao">
          <van-icon name="phone-o"/>
          <span style="margin:0 0.1rem">呼叫</span>
        </div>
      </a>

      <!-- <div class="right_daohang">
       <van-icon name="aim"/>
       <span style="margin:0 0.1rem">导航</span>
      </div>-->
    </div>

    <router-link
      v-if="shops.is_promotion == 1"
      class="uploadpic"
      :to="{path:'/uploadpic',query:{store_id: shops.id}}"
    >
      <div class="uploadpic_icon">
        <van-icon name="plus" class=""/>
      </div>
      <div class="uploadpic_text">上传小票</div>
    </router-link>
  </div>
</template>

<script>
    import {ImagePreview} from "vant";
    import Uploadpic from "../uploadpic/uploadpic";
    import QRCode from "qrcodejs2";
    import html2canvas from "html2canvas";

    export default {
        name: "StoreMsg",
        components: {Uploadpic},
        data() {
            return {
                shops: {},
                imgData: "",
                name: "重庆石笋山公司",
                starttime: "09:00",
                endtime: "18:00",
                adress: "重庆市江北区金渝大道168号",
                qrCodeShow: false,
                codes: false,
                cx: false
            }

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
                        console.log(res.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            //生成商家二维码
            creatQrCode() {
                let QRcodeDomainName = location.href;
                let arr = QRcodeDomainName.split('/')
                let url = arr[0] + '//' + arr[2] + '/uploadpic?store_id=' + this.$route.query.id
                console.log(url)
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
                    width: 260,
                    height: 260,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    // render: 'table',
                    correctLevel: QRCode.CorrectLevel.H
                });
                var canvas = document.getElementsByTagName('canvas')[1];
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
            //图片阅览
            Previewcx: function () {

            },
            Preview: function (num) {
                ImagePreview(this.shops.album, num);
            },


            Previewcode: function (boo, e) {
                if (!boo && e == 'qrcode') {
                    this.codes = true
                    this.qrCodeShow = true;
                } else if (!boo && e == 'cx') {
                    this.cx = true
                    this.qrCodeShow = true;
                } else {
                    this.qrCodeShow = false;
                    this.codes = false;
                    this.cx = false;
                }
            },

            //获取图片
            heightImg(num) {
                let doc1 = this.$refs['imgHeight' + num][0];
                let doc = document.getElementById('imgHeight' + num);
                doc.style.height = doc1.scrollWidth + 'px'
            },


        },
        mounted() {
            this.getData();
            setTimeout(() => {
                this.creatQrCode();
            },1000);
        },
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
        justify-content: space-between;

        img {
          margin: 0 0.1rem;
          width: auto;
          height: 0.24rem;
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
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    z-index: 99999;
    // .qrconde {
    //   width: 70%;
    //   // width: 3rem;
    //   // height: 3rem;
    // }
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

          > > > .tip {
            margin-right: 5px;
            color: #009900;
          }
        }
      }
    }
  }

  .uploadpic {
    position: fixed;
    padding: 0.05rem 0;
    color: #fff !important;
    right: 0;
    bottom: 1rem;
    display: block !important;
    z-index: 1;
    font-size: 0.1rem;

    .uploadpic_icon {
      width: 0.4rem;
      line-height: 0.4rem;
      font-size: 0.2rem;
      height: 0.4rem;
      border-radius: 50%;
      background-color: rgba(0, 153, 0, 0.7);
      margin: 0 auto;
    }

    .uploadpic_text {
      background-color: rgba(0, 153, 0, 0.7);
      padding: 2px 0.05rem;
      border-radius: 0.5rem;
      margin-top: 0.05rem;
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
