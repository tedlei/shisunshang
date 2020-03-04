<template>
  <div class="main_box">
    <!--  头部  -->

    <header>
      <el-row type="flex" class="row-bg" justify="space-between" style="align-items: center">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            重庆<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--  搜索组件    -->
        <search :dmsg='msg'></search>
        <!--扫码-->
        <div class="sao">
          <i class="el-icon-full-screen"></i>
          <div>扫码</div>
        </div>
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
      <carousel :hmsg='msg'></carousel>
    </div>

    <!--  分类按钮  -->
    <div style="padding:10px">
      <el-row :gutter="20" class="f-nav">
        <el-col :span="5" v-for="(o, index) in 10" :key="o">
          <div class="item">
            <router-link to="/classification">
              <img src="../../assets/img/icon.png">
              <p>{{name[index]}}</p>
            </router-link>

          </div>
        </el-col>
      </el-row>
    </div>
    <!--  公告  -->
    <div class="notice">
      <img src="../../assets/img/icon1.png">
      <el-carousel height="20px" direction="vertical" :autoplay="true">
        <el-carousel-item v-for="(item,items) in ['ss','ssss','ssssss']" :key="items">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <span class="clo-g"><router-link to="/news">查看</router-link></span>
    </div>

    <!--  商品列表  -->
    <div class="list" v-for="(item,index) in lists" :key="index">
      <div class="top_name">{{item.topname}}</div>
      <img :src="require(`../../assets/img/${item.bannersrc}.png`)">
      <el-row class="goodslist">
        <router-link to="/goodsdetails">
          <el-col :span="12" v-for="(goods, goodsindex) in item.goodsitem" :key="goodsindex">
            <div class="item">
              <img :src="require(`../../assets/img/${goods.goodsimg}.png`)">
              <div style="">
                <div class="goodsdtt">{{goods.goodsname}}</div>
                <div class="goodsprice clo-g">{{goods.goodsrice}}</div>
              </div>
            </div>
          </el-col>
        </router-link>
      </el-row>
    </div>
    <!--  -->
    <div>
      没得更多了
    </div>
  </div>


</template>

<script>
    import Axios from 'axios';
    //1.先使用import导入你要在该组件中使用的子组件
    import Carousel from '../carousel-cp/carousel';
    import Search from "../search/search";


    export default {
        name: "home",
        //2.然后,在components中写入子组件
        components: {Search, Carousel},
        data() {
            return {
                msg: '首页',
                name: ['顾客区', '会员区', '零售区', '商家区', '签到区', '顾客区', '会员区', '零售区', '商家区', '签到区',],
                lists: [
                    {
                        'topname': '新款商品',
                        'goodsitem': [
                            {
                                'goodsname': '云阖·永川秀芽【炒青】100g',
                                'goodsrice': '￥98.00',
                                'goodsimg': 'goods_img'
                            },
                            {
                                'goodsname': '云阖·永川秀芽【炒青】100g',
                                'goodsrice': '￥98.00',
                                'goodsimg': 'goods_img'
                            },
                            {
                                'goodsname': '云阖·永川秀芽【炒青】100g',
                                'goodsrice': '￥98.00',
                                'goodsimg': 'goods_img'
                            },
                            {
                                'goodsname': '云阖·永川秀芽【炒青】100g',
                                'goodsrice': '￥98.00',
                                'goodsimg': 'goods_img'
                            }
                        ],
                        'bannersrc': 'goods_banner'
                    },
                    {
                        'topname': '新款商品',
                        'goodsitem': [
                            {
                                'goodsname': '云阖·永川秀芽【炒青】100g',
                                'goodsrice': '￥98.00',
                                'goodsimg': 'goods_img'
                            },
                            {
                                'goodsname': '云阖·永川秀芽【炒青】100g',
                                'goodsrice': '￥98.00',
                                'goodsimg': 'goods_img'
                            },
                            {
                                'goodsname': '云阖·永川秀芽【炒青】100g',
                                'goodsrice': '￥98.00',
                                'goodsimg': 'goods_img'
                            },
                            {
                                'goodsname': '云阖·永川秀芽【炒青】100g',
                                'goodsrice': '￥98.00',
                                'goodsimg': 'goods_img'
                            }
                        ],
                        'bannersrc': 'goods_banner'
                    },
                    {
                        'topname': '新款商品',
                        'goodsitem': [
                            {
                                'goodsname': '云阖·永川秀芽【炒青】100g',
                                'goodsrice': '￥98.00',
                                'goodsimg': 'goods_img'
                            },
                            {
                                'goodsname': '云阖·永川秀芽【炒青】100g',
                                'goodsrice': '￥98.00',
                                'goodsimg': 'goods_img'
                            },
                            {
                                'goodsname': '云阖·永川秀芽【炒青】100g',
                                'goodsrice': '￥98.00',
                                'goodsimg': 'goods_img'
                            },
                            {
                                'goodsname': '云阖·永川秀芽【炒青】100g',
                                'goodsrice': '￥98.00',
                                'goodsimg': 'goods_img'
                            }
                        ],
                        'bannersrc': 'goods_banner'
                    },
                ]
            }
        },
        methods: {},
        mounted() {

            // var data = {params:7758521 }
            // console.log(data)
            // Axios.post('/api/v1/ad',
            //     data,
            //     {headers: {'Content-Type': 'application/json;charset=UTF-8'}}
            // ).then(function (response) {
            //     console.log(response);
            // }).catch(function (error) {
            //     console.log(error);
            // });

          var data = {};
          data.method = "get.ad.banner.list";

          var that = this;


          Axios.post("/api/v1/ad",data, {headers: {'content-type': 'application/x-www-form-urlencoded'}}).then(function(result) {
            console.log(result);
          });


            //
            // console.log(data);
            // return false;
            // this.$post('/api/v1/ad', {method:"get.ad.banner.list"})
            //     .then((response) => {
            //         console.log(response)
            //     })

        }

    }
</script>

<style lang="scss" scoped>


  header {
    text-align: left;
    padding: 10px;

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
    width: 100%;
  }


  /*  公告 */
  .notice {
    padding: 10px 12px;
    border-radius: 100px;
    background-color: #f9f9f9;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-carousel {
      width: 80%;
    }

    img {
      width: 20px;
    }
  }

  /*.banner /deep/ .el-carousel__item{*/

  /*}*/

  /*.banner /deep/ .el-carousel__item.is-active {*/
  /*  transform:translateX(50%) scale(1.8) !important;*/
  /*}*/

  /*.banner .el-carousel--horizontal{*/
  /*  overflow: visible;*/
  /*}*/

  .el-carousel__indicators--vertical {
    display: none !important;
  }


</style>
