<template>
  <div class="main_box">
    <header ref="headerh">
      <!--扫码-->
      <!-- <div class="sao">
        <i class="el-icon-full-screen"></i>

      </div> -->

      <div @click="opensearch" style="width: 100%;margin-left:0.1rem">
        <search :dmsg='msg'></search>
      </div>

      <!--消息-->
      <div class="news">
        <router-link to="/news">
          <i class="el-icon-chat-dot-round"></i>

        </router-link>
      </div>
    </header>

    <el-container :style="{'height': height,'backgroundColor':'#f2f2f2'}">
      <el-aside width="1rem">
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
              <li v-for="(goodsitem,goodsindex) in item.sub" :key="goodsindex" @click="todetile(goodsitem.id)">
                <van-image
                  width="100%"
                  height="0.71rem"
                  fit="cover"
                  :src="goodsitem.icon"
                  style="margin-bottom: 0.1rem"
                />
                <div class="cate_name" style="font-size: 0.12rem">{{goodsitem.cate_name}}</div>
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
    import Bus from "../../assets/js/bus";
    import clientWw from '../../assets/js/conmon'

    export default {
        name: "classification",
        components: { Search, Header},
        data() {
            return {
                msg: '分类',
                height: '100px',
                sss: 'sssss',
                num: 0,
                typelist: [
                    {
                        sub: []
                    }
                ],
            }
        },
        methods: {
            opensearch: function () {
                Bus.$emit('searchval', true)
            },
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
            //    跳转
            todetile: function (e) {
                this.$router.push({path: '/goodslist', query: {id: e}})
                console.log(e)
            },
            getHeight: function () {
                let clientW = clientWw.clientWw()
                let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
                let topH = this.$refs.headerh.offsetHeight;
                this.height = (h - topH - 70 * clientW / 100) / clientW + 'rem'
                console.log(topH)
            },
        },
        mounted() {

            setTimeout(() => {
                this.getHeight();
            }, 100)
            this.getgoods()
        }
    }
</script>

<style lang="scss" scoped>
  header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    height: 0.55rem;
    .sao,.news{
      color: #999;
      min-width: 0.45rem;
      i {
        font-size: 0.24rem;

      }
    }

  }

  aside {
    background-color: #fff;

    .left li {
      line-height: 0.5rem;
      position: relative;
      border-bottom: 1px solid #f2f2f2;
    }

    .left li.active {
      background-color: #f2f2f2;

    }

    .left li.active:after {
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
    padding: 10px;

    .ttl {
      text-align: left;
      padding: 10px 0;
      font-size: 0.18rem;
      font-weight: bold;
      color: #0f0f0f;
    }

    .goodslist li {
      float: left;
      width: calc(33.3333% - 6.66666px);
      background-color: #fff;
      margin-bottom: 10px;
      font-weight: bold;
      padding: 10px;
      min-height: 14vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      margin-right: 10px;
    }

    .goodslist li:nth-child(3n+3) {
      margin-right: 0;
    }
  }
</style>
