<template>
  <div>
    <div class="main">
      <header>
        <van-icon name="arrow-left" class="back" @click="$router.back(-1)"/>
      </header>
      <van-tabs v-model="active" scrollspy >

        <van-tab title="商品">
          <div style="height: 44px"></div>
          <div id="allmerchandise">
            <!-- :autoplay="3000" -->
            <van-swipe @change="onChange" ref="imgCheckbox">
              <van-swipe-item v-for="(item,index) in goodsData.goods_info.album" :key="index">
                <img
                  v-show="item!='' && item!=undefined && item != null"
                  class="swipeImgs"
                  :src="item"
                />
                <img
                  v-show="item==''||item==undefined||item==null"
                  class="swipeImgs"
                  src="../../assets/img/mrtp.png"
                />
              </van-swipe-item>
              <template #indicator>
                <div class="indicator">
                  <div
                    class="custom-indicator"
                    :class="customIndicator==index?'custom-indicator2':''"
                    v-for="(item,index) in goodsData.goods_info.album"
                    :key="index"
                    @click="swipeCustomIndicator(index)"
                  ></div>
                </div>
              </template>
            </van-swipe>
          </div>

          <div class="AdvertisingRoll">
            <AdvertisingRoll></AdvertisingRoll>
          </div>
          <!-- 1 -->
          <div class="m_b_10 conmo_box box_one">
            <div class="name textLinefeed commodityName">{{goodsData.goods_info.name}}</div>
            <div class="gg">
              <span class="textLinefeed SpecificationsName">{{initialName}}</span>
            </div>
            <div class="price">
              <span class="price_text">￥{{goodsData.goods_info.price}}</span>
              <span class="share" @click="showTwo = true">
                        <img src="../../assets/img/spfx.png" alt="#"/>
                        分享
                    </span>
            </div>
            <div class="ys">
              <div>
                已售
                {{goodsData.goods_info.xiaoliang}}
              </div>
              <div>
                库存
                {{goodsData.goods_info.store_array[isactions]}}
              </div>
              <div>
                保:
                {{goodsData.goods_info.offer_money_array[isactions]}}
                元
              </div>
              <div>
                邮:
                {{goodsData.goods_info.postage_array[isactions]}}
                元
              </div>
            </div>
          </div>
          <!-- 2 -->
          <div class="m_b_10 conmo_box box_one">
            <div class="vipPurchase">
                    <span>
                        签到金：
                        {{goodsData.money_array[isactions].qd_money_rate/100*goodsData.goods_info.price | moneyFormat}}
                        元
                    </span>
              <span v-show="goodsData.money_array[isactions].money_rate>0">
                        充值金：
                        {{goodsData.money_array[isactions].money_rate/100*goodsData.goods_info.price | moneyFormat}}
                        元
                    </span>
            </div>
            <div
              v-show="goodsData.goods_info.xg_array[isactions].limitdan>0 || goodsData.goods_info.xg_array[isactions].limitcount>0"
              class="vipPurchase"
            >
                    <span
                      v-show="goodsData.goods_info.xg_array[isactions].limitdan>0"
                    >限购{{goodsData.goods_info.xg_array[isactions].limitdan}}单</span>
              <span
                v-show="goodsData.goods_info.xg_array[isactions].limitcount>0"
              >每单限购{{goodsData.goods_info.xg_array[isactions].limitcount}} 份</span>
            </div>
          </div>
          <div
            style="display: flex;justify-content: space-between;"
            class="m_b_10 conmo_box"
            @click="show=true"
          >
            <div class="left vip_head">购买方式：</div>
            <div style="display: flex; align-items: center;" class="right">
              <div>{{actionsName[isactions]}}</div>
              <van-icon name="arrow"/>
            </div>
          </div>
          <div class="m_b_10 conmo_box box_one">
            <div class="goodsNumber">
              <span>数量：</span>
              <van-stepper
                v-model="nums"
                :max="goodsData.goods_info.xg_array[isactions].limitcount==0?'999':goodsData.goods_info.xg_array[isactions].limitcount"
              />
            </div>
          </div>
          <!-- <div class="m_b_10 conmo_box box_two" @click="drawer = true">
                <span class="left">选择</span>
                <div class="right">
              <span class="textLinefeed SpecificationsName">已选择：
                {{initialName}}
              </span>
            </div>
          </div>-->
          <!--   3   -->
          <!-- <div class="m_b_10 conmo_box box_three">
              <span class="left">送至</span>
              <div class="right">
                <span>免运费</span>
              </div>
          </div>-->
          <!--   4   -->
          <!-- <div class="m_b_10 conmo_box box_four">
          <div class="left store_head">
          <img src="../../assets/img/store_head.png">
          </div>
          <div class="right">
          <span>重庆网络科技自营店</span>
          </div>
          </div>-->
          <!--   5   -->

          <!-- 购买方式上拉菜单 -->
          <van-action-sheet
            v-model="show"
            :actions="actions"
            close-on-click-overlay
            @select="onSelect"
          />
          <!-- 分享上拉菜单 -->
          <van-action-sheet v-model="showTwo" close-on-click-overlay>
            <div class="shareUp">
              <div @click="Replication">
                <img src="../../assets/img/fzlj.png" alt/>
                <p>复制链接</p>
              </div>
              <div @click="SharePoster">
                <img src="../../assets/img/schb2.png" alt/>
                <p>生成海报</p>
              </div>
              <div @click="showUrl">
                <img src="../../assets/img/wxhb.png" alt/>
                <p>微信好友</p>
              </div>
            </div>
            <div class="shareUpHr"></div>
            <div class="shareUpcancel" @click="showTwo = false">取消</div>
          </van-action-sheet>
          <!-- 店铺详情 -->
          <div id="commoditEvaluate">
            <shop :is_follow="is_follow"></shop>
          </div>
          <!-- 海报 -->
          <div class="Cover" v-show="isQRcodeDomainName">
            <div v-show="!isPoster">
              <div class="PosterDiv" id="Poster" :style="{'width':w+'px','height':h+'px'}">
                <div>
                  <img :src="portrait" alt/>
                  <div>
                    <p>{{users.weixinname}}</p>
                    <p>给你推荐了一个好东西</p>
                  </div>
                </div>
                <img
                  v-show="isGoods_infoImgsrc"
                  style="width:100%;height:235px"
                  :src="goodsData.goods_info.imgsrc"
                  alt="海报图片"
                />
                <!-- <img v-show="!isGoods_infoImgsrc" style="width:100%;height:235px" src="../../assets/img/mrtp.png" alt="海报图片"> -->
                <div class="PosterDivMoney">
                  ￥
                  {{goodsData.goods_info.price}}
                </div>
                <div class="PosterDivQRcode">
                  <div>{{goodsData.goods_info.keywords}}</div>
                  <div class="qrcode" id="qrCode" ref="qrCode"></div>
                </div>
              </div>
            </div>
            <div class="haibao" v-show="isPoster">
              <div class="CloseQRcodeDomainName" @click="isQRcodeDomainName = false">
                <img src="../../assets/img/hbx.png" alt/>
              </div>
              <img style="width: 100%; heigth:100%;" :src="imgResult" alt="#"/>
            </div>
          </div>
          <div class="CoverTwo" v-show="isUrl" @click="isUrl = false">
            <div style="text-align: right">
              <img src="../../assets/img/zhi.png" class="zhi"/>
            </div>

            <div class="share_tips">
              <strong>立即分享给好友吧</strong>
              <p>点击屏幕右上角将本页面分享给好友</p>
            </div>
          </div>
        </van-tab>
        <van-tab title="评价">
          <!--   商品评价   -->
          <div style="padding:0.1rem" class="m_b_10 conmo_box goods_evaluate">
            <div v-show="comment">
              <div class="head">商品评价</div>
              <div class="user_evaluate" v-for="(item,index) in evaluatelist" :key="index">
                <div class="evaluate_head">
                  <div class="user">
                    <img
                      :src="item.users!=undefined&&item.users!=null&&item.users!=''?item.users.portrait:''"
                      style="width: 24px"
                    />
                    <span>{{item.users!=undefined&&item.users!=null&&item.users!=''?item.users.weixinname:''}}</span>
                  </div>
                  <div class="add_time">{{item.add_time}}</div>
                </div>
                <p class="text_p">{{item.content}}</p>
              </div>
              <div class="watch_all">
                <span>查看全部评价</span>
              </div>
            </div>
            <div v-show="!comment" align="center">暂无评价！</div>
          </div>
          <!--  推荐列表  -->
          <div class="conmo_box tuijian_slide">
            <title style="display: block;">
              <van-divider :style="{ color: '#099000', borderColor: '#099000', padding: '0 16px'}">
                猜你喜欢
              </van-divider>
            </title>
            <van-skeleton :loading="loading" :row="2">
              <van-row class="goodslist RecommendBac">
                <van-col
                  :span="12"
                  v-for="(goods, goodsindex) in goodsitem"
                  :key="goodsindex"
                >
                  <!--<router-link :to="{path:'/goodsdetails',query:{id: goods.id}}">-->
                  <div class="item Recommend" @click="lajibushuaxin(goods.id)">
                    <van-image
                      width="100%"
                      height="1.8rem"
                      fit="cover"
                      :src="goods.goodsimg"
                    />
                    <div>
                      <p class="fontWrap fontWrapTwo">{{goods.goodsname}}</p>
                      <div style="display: flex;justify-content: space-between;">
                        <div class="goodsprice clo-g">￥{{goods.goodsrice}}</div>
                        <div class="Sold">已售：{{goods.Sold}}</div>
                      </div>
                      
                    </div>
                  </div>
                  <!--</router-link>-->
                </van-col>
              </van-row>
            </van-skeleton>
          </div>
        </van-tab>
        <van-tab title="详情">
          <!-- 商品详情 -->
          <div class="Commodity-details">
            <van-divider
              :style="{ color: '#099000', borderColor: '#099000', padding: '0 16px'}"
            >商品详情
            </van-divider>
            <!-- 商品详情副文本框 -->
            <div class="conmo_box bot_img_box" v-html="goodsData.goods_info.content"></div>
          </div>
        </van-tab>

      </van-tabs>

    </div>
    <!-- 底部   -->
    <div class="footer_js">
      <div class="left">
        <div @click="service">
          <van-icon name="chat-o" size="20px"/>
          <div>客服</div>
        </div>
        <div @click="collection">
          <van-icon v-show="goodsData.goods_info.is_follow!=1" name="star-o" size="20px"/>
          <van-icon v-show="goodsData.goods_info.is_follow==1" name="star" size="20px"/>
          <div>收藏</div>
        </div>
        <div>
          <router-link to="/my_cart">
            <van-icon
              v-show="$store.getters.getCartNum==0"
              name="shopping-cart-o"
              size="20px"
            />
            <van-icon
              v-show="$store.getters.getCartNum!=0"
              name="shopping-cart-o"
              :info="$store.getters.getCartNum"
              size="20px"
            />
            <div>购物车</div>
          </router-link>
        </div>
      </div>
      <div class="right">
        <div class="join_cart" @click="goodsCart">加入购物车</div>
        <div class="buy" @click="diatepurchase">立即购买</div>
      </div>
    </div>
    <!-- 规格选择 -->
    <!-- <el-drawer
  title=""
  :visible.sync="drawer"
  :before-close="handleClose"
  :direction="direction"
  :size="'auto'"
  class="Specifications_box">
  <div class="top_msg">
    <div style="width: 100px;margin-top: -20px">
      <img :src="require(`../../assets/img/banner.png`)">
    </div>
    <div class="right_msg">
      <div class="clo-g price">￥
      {{goodsData.goods_info.price}}
      </div>
      <p>库存：
      {{goodsData.goods_info.kuchun}}
      </p>
    </div>
  </div>
  <div class="Specifications_select" v-for="(item,n) of goodsData.specData.spec_attr" :key="n">
    <p>{{item.group_name}}</p>
    <actives :activeList="item.spec_items" :listIndex="n" :initial="initial" ></actives>
  </div>
  <div class="num_box">
    <div>数量</div>
    <el-input-number size="mini" v-model="nums"></el-input-number>
  </div>
  <div class="btn_bottom">
    <div class="carts" @click="goodsCart">加入购物车</div>
    <div class="buy">
      <router-link :to="{path:'/goodsdetails/makeorder',query:{id: goodsData.goods_info.id, num: nums, goods_sku_id: initial,buy_type: isactions}}">
      立即购买
      </router-link>
    </div>
  </div>
    </el-drawer>-->
  </div>
