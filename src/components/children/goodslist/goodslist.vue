<template>
  <div class="content" :style="{'top':(gainsearchVal ? '0' : '')}">
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="text"
      :error.sync="error"
      :immediate-check="false"
      error-text="请求失败，点击重新加载"
      :offset="100"
      @load="onLoad"
      v-if="havedata"
    >
      <van-row gutter="3" style="margin: 0" class="goods_list">
        <van-col span="12" v-for="(item,index) in goods_list" :key="index" class="listitem">
          <div class="listdiv" @click="gotodetail(item.id)">
            <van-image width="100%" height="1.92rem" fit="cover" :src="item.imgsrc"/>
            <div class="msg_box">
              <p class="fontWrap fontWrapTwo">{{item.name}}</p>
              <div class="price_box">
                <div>
                  <span class="clo-g">￥{{item.price}}</span>
                </div>
                <!--                <van-icon name="add" class="add_cart clo-g" @click="goodsCart(item.id)"/>-->
              </div>
            </div>
          </div>
        </van-col>
      </van-row>
    </van-list>
    <van-empty description="暂无商品！" v-else/>
  </div>
</template>

<script>
    import Empty from "../empty/empty";
    import Bus from "../../../assets/js/bus";

    export default {
        name: "goodslist",
        components: {Empty},
        props: ["gainsearchVal"],
        data() {
            return {
                loading: false,
                finished: false,
                error: false,
                havedata: true,
                text: "",
                pages: 0,
                goods_list: []
            };
        },
        computed: {
            gainVal: function () {
                return this.$store.state.searchVal;
            }
        },
        watch: {
            gainVal: {
                handler(newValue, oldValue) {
                    this.goods_list = []
                    this.getlist();
                },
                deep: true
            }
        },
        methods: {
            async getlist() {
                this.$store.commit('setLoading');
                let _this = this,
                    parms = {
                        method: "get.goods.category.list",
                        keywords: _this.gainsearchVal,
                        cate_id: _this.gainsearchVal ? 0 : _this.$route.query.id,
                        page: _this.gainsearchVal ? 0 : _this.pages,
                        page_size: 10,
                    };
                this.$post("/api/v1/goods", parms)
                    .then(response => {
                        if (response.status == 200 && response.data) {
                            this.goods_list = [...this.goods_list, ...response.data];
                            _this.havedata = true;
                            this.pages += response.data.length;
                            _this.text = "没有更多了";
                            this.loading = false;
                            if (response.data.length < 10) {
                                this.finished = true;
                            }

                        } else {
                            _this.havedata = false;
                            // 加载状态结束
                            this.loading = false;
                            this.finished = true;
                        }
                        this.$store.commit('setLoading');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            //下拉加载
            onLoad() {
                // 异步更新数据
                this.getlist();
            },
            // 去详情页面
            gotodetail: function (e) {
                this.$router.push({
                    path: "/goodsdetails",
                    query: {
                        id: e
                    }
                });
                Bus.$emit("closepop", true);
            }
            //添加购物车
            // goodsCart() {
            //     this.$store.commit("setLoading");
            //     let getCart = '';
            //     // for (var i in this.initial) {
            //     //   // getCart += this.initial[i];
            //     // }
            //     getCart = this.initial.join('_');
            //     // console.log(getCart);
            //     let ad_data = {
            //         method: 'add.goods.cart.item',
            //         goods_id: this.goodsData.goods_info.id,
            //         goods_num: this.nums,
            //         // goods_sku_id: getCart,
            //         buy_type: 'customer'
            //     }
            //     this.$post('/api/v1/goodsCart', ad_data)
            //     .then((res) => {
            //         // console.log(res.status)
            //         if (res.status == 200) {
            //             this.$toast.success("添加成功");
            //             this.$store.commit("setLoading");
            //         } else {
            //             this.$store.commit("setLoading");
            //             this.$toast.fail("添加失败");
            //         }
            //     }).catch((error) => {
            //        console.log(error);
            //     });
            // },
        },
        mounted() {
            // this.$route.meta.title = this.$route.query.name;
            this.getlist();
            // console.log(this.gainsearchVal);
        },
        updated() {
        }
    };
</script>

<style scoped lang="scss">
  .content {
    padding-right: 1.5px;
    background-color: #fff;

    .goods_list {
      text-align: left;

      .listitem {
        margin-top: 3px;

        .listdiv {
          border: 1px solid #f2f2f2;

          .msg_box {
            padding: 7px;

            > p:first-child {
              height: 0.4rem;
            }

            .price_box {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .yuan {
                font-size: 0.12rem;
                text-decoration: line-through;
              }

              .add_cart {
                font-size: 0.18rem;
              }
            }
          }
        }
      }
    }
  }
</style>
