<template>
  <div class="main_box">
    <header ref="header_h">
      <div class="clo-g location">
        <i class="el-icon-location-outline"></i>
        <span>重庆</span>
      </div>
      <div @click="opensearch" style="width: 100%">
        <search :dmsg='msg'></search>
      </div>
      <i class="el-icon-plus"></i>
    </header>

    <el-container :style="{'height': height,'backgroundColor':'#f2f2f2'}">
      <el-aside width="100px">
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
            <li v-for="(item,index) in cpylist">
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
    <searchResult></searchResult>

  </div>

</template>

<script>
    import Axios from 'axios';
    import Header from "../header/header";
    import Search from "../search/search";
    import Bus from "../../assets/js/bus";
    import SearchResult from "../children/searchResult/searchResult";

    export default {
        name: "business",
        components: {SearchResult, Search, Header},
        data() {
            return {
                msg: '附近商家',
                height: '100px',
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
            opensearch: function () {
                Bus.$emit('val', true)
            },
            getNum: function f(index) {
                this.num = index;
            }
        },
        mounted() {
            let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
            let topH = this.$refs.header_h.offsetHeight;
            this.height = h - topH - 67.8 + 'px'

        }
    }
</script>

<style lang="scss" scoped>
  header {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f2f2f2;

    .location {
      min-width: 80px;
      font-weight: bold;
    }

    .el-icon-plus {
      font-size: 18px;
      color: #999;
      margin: 0 20px 0 8px;
    }
  }

  aside {
    background-color: #fff;
    overflow: visible;

    .left {
      position: relative;
    }

    .left li {
      padding: 20px 0;
      border-bottom: 1px solid #b4b4b4;

      .erji {
        width: 100px;
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
      width: 5px;
      height: 100%;
      background-color: #009900;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  section .el-main {
    padding: 7px;

    .cpylist li {
      display: flex;
      background-color: #fff;
      padding: 10px;
      margin-bottom: 10px;
      text-align: left;

      img {
        width: 100px;
        max-width: 100px;
      }

      .right_msg {
        margin-left: 13px;

        p {
          font-size: 0.12rem;
          color: #999;
          margin: 5px 0;
        }

        p.long {
          text-align: right;
          color: #009900;
        }
      }
    }


  }
</style>
