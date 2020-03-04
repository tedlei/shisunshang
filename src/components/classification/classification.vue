<template>
  <div class="main_box">
    <header ref="header_h">
      <i class="el-icon-full-screen"></i>
      <search :dmsg='msg'></search>
      <router-link to="/news">
        <i class="el-icon-chat-dot-round"></i>
      </router-link>
    </header>

    <el-container :style="{'height': height,'backgroundColor':'#f2f2f2'}">
      <el-aside width="100px">
        <ul class="left">
          <li v-for="(item,index) in leftlists" :key="item.id" :class="{active:num==index}" @click="getNum(index)">
            {{item}}
          </li>
        </ul>
      </el-aside>

      <el-container>
        <el-main>
          <img src="../../assets/img/banner2.png">
          <div class="" v-for="(item,index) in typelist" :key="index">
            <div class="ttl">{{item.typename}}</div>
            <ul class="clearfix goodslist">
              <li v-for="(goodsitem,goodsindex) in item.goods" :key="goodsindex">
                <img :src="require(`../../assets/img/${goodsitem.img}.png`)">
                <div>{{goodsitem.goodsname}}</div>
              </li>
            </ul>
          </div>
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
    name: "classification",
    components: {Search, Header},
    data() {
      return {
        msg: '分类',
        height: '100px',
        sss: 'sssss',
        num: 0,
        leftlists: ['生活家居', '生活家居', '生活家居'],
        typelist: [
          {
            typename: '烹饪锅具、用具',
            goods: [{
              img: 'goods',
              goodsname: '不锈钢汤锅'
            },
              {
                img: 'goods',
                goodsname: '不锈钢汤锅'
              },
              {
                img: 'goods',
                goodsname: '不锈钢汤锅'
              },
              {
                img: 'goods',
                goodsname: '不锈钢汤锅'
              },
              {
                img: 'goods',
                goodsname: '不锈钢汤锅'
              },
              {
                img: 'goods',
                goodsname: '不锈钢汤锅'
              }]
          },
          {
            typename: '烹饪锅具、用具',
            goods: [{
              img: 'goods',
              goodsname: '不锈钢汤锅'
            },
              {
                img: 'goods',
                goodsname: '不锈钢汤锅'
              },
              {
                img: 'goods',
                goodsname: '不锈钢汤锅'
              },
              {
                img: 'goods',
                goodsname: '不锈钢汤锅'
              },
              {
                img: 'goods',
                goodsname: '不锈钢汤锅'
              },
              {
                img: 'goods',
                goodsname: '不锈钢汤锅'
              }]
          },
          {
            typename: '烹饪锅具、用具',
            goods: [{
              img: 'goods',
              goodsname: '不锈钢汤锅'
            },
              {
                img: 'goods',
                goodsname: '不锈钢汤锅'
              },
              {
                img: 'goods',
                goodsname: '不锈钢汤锅'
              },
              {
                img: 'goods',
                goodsname: '不锈钢汤锅'
              },
              {
                img: 'goods',
                goodsname: '不锈钢汤锅'
              },
              {
                img: 'goods',
                goodsname: '不锈钢汤锅'
              }]
          }
        ]
      }
    },
    methods: {
      getNum: function (index) {
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

    i {
      font-size: 30px;
      color: #999;
      margin: 0 8px;
    }
  }

  aside {
    background-color: #fff;

    .left li {
      padding: 20px 0;
      position: relative;
      border-bottom: 1px solid #b4b4b4;
    }

    .left li.active {
      background-color: #f2f2f2;

    }

    .left li.active:after {
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
    padding: 10px;

    .ttl {
      text-align: left;
      padding: 10px 0;
      font-size: 0.18rem;
      font-weight: bold;
      color: #0f0f0f;
    }

    .goodslist {

    }

    .goodslist li {
      float: left;
      width: calc(33.3333% - 10px);
      background-color: #fff;
      margin-bottom: 10px;
      font-weight: bold;
      padding: 20px 10px;
      min-height: 13vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      margin-right: 10px;

      div {
        position: absolute;
        bottom: 10px;
        width: 100%;
        left: 0;
      }
    }

    .goodslist li:nth-child(3n+3) {
      margin-right: 0;
    }
  }
</style>
