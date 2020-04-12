<template>
  <div>
    <ul class="firstNav clearfix" style="position: fixed;top: 0.55rem;height: 0.5rem;z-index: 9999;width: 100%">
      <li v-for="(item,index) in firstNav" :class="{active:Fnum == index}" @click="changeval(index)">{{item.text}}</li>
    </ul>
    <!--    -->
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
                    height="1.8rem"
                    fit="cover"
                    :src="item.imgsrc"
                  />
                  <div class="msg">
                    <div class="text fontWrap fontWrapTwo">
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
    import Bus from "../../../assets/js/bus";

    export default {
        name: "Special-area",
        data() {
            return {
                Fnum: 0,
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
                zhuan: {vip: '会员区', customer: '顾客区', retail: '零售区', shop: '商家区'},
                firstNav: [{text: '顾客区', value: 0, typeid: 'customer'},
                    {text: '会员区', value: 1, typeid: 'vip'},
                    {text: '零售区', value: 2, typeid: 'retail'},
                    {text: '商家区', value: 3, typeid: 'shop'},],
                keywords: '',

            }
        },
        methods: {
            changeval(e) {
                switch (e) {
                    case 0:
                        this.$router.replace({query: {typeid: 'customer'}});
                        break;
                    case 1:
                        this.$router.replace({query: {typeid: 'vip'}});
                        break;
                    case 2:
                        this.$router.replace({query: {typeid: 'retail'}});
                        break;
                    case 3:
                        this.$router.replace({query: {typeid: 'shop'}});
                        break;
                    default:

                }
                this.Fnum = e;
                this.flag = true;
                this.getlist();
            },
            //获取导航
            getgoods: function () {
                let _this = this;
                let parms = {
                    method: 'get.goods.category.list',
                };
                this.$post('/api/v1/goodsCategory', parms)
                    .then((response) => {
                        response.data.unshift({id: 0, cate_name: '全部'})

                        _this.navItems = response.data
                        _this.defaultcateid = response.data[0].id;
                        for (let i in response.data) {
                            _this.cateidarry.push(response.data[i].id)
                        }
                        _this.getlist()

                    }).catch(function (error) {
                    console.log(error);
                })
            },
            //点击切换
            qiehuan(name, title) {
                console.log(name)
                console.log(title)
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
                        cate_id: _this.defaultcateid,
                        keywords: _this.keywords
                    };
                this.$post('/api/v1/goods', parms)
                    .then((response) => {
                        if (_this.flag) {
                            if (response.status == 200) {
                                if (response.data) {
                                    this.list = response.data
                                } else {
                                    this.list = []
                                    this.finished = true;
                                }
                                this.pages = 0;
                            } else {
                                _this.$toast(response.message)
                            }
                        } else {
                            if (response.status == 200) {
                                if (response.data) {
                                    this.list = this.list.concat(response.data)
                                } else {
                                    this.finished = true;
                                }
                                // 加载状态结束
                                this.loading = false;
                                this.pages += response.data.length;
                                // 数据全部加载完成
                                if (response.data.length < 20) {
                                    this.finished = true;
                                }
                            } else {
                                _this.$toast(response.message)
                            }
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
                        id: e,
                        buy_type: this.$route.query.typeid,
                    }
                })
            }
        },
        mounted() {
            document.title = this.zhuan[this.$route.query.typeid]
            this.getgoods();
            //    初始选项
            for (let i in this.firstNav) {
                if (this.firstNav[i].typeid == this.$route.query.typeid) {
                    console.log(i)
                    this.Fnum = this.firstNav[i].value
                }

            }
            Bus.$on('searchD', (data) => {
                this.keywords = data;
                this.pages = 0;
                this.flag = true;
                this.getlist();
            });
        },
        destroyed() {

        },
    }
</script>

<style scoped lang="scss">
  .firstNav {
    background-color: #fff;
    padding: 0.1rem;

    li {
      float: left;
      width: 25%;
      line-height: 0.3rem;
      border-radius: 4px;
    }

    li.active {
      background-color: #009900;
      color: #fff;
    }
  }

  .nav {
    top: 1.05rem;

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
            font-size: 0.14rem;
            height: 0.38rem;

            .vip {
              background-color: #009900;
              color: #fff;
              display: inline-block;
              line-height: 14px;
              border-radius: 5px;
              padding: 1px 4px;
              font-size: 0.12rem;
            }
          }

          .yishou {
            font-size: 0.12rem;
            color: #999999;
            margin: 0.05rem 0;
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
