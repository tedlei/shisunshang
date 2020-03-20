<template>
  <div class="content">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      :immediate-check="false"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-row gutter="3" class="goods_list">
        <van-col span="12" v-for="(item,index) in goods_list" :key="item.index" class="listitem">
          <div class="listdiv">
            <img :src="item.imgsrc">
            <div class="msg_box">
              <p>{{item.name}}</p>
              <div class="price_box">
                <div>
                  <span class="clo-g">￥{{item.price}}</span>
<!--                  <span class="yuan clo-9">￥9.90</span>-->
                </div>
                <van-icon name="add" class="add_cart clo-g"/>
              </div>
            </div>
          </div>
        </van-col>
      </van-row>
    </van-list>


  </div>
</template>

<script>
    export default {
        name: "goodslist",
        data() {
            return {
                loading: false,
                finished: false,
                error: false,
                pages:0,
                goods_list:[]
            }
        },
        methods: {
            async getlist(){
                let _this = this,
                    parms = {
                        method: 'get.goods.category.list',
                        cate_id: _this.$route.query.id,
                        page: this.pages,
                        page_size: 20,
                    };
                this.$post('/api/v1/goods', parms)
                    .then((response) => {
                        this.goods_list = this.goods_list.concat(response.data)
                        // 加载状态结束
                        this.loading = false;
                        this.pages += response.data.length;
                        // 数据全部加载完成
                        if (response.data.length < 20) {
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
            this.getlist()
        }
    }
</script>

<style scoped lang="scss">
  .content {
    padding-right: 1.5px;
    padding-right: 1.5px;
    background-color: #fff;
    text-align: left;

    .goods_list {
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
