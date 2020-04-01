<template>
  <div>
    <div class="main">
      <div class="Anchor">
        <a :class="active==0?'active':''" @click="goAnchor('allmerchandise',0)">
        </a>
        <a :class="active==1?'active':''" @click="goAnchor('commoditDetails',1)">
        </a>
        <a :class="active==2?'active':''" @click="goAnchor('commoditEvaluate',2)">
        </a>
        <div class="Last"></div>
      </div>
      <div id="allmerchandise">
        <van-swipe :autoplay="3000" @change="onChange" ref="imgCheckbox">
          <van-swipe-item v-for="(item,index) in goodsData.goods_info.album" :key="index">
            <img v-show="item!='' && item!=undefined && item != null" class="swipeImgs" :src="item">
            <img v-show="item==''||item==undefined||item==null" class="swipeImgs" src="../../assets/img/mrtp.png">
            <!-- <img class="swipeImgs" :src="item"> -->
            <!-- <van-image
              width="100%"
              height="3.5rem"
              fit="cover"
              :src="item"
            /> -->
          </van-swipe-item>
           <template #indicator>
            <div class="indicator">
              <div class="custom-indicator" :class="customIndicator==index?'custom-indicator2':''"
              v-for="(item,index) in goodsData.goods_info.album" :key="index"
              @click="swipeCustomIndicator(index)"></div>
            </div>
          </template>
        </van-swipe>
      </div>
      <!-- 1 -->
      <div  class="m_b_10 conmo_box box_one">
        <div class="name textLinefeed commodityName">
          {{goodsData.goods_info.name}}
        </div>
        <div class="gg">
          <span class="textLinefeed SpecificationsName">
            {{initialName}}
            </span>
          <span class="share">
            <router-link to="/goodsdetails/share"><i class="el-icon-share"></i>分享</router-link>
          </span>
        </div>
        <div class="price">
          {{goodsData.goods_info.price}}
        </div>
        <div class="ys">
          <span>已售
          {{goodsData.goods_info.xiaoliang}}
            </span>
          <span style="margin-left: 40px">库存
          {{goodsData.goods_info.kuchun}}
          </span>
        </div>
      </div>
      <!-- 2 -->
      <!-- <div class="m_b_10 conmo_box box_two" @click="drawer = true">
        <span class="left">选择</span>
        <div class="right">
          <span class="textLinefeed SpecificationsName">已选择：
            {{initialName}}
          </span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div> -->
      <!--   3   -->
      <div class="m_b_10 conmo_box box_three">
        <span class="left">送至</span>
        <div class="right">
          <span><i class="el-icon-location-outline">{{ReceivingAddress}}</i></span>
          <span>免运费</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <!--   4   -->
      <!-- <div class="m_b_10 conmo_box box_four">
        <div class="left store_head">
          <img src="../../assets/img/store_head.png">
        </div>
        <div class="right">
          <span>重庆网络科技自营店</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div> -->
      <!--   5   -->
      <div style="display: flex;justify-content: space-between;"
       class="m_b_10 conmo_box"
       @click="show=true">
        <div class="left vip_head">
          购买方式
        </div>
        <div>{{actionsName}}</div>
        <div class="right">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <van-action-sheet v-model="show" :actions="actions" close-on-click-overlay @select="onSelect"/>
      <!-- 店铺详情 -->
      <div id="commoditEvaluate">
      <shop :is_follow='is_follow'></shop>
      <!-- <shop :is_follow=""></shop> -->
      </div>
      <!--   商品评价   -->
      <div style="padding:0.1rem" class="m_b_10 conmo_box goods_evaluate">
        <div class="head">商品评价（）</div>
        <!-- <ul class="goods_evaluate_list clearfix">
          <li>全部(23)</li>
          <li>好评(23)</li>
          <li>有图(23)</li>
          <li>中评(0)</li>
          <li>差评(0)</li>
        </ul> -->
        <div class="user_evaluate" v-for="(item,index) in evaluatelist" :key="index">
          <div class="evaluate_head">
            <div class="user">
              <img :src="item.users!=undefined&&item.users!=null&&item.users!=''?item.users.portrait:''" style="width: 24px">
              <span>
                {{item.users!=undefined&&item.users!=null&&item.users!=''?item.users.weixinname:''}}
              </span>
            </div>
            <div class="add_time">
              {{item.add_time}}
            </div>
          </div>
          <p class="text_p">
            {{item.content}}
          </p>
        </div>
        <div class="watch_all"><span>查看全部评价</span></div>
      </div>
      <div class="conmo_box tuijian_slide">
        <title style="display: block;">
          <el-divider>猜你喜欢</el-divider>
        </title>
        <!--  推荐列表  -->
        <van-skeleton :loading='loading' :row="2">
         <el-row class="goodslist RecommendBac">
          <el-col :span="12" v-for="(goods, goodsindex) in goodsitem" :key="goodsindex">
            <!--<router-link :to="{path:'/goodsdetails',query:{id: goods.id}}">-->
            <div class="item Recommend" @click="lajibushuaxin(goods.id)">
              <van-image
                width="100%"
                height="1.8rem"
                fit="cover"
                :src="goods.goodsimg"
              />
              <div>
                <p class="fontWrap fontWrapTwo">
                  {{goods.goodsname}}
                  <!-- 啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊 -->
                </p>
                <div class="Sold">已售：{{goods.Sold}}</div>
                <div class="goodsprice clo-g">{{goods.goodsrice}}</div>
              </div>
            </div>
            <!--</router-link>-->
          </el-col>
         </el-row>
        </van-skeleton>
      </div>
      <div id="commoditDetails"></div>
      <div class="conmo_box bot_img_box">
        <img :src="goodsData.goods_info.imgsrc">
      </div>
    </div>

    <!-- 底部   -->
    <div class="footer_js">
      <div class="left">
        <div>
          <div class="el-icon-chat-line-round"></div>
          <div>客服</div>
        </div>
        <div>
          <div class="el-icon-chat-dot-round"></div>
          <div @click="collection">收藏</div>
        </div>
        <div>
          <router-link to="/my_cart">
            <div class="el-icon-shopping-cart-2"></div>
            <div>购物车</div>
          </router-link>
        </div>
      </div>
      <div class="right">
        <div class="join_cart" @click="goodsCart">
          加入购物车
        </div>
        <div class="buy">
          <router-link :to="{path:'/goodsdetails/makeorder',query:{id: goodsData.goods_info.id, num: nums, goods_sku_id: initial, buy_type: isactions}}">
            立即购买
          </router-link>
        </div>
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
    </el-drawer> -->
  </div>
