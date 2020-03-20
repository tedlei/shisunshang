<template>
  <div class="main_box">
    <header ref="header_h">
      <div class="clo-g location">
        <i class="el-icon-location-outline"></i>
        <span>重庆</span>
      </div>
      <search :dmsg="msg"></search>
      <i class="el-icon-plus"></i>
    </header>

    <el-container :style="{'height': height,'backgroundColor':'#f2f2f2'}">
      <el-aside width="1rem">
        <ul class="left">
          <li v-for="(item,index) in leftlists" :key="item.id" :class="{active:num==index && num !=0 ,'all':index==0}"
              @click="getNum(index)">
            <span>{{item}}</span>
            <ul v-show="num == index && num !=0" class="erji">
              <li>超市便利</li>
              <li>超市便利</li>
              <li>超市便利</li>
              <li>超市便利</li>
            </ul>
          </li>
        </ul>
      </el-aside>

      <el-container>
        <el-main>
          <ul class="cpylist">
            <li v-for="(item,index) in cpylist" :key="index">
              <div>
                <img :src="require(`../../assets/img/${item.img}.png`)">
              </div>

              <div class="right_msg">
                <router-link to="/business/storemsg">
                  <h3>{{item.title}}</h3>
                  <p>地址：{{item.address}}</p>
                  <p>地址：{{item.phone}}</p>
                  <p class="long">{{item.long}}</p>
                </router-link>

              </div>
            </li>
          </ul>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
  import Axios from 'axios';
  import Header from "../header/header";
  import Search from "../search/search";

  export default {
    name: "business",
    components: {Search, Header},
    data() {
      return {
        msg: '附近商家',
        height: '1rem',
        num: 0,
        leftlists: ['全部', '品质购物', '品质购物'],
        cpylist: [{
          img: 'company',
          title: '重庆安利科技技术有限公司',
          address: '重庆市渝北加工区七路与金渝大道交叉口北100米',
          phone: '023-6345645',
          long: '3.14公里'
        },
          {
            img: 'company',
            title: '重庆安利科技技术有限公司',
            address: '重庆市渝北加工区七路与金渝大道交叉口北100米',
            phone: '023-6345645',
            long: '3.14公里'
          },
          {
            img: 'company',
            title: '重庆安利科技技术有限公司',
            address: '重庆市渝北加工区七路与金渝大道交叉口北100米',
            phone: '023-6345645',
            long: '3.14公里'
          },
          {
            img: 'company',
            title: '重庆安利科技技术有限公司',
            address: '重庆市渝北加工区七路与金渝大道交叉口北100米',
            phone: '023-6345645',
            long: '3.14公里'
          },
          {
            img: 'company',
            title: '重庆安利科技技术有限公司',
            address: '重庆市渝北加工区七路与金渝大道交叉口北100米',
            phone: '023-6345645',
            long: '3.14公里'
          },
          {
            img: 'company',
            title: '重庆安利科技技术有限公司',
            address: '重庆市渝北加工区七路与金渝大道交叉口北100米',
            phone: '023-6345645',
            long: '3.14公里'
          },]
      }
    },
    methods: {
      getNum: function f(index) {
        this.num = index;
      },
      getData () {
        let ad_data = {
          method: "get.shop.category.list"
        };
        this.$post('/api/v1/GoodsComCategory', ad_data)
        .then((res) => {
          console.log(res);
         
        }).catch(function (error) {
            console.log(error);
        });
      },
    },
    created () {
      this.getData();
    },
    mounted() {
      let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
      let topH = this.$refs.header_h.offsetHeight;
      this.height = (h - topH - 67.8)/100 + 'rem'

    }
  }
</script>

<style lang="scss" scoped>
  header {
    display: flex;
    align-items: center;
    padding: 0.1rem 0;
    border-bottom: 1px solid #f2f2f2;

    .location {
      min-width: 0.8rem;
      font-weight: bold;
    }

    .el-icon-plus {
      font-size: 0.18rem;
      color: #999;
      margin: 0 0.2rem 0 0.08rem;
    }
  }

  aside {
    background-color: #fff;
    overflow: visible;

    .left {
      position: relative;
    }

    .left li {
      padding: 0.2rem 0;
      border-bottom: 1px solid #b4b4b4;

      .erji {
        width: 1rem;
        position: absolute;
        left: 100%;
        top: 0;
        background-color: #fff;

        li {
          border: none;
          border-left: 1px solid #b4b4b4;
          border-right: 1px solid #b4b4b4;
        }
      }
    }

    .left li.active span {
      color: #42b983;
    }

    .left li.all {
      position: relative;
    }

    .left li.all:after {
      content: '';
      display: inline-block;
      width: 0.05rem;
      height: 100%;
      background-color: #009900;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  section .el-main {
    padding: 0.07rem;

    .cpylist li {
      display: flex;
      background-color: #fff;
      padding: 0.1rem;
      margin-bottom: 0.1rem;
      text-align: left;

      img {
        width: 1rem;
        max-width: 1rem;
      }

      .right_msg {
        margin-left: 0.13rem;

        p {
          font-size: 0.12rem;
          color: #999;
          margin: 0.05rem 0;
        }

        p.long {
          text-align: right;
          color: #009900;
        }
      }
    }


  }
</style>
