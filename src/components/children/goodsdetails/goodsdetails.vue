<template>
  <div>
    <div class="main">
      <div class="">
        <el-carousel :height="imgHeight+'px'">
          <el-carousel-item v-for="(item,index) in bannerlists" :key="index">
            <img :src="require(`../../../assets/img/${item}.png`)" ref="imgSize">
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 1 -->
      <div class="m_b_10 conmo_box box_one">
        <div class="name">{{name}}</div>
        <div class="gg">
          <span>礼盒装1000*6盒</span>
          <span class="share">
            <router-link to="/goodsdetails/share"><i class="el-icon-share"></i>分享</router-link>
          </span>
        </div>
        <div class="price">
          ￥560.00
        </div>
        <div class="ys">
          <span>已售4354</span>
          <span style="margin-left: 40px">库存充足</span>
        </div>
      </div>
      <!-- 2 -->
      <div class="m_b_10 conmo_box box_two" @click="drawer = true">
        <span class="left">选择</span>
        <div class="right">
          <span>已选择：1000*6</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <!--   3   -->
      <div class="m_b_10 conmo_box box_three">
        <span class="left">送至</span>
        <div class="right">
          <span><i class="el-icon-location-outline"></i>重庆市 渝北区</span>
          <span>免运费</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <!--   4   -->
      <div class="m_b_10 conmo_box box_four">
        <div class="left store_head">
          <img src="../../../assets/img/store_head.png">
        </div>
        <div class="right">
          <span>重庆网络科技自营店</span>
          <i class="el-icon-arrow-right"></i>
        </div>

      </div>
      <!--   5   -->
      <div class="m_b_10 conmo_box box_five">
        <div class="left vip_head">
          购买方式
        </div>
        <div class="right">
          <span>会员购买</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <!--   商品评价   -->
      <div class="m_b_10 conmo_box goods_evaluate">
        <div class="head">商品评价（23）</div>
        <ul class="goods_evaluate_list clearfix">
          <li>全部(23)</li>
          <li>好评(23)</li>
          <li>有图(23)</li>
          <li>中评(0)</li>
          <li>差评(0)</li>
        </ul>
        <div class="user_evaluate">
          <div class="evaluate_head">
            <div class="user">
              <img src="../../../assets/img/store_head.png" style="width: 24px">
              <span>153******1344</span>
            </div>
            <div class="add_time">2020.1.09</div>
          </div>
          <p class="text_p">
            产品好得很！
          </p>
          <div class="watch_all"><span>查看全部评价</span></div>
        </div>
      </div>
      <div class="conmo_box tuijian_slide">
        <title style="display: block;">
          <el-divider>猜你喜欢</el-divider>
        </title>
        <!--  轮播组件  -->
        <el-carousel :height="boxHeight+'px'">
          <el-carousel-item v-for="(item,index) in slidelists" :key="index">
            <div class="list" ref="boxSize">
              <el-row class="goodslist">
                <el-col :span="12" v-for="(goods, goodsindex) in item.goodsitem" :key="goodsindex">
                  <div class="item">
                    <img :src="require(`../../../assets/img/${goods.goodsimg}.png`)">
                    <div style="">
                      <div class="goodsdtt">{{goods.goodsname}}</div>
                      <div class="goodsprice clo-g">
                        <span>{{goods.goodsrice}}</span>
                        <i class="el-icon-circle-plus-outline"></i>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="conmo_box bot_img_box">
        <img src="../../../assets/img/banner.png">
      </div>
    </div>

    <!-- 底部   -->
    <div class="footer_js">
      <div class="left">
        <div>
          <div class="el-icon-chat-line-round"></div>
          <div>客服</div>
        </div>
        <div>
          <div class="el-icon-chat-dot-round"></div>
          <div>收藏</div>
        </div>
        <div>
          <router-link to="/my_cart">
            <div class="el-icon-shopping-cart-2"></div>
            <div>购物车</div>
          </router-link>

        </div>
      </div>
      <div class="right">
        <div class="join_cart">
          加入购物车
        </div>
        <div class="buy">
          <router-link to="/goodsdetails/makeorder">
            立即购买
          </router-link>
        </div>
      </div>
    </div>
    <!-- 规格选择 -->
    <el-drawer
      title=""
      :visible.sync="drawer"
      :before-close="handleClose"
      :direction="direction"
      :size="'auto'"
      class="Specifications_box">

      <div class="top_msg">
        <div style="width: 100px;margin-top: -20px">
          <img :src="require(`../../../assets/img/banner.png`)">
        </div>
        <div class="right_msg">
          <div class="clo-g price">￥560.00</div>
          <p>库存：359件</p>
          <p>已选：1000*6盒</p>
        </div>

      </div>
      <div class="Specifications_select">
        <p>规格</p>
        <ul class="clearfix select">
          <li class="active">1000*6盒</li>
          <li>1000*6盒</li>
          <li>1000*6盒</li>
          <li>1000*6盒</li>
          <li>1000*6盒</li>
          <li>1000*6盒</li>
        </ul>
      </div>
      <div class="num_box">
        <div>数量</div>
        <el-input-number size="mini" v-model="nums"></el-input-number>
      </div>
      <div class="btn_bottom">
        <div class="carts">加入购物车</div>
        <div class="buy">
          <router-link to="/goodsdetails/makeorder">立即购买</router-link>
        </div>
      </div>
    </el-drawer>

  </div>

</template>

