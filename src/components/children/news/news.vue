<template>
  <div>
    <header class="news_header">
      <ul class="clearfix">
        <li>
          <div class="img">
            <img src="../../../assets/img/news_wl.png">
            <span>5</span>
          </div>
          <p>物流售后</p>
        </li>
        <li>
          <div class="img">
            <img src="../../../assets/img/news_tz.png">
            <span>10+</span>
          </div>
          <p>通知消息</p>
        </li>
        <li>
          <div class="img">
            <img src="../../../assets/img/news_hd.png">
            <span></span>
          </div>
          <p>互动消息</p>
        </li>
        <li>
          <div class="img">
            <img src="../../../assets/img/news_kf.png">
            <span></span>
          </div>
          <p>我的客服</p>
        </li>
      </ul>
    </header>

    <div class="content">
      <div class="news" :style="{'min-height':boxHeight}">
        <ul v-show="true">
          <li v-for="(item,index) in newslists" :key="index">
            <div class="left_img"><img src="../../../assets/img/news_head.png"></div>
            <div class="right_msg">
              <div class="user">
                <span class="name">{{item.title}}</span>
              </div>
              <p class="add_time">
                <span class="time">{{item.add_time}}</span>
                <router-link :to="{path:'/news/newsdetail',query:{id:item.id}}">
                  查看详情
                </router-link>
              </p>
            </div>
          </li>
        </ul>
        <div v-show="false" :style="{'height':boxHeight,'display':flex,'alignItems':center,'justify-content':center}">
          <img src="../../../assets/img/nonews.png" style="width: 40%;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Headerback from "../../headerback/headerback";
    import Header from "../../header/header";

    export default {
        name: "news",
        components: {Header, Headerback},
        data() {
            return {
                boxHeight: '',
                flex: 'flex',
                center: 'center',
                newslists: [
                    {
                        headimg: 'news_head',
                        text: '亲爱的客户你好，你购买的商品已经发货你购买的商品已经发货',
                        name: '小伙子',
                        time: '昨天',
                    },
                    {
                        headimg: 'news_head',
                        text: '亲爱的客户你好，你购买的商品已经发货你购买的商品已经发货',
                        name: '小伙子',
                        time: '昨天',
                    },
                    {
                        headimg: 'news_head',
                        text: '亲爱的客户你好，你购买的商品已经发货你购买的商品已经发货',
                        name: '小伙子',
                        time: '昨天',
                    },
                    {
                        headimg: 'news_head',
                        text: '亲爱的客户你好，你购买的商品已经发货你购买的商品已经发货',
                        name: '小伙子',
                        time: '昨天',
                    },
                    {
                        headimg: 'news_head',
                        text: '亲爱的客户你好，你购买的商品已经发货你购买的商品已经发货',
                        name: '小伙子',
                        time: '昨天',
                    },

                ]
            }
        },
        methods: {
            getnews: function () {
                let news = {method: 'get.news.list'};
                //获取新闻列表
                this.$post('/api/v1/news', news)
                    .then((response) => {
                        this.newslists = response.data.items
                    }).catch(function (error) {
                    console.log(error);
                });
            }
        },
        mounted() {
            this.getnews()
            this.boxHeight = ((document.documentElement.clientHeight || document.body.clientHeight) - 161.5) + 'px';
        }
    }
</script>

<style scoped lang="scss">
  .news_header {
    position: fixed;
    top: 43px;
    z-index: 9;

    ul {
      padding: 10px;
      background-color: #fff;

      li {
        float: left;
        width: 25%;
        padding: 0 20px;

        p {
          color: #999999;
          margin-top: 10px;
        }

        .img {
          position: relative;

          span {
            display: inline-block;
            position: absolute;
            right: 0;
            top: 0;
            color: #fff;
            background-color: #009900;
            min-width: 24px;
            padding: 0 2px;
            border-radius: 24px;
          }
        }
      }
    }
  }

  .content {
    padding-top: 161.5px;
    background: none;

    .news {
      background-color: #fff;
      padding: 0 10px;

      li {
        display: flex;
        text-align: left;

        position: relative;
        padding: 0.1rem 0;

        .left_img {
          width: 0.8rem;
          margin-right: 0.1rem;
        }

        .right_msg {
          width: calc(100% - 0.9rem);
          padding: 5px 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .user {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.1rem;

            .name {
              font-size: 0.16rem;
            }

            .time {
              color: #999999;
              text-align: right;
            }
          }

          p {
            color: #999999;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            display: flex;
            justify-content: space-between;
          }
        }
      }

      li:after {
        content: '';
        display: inline-block;
        border: 1px solid #f2f2f2;
        position: absolute;
        width: 100%;
        bottom: 0;
        right: 0;
      }
    }
  }
</style>
