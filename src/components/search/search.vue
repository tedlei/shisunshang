<template>
  <van-search
    v-model="searchVal"
    shape="round"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    style="padding: 0;width: 100%"
    :readonly="readonly"
    :class="!tan ?'nobtn':''"
  >
    <div slot="action" @click="onSearch" v-show="tan">搜索</div>
  </van-search>
</template>

<script>
    export default {
        name: "search",
        props: ['dmsg','tmsg'],
        data() {
            return {
                placeholder: '',
                searchVal: '',
                readonly:true,
                tan:false
            }
        },
        methods: {
            //
            // focus: function (e) {
            //     let pros_data = this.dmsg
            //     if (pros_data != true) {
            //         this.$router.push({path: '/searchResult', query: {searchid: this.dmsg}});
            //     }
            // },
            onEnterSearch: function (e, searchVal) {
                console.log("search: " + this.searchVal);
            },
            onSearch: function () {

            }
        },
        mounted() {
            let _this = this
            if (_this.dmsg == true){
                this.readonly = false
            }
            if (_this.tmsg == 'tan'){
                _this.tan = true
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

  .nobtn .van-search__action{
    display: none;
  }
</style>