<script>
  export default {
    name: "goodsdetails",
    data() {
      return {
        msg: '商品详情',
        imgHeight: '',
        boxHeight: '',
        drawer: false,
        direction: 'btt',
        nums: 1,
        name: '简箪 现磨新米农家自产长香丝2.5kg煲仔饭丝苗米不抛光长粒香大米',
        bannerlists: ['banner', 'banner', 'banner', 'banner', 'banner'],
        slidelists: [
          {
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
          },
          {
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
          }
        ],
      }
    },

    methods: {
      back: function () {
        if (window.history.length <= 1) {
          this.$router.push({path: '/'})
          return false
        } else {
          this.$router.go(-1)
        }
      },
      // 关闭窗口
      handleClose(done) {
        done();

      }
    },


    mounted() {
      this.imgHeight = document.documentElement.clientWidth || document.body.clientWidth / this.$refs.imgSize[0].width * this.$refs.imgSize[0].height;
      setTimeout(() => {
        this.boxHeight = this.$refs.boxSize[0].offsetHeight + 20;
      }, 1000);
      this.$nextTick(() => {
        this.boxHeight = this.$refs.boxSize[0].offsetHeight + 20;
        console.log(this.$refs.boxSize[0].offsetHeight)
      })
    }
  }
</script>

<style scoped lang="scss">

  .main {
    padding-top: 54px;

    .conmo_box {
      background-color: #fff;
      padding: 10px;
      text-align: left;
    }

    .box_one {
      .name {
        font-size: 0.18rem;
        font-weight: bold;
      }

      .gg {
        color: #999;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .share {
          background-color: #f2f2f2;
          line-height: 28px;
          padding: 0 10px;
          border-radius: 28px;
        }
      }

      .price {
        color: #009900;
        font-weight: bold;
        font-size: 0.18rem;
        margin: 10px 0;
      }

      .ys {
        color: #999999;
      }
    }

    .box_two, .box_three, .box_four {
      display: flex;

      .left {
        margin-right: 10px;
        width: 30px;
        color: #999999;
      }

      .right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: calc(100% - 40px);
      }
    }

    .box_four {
      .store_head {
        border-radius: 50%;
      }
    }

    .box_five {
      display: flex;

      .left {
        width: 100px;
      }

      .right {
        width: calc(100% - 100px);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

    }

    .goods_evaluate {
      font-size: 0.16rem;

      .head {
        font-size: 0.18rem;
        margin-bottom: 20px;
      }

      .goods_evaluate_list li {
        float: left;
        line-height: 33px;
        color: #fff;
        border-radius: 33px;
        background-color: #7fcc7f;
        padding: 0 12px;
        margin-right: 10px;
        margin-bottom: 10px;
      }

      .user_evaluate {
        .evaluate_head {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .add_time {
          color: #999999;
        }

        .text_p {
          margin: 20px 0;
        }

        .watch_all {
          text-align: center;

          span {
            display: inline-block;
            line-height: 30px;
            padding: 0 20px;
            background-color: #009900;
            border-radius: 30px;
            color: #fff;
          }
        }


      }
    }
  }

  /* 推荐 */
  .tuijian_slide /deep/ .el-divider__text {
    font-size: 0.18rem;
  }

  .tuijian_slide {
    .list .goodslist {
      padding: 0;
      background-color: #fff;
    }

    .list .goodslist .item {
      background-color: #fafafa;
    }

    .goodsprice {
      display: flex;
      justify-content: space-between;
      align-items: center;

      i {
        margin-top: 2px;
      }
    }
  }

  .tuijian_slide /deep/ .el-carousel__indicators--horizontal {
    background-color: #fafafa;
    height: 26px;
    border-radius: 26px;
    padding: 0 20px;

    .el-carousel__button {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #999;

    }

    .el-carousel__indicator.is-active button {
      background-color: #009900;
    }

  }

  /* 底部 */
  .footer_js {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    color: #fff;
    z-index: 9;

    .left {
      width: 50%;
      background-color: #333;

      display: flex;
      justify-content: space-around;
      padding: 5px 0;
    }

    .right {
      width: 50%;
      display: flex;

      .join_cart {
        width: 50%;
        line-height: 45px;
        background-color: #48a248;
      }

      .buy {
        width: 50%;
        line-height: 45px;
        background-color: #009900;
      }
    }
  }

  .Specifications_box {
    height: auto;

    /deep/ .el-drawer {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      padding-bottom: 50px;
      overflow: visible;

      section.el-drawer__body {
        padding: 0 10px;

      }

      header.el-drawer__header {
        padding: 0;
        margin: 0;

        .el-drawer__close-btn {
          position: absolute;
          right: 20px;
          top: 10px;
        }
      }
    }

    .top_msg {
      display: flex;
      align-items: flex-end;

      .right_msg {
        margin: 0 0 10px 20px;
        text-align: left;

        .price {
          font-size: 0.16rem;
          font-weight: bold;
        }

        p {
          color: #999999;
        }
      }
    }

    .Specifications_select {
      margin: 10px 0;

      p {
        text-align: left;
        font-size: 0.16rem;
        padding: 10px 0;
      }

      .select {
        li {
          color: #999999;
          float: left;
          margin: 0 10px 10px 0;
          line-height: 35px;
          border-radius: 35px;
          border: 1px solid #999;
          padding: 0 15px;
        }

        li.active {
          color: #009900;
          border: 1px solid #009900;
        }
      }
    }

    .num_box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;

      /deep/ .el-input-number--mini {
        width: 100px;
      }

      /deep/ span {
        border-radius: 50%;
        border: 1px solid #999999;
      }

      /deep/ input {
        background: none;
      }
    }

    .btn_bottom {
      display: flex;
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;

      div {
        line-height: 50px;
        color: #fff;
        width: 50%;
      }

      .carts {
        background-color: #333;
      }

      .buy {
        background-color: #009900;
      }
    }
  }
</style>