</template>

<script>
    import actives from "./actives/active";
    import shop from "./actives/shop";
  export default {
    name: "goodsDATA",
    components: {
        'actives' : actives,
        'shop' : shop,
    },
    data() {
      return {
        active: 0,
        sImgs: [],//轮播图
        customIndicator: 0,//轮播图指示器颜色
        initial: [],//默认规格Id
        initialName: '',//默认规格名称
        ReceivingAddress: "",//收货地址
        show: false,
        // imglist: [], //轮播数组
        actions: [
          { name: '选项' },
          { name: '选项' },
        ],
        evaluatelist: [],
        isactions: 'customer',
        actionsName: '顾客购买',
        loading: true,
        msg: '商品详情',
        imgHeight: '',
        boxHeight: '',
        drawer: false,
        direction: 'btt',
        nums: 1,//添加购物车的商品数量
        name: '简箪 现磨新米农家自产长香丝2.5kg煲仔饭丝苗米不抛光长粒香大米',
        goodsitem: [
          // {
          //   'goodsname': '云阖·永川秀芽【炒青】100g',
          //   'goodsrice': '￥98.00',
          //   'goodsimg': 'goods_img'
          // },
        ],

        goodsData: {
            "goods_info": {
              album: [
                require('../../assets/img/mrtp.png')
              ],
		    	    "id": "",
		    	    "name": "",
		    	    "proportion": "",
		    	    "price": "",
		    	    "imgsrc": "",
		    	    "ip": "",
		    	    "merchants_id": "",
		    	    "type_id": "",
		    	    "content": "",
		    	    "click_times": "",
		    	    "imgsrc1": "",
		    	    "imgsrc2": "",
		    	    "imgsrc3": "",
		    	    "imgsrc4": "",
		    	    "limitcount": "",
		    	    "limitdan": "",
		    	    "type": "",
		    	    "money_level1": "",
		    	    "money_level2": "",
		    	    "money_level3": "",
		    	    "money_level4": "",
		    	    "money_level5": "",
		    	    "money_level6": "",
		    	    "money_level7": "",
		    	    "money_level8": "",
		    	    "money_level9": "",
		    	    "money_level10": "",
		    	    "chengben": "",
		    	    "kuchun": "",
		    	    "xiaoliang": "",
		    	    "danliang": "",
		    	    "admin_id": "",
		    	    "pay_type": "",
		    	    "postage": "",
		    	    "chengben_postage": "",
		    	    "trading_type": "",
		    	    "trading_proportion": "",
		    	    "product_code": "",
		    	    "product_class": "",
		    	    "is_tejia": "",
		    	    "is_hot": "",
		    	    "is_top": "",
		    	    "is_new": "",
		    	    "category_id": "",
		    	    "is_map_customer": "",
		    	    "is_map_vip": "",
		    	    "is_map_retail": "",
		    	    "is_map_shop": "",
		    	    "spec": [
		    		    {
		    		    	"goods_spec_id": "",
		    		    	"goods_id": "",
		    		    	"goods_no": "",
		    		    	"goods_price": "",
		    		    	"integral_price": "",
		    		    	"give_integral": "",
		    		    	"line_price": "",
		    		    	"stock_num": "",
		    		    	"goods_sales": "",
		    		    	"goods_weight": "",
		    		    	"wxapp_id": "",
		    		    	"spec_sku_id": "",
		    		    	"create_time": "",
		    		    	"update_time": ""
		    		    }
		    	    ],
		    	    "spec_rel": [
		    	    	{
		    	    		"spec_value_id": "",
		    	    		"spec_value": "",
		    	    		"spec_id": "",
		    	    		"wxapp_id": "",
		    	    		"create_time": "",
		    	    		"spec": {
		    	    			"spec_id": "",
		    	    			"spec_name": "",
		    	    			"wxapp_id": "",
		    	    			"create_time": ""
		    	    		},
		    	    		"pivot": {
		    	    			"id": "",
		    	    			"goods_id": "",
		    	    			"spec_id": "",
		    	    			"spec_value_id": "",
		    	    			"wxapp_id": "",
		    	    			"create_time": ""
		    	    		}
		    	    	}
		    	    ]
		        },
		        "buy_array": {
		        	"customer": "",
		        	"vip": ""
		        },
		        "money_array": {
		        	"customer": {
		    		  "module": "",
		    		  "id": "",
		    		  "goods_id": "",
		    		  "qd_money_rate": "",
		    		  "money_rate": ""
		        	},
		        	"vip": {
		    		  "module": "",
		    		  "id": "",
		    		  "goods_id": "",
		    		  "qd_money_rate": "",
		    		  "money_rate": ""
		        	}
		        },
		        "specData": {
		      	  "spec_attr": [
		      	  	{
		      	  		"group_id": "",
		      	  		"group_name": "",
		      	  		"spec_items": [
		      	  			{
		      	  				"item_id": "",
		      	  				"spec_value": ""
		      	  			}
		      	  		]
		      	  	}
		      	  ],
		      	  "spec_list": [
		      	  	{
		      	  		"goods_spec_id": "",
		      	  		"spec_sku_id": "",
		      	  		"rows": "",
		      	  		"form": {
		      	  			"goods_no": "",
		      	  			"goods_price": "",
		      	  			"goods_weight": "",
		      	  			"line_price": "",
		      	  			"stock_num": "",
		      	  			"give_integral": ""
		      	  		}
		      	  	}
		      	  ]
            },
            "shopinfo": {
              id: '',
              name: '',
              score_zh: '',
              score_ms: '',
              score_fw: '',
              score_fh: ''
            }
        },
        is_follow: 0
      }
    },

    methods: {
      onChange (index) {

        this.customIndicator = index;
      },
      swipeCustomIndicator ( index ) {
        // console.log(this.$refs.imgCheckbox)
        this.$refs.imgCheckbox.swipeTo(index);
      },
      goAnchor (selector, n) {
        this.active = n;
        // var anchor = this.$el.querySelector(selector);
        // document.documentElement.scrollTop = anchor.offsetTop;
        document.getElementById(selector).scrollIntoView();
        
      },
      onSelect(item,index) {
        // 默认情况下点击选项时不会自动收起
        // 可以通过 close-on-click-action 属性开启自动收起
        this.actionsName = item.name;
        if(item.name == '顾客购买'){
          this.isactions = 'customer'
        }else if(item.name == '会员购买'){
          this.isactions = 'vip'
        }
        this.show = false;
      },

      //获取推荐列表、
      getRecommend () {
        let ad_data = {method: 'get.goods.recommend.list'};
        this.$post('/api/v1/goods', ad_data)
        .then((res) => {
          // console.log(res);
          this.goodsitem = [];
          for(let i in res.data){
            this.goodsitem.push({
              id: res.data[i].id,
              goodsname: res.data[i].name,
              goodsrice: res.data[i].price,
              Sold: res.data[i].xiaoliang,
              goodsimg: res.data[i].imgsrc,
            })
          }
          this.loading = false;

        }).catch(function (error) {
          console.log(error);
        });
      },
      lajibushuaxin(id) {
          this.$router.push({path:'/goodsdetails',query:{id: id}});
          // this.$route.query.id = id;
          // this.getDATA(id);
      },

      //商品信息
      getDATA ( id ) {
          let _id = this.$route.query.id;
          if(id){
            _id = id;
          }
          // console.log(_id)
          let ad_data = {
            method: 'get.goods.item',
            goods_id: _id
          };
          this.$post('/api/v1/goods', ad_data)
          .then((res) => {
            console.log(res)
            if(res.status == 200){
              // console.log(this.$route.meta);
              document.title = res.data.goods_info.name;
              this.goodsData = res.data;
              this.is_follow = res.data.shopinfo.is_follow;
              // console.log(this.is_follow)
              // console.log(this.goodsData);
              this.$store.commit('getGoodsData',res.data);
              this.$store.commit('getshopsData',res.data.shopinfo);
              // let list = res.data.specData.spec_attr;
              this.goodsData.goods_info.album.unshift(
                res.data.goods_info.imgsrc
              )
              //规格循环
              // for (var i in list) {
              //   this.initial.push( list[i].spec_items[0].item_id );
              //   this.initialName += list[i].spec_items[0].spec_value+'*' ;
              // }
              // console.log(this.initial);
              //评价循环
              for(var n in res.data.goods_info.comment){
                if(n<11){
                  this.evaluatelist.push(res.data.goods_info.comment[n]);
                }
              }
              let actions = [];
              for(let n in res.data.buy_array){
                // console.log(res.data.buy_array[n]);
                actions.push({
                  name:res.data.buy_array[n]
                })
              }
              this.actions = actions;
              this.getRecommend();
            }else{

            }
          }).catch(function (error) {
              console.log(error);
          });
      },

      //添加足迹
      Addfootprints () {

        let ad_data = {
          method: 'add.user.footprint.item',
          goods_id: this.$route.query.id
        };
        this.$post('/api/v1/UserFootprint', ad_data)
        .then((res) => {
          // console.log(res)

        }).catch(function (error) {
            console.log(error);
        });
      },

      //收藏商品
      collection () {
        this.$store.commit("setLoading");
        let _id = this.$route.query.id;
        let ad_data = {
          method: 'add.collect.goods.item',
          goods_id: _id
        };
        this.$post('/api/v1/userCollectGoods', ad_data)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.$store.commit("setLoading");
            this.$toast.success("收藏成功");
          }else{
            this.$store.commit("setLoading");
            this.$toast.fail("收藏失败");
          }
        }).catch(function (error) {
            console.log(error);
        });
      },

      //添加购物车
      goodsCart () {
        this.$store.commit("setLoading");
        let getCart = '';
        // for (var i in this.initial) {
        //   // getCart += this.initial[i];
        // }
        getCart = this.initial.join('_');
        // console.log(getCart);
        let ad_data = {
          method: 'add.goods.cart.item',
          goods_id: this.goodsData.goods_info.id,
          goods_num: this.nums,
          // goods_sku_id: getCart,
          buy_type: this.isactions
        };
        // console.log(ad_data);
        this.$post('/api/v1/goodsCart', ad_data)
        .then((res) => {
          // console.log(res.status)
          if (res.status == 200) {
            this.$toast.success("添加成功");
            this.$store.commit("setLoading");
          }else{
            this.$store.commit("setLoading");
            this.$toast.fail("添加失败");
          }
        }).catch( (error) => {
            console.log(error);
        });
      },

      back () {
        if (window.history.length <= 1) {
          this.$router.push({path: '/'})
          return false
        } else {
          this.$router.go(-1)
        }
      },
      // 关闭窗口
      handleClose(done) {
        let list = this.goodsData.specData.spec_attr;
        let initialName = '';
        for (let i in list) {
            // console.log(list[i].spec_items);
            for (let n in list[i].spec_items){
              if(this.initial[i] == list[i].spec_items[n].item_id){
                // console.log(list[i].spec_items[n].spec_value);
                initialName += list[i].spec_items[n].spec_value+'*';
              }
            }
        }
        this.initialName = initialName;
        // console.log(this.initial)
        // console.log(this.initialName)
        done();
      }
    },

    created () {
      // console.log(this.$route.query.id)
      this.getDATA();
      this.Addfootprints();
    },
    updated () {
      
    },
    mounted() {
      this.imgHeight = document.documentElement.clientWidth || document.body.clientWidth / this.$refs.imgSize[0].width * this.$refs.imgSize[0].height;

    },
    watch:{
      '$route' (to, from) {
        // console.log(to.query.id)
        this.getDATA(to.query.id);
        // console.log(this.$route.query.id)
        this.Addfootprints();
      },
     
    }

  }
