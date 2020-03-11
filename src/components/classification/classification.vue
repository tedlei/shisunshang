<template>
  <div class="main_box">
    <header ref="headerh">
      <i class="el-icon-full-screen"></i>
      <search :dmsg='msg'></search>
      <router-link to="/news">
        <i class="el-icon-chat-dot-round"></i>
      </router-link>
    </header>

    <el-container :style="{'height': height,'backgroundColor':'#f2f2f2'}">
      <el-aside width="100px">
        <ul class="left">
          <li v-for="(item,leftindex) in typelist" :key="item.id" :class="{active:num==leftindex}"
              @click="getNum(leftindex)">
            {{item.cate_name}}
          </li>
        </ul>
      </el-aside>

      <el-container>
        <el-main>
          <img src="../../assets/img/banner2.png">
          <div class="" v-for="(item,index) in typelist[num].sub" :key="index">
            <div class="ttl">{{item.cate_name}}</div>
            <ul class="clearfix goodslist">
              <li v-for="(goodsitem,goodsindex) in item.sub" :key="goodsindex">
                <!--                <img :src="require(`../../assets/img/${goodsitem.img}.png`)">-->
                <div>{{goodsitem.cate_name}}</div>
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
                typelist: [
                    {
                        sub:[]
                    }
                ],
            }
        },
        methods: {
            //    获取分类商品
            getgoods: function () {
                let _this = this;
                let parms = {
                    method: 'get.goods.category.list',
                };
                this.$post('/api/v1/goodsCategory', parms)
                    .then((response) => {

                        _this.typelist = response.data
                    }).catch(function (error) {
                    console.log(error);
                })
            },
            //  切换商品
            getNum: function (index) {
                this.num = index;
            },

        },
        mounted() {
            setTimeout(()=> {
                let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
                let topH = this.$refs.headerh.offsetHeight;
                this.height = h - topH - 67.8 + 'px'
            },100)
            this.getgoods();


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
      width: calc(33.3333% - 6.66666px);
      background-color: #fff;
      margin-bottom: 10px;
      font-weight: bold;
      padding: 20px 10px;
      min-height: 14vh;
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
