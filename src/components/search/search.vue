<template>

  <van-search
    v-model="searchVal"
    shape="round"
    show-action
    placeholder="请输入搜索关键词"
    style="padding: 0;width: 100%"
    :readonly="readonly"
    :class="!tan ?'nobtn':''"
    @input="inputsearchVal"
  >
    <div slot="action" @click="onSearch" v-show="tan">搜索</div>
  </van-search>

</template>

<script>
    import {Debounce} from "../../assets/js/utils";
    import Bus from "../../assets/js/bus";

    export default {
        name: "search",
        props: ['dmsg', 'tmsg', 'isempty'],
        data() {
            return {
                placeholder: '',
                readonly: true,
                tan: false,
                history: [],

            }
        },
        computed: {
            searchVal: {
                get() {
                    return this.$store.state.Val || '';
                },
                set(value) {
                    this.$store.commit('sendVal', value)
                }
            }
        },

        methods: {
            //是否
            isreadonly: function () {
                let _this = this
                if (_this.dmsg == true) {
                    this.readonly = false;
                }
                if (_this.tmsg == 'tan') {
                    _this.tan = true
                }
            },
            //搜索传值
            onSearch: function () {
                let searchVal = this.searchVal;
                if (!searchVal) {
                    this.$notify({type: 'warning', message: '请输入搜索内容', duration: '500'});
                    return
                }
                let histort = localStorage.getItem('histort');
                if (!histort) histort = [];
                else histort = JSON.parse(histort);
                if (histort.length >= 10) histort.pop()
                if (histort.indexOf(searchVal) <= -1) histort.unshift(searchVal);
                localStorage.setItem('histort', JSON.stringify(histort));
                this.$emit('getHistorylist')
                this.$store.commit('sendsearchVal', searchVal);
            },
            inputsearchVal: Debounce(function (val) {
                if (this.readonly == false) {
                    Bus.$emit('searchD', val)
                }
            }, 300)
            //监听输入是否为空
            // searchValchange: function () {
            //     this.$store.commit('sendsearchVal', this.searchVal)
            // }
        },
        mounted() {
            // console.log(this.searchVal)
            this.isreadonly();
            // localStorage.setItem('history', this.history)
        },
        destroyed() {
            this.$store.commit('sendsearchVal', '');
            this.$store.commit('sendVal', '');
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
