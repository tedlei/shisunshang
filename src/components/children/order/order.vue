<template>
  <div>
    <div class="navigation" v-show="this.$route.query.orderid != 5">
      <ul class="clearfix">
        <li v-for="(item,index) in navItems" :class="{active:num==index}" @click="getNum(index)">{{item}}</li>
      </ul>
    </div>

    <div class="content" :style="{'padding-top':shouhou}">
      <div class="common_box item" v-for="(item,index) in orderAllItem">
        <div class="title">
          <div class="left_store">
            <router-link to="">
              <img src="../../../assets/img/stoe.png" style="width: 18px">
              <span class="storename">{{item.storename}}</span>
            </router-link>
          </div>
          <span class="state">{{navItems[num]}}</span>
        </div>

        <div class="goods">
          <div class="left_img">
            <img :src="require(`../../../assets/img/${item.goodsimg}.png`)">
          </div>
          <div class="center_text">
            <router-link to="" class="link_div">

              <div>{{item.detailes}}</div>
              <div style="color: #999999">
                <span>规格:{{item.guige}};</span>
                <span>数量:{{item.num}}</span>
              </div>

            </router-link>
            <div class="right_price">
              ￥{{item.price}}
            </div>
          </div>
        </div>

        <div class="clearfix total_box">
          <div class="add_time" v-show="num==1">
            {{item.add_time}}
          </div>
          <div class="right_total">
            <span style="margin-right: 20px">共{{item.totalnum}}件商品</span>
            <span>合计：￥{{item.total}}</span>
          </div>

        </div>

        <div class="clearfix submit_box">
          <div class="left_dtime" v-show="num==1">
            剩1小时59分钟自动关闭
          </div>
          <div class="left_dtime" v-show="isshouhou">
            <span>正在办理退款</span>
            <span>退款金额￥268.00</span>
          </div>
          <el-row class="btn_box">
            <el-row v-show="!isshouhou">
              <div v-show="num==1">
                <router-link to="/goodsdetails/Orderdetails">
                  <el-button class="left_s_btn" plain>
                    订单详情
                  </el-button>
                </router-link>
                <el-button type="success" class="right_s_btn" plain>付款</el-button>
              </div>

              <div v-show="num==2">
                <el-button class="left_s_btn" plain>取消订单</el-button>
                <el-button type="success" class="right_s_btn" plain>提醒发货</el-button>
              </div>

              <div v-show="num==3">
                <el-button class="left_s_btn" plain>查看物流</el-button>
                <el-button type="success" class="right_s_btn" plain>确认收货</el-button>
              </div>

              <div v-show="num==4">
                <el-button class="left_s_btn" plain>立即评价</el-button>
                <el-button type="success" class="right_s_btn" plain>再来一单</el-button>
              </div>
            </el-row>
            <el-row v-show="isshouhou">
              <el-button class="left_s_btn" plain>查看详情</el-button>
            </el-row>
          </el-row>

        </div>
      </div>
    </div>
    <empty></empty>

    <!--    -->
    <div>
      没有更多订单了
    </div>
  </div>
</template>

<script>

  import Headerback from "../../headerback/headerback";
  import Empty from "../empty/empty";

  export default {
    name: "order",
    components: {Empty, Headerback},

    data() {
      return {
        num: 1,
        is: 'num',
        shouhou: '',
        isshouhou: false,
        navItems: this.$route.query.orderid == 5 ? ['办理中', '退款成功', '退款成功', '退款成功', '退款成功'] : ['全部', '待付款', '待发货', '待收货', '待评价'],
        orderAllItem: [
          {
            storename: '富锦旗舰店',
            state: 2,
            price: '268.00',
            goodsimg: 'c_goods',
            detailes: '富锦年货特产坚果零食大礼包万事如意混合坚果公司送礼盒装',
            guige: '1000*10',
            num: 1,
            total: '268.00',
            totalnum: 1,
            add_time: '2020-01-13 10：02：42',
          },
          {
            storename: '富锦旗舰店',
            state: 2,
            price: '268.00',
            goodsimg: 'c_goods',
            detailes: '富锦年货特产坚果零食大礼包万事如意混合坚果公司送礼盒装',
            guige: '1000*10',
            num: 1,
            total: '268.00',
            totalnum: 1,
            add_time: '2020-01-13 10：02：42',
          },
          {
            storename: '富锦旗舰店',
            state: 2,
            price: '268.00',
            goodsimg: 'c_goods',
            detailes: '富锦年货特产坚果零食大礼包万事如意混合坚果公司送礼盒装',
            guige: '1000*10',
            num: 1,
            total: '268.00',
            totalnum: 1,
            add_time: '2020-01-13 10：02：42',
          },
          {
            storename: '富锦旗舰店',
            state: 2,
            price: '268.00',
            goodsimg: 'c_goods',
            detailes: '富锦年货特产坚果零食大礼包万事如意混合坚果公司送礼盒装',
            guige: '1000*10',
            num: 1,
            total: '268.00',
            totalnum: 1,
            add_time: '2020-01-13 10：02：42',
          }
        ],
      }
    },
    methods: {
      getNum: function (index) {
        this.num = index;
      }
    },
    mounted() {
      this.is = this.$route.query.orderid ==5 ? 'index' : 'num';
      this.isshouhou = this.$route.query.orderid ==5 ? true : false;
      this.shouhou = this.$route.query.orderid == 5 ? '43px' : '101px';
      this.num = this.$route.query.orderid
    }
  }
</script>

<style scoped lang="scss">


  .content {

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .state {
        color: #009900;
      }
    }

    .goods {
      display: flex;
      margin: 10px 0;

      .left_img {
        width: 90px;
        margin-right: 10px;
      }

      .center_text {
        width: calc(100% - 90px);
        display: flex;
        padding: 10px 0;

        .link_div {
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-right: 10px;
        }

      }
    }

    .total_box {
      margin: 10px 0;

      .add_time {
        float: left;
      }

      .right_total {
        float: right;
      }
    }

    .submit_box {
      line-height: 40px;

      .left_dtime {
        color: #009900;
        float: left;
      }

      .btn_box {
        float: right;
        a{
          display: inline-block;
        }
        .left_s_btn {
          border-color: #009900;
          color: #009900;
        }

        .right_s_btn {
          background-color: #009900;
          color: #fff;
        }
      }
    }
  }
</style>
