<template>
  <div>
    <van-tabs class="nav" v-model="active" animated @click="qiehuan">
      <van-tab v-for="(item,index) in navItems" :key="index" :title="item.cate_name">
        <div class="common_box">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error.sync="error"
            :immediate-check="false"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
          >
            <el-row class="introduce_img" :gutter="10">
              <el-col v-for="(item,index) in list" :key="index" :span="12" class="lists">
                <div class="grid-content bg-purple" @click="gotodetail(item.id)">
                  <van-image
                    width="100%"
                    height="1.92rem"
                    fit="cover"
                    :src="item.imgsrc"
                  />
                  <div class="msg">
                    <div class="text">
                      <span class="vip">{{zhuan[$route.query.typeid]}}</span>
                      {{item.name}}
                    </div>
                    <div class="yishou">已售：{{item.xiaoliang}}件</div>
                    <div class="clo-g price">￥{{item.price}}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
    export default {
        name: "Special-area",
        data() {
            return {
                num: 0,
                loading: false,
                finished: false,
                error: false,
                pages: 0,
                flag: false,
                navItems: [],
                list: [],
                defaultcateid: '',
                cateidarry: [],
                active: '',
                zhuan: {vip: '会员区', customer: '顾客区', retail: '零售区', shop: '商家区'}
            }
        },
        methods: {
            //获取导航
            getgoods: function () {
                let _this = this;
                let parms = {
                    method: 'get.goods.category.list',
                };
                this.$post('/api/v1/goodsCategory', parms)
                    .then((response) => {
                        _this.navItems = response.data;
                        _this.defaultcateid = response.data[0].id;
                        for (var i in response.data) {
                            _this.cateidarry.push(response.data[i].id)
                        }
                        _this.getlist()

                    }).catch(function (error) {
                    console.log(error);
                })
            },
            //点击切换
            qiehuan(name, title) {
                this.flag = true
                this.defaultcateid = this.cateidarry[name];
                this.getlist();
            },
            //获取商品
            async getlist() {
                let _this = this,
                    parms = {
                        method: 'get.goods.map.list',
                        map: _this.$route.query.typeid,
                        page: this.pages,
                        page_size: 20,
                        cate_id: _this.defaultcateid
                    };
                this.$post('/api/v1/goods', parms)
                    .then((response) => {
                        if (_this.flag) {
                            this.list = response.data
                        } else {
                            this.list = this.list.concat(response.data)
                        }
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
                    this.flag = false
                    this.getlist();
                }, 1000);
            },
            gotodetail: function (e) {
                console.log(e)
                this.$router.push({
                    path: '/goodsdetails',
                    query: {
                        id: e
                    }
                })
            }
        },
        mounted() {
            // this.getlist();
            this.getgoods();
        }
    }
</script>

<style scoped lang="scss">
  .nav {
    top: 0.55rem;

    /deep/ .van-tabs__wrap {
      position: fixed;
      left: 0;
      right: 0;
      z-index: 999;
    }

    /deep/ .van-tabs__content {
      padding-top: 44px;
      text-align: left;
    }

    /deep/ .van-tabs__line {
      background-color: #009900;
    }

    .lists {
      margin-bottom: 10px;

      .grid-content {
        background-color: #fff;
        border-radius: 3px;
        overflow: hidden;

        .msg {
          padding: 10px;
          text-align: left;

          .text {
            font-size: 0.16rem;

            .vip {
              background-color: #009900;
              color: #fff;
              display: inline-block;
              line-height: 16px;
              border-radius: 5px;
              padding: 4px;
            }
          }

          .yishou {
            font-size: 0.12rem;
            color: #999999;
            margin: 10px 0;
            text-align: right;
          }

        }

      }

    }
  }

  .common_box {
    background: none;
    margin-bottom: 0;
  }

</style>
