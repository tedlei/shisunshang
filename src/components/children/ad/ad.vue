<template>
  <div class="content">
    <ul class="ad_list">
      <li v-for="(item,index) in adlists" :key="index">
        <router-link :to="{path:'/mine/ad/addetails',query:{id:item.id}}">
          <div class="left_img">
            <van-image
              width="0.8rem"
              height="0.8rem"
              fit="contain"
              :src="item.img"
            />
            <!-- <img :src="item.img"> -->
          </div>
          <div class="right_msg">
            <div class="name">
              <div class="tt">{{item.title}}</div>
              <div class="tt_name">{{item.desc}}</div>
            </div>
            <div class="time">
              <span>时间：{{item.add_time}}</span>
              <span>来源：{{item.users_id}}</span>
            </div>
          </div>
        </router-link>

      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "ad",
        props: ['dmsg'],
        data() {
            return {
                adlists: []
            }
        },
        methods: {
            getad: function () {
                let _this = this,
                    admsg = {
                        method: _this.dmsg == 'myad' ? 'get.weixin.ad.user.list' : 'get.weixin.ad.list'
                    };

                this.$post('/api/v1/weixinAd', admsg)
                    .then((response) => {
                        _this.adlists = response.data.items
                        console.log(response)
                    }).catch(function (error) {
                    console.log(error);
                });
            },
        },
        mounted() {
            console.log(this.dmsg)
            this.getad()
        }
    }
</script>

<style scoped lang="scss">
  .content {
    .ad_list {
      background-color: #fff;
      padding: 10px;
      text-align: left;

      li a {
        margin-bottom: 20px;
        display: flex;
        border-bottom: 1px solid #f2f2f2;
        padding-bottom: 10px;

        .left_img {
          width: 30vw;
        }

        .right_msg {
          width: 70vw;
          padding-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .name {
            font-size: 0.16rem;

            .tt_name {
              font-size: 0.14rem;
              margin: 5px 0;
            }
          }

          .time {
            color: #999999;
            font-size: 0.12rem;
          }
        }

      }
    }
  }
</style>
