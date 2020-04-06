<template>
  <header :style="{height:this.$route.name == 'Special-area'?'0.55rem':''}">
    <i class="el-icon-arrow-left back" @click="nobackss" style="left: 5px;" v-show="!noback"></i>
    <i class="el-icon-arrow-left back" @click="routerback" style="left: 5px;" v-show="noback"></i>
    <div class="center_name" v-show="this.$route.name != 'Special-area'">
      <span v-if="this.$route.meta.title == 'footprint'">{{tt[this.$route.query.printid]}}</span>
      <span v-else-if="this.$route.meta.title == 'record'">{{this.$route.query.recordid ? record[this.$route.query.recordid - 1]:'财务记录'}}</span>
      <span v-else-if="this.$route.query.orderid != 5">{{this.$route.meta.title}}</span>
      <span v-else>退款/售后</span>
    </div>
    <!--  搜索组件    -->
    <search v-show="this.$route.name == 'Special-area'"
            :dmsg='true'
            :style="this.$route.name == 'Special-area'? 'padding: 0 0.2rem':'padding:0 0 0 0.2rem'"></search>
    <!--    -->
    <i v-show="this.$route.name == 'Special-area'" class="el-icon-chat-dot-round" style="right: 5px"></i>

    <span class="news">
        <span v-if="this.$route.meta.news">全部已读</span>
        <span v-else-if="this.$route.meta.footprint && this.$route.query.printid != 3" @click="edit">编辑</span>
        <span v-else-if="this.$route.meta.title == '微信营销广告'"><router-link to="/mine/ad/articles">发布</router-link></span>
        <span v-else-if="this.$route.meta.title == '发布文章'"><router-link to="/mine/ad/myad">我的发布</router-link></span>
        <span v-else-if="this.$route.meta.title == '添加收货地址'" @click="baocun($route.query.addressid)">保存</span>
        <span v-else-if="this.bank" @click="add_bank">添加</span>
        <span v-else-if="this.Rrecord"><router-link to="/mine/R-record">充值记录</router-link></span>
        <span v-else-if="this.Wrecord"><router-link to="/mine/withdrawRecord">提现记录</router-link></span>
        <span v-else-if="this.Atc" @click='activeChild'>保存</span>
        <span v-else-if="this.ivc"><router-link to="/mine/myinvoice">我的发票</router-link></span>
    </span>
  </header>
</template>

<script>
    import Header from "../header/header";
    import Search from "../search/search";
    import Bus from '../../assets/js/bus';

    export default {
        name: "orderheader",
        // msg: '首页',
        components: {Search, Header},
        data() {
            return {
                noback: true,
                tt: ['我的收藏', '我的关注', '我的足迹', '我的评价',],
                record: ['充值账户', '补贴账户', '推广账户', '代理账户', '签到账户', '生态币账户', '原始股账户', '财务记录'],
            }
        },
        computed: {
            bank() {
                return this.$store.state.bank;
            },
            Rrecord() {
                return this.$store.state.Rrecord;
            },
            Wrecord() {
                return this.$store.state.Wrecord;
            },
            Atc() {
                return this.$store.state.Atcb;
            },
            ivc(){
                return this.$store.state.ivcb;
            }
        },
        watch: {
            //监听属性，在computed计算属性更改之后会触发参数值的改变，所以能够监听到
            bank(newValue, oldValue) {

            }
        },
        methods: {
            routerback(){
                console.log(1)
                let state = this.getQueryString('state');
                if(state==null){
                  // console.log(2)
                  this.$router.push({path: '/'});
                }else{
                  this.$router.back(-1);
                }
            },
            getQueryString(name) { 
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var l = decodeURI(window.location.search);
				var r = l.substr(1).match(reg);
				if (r != null) return unescape(r[2]);
				return null;
			},
            baocun: function (id) {
                var _this = this
                _this.$store.commit('addressid', id);
                setTimeout(function () {
                    _this.$store.commit('clearaddressid');
                }, 500)
            },
            edit() {
                // if(this.$route.query.printid == 0){
                this.$store.commit('setEmpty');
                // console.log(this.$route.query.printid);
                // console.log(this.$store);
                // }
            },
            nobackss: function () {
                Bus.$emit('val', this.noback);
                this.noback = true;
            },
            add_bank: function () {
                this.$router.push({
                    path: '/Bank-card/add-bank-card'
                });
            },
            activeChild:function () {
                Bus.$emit('Atc', true)
            }
        },
        mounted() {
            // 用$on事件来接收参数
            var _this = this
            Bus.$on('val', (data) => {
                if (data == true) {
                    _this.noback = false
                }
            })
        },
        destroyed() {
            this.$store.commit('setEmptyNo');
        }
    }
</script>

<style scoped lang="scss">
  header {
    font-size: 0.16rem;
    display: flex;
    justify-content: center;
    padding: 0.13rem 0.15rem;
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
      right: 0.05rem;
    }

    /deep/ .el-input {
      margin: 0 0.3rem;
    }
  }
</style>
