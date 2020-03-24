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
    @input="searchValchange"
  >
    <div slot="action" @click="onSearch" v-show="tan">搜索</div>
  </van-search>

</template>

<script>
    export default {
        name: "search",
        props: ['dmsg', 'tmsg', 'isempty'],
        data() {
            return {
                placeholder: '',
                readonly: true,
                tan: false
            }
        },
        computed: {
            searchVal:{
                get: function () {
                    return this.$store.state.searchVal;
                }
            }
        },
        watch: {
            searchVal: {
                handler(newValue, oldValue) {
                    if (newValue == '') {
                        this.$store.commit('sendsearchVal', '')
                    }
                    console.log(newValue)
                },
                deep: true
            }
        },
        methods: {
            //是否
            isreadonly: function () {
                let _this = this
                if (_this.dmsg == true) {
                    this.readonly = false
                }
                if (_this.tmsg == 'tan') {
                    _this.tan = true
                }
            },
            //搜索传值
            onSearch: function () {
                this.$store.commit('sendsearchVal', this.searchVal)
            },
            //监听输入是否为空
            searchValchange: function () {
                this.$store.commit('sendsearchVal', this.searchVal)
            }
        },
        mounted() {
            this.isreadonly()
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

  .nobtn .van-search__action {
    display: none;
  }
</style>
