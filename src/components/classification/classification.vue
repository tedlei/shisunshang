<template>
  <div class="main_box main_height">
    <header ref="headerh">
      <!--扫码-->
      <div @click="opensearch" style="width: 100%;margin:0 0.1rem">
        <search :dmsg="true"></search>
      </div>
      <!--消息-->
      <!--      <div class="news">-->
      <!--        <router-link to="/news">-->
      <!--          <i class="el-icon-chat-dot-round"></i>-->
      <!--        </router-link>-->
      <!--      </div>-->
    </header>

    <div class="main_div">
      <div class="left" v-if="typelist">
        <div
          class="left_li"
          v-for="(item,leftindex) in typelist"
          :key="item.id"
          :class="{active:num==leftindex}"
          @click="getNum(leftindex)"
        >{{item.cate_name}}
        </div>
      </div>

      <div class="right">
        <template v-if="typelist">
          <van-image :src="typelist.length > 0 ? typelist[num].icon:''"/>
          <div v-for="(item,index) in typelist[num].sub" :key="index">
            <div class="ttl">{{item.cate_name}}</div>
            <ul class="clearfix goodslist">
              <li
                v-for="(goodsitem,goodsindex) in item.sub"
                :key="goodsindex"
                @click="todetile(goodsitem.id, goodsitem.cate_name)"
              >
                <van-image
                  :height="imgH"
                  fit="cover"
                  :src="goodsitem.icon"
                  style="margin-bottom: 0.1rem"
                  ref="imgW"
                />
                <div
                  class="cate_name fontWrap fontWrapOne"
                  style="font-size: 0.12rem"
                >{{goodsitem.cate_name}}
                </div>
              </li>
            </ul>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
    import Header from "../header/header";
    import Search from "../search/search";
    import Bus from "../../assets/js/bus";
    import clientWw from "../../assets/js/conmon";

    export default {
        name: "classification",
        components: {Search, Header},
        data() {
            return {
                msg: "分类",
                height: "100px",
                sss: "sssss",
                imgH: "",
                num: sessionStorage.getItem('classNum') ? sessionStorage.getItem('classNum') : 0,
                typelist: [
                    {
                        icon: "",
                        sub: [
                            {
                                sub: []
                            }
                        ]
                    }]
            };
        },
        created() {

        },
        methods: {
            opensearch: function () {
                Bus.$emit("searchval", true);
            },
            //    获取分类商品
            getgoods: function () {
                let _this = this;
                let parms = {
                    method: "get.goods.category.list"
                };
                this.$post("/api/v1/goodsCategory", parms)
                    .then(response => {
                        _this.typelist = response.data;
                        this.$nextTick(() => {
                            this.imgH = this.$refs.imgW[0].$el.clientWidth + "px";
                        });
                        console.log(_this.num)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            //  切换商品
            getNum: function (index) {
                this.num = index;
                sessionStorage.setItem('classNum', index);
            },
            //    跳转
            todetile: function (e, name) {
                this.$router.push({path: "/goodslist", query: {id: e, name: name}});
                // document.title = name;
                // console.log(document.title)
            },
            getHeight: function () {
                let clientW = clientWw.clientWw()[2];
                let h =
                    window.innerHeight ||
                    document.documentElement.clientHeight ||
                    document.body.clientHeight; //浏览器高度
                let topH = this.$refs.headerh.offsetHeight;
                this.height = (h - topH - (70 * clientW) / 100) / clientW + "rem";
            }
        },
        mounted() {
            setTimeout(() => {
                this.getHeight();
            }, 100);
            this.getgoods();
        }
    };
</script>

<style lang="scss" scoped>
  .main_height {
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    height: 100%;

    header {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f2f2f2;
      height: 0.55rem;

      .sao,
      .news {
        color: #999;
        min-width: 0.45rem;

        i {
          font-size: 0.24rem;
        }
      }
    }

    .main_div {
      width: 100%;
      height: 100%;
      padding-bottom: 1.2rem;
      display: flex;
      background-color: #f2f2f2;

      .left {
        width: 1rem;
        height: 100%;
        background-color: #fff;
        border-left: 1px solid #f2f2f2;

        .left_li {
          width: 100%;
          height: 0.5rem;
          border-bottom: 1px solid #f2f2f2;
          text-align: center;
          line-height: 0.5rem;
        }

        .active {
          background-color: #f2f2f2;
          position: relative;
        }

        .active:after {
          content: "";
          display: inline-block;
          width: 0.05rem;
          height: 0.5rem;
          background-color: #090;
          position: absolute;
          top: 0;
          left: 0;
        }
      }

      .right {
        flex: 1;
        height: 100%;
        padding: 0.1rem;
        padding-bottom: 0;
        overflow-y: auto;

        .ttl {
          text-align: left;
          padding: 5px 0;
          color: #0f0f0f;
        }

        .goodslist li {
          float: left;
          width: calc(50% - 0.05rem);
          background-color: #fff;
          margin-bottom: 10px;
          font-weight: bold;
          padding: 10px;
          min-height: 14vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          margin-right: 0.1rem;
        }

        .goodslist li:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
  }
</style>
