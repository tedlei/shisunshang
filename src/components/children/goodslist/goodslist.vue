<template>
  <div class="content" :style="{'padding-top':(this.issearch ? '0' : '')}">
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="text"
      :error.sync="error"
      :immediate-check="false"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-row gutter="3" class="goods_list" v-if="havedata">
        <van-col span="12" v-for="(item,index) in goods_list" :key="item.index" class="listitem">
          <div class="listdiv">
            <img :src="item.imgsrc">
            <div class="msg_box">
              <p>{{item.name}}</p>
              <div class="price_box">
                <div>
                  <span class="clo-g">￥{{item.price}}</span>
                </div>
                <van-icon name="add" class="add_cart clo-g"/>
              </div>
            </div>
          </div>
        </van-col>
      </van-row>

    </van-list>
    <empty v-if="!havedata"></empty>

  </div>
</template>

<script>
    import Empty from "../empty/empty";

    export default {
        name: "goodslist",
        components: {Empty},
        props: ['gainsearchVal'],
        data() {
            return {
                loading: false,
                finished: false,
                error: false,
                havedata: false,
                issearch: false,
                text: '',
                pages: 0,
                goods_list: []
            }
        },
        watch: {
            gainsearchVal: {
                handler(newValue, oldValue) {
                    console.log(newValue)

                    this.getlist();
                },
                deep: true
            }
        },
        methods: {
            async getlist() {
                let _this = this,
                    parms = {
                        method: 'get.goods.category.list',
                        keywords: _this.gainsearchVal,
                        cate_id: _this.$route.query.id == undefined ? 0 : _this.$route.query.id,
                        page: this.pages,
                        page_size: 20,
                    };
                this.$post('/api/v1/goods', parms)
                    .then((response) => {
                        if (response.status == 200 && response.data) {
                            this.goods_list = _this.issearch ? response.data : this.goods_list.concat(response.data);
                            _this.havedata = true;
                            this.pages += response.data.length;
                            _this.text = '没有更多了';
                            this.loading = false;
                            if (response.data.length < 20) {
                                this.finished = true;
                            }
                        } else {
                            _this.havedata = false;
                            // 加载状态结束
                            this.loading = false;
                            this.finished = true;
                        }

                    }).catch(function (error) {
                    console.log(error);
                })
            },
            //下拉加载
            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    console.log(321)
                    this.getlist();
                }, 1000);
            },

        },
        mounted() {
            this.getlist();
            this.gainsearchVal ? this.issearch = true : this.issearch = false

        }
    }
</script>

<style scoped lang="scss">
  .content {
    padding-right: 1.5px;
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
