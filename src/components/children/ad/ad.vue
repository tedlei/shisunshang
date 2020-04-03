<template>
  <div class="content">
    <ul class="ad_list">
      <li v-for="(item,index) in adlists" :key="index">
        <router-link :to="{path:'/mine/ad/addetails',query:{id:item.id}}">
          <div class="left_img">
            <van-image
              width="0.8rem"
              height="0.8rem"
              fit="cover"
              :src="item.img"
              style="display: block"
            />
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
            this.getad()
        }
    }
</script>

<style scoped lang="scss">
  .content {
    .ad_list {
      background-color: #fff;
      padding: 0.1rem;
      text-align: left;

      li {
        margin-bottom: 0.2rem;
        padding-bottom: 0.1rem;
        border-bottom: 1px solid #f2f2f2;
        a {
          display: flex;
          align-items: center;
          .right_msg {

            padding-left: 0.15rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .name {
              .tt_name {
                font-size: 0.12rem;
                margin:  0.05rem 0 0.1rem 0;
              }
            }

            .time {
              color: #999999;
              font-size: 0.12rem;
            }
          }
        }
      }
      li:nth-last-child(1){
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

    }
  }
</style>
