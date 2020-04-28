<template>
  <div>
    <van-popup
      v-model="tans"
      position="left"
      :style="{ height: '100%',width:'100%' }"
    >
      <header>
        <i class="clo-9 el-icon-arrow-left back" @click="Popup()" style="left: 5px;"></i>
        <search :tmsg='tan' :dmsg="true" @getHistorylist="getHistorylist"></search>
      </header>

      <div class="search_div">
        <!--   搜索前   -->
        <div class="search_record" v-show="isshow">
          <div class="search_box">
            <p style="padding-top:0.2rem;"><i></i>热门搜索</p>
            <ul class="hot_list clearfix">
              <li v-for="(item,index) in hotlist" :key="index" @click="boxsearch(item.name)">{{item.name}}</li>
            </ul>
          </div>

          <div class="search_box">
            <p><i></i>搜索历史</p>
            <ul class="history_list clearfix">
              <li v-for="(item,index) in historylist" :key="index" @click="boxsearch(item)">{{item}}</li>
            </ul>
          </div>

          <div class="delet_his" @click="deleteHistorylist">
            <i class="el-icon-delete"></i>
            <span>清空历史搜索</span>
          </div>
        </div>
        <!--      搜索结果-->
        <div class="search_result" v-show="this.gainsearchVal && shows">
          <goodslist :gainsearchVal="gainsearchVal"></goodslist>
        </div>

      </div>

    </van-popup>
  </div>
</template>

<script>
    import Search from "../../search/search";
    import Header from "../../header/header";
    import Bus from "../../../assets/js/bus";
    import Goodslist from "../goodslist/goodslist";

    export default {
        name: "searchResult",
        components: {Goodslist, Header, Search},
        data() {
            return {
                num: 0,
                tan: 'tan',
                tans: false,
                hotlist: [],
                historylist: [],
                isshow: !this.gainsearchVal,
                shows: true,
            }
        },
        created() {
            this.getHistorylist();
        },
        computed: {
            gainsearchVal: function () {
                return this.$store.state.searchVal;
            },
        },

        methods: {
            //弹窗消失
            Popup: function () {
                this.tans = false;
                this.$store.commit('sendVal', '');
                this.$store.commit('sendsearchVal', '');
            },

            //获取热门
            getHot: function () {
                let _this = this,
                    parms = {
                        method: 'get.hot.goods.keywords.list',
                    };
                this.$post('/api/v1/GoodsSeach', parms)
                    .then((response) => {
                        _this.hotlist = response.data
                    }).catch(function (error) {
                    console.log(error);
                })
            },
            boxsearch: function (e) {
                this.$store.commit('sendVal', e);
                let searchVal = e;
                if (!searchVal) {
                    this.$notify({
                        type: "warning",
                        message: "请输入搜索内容",
                        duration: "500"
                    });
                    return;
                }
                let histort = localStorage.getItem("histort");
                if (!histort) histort = [];
                else histort = JSON.parse(histort);
                if (histort.length >= 10) histort.pop();
                if (histort.indexOf(searchVal) <= -1) histort.unshift(searchVal);
                localStorage.setItem("histort", JSON.stringify(histort));
                this.$emit("getHistorylist");
                this.$store.commit("sendsearchVal", searchVal);
            },

            //获取搜索历史列表
            getHistorylist() {
                let histort = localStorage.getItem('histort');
                if (histort) this.historylist = JSON.parse(histort);
            },

            //清空搜索历史列表
            deleteHistorylist() {
                localStorage.setItem('histort', '');
                this.historylist = [];
            },
        },
        mounted() {
            let token = localStorage.getItem("usertoken");
            if (token) {
                Bus.$on('searchval', (data) => {
                    if (data == true) {
                        this.tans = true
                    }
                });
                Bus.$on('closepop', (data) => {
                    if (data == true) {
                        this.Popup()
                    }
                });
                Bus.$on('getHot', (data) => {
                    if (data == true) {
                        this.getHot();
                    }
                });
                // if (this.$store.getters.isLogin){
                //     Bus.$emit('getHot', true);
                // }
                // localStorage.setItem('history', this.historylist)
            }
        }
    }
</script>

<style scoped lang="scss">
  header {
    display: flex;
    align-items: center;
    padding: 0 0.1rem;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 0.50rem;
    z-index: 888;

    i {
      font-size: 0.28rem;
    }

    .van-search {
      margin-left: 10px;
    }
  }

  .search_div {
    position: absolute;
    top: 0.5rem;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
    webkit-overflow-scrolling: touch;

    .search_record {
      margin-top: 20px;
      padding: 0 10px;

      .search_box {

        p {
          font-size: 0.18rem;
          text-align: left;
          color: #999999;

          i {
            width: 3px;
            height: 0.18rem;
            background-color: #009900;
            display: inline-block;
            vertical-align: -3px;
            margin-right: 5px;
          }
        }

        .hot_list, .history_list {
          margin-top: 20px;

          li {
            float: left;
            margin-right: 15px;
            padding: 5px 20px;
            background-color: #f5f5f5;
            color: #666;
            margin-bottom: 20px;
          }
        }
      }

      .delet_his {
        margin-top: 50px;
        border: 1px solid #666;
        color: #666;
        line-height: 40px;
        font-size: 0.16rem;
        border-radius: 5px;
      }
    }
  }
</style>
