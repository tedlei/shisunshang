<template>
  <div class="content main_box">
    <!--  头部  -->
    <header>
      <van-row
        type="flex"
        class="row-bg"
        justify="space-between"
        style="align-items: center;width: 100%"
      >
        <!--  搜索组件    -->
        <div @click="opensearch" style="width: 100%">
          <search :dmsg="msg"></search>
        </div>
        <!--扫码-->
      </van-row>
    </header>
    <!--  轮播组件  -->
    <div class="banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in bannermsg" :key="index">
            <router-link :to="{path:item.url}">
              <img :src="item.img" style="border-radius: 5px"/>
            </router-link>
          </div>
        </div>

      </div>
      <div class="swiper-pagination"></div>
    </div>

    <!--  分类按钮  -->
    <div style="padding:0.1rem">
      <el-row :gutter="0" class="f-nav">
        <el-col :span="5" v-for="(item, index) in categorylist" :key="index">
          <div
            class="item"
            @click="doting(item.id,item.module)"
            style="margin-bottom: 0.1rem"
          >
            <img :src="item.icon"/>
            <p>{{item.cate_name}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--  公告  -->

    <div class="notice">
      <img src="../../assets/img/icon1.png"/>

      <van-swipe style="height: 0.2rem;margin-left: 0.05rem" :autoplay="2000" :show-indicators="false" vertical>
        <van-swipe-item v-for="(item,items) in news" :key="items">
          <router-link :to="{path:'/news/newsdetail',query:{id:item.id}}">{{ item.title }}</router-link>
        </van-swipe-item>
      </van-swipe>

    </div>

    <!--  商品列表  -->
    <div class="goods_lists">
      <div class="list" v-for="(item,index) in lists" :key="index">
        <div class="top_name">
          <span>{{item.module}}</span>
          <span class="text_rich">{{item.message}}</span>
        </div>
        <router-link :to="{path:item.ad.url}">
          <img :src="item.ad.img" style="margin-bottom: 0.1rem;border-radius: 5px;"/>
        </router-link>

        <van-row class="introduce_img">
          <router-link
            v-for="(goods, index) in item.goods"
            :key="index"
            :to="{path:'/goodsdetails',query:{id:goods.id}}"
          >
            <van-col :span="12" class="lists">
              <div class="grid-content bg-purple">
                <div class="goodsk" ref="imgWidth" :style="{'height':boxheight}">
                  <div v-if="goods.is_show == 1">
                    <img src="../../assets/img/goodsk.jpg" class="goodsk_img"/>
                    <p class="goodsk_price">￥{{Number(goods.price)}}</p>
                    <p class="goodsk_p">签到金可订购</p>
                  </div>
                  <van-image width="100%" :src="goods.imgsrc"/>
                </div>
                <div class="msg">
                  <div class="text fontWrap fontWrapTwo">{{goods.name}}</div>
                  <!--                <div class="clo-g price">{{goods.price}}</div>-->
                </div>
              </div>
            </van-col>
          </router-link>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
    //1.先使用import导入你要在该组件中使用的子组件
    import Carousel from "../carousel-cp/carousel";
    import Search from "../search/search";
    import Bus from "../../assets/js/bus";
    import Swiper from "swiper";
    import Signin from "../Signin/Signin.vue";
    import address from "../../../static/address";

    export default {
        name: "home",
        //2.然后,在components中写入子组件
        components: {Search, Carousel},
        data() {
            return {
                msg: "首页",
                name: [
                    "顾客区",
                    "会员区",
                    "零售区",
                    "商家区",
                    "签到区",
                    "顾客区",
                    "会员区",
                    "零售区",
                    "商家区",
                    "签到区"
                ],
                categorylist: [],
                bannermsg: [],
                lists: [],
                news: [],
                boxheight: "",
                // qrCodeShow: false
            };
        },
        methods: {
            //显示二维码
            Previewcode: function (boo) {
                this.$router.push({path: '/codePage'})
                // if (boo) {
                //     setTimeout(() => {
                //         this.qrCodeShow = false;
                //     }, 500);
                // } else this.qrCodeShow = true;
            },
            imgLoad(index) {
                let doc = document.getElementById("imgId" + index);
                let width = this.$refs.imgWidth[index].clientWidth;
                doc.style.height = width + "px";
            },

            //获取首页
            getHomeMsg: function () {
                const ad_data = {method: "get.ad.banner.list"},
                    category = {method: "get.category.list"},
                    goods = {method: "get.ad.goods.list"},
                    news = {method: "get.news.list"};
                //获取banner
                this.$post("/api/v1/ad", ad_data)
                    .then(response => {
                        this.bannermsg = response.data;
                        this.$nextTick(() => {
                            let mySwiper = new Swiper(".swiper-container", {
                                pagination: {
                                    el: '.swiper-pagination',
                                    clickable: true,
                                },
                                slidesPerView: 1.15,
                                observer: true,
                                slidesOffsetAfter: 13,
                                direction: "horizontal",
                                observeParents: true,
                                spaceBetween: 20,
                                loop: true,
                                centeredSlides: true,
                                effect: "coverflow",
                                grabCursor: true,
                                watchSlidesProgress: true,
                                loopedSlides: 5,
                                autoplay: {
                                    delay: 3000, //自动播放速度
                                    disableOnInteraction: false //鼠标移上去时是否还继续播放
                                },
                                coverflowEffect: {
                                    rotate: 0,
                                    stretch: 0,
                                    depth: 30,
                                    modifier: 3,
                                    slideShadows: false
                                },
                                speed: 1000,
                                initialSlide: 0,
                                // lazy: {loadPrevNext: true,},
                            });
                        })
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                //获取模块列表
                this.$post("/api/v1/category", category)
                    .then(response => {
                        this.categorylist = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                //获取首页商品
                this.$post("/api/v1/ad", goods)
                    .then(response => {
                        this.lists = response.data;
                        this.$nextTick(() => {
                            this.boxheight = this.$refs.imgWidth[0].offsetWidth + 'px'
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                //获取新闻列表
                this.$post("/api/v1/news", news)
                    .then(response => {
                        this.news = response.data.items;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            //获取是否签到
            getsign: function () {
                let msg = {
                    method: 'get.sign.time.list'
                };
                this.$post('/api/v1/userSign', msg)
                    .then((response) => {
                        if (response.data.is_sign == 0) {
                            this.$dialog.confirm({
                                title: '嗨！',
                                message: '今日还未签到是否签到赢好礼呢！'
                            }).then(() => {
                                this.$router.push({
                                    path: '/Signin'
                                })
                            }).catch(() => {
                            });
                        }
                    })
            },
            //分类按钮
            doting: function (e, m) {
                if (e == 5) {
                    this.$router.push({
                        path: "/Luckdraw"
                    });
                } else if (e == 7) {
                    this.$router.push({
                        path: '/Signin'
                    })
                } else if (e == 8) {
                    this.$router.push({
                        path: "/help"
                    });
                } else if (e == 9) {
                    this.Previewcode(false);
                } else {
                    this.$router.push({
                        path: "/Special-area",
                        query: {typeid: m}
                    });
                }

            },
            //搜索
            opensearch: function () {
                Bus.$emit("searchval", true);
            }
        },
        created() {
            let users = JSON.parse(localStorage.getItem("userinfo"));
            if (!users.hrl_openid) {
                if(location.host==address[0].domain){
                    this.$router.push("/authorTwo");
                }
            }
        },
        updated() {

        },
        mounted() {

            let token = localStorage.getItem("usertoken");
            if (token) {
                this.getHomeMsg();
            }
            ;
            this.getsign()
        }
    };
</script>

<style lang="scss" scoped>
  .content {
    top: 0;
    bottom: 0.65rem;
    
    header {
      text-align: left;
      padding: 0 0.1rem;
      height: 0.55rem;
      display: flex;
      align-items: center;

      .sao,
      .news {
        min-width: 40px;
        text-align: center;
        font-size: 12px;

        i {
          font-size: 18px;
        }
      }

      .el-dropdown {
        text-align: center;
        min-width: 50px;
        margin-right: 10px;
      }
    }

    /* 广告 */
    .banner {
      > > > .swiper-pagination {
        position: inherit;

        .swiper-pagination-bullet {
          width: 0.25rem;
          height: 3px;
          border-radius: 0;
          margin: 0 5px;
          outline: 0;
        }

        .swiper-pagination-bullet-active {
          background: #009900;

        }
      }
    }

    /* 分类按钮 */

    .f-nav div img {
      width: 70%;
    }

    /*  公告 */
    .notice {
      padding: 10px 12px;
      border-radius: 100px;
      background-color: #f9f9f9;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      text-align: left;

      h3 {
        font-weight: normal;
      }

      img {
        width: 20px;
      }

    }


    .introduce_img {
      text-align: left;
      background-color: #f2f2f2;
      margin: 0 -.1rem;
      padding: .1rem .1rem 0;
      font-size: .12rem;

      .lists {
        padding: 5px;

        .price {
          padding: 5px;
        }
      }
    }


  }
</style>
