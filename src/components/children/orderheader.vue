<template>
  <header :style="{height:this.$route.name == 'Special-area'?'0.55rem':''}">
    <van-icon name="arrow-left" class="back" @click="nobackss" style="left: 5px;" v-show="!noback"/>
    <van-icon name="arrow-left" class="back" @click="routerback" style="left: 5px;" v-show="noback"/>
    <div class="center_name" v-show="this.$route.name != 'Special-area'">
      <span v-if="this.$route.meta.title == 'footprint'">{{tt[this.$route.query.printid]}}</span>
      <span v-else-if="this.$route.meta.title == '财务记录'">{{this.$route.query.recordid ? record[Number(this.$route.query.recordid) - 1]:'财务记录'}}</span>
      <span v-else-if="title">{{title}}</span>
      <span v-else-if="this.$route.path=='/goodslist'">{{$route.query.name}}</span>
      <span v-else-if="this.$route.query.orderid != 5">{{this.$route.meta.title}}</span>
      <span v-else>退款/售后</span>
    </div>
    <!--  搜索组件    -->
    <search v-if="this.$route.name == 'Special-area'"
            :dmsg='true'
            :style="'padding:0 0 0 0.2rem'"
            class="childSearch"
    ></search>
    <!--    -->
    <span class="news">
        <span v-if="this.$route.meta.news">全部已读</span>
        <span v-else-if="this.$route.meta.footprint && this.$route.query.printid != 3 && isEmpty" style="color: #0f0f0f"
              @click="edit">编辑</span>
        <span v-else-if="this.$route.meta.title == '微信营销广告'"><router-link to="/mine/ad/myad">我的发布</router-link></span>

        <span v-else-if="this.Rrecord"><router-link to="/mine/R-record">充值记录</router-link></span>
        <span v-else-if="this.Wrecord"><router-link to="/mine/withdrawRecord">提现记录</router-link></span>
        <span v-else-if="this.Atc && this.$route.meta.title != '实名认证'" @click='activeChild'>保存</span>

        <van-button v-else-if="this.$route.meta.title==='财务记录'" type="primary" size="small" class="news_btn common_btn"
                    @click="topUp">充值</van-button>
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
                title: '',   //自定义title
                isEmpty: false,
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
            ivc() {
                return this.$store.state.ivcb;
            },
            // isEmpty(){
            //     return Bus.$on('FisEmpty', (data) => {
            //         return data
            //     })
            //
            // }
        },
        watch: {
            //监听属性，在computed计算属性更改之后会触发参数值的改变，所以能够监听到
            bank(newValue, oldValue) {

            }
        },
        methods: {
            routerback() {
                if (this.$route.query.goindex === 'true') {
                    this.$router.push('/')
                } else if (this.$route.name == 'order' || this.$route.name == 'successfulPayment') {
                    this.$router.push('/mine')
                } else {
                    this.$router.back(-1)
                }
            },
            baocun: function (id) {
                console.log(id)
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
            activeChild: function () {
                Bus.$emit('Atc', true)
            },
            topUp() {
                this.$router.push({path: '/mine/Rechargemoney'})
            }
        },
        mounted() {
            // 用$on事件来接收参数
            var _this = this;
            Bus.$on('val', (data) => {
                if (data == true) {
                    _this.noback = false
                }
            })
            Bus.$on('title', (value) => {
                _this.title = value ? value : '';
            });
            Bus.$on('FisEmpty', (data) => {
                _this.isEmpty = data
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
    background-color: #f5f5f5;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9;

    i, .news, .footprint {
      font-size: x-large;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: #999999;
    }

    .childSearch {
      background: none;

      > > > .van-search__content {
        background-color: #fff;
      }
    }
    .common_btn{
      line-height: inherit;
    }

    .news, .footprint {
      font-size: 0.14rem;
      right: 0.1rem;
      color: #0f0f0f;
    }

  }
</style>
