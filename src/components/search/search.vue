<template>

  <el-input
    :placeholder='placeholder'
    v-model="searchVal"
    @keyup.enter.native="onEnterSearch()"
    @focus="focus()"
    class="search_ipt"
  >
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input>
</template>

<script>
  export default {
    name: "search",
    props: ['dmsg'],
    data() {
      return {
        placeholder: '',
        searchVal: '',
      }
    },
    methods: {

      focus: function (e) {
        if (!this.$route.query.searchid) {
          this.$router.push({path: '/searchResult', query: {searchid: this.dmsg}});
        }
      },
      onEnterSearch: function (e, searchVal) {
        console.log("search: " + this.searchVal);
      }
    },
    mounted() {
      let pros_data = this.dmsg
      switch (pros_data) {
        case '首页':
          this.placeholder = '请输入搜索内容'
          break
        case '分类':
          this.placeholder = '请输入商品名称'
          break
        case '附近商家':
          this.placeholder = '请输入商品名称或者公司'
          break
      }
    }
  }
</script>

<style lang="scss">
  .el-input /deep/ input {
    border: none;
    background-color: #f8f8f8;
    line-height: 35px;
    height: 35px;
    border-radius: 35px;
  }

  .el-input /deep/ i {
    line-height: 35px;
  }
</style>
