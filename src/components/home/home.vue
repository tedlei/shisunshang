<template>
  <div class="main_box">
    <!--  头部  -->
    <header>
      <el-row type="flex" class="row-bg" justify="space-between" style="align-items: center;width: 100%">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            重庆<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">重庆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--  搜索组件    -->
        <div @click="opensearch" style="width: 100%">
          <search :dmsg='msg'></search>
        </div>

        <!--扫码-->
        <!-- <div class="sao">
          <i class="el-icon-full-screen"></i>
          <div>扫码</div>
        </div> -->
        <!--消息-->
        <div class="news">
          <router-link to="/news">
            <i class="el-icon-chat-dot-round"></i>
            <div>消息</div>
          </router-link>
        </div>
      </el-row>
    </header>
    <!--  轮播组件  -->

    <div class="banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in bannermsg" :key="index">
            <img :src="item.img" style="border-radius: 5px">
          </div>
        </div>

      </div>
    </div>

    <!--  分类按钮  -->
    <div style="padding:0.1rem">
      <el-row :gutter="0" class="f-nav">
        <el-col :span="5" v-for="(item, index) in categorylist" :key="index">
          <div class="item" @click="doting(item.id,item.module)" style="margin-bottom: 0.1rem">
            <img :src="item.icon">
            <p>{{item.cate_name}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--  公告  -->
    <div class="notice">
      <img src="../../assets/img/icon1.png">
      <el-carousel height="0.2rem" direction="vertical" :autoplay="true">
        <el-carousel-item v-for="(item,items) in news" :key="items">
          <router-link :to="{path:'/news/newsdetail',query:{id:item.id}}">
            {{ item.title }}
          </router-link>
        </el-carousel-item>
      </el-carousel>
      <span class="clo-g"><router-link to="/news">查看</router-link></span>
    </div>

    <!--  商品列表  -->
    <div class="list" v-for="(item,index) in lists" :key="index">
      <div class="top_name">
        <span>{{item.module}}</span>
        <span class="text_rich">新款商品下单</span>
      </div>
      <img :src="item.ad.img">
      <el-row class="goodslist">
        <router-link v-for="(goods, index) in item.goods" :key="index"
                     :to="{path:'/goodsdetails',query:{id:goods.id}}">
          <el-col :span="12">
            <div class="item">
              <van-image
                width="100%"
                height="1.92rem"
                fit="cover"
                :src="goods.imgsrc"
              />
              <div style="">
                <div class="goodsdtt">{{goods.name}}</div>
                <div class="goodsprice clo-g">{{goods.price}}</div>
              </div>
            </div>
          </el-col>
        </router-link>
      </el-row>
    </div>
    <!--  -->
    <signin></signin>

  </div>


</template>

<script>
    //1.先使用import导入你要在该组件中使用的子组件
    import Carousel from '../carousel-cp/carousel';
    import Search from "../search/search";
    import Bus from "../../assets/js/bus";
    import Swiper from 'swiper';
    import Signin from "../Signin/Signin";

    export default {
        name: "home",
        //2.然后,在components中写入子组件
        components: {Signin, Search, Carousel},
        data() {
            return {
                msg: '首页',
                name: ['顾客区', '会员区', '零售区', '商家区', '签到区', '顾客区', '会员区', '零售区', '商家区', '签到区',],
                categorylist: [],
                bannermsg: [],
                lists: [],
                news: [],
            }
        },
        methods: {
            //获取首页
            getHomeMsg: function () {
                const ad_data = {method: 'get.ad.banner.list'},
                    category = {method: 'get.category.list'},
                    goods = {method: 'get.ad.goods.list'},
                    news = {method: 'get.news.list'};
                //获取banner
                this.$post('/api/v1/ad', ad_data)
                    .then((response) => {
                        this.bannermsg = response.data
                    }).catch(function (error) {
                    console.log(error);
                });
                //获取模块列表
                this.$post('/api/v1/category', category)
                    .then((response) => {
                        this.categorylist = response.data
                    }).catch(function (error) {
                    console.log(error);
                });
                //获取首页商品
                this.$post('/api/v1/ad', goods)
                    .then((response) => {
                        this.lists = response.data;
                    }).catch(function (error) {
                    console.log(error);
                });
                //获取新闻列表
                this.$post('/api/v1/news', news)
                    .then((response) => {
                        this.news = response.data.items
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            getUserinfo: function () {

            },
            //分类按钮
            doting: function (e, m) {
                if (e == 5) {
                    this.$router.push({
                        path: '/Luckdraw'
                    })
                } else if (e == 7) {
                    Bus.$emit('signtans', true)
                } else if (e == 8) {
                    this.$router.push({
                        path: '/help'
                    })
                } else {
                    this.$router.push({
                        path: '/Special-area',
                        query: {typeid: m}
                    })

                }

            },
            //搜索
            opensearch: function () {
                Bus.$emit('searchval', true)
            },

        },
        created() {
            setTimeout(() => {
                const mySwiper = new Swiper('.swiper-container', {
                    slidesPerView: 1.15,
                    observer: true,
                    slidesOffsetAfter: 15,
                    direction: 'horizontal',
                    observeParents: true,
                    spaceBetween: 20,
                    loop: true,
                    centeredSlides: true,
                    effect: "coverflow",
                    grabCursor: true,
                    watchSlidesProgress: true,
                    loopedSlides: 5,
                    autoplay: {
                        delay: 3000,//自动播放速度
                        disableOnInteraction: false//鼠标移上去时是否还继续播放
                    },
                    coverflowEffect: {
                        rotate: 0,
                        stretch: 0,
                        depth: 30,
                        modifier: 3,
                        slideShadows: false
                    },
                    speed: 1000,
                    initialSlide: 1,
                    // lazy: {loadPrevNext: true,},
                    pagination: {
                        el: '.swiper-pagination',
                    },
                });
            }, 300)
        },
        mounted() {
            this.getHomeMsg();
            this.getUserinfo();

        }

    }
</script>

<style lang="scss" scoped>


  header {
    text-align: left;
    padding: 0 0.1rem;
    height: 0.55rem;
    display: flex;
    align-items: center;

    .sao, .news {
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
    justify-content: space-between;
    align-items: center;
    text-align: left;

    .el-carousel {
      width: 80%;
    }

    h3 {
      font-weight: normal;
    }

    img {
      width: 20px;
    }
  }

  .el-carousel__indicators--vertical {
    display: none !important;
  }
</style>
