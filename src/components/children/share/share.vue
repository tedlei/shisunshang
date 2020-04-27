<template>
  <div class="content">
    <ul class="share_list">
      <li v-for="item in sharelists" :key="item.id" @click="todetail(item.id)" class="common_box">
        <div class="left_img">
          <van-image
            width="100%"
            height=""
            fit="cover"
            :src="item.imgsrc"
          />
        </div>
        <div class="right_msg">
          <div style="width: 100%">
            <div class="name">
              {{item.name}}
            </div>
            <div class="num">
              销量{{item.num}}件
            </div>
            <div class="price">
              <span>￥{{item.price}}</span>
              <div class="font_fx" @click.stop="share(item.id)">分享</div>
              <!-- <i class="el-icon-share" @click.stop="share(item.id)"></i> -->
            </div>
          </div>
        </div>
      </li>
    </ul>
    <van-popup
      v-model="shareshow"
      :style="{ background:'none',padding:'0.1rem',width:'100%',borderRadius:'5px',height:'100%'}"
      @click="closepop"
    >
      <div style="text-align: right">
        <img src="../../../assets/img/zhi.png" class="zhi">
      </div>
      <div class="share_tips">
        <strong>立即分享给好友吧</strong>
        <p>点击屏幕右上角将本页面分享给好友</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
    export default {
        name: "share",
        data() {
            return {
                sharelists: [],
                shareshow: false,
            }
        },
        methods: {
            getlist: function () {
                let parms = {
                    method: 'get.goods.share.list'
                }
                this.$post('/api/v1/goods', parms)
                    .then((response) => {
                        this.sharelists = response.data
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            //分享
            share: function (e) {
                console.log(e);
                // this.shareshow = true;
                this.$router.push({
                    path: '/goodsdetails?id=' + e
                })
                // let userinfo = JSON.parse(this.$store.getters.getuserinfo)
                // if (userinfo) {
                //     let shareConfig = {
                //         title: '国健生态平台',
                //         desc: '国健生态平台!Come on.!',
                //         link: location.host + '/goodsdetails' + '?id=' + e + '&state=' + userinfo.referee_number,
                //         imgUrl: 'http://gj.wjeys.com/public/up/gj_wjeys_com-2-2-20191216184918-14_106_130_91-615694.jpg',
                //     };
                //     let url = location.href
                //     wechatAuth(url, shareConfig);
                // }
            },
            //关闭pop
            closepop: function () {
                this.shareshow = false;
            },
            todetail: function (e) {
                this.$router.push({
                    path: '/goodsdetails',
                    query: {
                        id: e
                    }
                })
            }
        },
        mounted() {
            this.getlist()
        }
    }
</script>

<style scoped lang="scss">
  /deep/ .app {
    padding-bottom: 0;
  }

  .content {
    bottom: 0.65rem;
    .share_list {
      text-align: left;
      li {

        display: flex;
        border-bottom: 1px solid #f2f2f2;

        .left_img {
          width: 30vw;
        }

        .right_msg {
          width: 70vw;
          padding-left: 10px;
          display: flex;
          align-items: center;

          .name {
            font-size: 0.16rem;
          }

          .num {
            color: #999999;
          }

          .price {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.18rem;

            span {
              color: #009900;
            }

            i {
              color: #999999;
            }

            .font_fx {
              width: 0.5rem;
              height: 0.25rem;
              text-align: center;
              line-height: 0.25rem;
              font-size: 0.14rem;
              color: #009900;
            }
          }
        }
      }
    }

    .zhi {
      width: 30%;
    }

    .share_tips {
      color: #fff;
    }
  }
</style>