</script>

<style scoped lang="scss">
  .swipeImgs{
    width: 100%;
    height: 3.5rem;
  }
  .indicator{
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
    padding-top: 0.54rem;
    padding-bottom: 0.45rem;
    .Anchor{
      width: 100%;
      position: fixed;
      left:0.4rem;
      top: 0;
      z-index: 50;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.1rem 0;
      a{
        width: 0.62rem;
        height: 0.35rem;
        // background: chartreuse;
      }
      .Last{
        width: 0.8rem;
        height: 0.35rem;
      }
      .active {
        border-bottom: 3px solid #009900;
      }
    }

    .conmo_box {
      background-color: #fff;
      padding: 0.1rem 0.05rem;
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

        .share {
          background-color: #f2f2f2;
          line-height: 28px;
          padding: 0 10px;
          border-radius: 28px;
        }
      }

      .price {
        color: #009900;
        font-weight: bold;
        font-size: 0.18rem;
        margin: 10px 0;
      }

      .ys {
        color: #999999;
      }
    }

    .box_two, .box_three, .box_four {
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

  /* 推荐 */
  .tuijian_slide /deep/ .el-divider__text {
    font-size: 0.18rem;
  }

  .tuijian_slide {
    .list .goodslist {
      padding: 0;
      background-color: #fff;
    }

    .list .goodslist .item {
      background-color: #fafafa;
    }

    .goodsprice {
      display: flex;
      justify-content: space-between;
      align-items: center;

      i {
        margin-top: 2px;
      }
    }
  }

  .tuijian_slide /deep/ .el-carousel__indicators--horizontal {
    background-color: #fafafa;
    height: 26px;
    border-radius: 26px;
    padding: 0 20px;

    .el-carousel__button {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #999;

    }

    .el-carousel__indicator.is-active button {
      background-color: #009900;
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
      padding: 5px 0;
    }

    .right {
      width: 50%;
      display: flex;

      .join_cart {
        width: 50%;
        line-height: 45px;
        background-color: #48a248;
      }

      .buy {
        width: 50%;
        line-height: 45px;
        background-color: #009900;
      }
    }
  }

  .Specifications_box {
    height: auto;

    /deep/ .el-drawer {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      padding-bottom: 50px;
      overflow: visible;

      section.el-drawer__body {
        padding: 0 10px;

      }

      header.el-drawer__header {
        padding: 0;
        margin: 0;

        .el-drawer__close-btn {
          position: absolute;
          right: 20px;
          top: 10px;
        }
      }
    }

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

      /deep/ .el-input-number--mini {
        width: 100px;
      }

      /deep/ span {
        border-radius: 50%;
        border: 1px solid #999999;
      }

      /deep/ input {
        background: none;
      }
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
  .textLinefeed{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
  }
  .commodityName{
    -webkit-line-clamp:2;
  }
  .SpecificationsName{
    width: 70%;
    -webkit-line-clamp:1;
  }
  .goodslist {
    background: none;
    padding: 0;
  }
  .Recommend{
    margin:0 0.05rem 0.1rem 0.05rem;
    padding: 0.05rem;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #e1e1e1;
    >div:nth-child(2){
      p{
        text-align: left;
        height: 0.4rem;
      }
      >div:nth-child(3){
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
</style>
