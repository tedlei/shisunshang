<template>
  <div>
    <header class="m_b_10">
      <div style="text-align: right">
        <router-link to="/mine/set"><i class="el-icon-setting"></i></router-link>
      </div>
      <div class="user">
        <div class="user_header">
          <router-link to="/mine/usermsg">
            <img src="../../assets/img/company.png" class="">
          </router-link>
        </div>
        <div class="user_msg">
          <span class="user_name">
            嘤嘤嘤
          </span>
          <span class="user_phone">
            15320495341
          </span>
          <div class="vip_lv">
            <span>普通会员</span>
          </div>
        </div>
      </div>

      <ul class="bot_lists clearfix">
        <li v-for="(item,index) in headerlists" :key="item.index">
          <router-link :to="{path:'/mine/myfootprint',query: {printid:index}}">
            <div style="margin: 13px 0 10px 0">{{item.num}}</div>
            <div>{{item.name}}</div>
          </router-link>
        </li>
      </ul>

    </header>
    <!--  我的资产  -->
    <div class="m_b_10 conmon_box my_zc">
      <div class="conmon_deader">
        <span class="left_text">我的资产</span>

      </div>

      <ul class="zc_lists clearfix">
        <li v-for="(item,index) in zclists" :key="item.index">
          <router-link to="">
            <div style="margin-bottom: 10px">{{item.num}}</div>
            <div>{{item.name}}</div>
          </router-link>
        </li>
      </ul>
    </div>

    <!--  我的订单  -->
    <div class="m_b_10 conmon_box my_order">
      <div class="conmon_deader">
        <span class="left_text">我的订单</span>
        <span class="right_link">
          <router-link to="">全部订单<i class="el-icon-arrow-right"></i></router-link>
        </span>
      </div>

      <ul class="order_lists clearfix">
        <li v-for="(item,index) in orderlists" :key="item.index">
          <router-link :to="{path:'/goodsdetails/order', query:{orderid:index}}">
            <div style="margin-bottom: 10px">
              <img :src="require(`../../assets/img/${item.img}.png`)" style="width: 24px">
            </div>
            <div>{{item.name}}</div>
          </router-link>
        </li>
      </ul>
    </div>
    <!--  我的工具  -->
    <div class="m_b_10 conmon_box my_order">
      <div class="conmon_deader">
        <span class="left_text">我的工具</span>
        <span class="right_link">
          <router-link to="">更多工具<i class="el-icon-arrow-right"></i></router-link>
        </span>
      </div>

      <ul class="gj_lists clearfix">
        <li v-for="(item,index) in gjlists" :key="item.index">
          <router-link :to="{path:gjlingk[index]}">
            <div style="margin-bottom: 10px">
              <img :src="require(`../../assets/img/${item.img}.png`)" style="width: 34px">
            </div>
            <div>{{item.name}}</div>
          </router-link>
        </li>
      </ul>
    </div>
    <!--  游戏互动  -->
    <div class="m_b_10 conmon_box my_game">
      <div class="conmon_deader">
        <span class="left_text">游戏互动</span>
        <span class="right_link">
          <router-link to="">查看更多<i class="el-icon-arrow-right"></i></router-link>
        </span>
      </div>

      <ul class="gj_lists clearfix">
        <li v-for="(item,index) in gamelists" :key="item.index">
          <router-link :to="{path:gjlingk[index]}">
            <div style="margin-bottom: 10px">
              <img :src="require(`../../assets/img/${item.img}.png`)" style="width: 34px">
            </div>
            <div>
              <div>{{item.name}}</div>
              <div style="color: #999;font-size: 0.12rem">{{item.text}}</div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <!--  退出登录  -->
    <div class="loginout">
      退出登录
    </div>
  </div>

</template>

