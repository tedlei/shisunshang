<template>
  <div class="content">
    <div class="evalua" v-for="(item,index) in evaluate.goods" :key="index">
      <div class="goodsImg">
        <van-image
          width="0.4rem"
          height="0.4rem"
          fit="cover"
          :src="item.thumb"
        />
        <span style="width:85%;text-align: left;" class="fontWrap fontWrapOne">
              {{item.name}}
            </span>
      </div>
      <div class="evaluaInput">
        <van-cell>
          <van-field
            v-model="value[index]"
            placeholder="宝贝满足你的期待吗？说说它美中不足的地方吧"
            :border="false"
            autosize
            rows="3"
            type="textarea"
            show-word-limit
          />
          <div class="uploaderImgs">
            <imgOSSuploader :index='index' :maxCount='4'></imgOSSuploader>
          </div>
        </van-cell>
      </div>
    </div>
    <div class="btn">
      <van-button type="primary" block @click="Submission">提交</van-button>
    </div>
  </div>
</template>

<script>
    import imgOSSuploader from "../imgOSS/uploaderTwo"
    import imgUpload from '../../../api/imgUpload'

    export default {
        components: {
            imgOSSuploader,
        },
        data() {
            return {
                value: [],
                evaluate: {},
            }
        },
        methods: {
            afterRead(file) {
                // console.log(file);
            },
            getData() {
                let _id = this.$route.query.id;
                let ad_data = {
                    method: 'get.order.item',
                    order_id: _id
                };
                this.$post('/api/v1/order', ad_data)
                    .then((res) => {
                        console.log(res);
                        this.evaluate = res.data;

                    }).catch(function (error) {
                    console.log(error);
                });
            },
            setData(ad_data) {
                this.$post('/api/v1/GoodsComment', ad_data)
                    .then((res) => {
                        console.log(res);
                        if (res.status == 200) {
                            this.$router.push({path: '/mine/myfootprint', query: {printid: 3}});
                        }
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            Submission() {
                let upimglist = [];
                let imglist = this.$store.getters.getloopUpimgs;
                // console.log(imglist);
                if (imglist.length == 0) {
                    let goodslist = this.evaluate.goods;
                    for (let i in goodslist) {
                        upimglist.push({
                            product_id: goodslist[i].goods_id,//商品id
                            order_id: goodslist[i].id,//订单Id
                            imgarr: [],//url数组
                            content: this.value[i],//评论内容
                        });
                        if (upimglist.length == goodslist.length) {
                            let ad_data = {
                                method: 'add.goods.comment.list',
                                list: upimglist,
                                order_id: this.evaluate.id
                            };
                            this.setData(ad_data);
                        }
                    }
                } else {
                    for (let i in imglist) {
                        imgUpload(imglist[i]).then(res => {
                            console.log(res);
                            // console.log(this.evaluate.goods[i].goods_id)
                            upimglist.push({
                                product_id: this.evaluate.goods[i].goods_id,//商品id
                                order_id: this.evaluate.id,//订单Id
                                imgarr: res,//url数组
                                content: this.value[i],//评论内容
                            });
                            if (upimglist.length == imglist.length) {
                                let ad_data = {
                                    method: 'add.goods.comment.list',
                                    list: upimglist,
                                    order_id: this.evaluate.id
                                };
                                this.setData(ad_data);
                            }

                        })
                    }
                }

            }
        },
        mounted() {
            this.getData();
        },
        computed: {},
        watch: {}
    }
</script>
<style lang="scss" scoped>
  .content {
    padding-bottom: 50px;

    .evalua {
      padding: 0.1rem 0.1rem;
      background-color: #fff;
      margin-bottom: 0.1rem;

      .goodsImg {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.1rem;
      }

      .uploaderImgs {
        margin: 0.1rem 0;

      }
    }

  }

  .van-cell {
    padding: 0 !important;
  }

  .hrDiv {
    height: 0.1rem;
  }

  .btn {
    padding: 0.2rem 0.1rem;
  }
</style>
