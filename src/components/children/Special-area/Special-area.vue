<template>
  <div>
    <ul class="firstNav clearfix" style="position: fixed;top: 0.55rem;height: 0.5rem;z-index: 9999;width: 100%">
      <li v-for="(item,index) in firstNav" :class="{active:Fnum == index}" @click="changeval(index)">{{item.text}}</li>
    </ul>
    <!--    -->
    <van-tabs class="nav" v-model="active" animated @click="qiehuan">
      <van-tab v-for="(item,index) in navItems" :key="index" :title="item.cate_name">
        <div class="content" :style="{'height':content_H}" id="chatContent">
          <div class="common_box" ref="chatContent">

            <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="tips"
              :error.sync="error"
              error-text="请求失败，点击重新加载"
              @load="onLoad"
              ref="checkbox"
              :immediate-check="false"
            >
              <van-row class="introduce_img" :gutter="10">
                <van-col v-for="(items,indexs) in item.list" :key="indexs" :span="12" class="lists">

                  <div class="grid-content bg-purple" @click="gotodetail(items.id)">
                    <div class="goodsk" ref="imgW"
                         :style="{'height':imgH}">
                      <div v-if="items.is_show == 1">
                        <img src="../../../assets/img/goodsk.jpg" class="goodsk_img">
                        <p class="goodsk_price">￥{{Number(items.price)}}</p>
                        <p class="goodsk_p">签到金可订购</p>
                      </div>

                      <van-image
                        fit="cover"
                        :src="items.imgsrc"
                        class="goods_img"
                      />
                    </div>

                    <div class="msg">
                      <div class="text fontWrap fontWrapTwo">
                        <span class="vip">{{zhuan[$route.query.typeid]}}</span>
                        {{items.name}}
                      </div>
                      <div class="yishou">已售：{{items.xiaoliang}}件</div>
                      <div class="clo-g price">￥{{items.price}}</div>
                    </div>
                  </div>
                </van-col>
              </van-row>
            </van-list>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
    import Bus from "../../../assets/js/bus";
    import clientW from "../../../assets/js/conmon"

    export default {
        name: "Special-area",
        data() {
            return {
                content_H: '',
                Fnum: 0,
                num: 0,
                tips: '',
                listindex: 0,
                imgH: "100px",
                loading: false,
                finished: false,
                error: false,
                pages: 0,
                flag: true,
                dontOnload: false,
                navItems: [{
                    list: []
                }],
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
            //点击切换
            changeval(e) {
                document.getElementById('chatContent').scrollTop = 0;
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
                this.pages = 0;
                this.getlist(this.listindex);
            },
            //点击切换
            qiehuan(name, title) {
                this.finished = false;
                this.listindex = name;
                this.flag = true;
                this.pages = 0;
                this.getlist(name);

                this.defaultcateid = this.cateidarry[name];
                // 清空列表数据
                this.finished = false;

                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                this.onLoad();
            },
            //下拉加载
            onLoad() {
                this.flag = false;
                this.getlist()
            },
            //获取导航
            getgoods: function () {
                let _this = this;
                let parms = {
                    method: 'get.goods.category.list',
                };
                this.$post('/api/v1/goodsCategory', parms)
                    .then((response) => {
                        if (response.status == 200) {
                            if (response.data) {
                                response.data.unshift({id: 0, cate_name: '全部'})
                                _this.navItems = response.data
                                _this.defaultcateid = response.data[0].id;
                                for (let i in response.data) {
                                    _this.cateidarry.push(response.data[i].id)
                                }
                            }
                        } else {
                            _this.$toast(response.message)
                        }


                    }).catch(function (error) {
                    console.log(error);
                })
            },

            //获取商品
            async getlist(name) {
                let names = name || 0;
                console.log(names)
                let _this = this,
                    parms = {
                        method: 'get.goods.map.list',
                        map: _this.$route.query.typeid,
                        page: _this.flag ? 0 : _this.pages,
                        page_size: 20,
                        cate_id: _this.defaultcateid,
                        keywords: _this.keywords
                    };
                this.$post('/api/v1/goods', parms)
                    .then((response) => {
                        if (_this.flag) {
                            _this.loading = true
                            if (response.status == 200) {
                                if (response.data) {
                                    _this.navItems[names].list = response.data;
                                    console.log(_this.navItems[names].list)
                                    _this.pages = _this.navItems[names].list.length;
                                    setTimeout(() => {
                                        this.imgH = this.$refs.imgW[0].offsetWidth + "px";
                                    }, 100)
                                } else {
                                    this.list = []
                                    this.finished = true;
                                }
                                // 加载状态结束
                                _this.loading = false

                                if (response.data.length < 20) {
                                    this.finished = true;
                                    // _this.tips = ''
                                }
                            } else {
                                _this.$toast(response.message)
                            }


                        } else {
                            console.log('下拉')
                            if (response.status == 200) {
                                if (response.data) {
                                    if (_this.navItems[names].list) {
                                        _this.navItems[names].list = _this.navItems[names].list.concat(response.data);
                                    } else {
                                        _this.navItems[names].list = response.data;
                                    }
                                    setTimeout(() => {
                                        this.imgH = this.$refs.imgW[0].offsetWidth + "px";
                                    }, 100)
                                } else {
                                    this.finished = true;
                                }
                                // 加载状态结束
                                this.loading = false;
                                this.pages += response.data.length;
                                // 数据全部加载完成
                                if (response.data.length < 20) {
                                    this.finished = true;
                                    _this.tips = '没有更多了'
                                }
                            } else {
                                _this.$toast(response.message)
                            }
                        }
                    }).catch(function (error) {
                    console.log(error);
                })
            },


            gotodetail: function (e) {
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
            document.title = this.zhuan[this.$route.query.typeid];

            this.getlist();
            this.getgoods();
            //初始选项
            for (let i in this.firstNav) {
                if (this.firstNav[i].typeid == this.$route.query.typeid) {
                    this.Fnum = this.firstNav[i].value
                }
            }
            Bus.$on('searchD', (data) => {
                this.keywords = data;
                this.pages = 0;
                this.flag = true;
                this.getlist();
            });
            this.content_H = ((clientW.clientWw()[1] / clientW.clientWw()[2] - 1.1) * clientW.clientWw()[2] - 44) + 'px'
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

    > > > .van-tabs__wrap {
      position: fixed;
      left: 0;
      right: 0;
      z-index: 999;
    }

    > > > .van-tabs__content {
      padding-top: 44px;
      text-align: left;
    }

    > > > .van-tabs__line {
      background-color: #009900;
    }


  }

  .content {
    position: relative;
    top: 0;

    .common_box {
      background: none;
      margin-bottom: 0;
      padding: 0;
    }
  }


</style>