<script>
  import Axios from 'axios';
  import Header from "../header/header";
  import router from "../../router";

  export default {
    name: "mine",
    components: {Header},
    data() {
      return {
        msg: '我的',
        gjlingk: ['/mine/ad','/mine/ad','/mine/ad','/mine/Address','/mine/usermsg','/mine/ad','/mine/ad','/mine/ad',],
        headerlists: [
          {
            num: 0,
            name: '收藏商品'
          },
          {
            num: 0,
            name: '关注店铺'
          },
          {
            num: 0,
            name: '浏览足迹'
          },
          {
            num: 0,
            name: '我的评价'
          }],
        zclists: [
          {
            num: 0,
            name: '充值账户'
          },
          {
            num: 0,
            name: '补贴账户'
          },
          {
            num: 0,
            name: '推广账户'
          },
          {
            num: 0,
            name: '代理账户'
          },
          {
            num: 0,
            name: '签到现金'
          },
          {
            num: 0,
            name: '生态币账户'
          },
          {
            num: 0,
            name: '原始股账户'
          },
        ],
        orderlists: [
          {
            img: 'dfk',
            name: '待付款'
          },
          {
            img: 'dfh',
            name: '待发货'
          },
          {
            img: 'dsh',
            name: '待收货'
          },
          {
            img: 'dpj',
            name: '待评价'
          },
          {
            img: 'sh',
            name: '售后'
          }],
        gjlists: [
          {
            img: 'gj1',
            name: '营销广告'
          },
          {
            img: 'gj2',
            name: '我的分享'
          },
          {
            img: 'gj3',
            name: '商品分享'
          },
          {
            img: 'gj4',
            name: '收货地址'
          },
          {
            img: 'gj5',
            name: '个人信息'
          },
          {
            img: 'gj6',
            name: '我的团队'
          },
          {
            img: 'gj7',
            name: '财务记录'
          },
          {
            img: 'gj8',
            name: '关于我们'
          }],
        gamelists: [
          {
            img: 'gj1',
            name: 'QQ飞车',
            text: '0元领一箱水果'
          },
          {
            img: 'gj1',
            name: 'QQ飞车',
            text: '0元领一箱水果'
          },
          {
            img: 'gj1',
            name: 'QQ飞车',
            text: '0元领一箱水果'
          },
          {
            img: 'gj1',
            name: 'QQ飞车',
            text: '0元领一箱水果'
          },
        ]
      }
    },

    // 监听,当路由发生变化的时候执行
    watch: {
      '$route': 'getPath'
    },
    methods: {
      getPath() {
        console.log(this.$route.path);
      }
    }
  }
</script>

<style lang="scss" scoped>


  header {
    padding: 10px;
    background-color: #009900;
    color: #fff;

    .el-icon-setting {
      font-size: 0.2rem;
      font-weight: bold;
    }

    .user {
      display: flex;
      align-items: center;

      .user_header {
        overflow: hidden;
        border-radius: 50%;
        padding: 1px;
        background-color: #fff;
        width: 60px;
        height: 60px;
        margin-right: 20px;

        img {
          border-radius: 50%;
        }
      }

      .user_msg {
        text-align: left;

        .vip_lv {
          margin-top: 5px;
        }

        .vip_lv span {
          width: 70px;
          text-align: center;
          display: inline-block;
          background-color: rgba(0, 0, 0, 0.2);
          line-height: 20px;
          border-radius: 20px;
          font-size: 0.12rem;
        }
      }
    }

    .bot_lists li {
      float: left;
      width: 25%;

    }
  }

  /*  */
  .conmon_box {
    background-color: #fff;
    padding: 0 10px;
  }

  .conmon_deader {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;

    .left_text {
      font-size: 0.18rem;
      font-weight: bold;
    }
  }

  .zc_lists li, .gj_lists li {
    float: left;
    width: 25%;
    padding: 15px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .order_lists li {
    float: left;
    width: 20%;
    padding: 15px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /*  */
  .loginout {
    font-size: 0.18rem;
    color: #009900;
    line-height: 40px;
    margin: 40px 10px;
    background-color: #fff;
    border-radius: 4px;
  }
</style>
