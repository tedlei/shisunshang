<template>
  <div class="content">
    <div class="store_banner">
      <van-image
        width="100%"
        height="3rem"
        fit="fill"
        :src="shops.imgurl"
      />
    </div>
    <div class="common_box store_msg">
      <div class="name">
        <span class="left_name fontWrap fontWrapOne">{{shops.name}}</span>
        <img src="../../../assets/img/lian.png" v-if="shops.is_promotion == 1">
      </div>
      <div class="time">
        营业时间：{{shops.bus_hours}}
      </div>
      <div class="adress">

        <span>地址：{{shops.address}}</span>
        <span class="clo-g juli">距你3.63公里</span>

      </div>

    </div>

    <div class="common_box s_code">
      <span>商家二维码</span>
      <div>
        <div class="qrcode" @click="Previewcode">
          <div id="qrCode" ref="qrCode"></div>
        </div>
        <img src="../../../assets/img/banner.png" style="width: 0.25rem">
        <van-icon name="arrow"/>
      </div>

    </div>

    <div class="common_box introduce">
      <p>
        {{shops.bus_scope}}
      </p>
      <van-row class="introduce_img" :gutter="20" @click="Preview">
        <van-col v-for="(item,index) in shops.album" :key="index" :span="24">
          <div class="grid-content bg-purple"><img :src="item"></div>
        </van-col>
      </van-row>
      <router-link v-if="shops.is_promotion == 1" class="common_btn"
                   :to="{path:'/uploadpic',query:{store_id: shops.id}}"
                   style="border-radius: 0.4rem;color: #fff !important;margin-top: 0.3rem">上传小票
      </router-link>
    </div>
    <div class="footer">
      <div class="left_hujiao">
        <van-icon name="phone-o"/>
        <span style="margin:0 0.1rem">呼叫</span>
      </div>
      <div class="right_daohang">
        <van-icon name="aim"/>
        <span style="margin:0 0.1rem">导航</span>
      </div>
    </div>
  </div>
</template>

<script>
    import {ImagePreview} from 'vant';
    import Uploadpic from "../uploadpic/uploadpic";
    import QRCode from 'qrcodejs2'
    export default {
        name: "StoreMsg",
        components: {Uploadpic},
        data() {
            return {
                shops: {},
                name: '重庆石笋山公司',
                starttime: '09:00',
                endtime: '18:00',
                adress: '重庆市江北区金渝大道168号',

            }
        },
        methods: {
            getData() {
                let ad_data = {
                    method: 'get.user.store.item',
                    id: this.$route.query.id
                };
                this.$post('/api/v1/userStore', ad_data)
                    .then((res) => {
                        console.log(res);
                        this.shops = res.data;

                    }).catch(function (error) {
                    console.log(error);
                });
            },
            //生成商家二维码
            creatQrCode() {
                let QRcodeDomainName = location.href;
                let qrCode = new QRCode('qrCode', {
                    text: QRcodeDomainName,// 需要转换为二维码的内容
                    width: 25,
                    height: 25,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H
                })
            },
            //图片阅览
            Preview: function () {
                ImagePreview(this.shops.album);
            },
            Previewcode: function () {
                ImagePreview('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAABP0lEQVRIS51WQZLDMAir//9o7+AWV8gSzjaXZCYxAiFBxpxzvj7XGCMfj3t8lu/zGe9xAN9jzBEgKnhiq4MZUAFjdvm+BQkADBQBEPwxSJxjboDBTQED5Bn3LcbclSieux5klSWYqHxRi5V0QC5zrET1qoDcGo1qYVWhspDWfebdy29bfqFICaJUlSBOqlwBZ90p7qikM2IG4kRu/jp8ovzACuKgqukskDhTJNxRwVJ9asyVPPbkibFccJ4EmHAB6VzMCbCn1MzavWR1uRGjHI7KQ3FwArsS5daOvtsYsnR1puQKVcVuni11uQA46t3YUd8wjWWfOLzOHzfvLNp4MyrVqDXbGRFVuszIS8ttwv/OrNJfVwnr3oFgsx11cse73a0MyU2WyfEvEatIDTweIfzDcSSpesLUdMBuRaBY/gBbf93ymXqCxwAAAABJRU5ErkJggg==');
            }
        },
        mounted() {
            this.getData();
            this.$nextTick(function () {
                this.creatQrCode()
            })
        }
    }
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

      .left_hujiao {
        width: 50%;
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

  }

</style>
