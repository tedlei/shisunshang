<template>
  <div>
    <van-popup
      v-model="tans"
      position="left"
      :style="{ height: '100%',width:'100%' }"
    >
      <header>
        <i class="clo-9 el-icon-arrow-left back" @click="Popup" style="left: 5px;"></i>
        <search :tmsg='tan' :dmsg="true"></search>
      </header>

      <!--   搜索前   -->
      <div class="search_record" v-show="true">
        <div class="search_box">
          <p><i></i>热门搜索</p>
          <ul class="hot_list clearfix">
            <li>热门搜索</li>
            <li>热门搜索</li>
            <li>热门搜索</li>
            <li>热门搜索</li>
          </ul>
        </div>

        <div class="search_box">
          <p><i></i>搜索历史</p>
          <ul class="history_list clearfix">
            <li>搜索历史</li>
            <li>搜索历史</li>
            <li>搜索历史</li>
            <li>搜索历史</li>
          </ul>
        </div>

        <div class="delet_his">
          <i class="el-icon-delete"></i>
          <span>清空历史搜索</span>
        </div>
      </div>
      <!--   搜索结果   -->
      <!--      <div class="search_result">-->
      <!--        <goodslist></goodslist>-->
      <!--      </div>-->
      <!--   搜索空   -->
      <div class="none" v-show="false">
        <img src="../../../assets/img/search_none.png" style="width: 30%;margin-top: 50px">
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
            }
        },
        methods: {
            //弹窗消失
            Popup: function () {
                this.tans = false

            },
            getNum: function (index) {
                this.num = index;
            }
        },
        mounted() {
            Bus.$on('val', (data) => {
                if (data == true) {
                    this.tans = true
                }
            })
        }
    }
</script>

<style scoped lang="scss">
  header {
    display: flex;
    align-items: center;
    padding: 0.1rem;

    i {
      font-size: 0.28rem;
    }

    .van-search {
      margin-left: 10px;
    }
  }

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

</style>
