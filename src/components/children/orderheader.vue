<template>
  <header>
    <i class="el-icon-arrow-left back" @click="$router.back(-1)" style="left: 5px;"></i>
    <div class="center_name" v-show="!this.$route.query.searchid">
      <span v-if="$route.meta.title == 'footprint'">{{tt[this.$route.query.printid]}}</span>
      <span v-else-if="this.$route.query.orderid != 4">{{$route.meta.title}}</span>
      <span v-else>退款/售后</span>
    </div>
    <!--  搜索组件    -->
    <search v-show="this.$route.query.searchid" :dmsg='this.$route.query.searchid'></search>
    <!--    -->
    <i v-show="this.$route.query.searchid" class="el-icon-chat-dot-round" style="right: 5px"></i>
    <span class="news">
      <span v-if="$route.meta.news">全部已读</span>
      <span v-else-if="$route.meta.footprint && this.$route.query.printid != 3">编辑</span>
      <span v-else-if="$route.meta.title == '微信营销广告'"><router-link to="/mine/articles">发布</router-link></span>
      <span v-else-if="$route.meta.title == '发布文章'"><router-link to="/mine/articles">我的发布</router-link></span>
      <span v-else-if="$route.meta.title == '添加收货地址'" @click="baocun($route.query.addressid)">保存</span>
    </span>
  </header>

</template>

<script>
  import Header from "../header/header";
  import Search from "../search/search";

  export default {
    name: "orderheader",
    // msg: '首页',
    components: {Search, Header},
    data() {
      return {
        tt: ['我的收藏', '我的关注', '我的足迹', '我的评价',]
      }
    },
    methods: {
      baocun:function (id) {
        var _this = this
        _this.$store.commit('addressid', id);
        setTimeout(function () {
          _this.$store.commit('clearaddressid');
        },500)
      }
    },
    mounted() {
      console.log(this.$route)
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
    position: fixed;
    width: 100%;
    z-index: 9;
    border-bottom: 1px solid #f2f2f2;

    i, .news, .footprint {
      font-size: 0.28rem;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: #999999;
    }

    .news, .footprint {
      font-size: 0.14rem;
      right: 5px;
    }

    /deep/ .el-input {
      margin: 0 30px;
    }
  }
</style>
