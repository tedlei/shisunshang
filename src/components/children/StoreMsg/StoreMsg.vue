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
        <span class="left_name">{{shops.name}}</span>
        <img src="../../../assets/img/lian.png" v-if="shops.is_promotion == 1">
      </div>
      <div class="time">
        营业时间：{{shops.bus_hours}}
      </div>
      <div class="adress">
        <div>地址：{{shops.address}}</div>
        <!-- <div class="clo-g juli">距你步行3.63公里</div> -->
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
      <router-link class="common_btn" :to="{path:'/uploadpic',query:{store_id: shops.id}}" style="border-radius: 0.4rem;color: #fff !important;margin-top: 0.3rem">上传小票</router-link>
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
            //图片阅览
            Preview: function () {
                ImagePreview(this.shops.album);
            }
        },
        mounted() {
            this.getData();

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
        justify-content: space-between;

        .left_name {
          width: 70%;
        }

        img {
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