</template>

<script>
    import actives from "./actives/active";
    import shop from "./actives/shop";
    import QRCode from "qrcodejs2";
    import html2canvas from "html2canvas";
    import wechatAuth from "../../assets/js/wechatConfig";
    import AdvertisingRoll from "./AdvertisingRoll/AdvertisingRoll";
    import Header from "../header/header";

    export default {
        name: "goodsDATA",
        components: {
            Header,
            actives: actives,
            shop: shop,
            AdvertisingRoll: AdvertisingRoll
        },
        data() {
            return {
                active: 0,
                sImgs: [], //轮播图
                customIndicator: 0, //轮播图指示器颜色
                initial: [], //默认规格Id
                initialName: "", //默认规格名称
                ReceivingAddress: "", //收货地址
                show: false,
                showTwo: false,
                isGoods_infoImgsrc: true,
                isQRcodeDomainName: false,
                isUrl: false,
                isPoster: false,
                w: 260,
                h: 410,
                imgResult: "",
                users: {}, //用户信息
                portrait: "", //用户头像
                comment: false,
                // imglist: [], //轮播数组
                actions: [{name: "选项"}, {name: "选项"}],
                evaluatelist: [],
                isactions: "customer",
                actionsName: {
                    customer: "顾客购买",
                    vip: "会员购买",
                    retail: "零售专区",
                    shop: "商家专区"
                },
                loading: true,
                msg: "商品详情",
                imgHeight: "",
                boxHeight: "",
                drawer: false,
                direction: "btt",
                nums: 1, //添加购物车的商品数量
                name:
                    "简箪 现磨新米农家自产长香丝2.5kg煲仔饭丝苗米不抛光长粒香大米",
                goodsitem: [],
                goodsData: {
                    goods_info: {
                        offer_money_array: [],
                        postage_array: [],
                        album: [require("../../assets/img/mrtp.png")],
                        store_array: {
                            customer: "",
                            vip: "",
                            retail: "",
                            shop: ""
                        },
                        xg_array: {
                            customer: {},
                            vip: {},
                            retail: {},
                            shop: {}
                        },
                        spec: [],
                        spec_rel: []
                    },
                    buy_array: {
                        customer: "",
                        vip: ""
                    },
                    money_array: {
                        customer: {
                            module: "",
                            id: "",
                            goods_id: "",
                            qd_money_rate: "",
                            money_rate: ""
                        },
                        vip: {
                            module: "",
                            id: "",
                            goods_id: "",
                            qd_money_rate: "",
                            money_rate: ""
                        },
                        retail: {
                            module: "",
                            id: "",
                            goods_id: "",
                            qd_money_rate: "",
                            money_rate: ""
                        },
                        shop: {
                            module: "",
                            id: "",
                            goods_id: "",
                            qd_money_rate: "",
                            money_rate: ""
                        }
                    },
                    specData: {
                        spec_attr: [
                            {
                                group_id: "",
                                group_name: "",
                                spec_items: [
                                    {
                                        item_id: "",
                                        spec_value: ""
                                    }
                                ]
                            }
                        ],
                        spec_list: [
                            {
                                goods_spec_id: "",
                                spec_sku_id: "",
                                rows: "",
                                form: {
                                    goods_no: "",
                                    goods_price: "",
                                    goods_weight: "",
                                    line_price: "",
                                    stock_num: "",
                                    give_integral: ""
                                }
                            }
                        ]
                    },
                    shopinfo: {
                        id: "",
                        name: "",
                        score_zh: "",
                        score_ms: "",
                        score_fw: "",
                        score_fh: ""
                    }
                },
                is_follow: 0
            };
        },

        methods: {
            onChange(index) {
                this.customIndicator = index;
            },
            swipeCustomIndicator(index) {
                // console.log(this.$refs.imgCheckbox)
                this.$refs.imgCheckbox.swipeTo(index);
            },
            goAnchor(selector, n) {
                this.active = n;
                // var anchor = this.$el.querySelector(selector);
                // document.documentElement.scrollTop = anchor.offsetTop;
                console.log(document.getElementById(selector).scrollIntoView())
                document.getElementById(selector).scrollIntoView(false);
            },
            onSelect(item, index) {
                // 默认情况下点击选项时不会自动收起
                // 可以通过 close-on-click-action 属性开启自动收起
                // console.log(item);
                // if(item.key=='vip'){
                //   this.show = false;
                //   this.$dialog.confirm({
                //     message: '您还不是会员，马上前往充值会员？'
                //   }).then((res) => {
                //     console.log(res)
                //   }).catch((err) => {
                //     console.log(err)
                //   });
                // }else{
                // this.actionsName = item.name;
                this.isactions = item.key;
                this.show = false;
                // }
            },
            Replication() {
                let url = location.href;
                const input = document.createElement("input");
                document.body.appendChild(input);
                input.setAttribute("value", url);
                input.select();
                let copy = document.execCommand("copy");
                if (copy) {
                    this.tc("复制成功", "success");
                    this.showTwo = false;
                }
                document.body.removeChild(input);
            },
            showUrl() {
                this.showTwo = false;
                this.isUrl = true;
            },

            //复制链接

            //分享海报
            SharePoster() {
                this.showTwo = false;
                this.isQRcodeDomainName = true;
                setTimeout(() => {
                    if (!this.isPoster) {
                        this.downloadImage();
                    }
                }, 800);
            },

            //海报二维码
            getQRcodeDomainName() {
                let QRcodeDomainName = this.$store.getters.getQRcodeDomainName;
                let routes = this.$route.path + "?id=" + this.$route.query.id;
                let qrCode = new QRCode("qrCode", {
                    text:
                        QRcodeDomainName +
                        routes +
                        "&state=" +
                        this.users.referee_number, // 需要转换为二维码的链接
                    width: 70,
                    height: 70,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
            },

            //生成海报
            downloadImage() {
                let opts = {
                    useCORS: true,
                    width: this.w,
                    height: this.h,
                    logging: false,
                    // scale:1,
                    dpi: window.devicePixelRatio
                };
                // console.log(opts)
                window.scrollTo(0, 0);
                html2canvas(document.getElementById("Poster"), opts).then(
                    canvas => {
                        let imgUri = canvas.toDataURL("image/jpeg", 1); // 获取生成的图片的url
                        // console.log(imgUri)
                        this.imgResult = imgUri;
                        this.isPoster = true;
                        // clearTimeout();
                    }
                );
            },

            //获取推荐列表、
            getRecommend() {
                let ad_data = {
                    method: "get.goods.like.list",
                    goods_id: this.$route.query.id
                };
                this.$post("/api/v1/goods", ad_data)
                    .then(res => {
                        // console.log(res);
                        this.goodsitem = [];
                        for (let i in res.data) {
                            this.goodsitem.push({
                                id: res.data[i].id,
                                goodsname: res.data[i].name,
                                goodsrice: res.data[i].price,
                                Sold: res.data[i].xiaoliang,
                                goodsimg: res.data[i].imgsrc
                            });
                        }
                        this.loading = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            lajibushuaxin(id) {
                this.$router.push({path: "/goodsdetails", query: {id: id}});
                window.scrollTo(0,0);
                // this.$route.query.id = id;
                // this.getDATA(id);
            },

            //商品信息
            getDATA(id) {
                let _id = this.$route.query.id;
                if (id) {
                    _id = id;
                }
                // console.log(_id)
                let ad_data = {
                    method: "get.goods.item",
                    goods_id: _id
                };
                this.$post("/api/v1/goods", ad_data)
                    .then(res => {
                        // console.log(res);
                        if (res.status == 200) {
                            // console.log(this.$route.meta);
                            document.title = res.data.goods_info.name;
                            this.goodsData = res.data;
                            this.is_follow = res.data.shopinfo.is_follow;
                            // console.log(this.is_follow)
                            // console.log(this.goodsData);
                            this.$store.commit("getGoodsData", res.data);
                            sessionStorage.setItem("getGoodsData", res.data);
                            this.$store.commit("getshopsData", res.data.shopinfo);
                            console.log(res)
                            // let list = res.data.specData.spec_attr;
                            this.goodsData.goods_info.album.unshift(
                                res.data.goods_info.imgsrc
                            );
                            //规格循环
                            // for (var i in list) {
                            //   this.initial.push( list[i].spec_items[0].item_id );
                            //   this.initialName += list[i].spec_items[0].spec_value+'*' ;
                            // }
                            // console.log(this.initial);
                            //评价循环
                            for (var n in res.data.goods_info.comment) {
                                if (n < 11) {
                                    this.evaluatelist.push(
                                        res.data.goods_info.comment[n]
                                    );
                                }
                            }
                            let actions = [];
                            for (let n in res.data.buy_array) {
                                // console.log(res.data.buy_array[n]);
                                actions.push({
                                    name: res.data.buy_array[n],
                                    key: n
                                });
                            }
                            this.actions = actions;
                            this.getRecommend();
                            this.shareConfig(this.users);
                        } else {
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            //添加足迹
            Addfootprints() {
                let ad_data = {
                    method: "add.user.footprint.item",
                    goods_id: this.$route.query.id
                };
                this.$post("/api/v1/UserFootprint", ad_data)
                    .then(res => {
                        // console.log(res)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            //客服
            service() {
                this.$toast("功能上线中");
            },

            //收藏和删除收藏商品
            collection() {
                this.$store.commit("setLoading");
                if (this.goodsData.goods_info.is_follow == 0) {
                    let _id = this.$route.query.id;
                    let ad_data = {
                        method: "add.collect.goods.item",
                        goods_id: _id
                    };
                    this.$post("/api/v1/userCollectGoods", ad_data)
                        .then(res => {
                            // console.log(res);
                            if (res.status == 200) {
                                this.$store.commit("setLoading");
                                this.$toast.success("收藏成功");
                                this.goodsData.goods_info.is_follow = 1;
                            } else {
                                this.$store.commit("setLoading");
                                this.$toast.fail("收藏失败");
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    let _id = [this.$route.query.id];
                    let ad_data = {
                        method: "del.collect.goods.list1",
                        id: _id
                    };
                    this.$post("/api/v1/userCollectGoods", ad_data)
                        .then(res => {
                            console.log(res);
                            if (res.status == 200) {
                                this.goodsData.goods_info.is_follow = 0;
                                this.$store.commit("setLoading");
                                this.$toast.success("已取消");
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },

            //添加购物车
            goodsCart() {
                let getCart = "";
                getCart = this.initial.join("_");
                // console.log(getCart);
                let ad_data = {};
                if (this.isactions == "vip" && this.users.level == 1) {
                    this.$dialog
                        .confirm({
                            message: "您还不是会员，是否前往充值会员？"
                        })
                        .then(res => {
                            console.log(res);
                            this.$router.push({path: "/upgrade"});
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    return;
                } else {
                    ad_data = {
                        method: "add.goods.cart.item",
                        goods_id: this.goodsData.goods_info.id,
                        goods_num: this.nums,
                        // goods_sku_id: getCart,
                        buy_type: this.isactions
                    };
                }
                // console.log(ad_data);
                this.$post("/api/v1/goodsCart", ad_data)
                    .then(res => {
                        // console.log(res.status)
                        if (res.status == 200) {
                            let ad_data = {
                                method: "get.goods.cart.count"
                            };
                            this.$post("/api/v1/GoodsCart", ad_data)
                                .then(res => {
                                    // console.log(res);
                                    this.$store.commit("setCartNum", res.data.num);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                            this.$toast.success("添加成功");
                        } else {
                            this.$toas(res.message);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            //立即购买
            diatepurchase() {
                if (this.isactions == "vip" && this.users.level == 1) {
                    this.$dialog
                        .confirm({
                            title: "商品价格:" + this.goodsData.goods_info.price,
                            message: "您还不是会员，是否前往充值会员？"
                        })
                        .then(res => {
                            console.log(res);
                            this.$router.push({path: "/upgrade"});
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    return;
                }
                this.$router.push({
                    path: "/goodsdetails/makeorder",
                    query: {
                        id: this.goodsData.goods_info.id,
                        num: this.nums,
                        goods_sku_id: this.initial,
                        buy_type: this.isactions
                    }
                });
            },

            back() {
                if (window.history.length <= 1) {
                    this.$router.push({path: "/"});
                    return false;
                } else {
                    this.$router.go(-1);
                }
            },
            // 关闭窗口
            handleClose(done) {
                let list = this.goodsData.specData.spec_attr;
                let initialName = "";
                for (let i in list) {
                    // console.log(list[i].spec_items);
                    for (let n in list[i].spec_items) {
                        if (this.initial[i] == list[i].spec_items[n].item_id) {
                            // console.log(list[i].spec_items[n].spec_value);
                            initialName += list[i].spec_items[n].spec_value + "*";
                        }
                    }
                }
                this.initialName = initialName;
                // console.log(this.initial)
                // console.log(this.initialName)
                done();
            },

            shareConfig(userinfo) {
                let ua = window.navigator.userAgent.toLocaleLowerCase();
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    // console.log('我是商品分享了')
                    var url = "";
                    if (this.is_ios()) {
                        console.log(this.$route.fullPath);
                        url = "http://" + location.host + this.$route.fullPath;
                    } else {
                        url = "http://" + location.host + this.$route.fullPath;
                    }
                    let goods = {
                        title: this.goodsData.goods_info.name,
                        desc: this.goodsData.goods_info.keywords,
                        imgUrl: this.goodsData.goods_info.imgsrc
                    };
                    // console.log(goods);
                    wechatAuth(url, this.$route, userinfo, goods);
                }
            },
            is_ios() {
                var u = navigator.userAgent;
                if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        created() {
            // console.log(this.$route.query.id)
            let user = JSON.parse(this.$store.getters.getuserinfo);
            if (!user) user = JSON.parse(localStorage.getItem("userinfo"));
            this.users = user;
            this.getDATA();
            this.Addfootprints();
            this.portrait = user.portrait;
            if (this.$route.query.buy_type) {
                this.isactions = this.$route.query.buy_type;
            }
        },
        mounted() {
            this.imgHeight =
                document.documentElement.clientWidth ||
                (document.body.clientWidth / this.$refs.imgSize[0].width) *
                this.$refs.imgSize[0].height;
            this.$nextTick(() => {
                this.getQRcodeDomainName();
            });
        },
        updated() {
            // console.log(this.isactions)
        },
        destroyed() {
        },
        watch: {
            $route(to, from) {
                // console.log(to.query.id)
                this.getDATA(to.query.id);
                // console.log(this.$route.query.id)
                this.Addfootprints();
            }
        }
    };
</script>

<style scoped lang="scss">
  .AdvertisingRoll {
    width: 100%;
    position: absolute;
    top: 0.7rem;
    display: flex;
    justify-content: center;
    
  }

  .swipeImgs {
    width: 100%;
    // height: 3.5rem;
  }

  .indicator {
    position: absolute;
    width: 100%;
    bottom: 5px;
    display: flex;
    justify-content: center;
  }

  .custom-indicator {
    padding: 2px 5px;
    margin: 0 0.03rem;
    background: rgba(0, 0, 0, 0.3);
  }

  .custom-indicator2 {
    background: $sss-color !important;
  }

  .main {
    padding-bottom: 0.45rem;

    header {
      position: fixed;
      top: 0;
      left: 0;
      height: 44px;
      z-index: 999;

      .back {
        font-size: x-large;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: #999999;
        left: 5px;
      }
    }

    > > > .van-tabs {


      .van-tabs__wrap {
        background-color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9;

        .van-tabs__nav {
          width: 50%;
          margin: 0 auto;
        }

        .van-tabs__line {
          background-color: #009900;
        }

      }

    }


    .Anchor {
      width: 100%;
      position: fixed;
      left: 0.4rem;
      top: 0;
      z-index: 50;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.1rem 0;

      a {
        width: 0.62rem;
        height: 0.35rem;
        // background: chartreuse;
      }

      .Last {
        width: 0.8rem;
        height: 0.35rem;
      }

      .active {
        border-bottom: 3px solid #009900;
      }
    }

    .conmo_box {
      background-color: #fff;
      padding: 0.1rem;
      text-align: left;
    }

    .box_one {
      .name {
        font-size: 0.18rem;
        font-weight: bold;
      }

      .gg {
        color: #999;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .price {
        color: #009900;
        margin: 0.15rem 0;
        display: flex;
        justify-content: space-between;

        .price_text {
          font-weight: bold;
          font-size: 0.18rem;
        }

        .share {
          background-color: #f2f2f2;
          line-height: 28px;
          padding: 0 10px;
          border-radius: 28px;
          display: flex;
          align-items: center;

          > img {
            width: 0.18rem;
            height: 0.18rem;
            margin: 0 0.03rem;
          }
        }
      }

      .ys {
        color: #999999;
        display: flex;
        justify-content: space-between;
        font-size: 0.13rem;
      }
    }

    .box_two,
    .box_three,
    .box_four {
      display: flex;

      .left {
        margin-right: 10px;
        width: 30px;
        color: #999999;
      }

      .right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: calc(100% - 40px);
      }
    }

    .box_four {
      .store_head {
        border-radius: 50%;
      }
    }

    .box_five {
      display: flex;

      .left {
        width: 100px;
      }

      .right {
        width: calc(100% - 100px);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }

    .goods_evaluate {
      font-size: 0.15rem;

      .head {
        font-size: 0.15rem;
        margin-bottom: 0.2rem;
      }

      .goods_evaluate_list li {
        float: left;
        line-height: 0.3rem;
        color: #fff;
        border-radius: 20px;
        background-color: #7fcc7f;
        padding: 0 0.12rem;
        margin-right: 0.1rem;
        margin-bottom: 0.1rem;
      }

      .user_evaluate {
        .evaluate_head {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .add_time {
          color: #999999;
        }

        .text_p {
          margin: 20px 0;
        }
      }

      .watch_all {
        text-align: center;

        span {
          display: inline-block;
          line-height: 30px;
          padding: 0 20px;
          background-color: #009900;
          border-radius: 30px;
          color: #fff;
        }
      }
    }
  }

  /* 底部 */
  .footer_js {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    color: #fff;
    z-index: 9;

    .left {
      width: 50%;
      background-color: #333;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 0.5rem;
    }

    .right {
      width: 50%;
      display: flex;

      .join_cart {
        width: 50%;
        line-height: 0.5rem;
        background-color: #48a248;
      }

      .buy {
        width: 50%;
        line-height: 0.5rem;
        background-color: #009900;
      }
    }
  }

  .Specifications_box {
    height: auto;

    .top_msg {
      display: flex;
      align-items: flex-end;

      .right_msg {
        margin: 0 0 10px 20px;
        text-align: left;

        .price {
          font-size: 0.16rem;
          font-weight: bold;
        }

        p {
          color: #999999;
        }
      }
    }

    .Specifications_select {
      margin: 10px 0;

      p {
        text-align: left;
        font-size: 0.16rem;
        padding: 10px 0;
      }

      .select {
        li {
          color: #999999;
          float: left;
          margin: 0 10px 10px 0;
          line-height: 35px;
          border-radius: 35px;
          border: 1px solid #999;
          padding: 0 15px;
        }

        li.active {
          color: #009900;
          border: 1px solid #009900;
        }
      }
    }

    .num_box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
    }

    .btn_bottom {
      display: flex;
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;

      div {
        line-height: 50px;
        color: #fff;
        width: 50%;
      }

      .carts {
        background-color: #333;
      }

      .buy {
        background-color: #009900;
      }
    }
  }

  .textLinefeed {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .commodityName {
    -webkit-line-clamp: 2;
  }

  .SpecificationsName {
    width: 70%;
    -webkit-line-clamp: 1;
  }

  .goodslist {
    background: none;
    padding: 0;
  }

  .Recommend {
    margin: 0 0.05rem 0.1rem 0.05rem;
    padding: 0.05rem;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #e1e1e1;

    > div:nth-child(2) {
      p {
        text-align: left;
        height: 0.4rem;
      }

      > div:nth-child(3) {
        text-align: left;
      }
    }
  }

  .Sold {
    text-align: right;
    color: #999;
  }

  .goodsprice {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .qrcode {
    width: 70px;
    height: 70px;
  }

  .Cover {
    position: fixed;
    top: 0;
    z-index: 10;
    min-width: 100vw;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;

    .PosterDiv {
      padding: 0.1rem;
      border-radius: 10px;
      background-color: #fff;

      > div:first-child {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        > img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 5px;
        }

        > div {
          text-align: left;

          > p:nth-child(2) {
            color: #999999;
            font-size: 12px;
          }
        }
      }

      .PosterDivMoney {
        margin: 10px 10px 5px 10px;
        text-align: left;
        color: $sss-color;
        font-weight: bold;
      }

      .PosterDivQRcode {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        padding: 0 5px;

        > div:first-child {
          width: 150px;
          height: 60px;
          overflow: hidden;
        }
      }
    }
  }

  .CoverTwo {
    position: fixed;
    top: 0;
    z-index: 11;
    min-width: 100vw;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 0.1rem;
    color: #fff;

    .zhi {
      width: 30%;
    }
  }

  .haibao {
    width: 260px;
    height: 410px;
    position: relative;
    border-radius: 10px;

    .CloseQRcodeDomainName {
      width: 25px;
      height: 25px;
      position: absolute;
      top: -10px;
      right: -10px;
    }

    > img {
      border-radius: 10px;
    }
  }

  .shareUp {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.2rem 0.1rem;

    img {
      width: 0.58rem;
      height: 0.58rem;
      margin: 0.1rem 0;
    }

    > div:nth-child(2) {
      > img {
        width: 0.62rem !important;
        height: 0.62rem !important;
      }
    }
  }

  .shareUpHr {
    height: 0.1rem;
    background: #f2f2f2;
  }

  .shareUpcancel {
    line-height: 0.5rem;
    font-size: 0.16rem;
  }

  .vipPurchase {
    display: flex;
    justify-content: center;
    border: 1px solid $sss-color;
    border-radius: 5px;
    margin: 0.05rem 0.2rem;
    color: $sss-color;
    line-height: 0.3rem;

    > span:first-child {
      margin-right: 0.1rem;
    }
  }

  .goodsNumber {
    display: flex;
    justify-content: space-between;
  }

  .Commodity-details {
    background-color: #fff;
    padding: 0.2rem 0;
    margin-top: 0.2rem;
  }
</style>
