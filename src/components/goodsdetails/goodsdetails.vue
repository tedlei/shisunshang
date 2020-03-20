<template>
  <div>
    <header>
      <i class="el-icon-arrow-left back" @click="back"></i>
      <ul class="clearfix tips">
        <li class="active">商品</li>
        <li>详情</li>
        <li>评价</li>
      </ul>
    </header>
    <div class="main">
      <div class="">
        <el-carousel :height="imgHeight+'px'">
          <el-carousel-item v-for="(item,index) in bannerlists" :key="index">
            <img :src="require(`../../assets/img/${item}.png`)" ref="imgSize">
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 1 -->
      <div class="m_b_10 conmo_box box_one">
        <div class="name">{{name}}</div>
        <div class="gg">
          <span>礼盒装1000*6盒</span>
          <span class="share"><i class="el-icon-share"></i>分享</span>
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
      <div class="m_b_10 conmo_box box_two">
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
          <img src="../../assets/img/store_head.png">
        </div>
        <div class="right">
          <span>重庆网络科技自营店
          </span>
          <i class="el-icon-arrow-right"></i>
        </div>
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
          <div>客服</div>
        </div>
        <div>
          <div class="el-icon-shopping-cart-2"></div>
          <div>购物车</div>
        </div>
      </div>
      <div class="right">
        <div class="join_cart">
          加入购物车
        </div>
        <div class="buy">
          立即购买
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import headerback from "../headerback/headerback";
  import Header from "../header/header";

  export default {
    name: "goodsdetails",
    components: {Header},
    // components: {headerback},
    data() {
      return {
        msg: '商品详情',
        imgHeight: '',
        name: '简箪 现磨新米农家自产长香丝2.5kg煲仔饭丝苗米不抛光长粒香大米',
        bannerlists: ['banner', 'banner', 'banner', 'banner', 'banner']
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
    },
    mounted() {
      this.imgHeight = document.body.clientWidth / this.$refs.imgSize[0].width * this.$refs.imgSize[0].height
    }
  }
</script>

<style scoped lang="scss">
  header {
    font-size: 0.16rem;
    display: flex;
    justify-content: center;
    padding: 10px 15px;
    background-color: #fff;
    position: relative;

    i {
      font-size: 0.28rem;
      position: absolute;
      left: 5px;
      top: 50%;
      transform: translateY(-50%);
    }

    .tips li {
      padding: 0px 15px 10px 15px;
      float: left;
    }

    .tips li.active {
      border-bottom: 3px solid #009900;
    }
  }

  .main {
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

    .box_two, .box_three,.box_four {
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
    .box_four{
      .store_head{
        border-radius: 50%;
      }
    }

  }


/* 底部 */
  .footer_js{
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    color: #fff;
    .left{
      width: 50%;
      background-color: #333;

      display: flex;
      justify-content: space-around;
      padding: 5px 0;
    }
    .right{
      width: 50%;
      display: flex;
      .join_cart{
        width: 50%;
        line-height: 45px;
        background-color: #48a248;
      }
      .buy{
        width: 50%;
        line-height: 45px;
        background-color: #009900;
      }
    }
  }
</style>
