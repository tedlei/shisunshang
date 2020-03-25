<template>
  <div>
    <header ref="header_h">
      <span style="font-weight: bold">购物车</span>
      <span style="position: absolute;right: 0.1rem;font-size: 0.16rem;color: #999;" @click="isDellBatch = !isDellBatch">编辑</span>
      <!-- <i class="el-icon-chat-dot-round"></i> -->
    </header>
    <!--  空购物车  -->
    <div v-show="!isCart" class="empty_box">
      <img src="../../assets/img/empty.png" style="width:30%">
      <div class="tips">您还未挑选商品哦</div>
      <div class="to_shopping">
        <router-link class="" to="/classification">去商城逛逛</router-link>
      </div>
    </div>
    <!-- 有购物车 -->
    <div class="have_box" v-show="isCart">
      <div>
	    	<div v-for="(item, index1) in goodsObj" :key="index1">
          <!-- 店铺详情 -->
          <div class="store_list" >
              <div class="store_top">
                <div :class="item.checked ?'addRadioTwo':'addRadio'" @click="chooseShopGoods(index1)">
                    <van-icon name="success" color="#fff"/>
                </div>
                <router-link class="" :to="{path:'/storeDetails',query:{id:item.shop_id}}">
                <div class="" style="margin-top: -0.02rem">
                    <img src="../../assets/img/stoe.png" style="width: 0.18rem">
                    <span class="storename">{{item.name}}</span>
                    <i class="el-icon-arrow-right"></i>
                </div>
                </router-link>
              </div>
              <div class="div1" v-for="(data, index) in item.list" :key="index">
                <!-- 商品卡片 -->
                <div class="goods_bot" >
                    <div :class="data.checked ?'addRadioTwo':'addRadio'" @click="choose(index1, index)">
                        <van-icon name="success" color="#fff"/>
                    </div>
                    <div class="goods_lists">
                        <router-link :to="{path:'/goodsdetails',query:{id:data.id}}">
                        <van-image
                          width="0.8rem"
                          height="0.8rem"
                          fit="cover"
                          :src="data.imgsrc"
                        />
                        </router-link>
                        <div class="left_msg">
                            <router-link :to="{path:'/goodsdetails',query:{id:data.id}}">
                            <div>{{data.name}}</div>
                            <div class="goodsspecs">规格：{{data.goods_attr}}</div>
                            </router-link>
                            <div class="goodsprice">
                                <span>￥{{data.price}}</span>
                                <div class="progresses">
                                  <div class="progressesBtn" :class="{ 'disable' : data.num==1 }"
                                  @click="numChange(index1, index, -1, data.id, data.goods_sku_id)">
                                    <img v-if="data.num==1" src="../../assets/img/jhh.png" alt="">
                                    <img v-else src="../../assets/img/jh.png" alt="">
                                  </div>
                                  <div>{{data.num}}</div>
                                  <div class="progressesBtn" @click="numChange(index1, index, 1, data.id, data.goods_sku_id)">
                                    <van-icon name="plus" color="#fff"/>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
	    		    </div>
          </div>
	    	</div>
      </div>
    </div>
    <!-- loading -->
    <!-- <div class="overlay">
      <van-loading type="spinner" size="24px" color="#099000" vertical>
        <span class="loading">
          加载中...
        </span>
      </van-loading>
    </div> -->
    <loading v-show="isloading"></loading>
    <!--  推荐  -->
    <div class="cart_rmd">
      <img src="../../assets/img/tj.png" style="margin-bottom: 0.2rem">
      <!--  商品列表  -->
        <el-row class="goodslist">
          <el-col :span="12" v-for="(goods, goodsindex) in goodsitem" :key="goodsindex">
            <router-link :to="{path:'/goodsdetails',query:{id:goods.id}}">
            <div class="item Recommend">
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
            </router-link>
          </el-col>
        </el-row>
    </div>
    <!--  有购物车结算  -->
    <div class="settlement" v-show="true">
      <div class="left_check">
        <div :class="allChecked ?'allElection':'allElectionShow'" @click="chooseAllGoods($event)">
            <div v-show="allChecked">
              <van-icon name="success" color="#fff"/>
            </div>
        </div>
        <div style="margin-top: -0.03rem">
          合计：￥{{totalMoney.toFixed(2)}}
        </div>
      </div>
      <div @click="payment" v-show="!isDellBatch" class="right_js">
        去结算
      </div>
      <!-- 购物车删除按钮 -->
      <div class="isDellBatch" v-show="isDellBatch" @click="dellBatch">
	    	删除
      </div>
    </div>
  </div>
</template>

<script>
import loading from '../loading/loading'
export default {
  components:{
    loading,
  },
  props:{},
  data(){
    return {
        isloading: false,
        msg: '购物车',
        isIndeterminate: true,
        checkAll: false,
        total:0,
        num: 1,
        goodsitem: [
          // {
          //   'goodsname': '云阖·永川秀芽【炒青】100g',
          //   'goodsrice': '￥98.00',
          //   'Sold': '123件',
          //   'goodsimg': 'goods_img'
          // }
          
        ],

        isCart: false,
        isDellBatch: false,
        goodsObj: [

        ],
        totalMoney : 0,
        totalFare : 0,
        allChecked : false
    }
  },
  watch:{},
  computed:{},
    methods : {
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
    //获取推荐列表、
    getRecommend () {
      let ad_data = {method: 'get.goods.recommend.list'};
      this.$post('/api/v1/goods', ad_data)
      .then((res) => {
        // console.log(res);
        for(let i in res.data){
          this.goodsitem.push({
            id: res.data[i].id,
            goodsname: res.data[i].name,
            goodsrice: res.data[i].price,
            Sold: res.data[i].xiaoliang,
            goodsimg: res.data[i].imgsrc,
          })
        }
       
      }).catch(function (error) {
        console.log(error);
      });
    },

    //遍历筛选购物车数据
    cartDataPush (data) {
      for (let i in data.shops){
        let obj = {
          name: data.shops[i].shop.shop_name,
          shop_id: data.shops[i].shop.id,
          checked: false,
          list: []
        };
        let key = this.goodsObj.push(obj);
        let _i = key-1;
        let list = data.shops[i].goods;
        for (let n=0; n<list.length; n++){
          let listObj = {
            checked : false,
            id: list[n].id,
            name: list[n].name,
            price: list[n].price,
            num: list[n].total_num,
            imgsrc: list[n].imgsrc,
            // goods_attr: list[n].goods_sku.goods_attr,
            // goods_sku_id: list[n].goods_sku.spec_sku_id,
          };
          // console.log(listObj)
          this.goodsObj[_i].list.push(listObj);
        }
        // console.log(this.goodsObj);
      }
    },

    //获取购物车数据
    getCart () {
      let ad_data = {
        method: 'get.goods.cart.list'
      };
      this.$post('/api/v1/goodsCart', ad_data)
      .then((res) => {
        console.log(res);
        this.cartData = res.data;
        if(res.data.shops!=undefined && res.data.shops.length!=0){
        // if(res.data.shops!=undefined){
          this.isCart = true;
          this.cartDataPush(res.data);
        }else{
          this.isCart = false;
        }
      }).catch(function (error) {
        console.log(error);
      });
      this.getRecommend();
    },

    // 全部商品全选
    chooseAllGoods () {
      var flag = true;
      if ( this.allChecked ) {
        flag = false;
      }
      for ( var i = 0, len = this.goodsObj.length; i < len; i++ ) {
        this.goodsObj[i]['checked'] = flag;
        var list = this.goodsObj[i]['list'];
        for ( var k = 0, len1 = list.length; k < len1; k++ ) {
          list[k]['checked'] = flag;
        }
      }
      this.allChecked = !this.allChecked;
      this.calTotalMoney();
      this.calTotalFare();
    },

    // 每个店铺全选
    chooseShopGoods ( index) {
      var list = this.goodsObj[index]['list'],
        len = list.length;
      if ( this.goodsObj[index]['checked'] ) {
        for (var i = 0; i < len; i++ ) {
          list[i]['checked'] = false;
        }
      } else {
        for (var i = 0; i < len; i++ ) {
          list[i]['checked'] = true;
        }
      }
      this.goodsObj[index]['checked'] = !this.goodsObj[index]['checked'];

      // 判断是否选择所有商品的全选
      this.isChooseAll();

      this.cal(index);
    },

    // 单个选择
    choose ( index1, index) {
      var list = this.goodsObj[index1]['list'],
        len = list.length;
      if ( list[index]['checked'] ) {
        this.goodsObj[index1]['checked'] = false;
        this.allChecked = false;
        list[index]['checked'] = !list[index]['checked'];
      } else {
        list[index]['checked'] = !list[index]['checked'];

        // 判断是否选择当前店铺的全选
        var flag = true;
        for (var i = 0; i < len; i++ ) {
          if ( list[i]['checked'] == false ) {
            flag = false;
            break;
          }
        }
        flag == true ? this.goodsObj[index1]['checked'] = true : this.goodsObj[index1]['checked'] = false;
      }

      // 判断是否选择所有商品的全选
      this.isChooseAll();
      // console.log(index1)
      // console.log(index)
      this.cal(index1);
    },

    // 判断是否选择所有商品的全选
    isChooseAll () {
      var flag1 = true;
      for ( var i = 0, len = this.goodsObj.length; i < len; i++ ) {
        if ( this.goodsObj[i]['checked'] == false ) {
          flag1 = false;
          break;
        }
      }
      flag1 == true ? this.allChecked = true : this.allChecked = false;
    },

    // 商品数量控制
    numChange (index1, index, numChange, id, goods_sku_id) {
      console.log(id,goods_sku_id)
      // console.log(numChange)
      var goods = this.goodsObj[index1]['list'][index],
          oThis = this;
      if ( numChange == -1 && goods.num <= 1 ) {
        goods.num = 1;
      } else if(numChange == 1 && goods.num == 99){
        goods.num = 99;
      }else{
        this.isloading = true;
        let method = numChange==1?'plus.goods.cart.item':'sub.goods.cart.item';
        // console.log(method)
        let ad_data = {
          method: method,
          goods_id: id,
          // goods_sku_id: goods_sku_id
        };
        this.$post('/api/v1/goodsCart', ad_data)
        .then((res) => {
          console.log(res);
          if(res.status == 200){
            this.isloading = false;
            if ( numChange == 1 ) {
              goods.num++;
            } else if ( numChange == -1 ) {
              goods.num--;
            }
            // console.log(index1)
            // console.log(index)
            this.cal(index1);
          }
        }).catch(function (error) {
          console.log(error);
        });
      }

    },

    // 用户填写容错处理


    // 计算每个店铺的商品总额
    calEveryStore (index) {
      // console.log(2)
      // console.log(index)
      // console.log(this.goodsObj[0])
      var everyStoreMoney = 0;
      var  list = this.goodsObj[index]['list'];
      // console.log(3)
      list.forEach(function(item, index, arr) {
        if ( list[index]['checked'] ) {
          everyStoreMoney += parseFloat(item.price) * parseFloat(item.num);
        }
      });
      return everyStoreMoney.toFixed(2);
    },

    // 计算每个店铺的运费总额
    calEveryFare (index) {
      var everyStoreFare = 0,
        list = this.goodsObj[index]['list'];
      list.forEach(function(item, index, arr) {
        if ( list[index]['checked'] ) {
          everyStoreFare += parseFloat(item.fare) * parseFloat(item.num);
        }
      });
      return everyStoreFare.toFixed(2);
    },

    // 计算商品总金额
    calTotalMoney  () {
      var oThis = this;
      this.totalMoney = 0;
      for ( var i = 0, len = this.goodsObj.length; i < len; i++ ) {
        var list = this.goodsObj[i]['list'];
        list.forEach(function(item, index, arr) {
          if ( list[index]['checked'] ) {
            oThis.totalMoney += parseFloat(item.price) * parseFloat(item.num);
          }
        });
      }
    },

    // 计算商品总运费
    calTotalFare  () {
      var oThis = this;
      this.totalFare = 0;
      for ( var i = 0, len = this.goodsObj.length; i < len; i++ ) {
        var list = this.goodsObj[i]['list'];
        list.forEach(function(item, index, arr) {
          if ( list[index]['checked'] ) {
            oThis.totalFare += parseFloat(item.fare) * parseFloat(item.num);
          }
        });
      }
    },

    // 计算方法集合
    cal (index) {
      // console.log(1)
      this.calEveryStore(index);
      this.calEveryFare(index);
      this.calTotalMoney();
      this.calTotalFare();
    },

    delGoods (index1, index) {
      //console.log(index1);
      //console.log(index);
      this.goodsObj[index1]['list'].splice(index, 1);
      this.cal(index);
    },
    //批量删除
	  dellBatch () {
	  	for ( var i in this.goodsObj){
	  		let shop = this.goodsObj[i];
        for(var n=shop.list.length-1; n>-1; n--){
          if(shop.list[n].checked){
            let ad_data = {
              method: "del.goods.cart.item",
              goods_id: shop.list[n].id,
              goods_sku_id: shop.list[n].goods_sku_id
            };
            console.log(ad_data);
            this.$post('/api/v1/goodsCart', ad_data)
            .then((res) => {
              console.log(res);
              if(res.status == 200){
                this.goodsObj[i].list.splice(n, 1);
                this.cal(i);
                this.isDellBatch = !this.isDellBatch;
                this.getCart();
              }
            }).catch( (error) => {
              console.log(error);
            });

	  			}
        }
      }

	  },

    //去结算
    payment () {
      let idlist = [];
      for ( var i in this.goodsObj){
	  		let shop = this.goodsObj[i];
        for(var n=shop.list.length-1; n>-1; n--){
          if(shop.list[n].checked){
            // console.log(shop.list[n].id)
            idlist.push(shop.list[n].id);
	  			}
        }
      }
      // console.log(idlist)
      if(idlist.length>0){
        this.$router.push({path: '/goodsdetails/makeorder', query: {id: idlist, iscart: 1}});
      }
    }
  },
  created(){
    this.getCart();
  },
  mounted(){}
}
</script>
<style lang="scss" scoped>
body, html {
    background-color: #f2f2f2;
    // font-size: 0.2rem;
  }

  /deep/ .el-checkbox__inner {
    border-radius: 50%;
    width: 0.2rem;
    height: 0.2rem;
    background: none;
  }

  /deep/ .el-checkbox__inner::after {
    height: 0.11rem;
    left: 0.06rem;
    width: 0.05rem;
  }

  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #009900;
    border-color: #009900;
  }

  /deep/ .el-checkbox__inner:hover {
    border-color: #009900;
  }

  /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
    color: inherit;
  }

  header {
    display: flex;
    align-items: center;
    padding: 0.1rem 0;
    border-bottom: 1px solid #f2f2f2;
    justify-content: center;
    background-color: #fff;

    span {
      font-size: 0.18rem;
    }

    i {
      font-size: 0.3rem;
      color: #999;
      margin: 0 0.08rem;
      position: absolute;
      right: 0;
    }
  }


  /* 空购物车 */
  .empty_box {
    padding: 0.4rem 0 0.3rem 0;

    .tips {
      font-size: 0.16rem;
      color: #999;
      margin: 0.3rem 0 0.2rem 0;
    }

    .to_shopping a {
      font-size: 0.16rem;
      color: #fff !important;
      background-color: #009900;
      border-radius: 10px;
      padding: 0.05rem;
      width: 1rem;
      display: inline-block;
    }
  }

  /* 有购物车  */
  .have_box {
    .store_list {
      background-color: #fff;
    }
    .store_list {
        background-color: #fff;
        padding-left: 0.1rem;
    }
    label {
      margin: 0 0.1rem;
      height: 0.2rem;
    }

    .store_top, .goods_bot {
      display: flex;
      align-items: center;
      padding: 0.1rem 0;
      border-bottom: 1px solid #f2f2f2;

      .storename {
        color: #0f0f0f;
        margin: 0 0.08rem 0 0.04rem;
      }
      .addRadio,.addRadioTwo{
        width: 0.18rem;
        height: 0.18rem;
        margin-right: 0.1rem;
        border: 1px solid #999999;
        border-radius: 50%;
      }
      .addRadioTwo{
        background-color: $sss-color;
      }
    }

    .goods_lists {
      display: flex;

      img {
        width: 1rem;
      }

      .left_msg {
        text-align: left;
        padding: 0.05rem 0.1rem 0 0.1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .goodsspecs {
          color: #999;
          font-size: 0.12rem;
        }


        .goodsprice {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .progresses{
            position: absolute;
            right: 0.1rem;
            display: flex;
            .progressesBtn{
              width: 0.23rem;
              height: 0.23rem;
              border: 1px solid $sss-color;
              border-radius: 50%;
            }
            .disable{
              border: 1px solid #dddddd;
            }
            >div:first-child{
              >img{
                width: 0.15rem;
                height: 0.2rem;
              }
              display: flex;
              justify-content: center;
              align-items: center;
            }
            >div:nth-child(2){
              color: $sss-color;
              text-align: center;
              width: 0.28rem;
            }
            >div:nth-child(3){
              display: flex;
              justify-content: center;
              align-items: center;
              background: $sss-color;
            }
          }
          .el-input-number {
            width: 1.3rem;

          }

          span {
            color: #009900;
            font-size: 0.16rem;
            font-weight: bold;
          }
        }
      }
    }

    .store_list {
      margin-bottom: 5px;
    }
    label {
      margin: 0 0.1rem;
      height: 0.2rem;
    }

    .store_top, .goods_bot {
      display: flex;
      align-items: center;
      padding: 0.1rem 0;
      border-bottom: 1px solid #f2f2f2;

      .storename {
        color: #0f0f0f;
        margin: 0 0.08rem 0 0.04rem;
      }
    }

    .goods_lists {
      display: flex;

      img {
        width: 1rem;
      }

      .left_msg {
        text-align: left;
        padding: 0.05rem 0.1rem 0 0.1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .goodsspecs {
          color: #999;
          font-size: 0.12rem;
        }


        .goodsprice {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .el-input-number {
            width: 1.3rem;

          }

          span {
            color: #009900;
            font-size: 0.14rem;
            font-weight: bold;
          }
        }
      }
    }

    .store_list {
      margin-bottom: 0.05rem;
    }

  }
  .goods_bot {
        position: relative;
      display: flex;
      align-items: center;
      padding: 0.1rem 0;
      border-bottom: 1px solid #f2f2f2;
        .addRadio,.addRadioTwo{
        width: 0.18rem;
        height: 0.18rem;
        margin-right: 0.1rem;
        border: 1px solid #999999;
        border-radius: 50%;
      }
      .addRadioTwo{
        background-color: $sss-color;
      }
      .storename {
        color: #0f0f0f;
        margin: 0 0.08rem 0 0.04rem;
      }
    }
    .goods_lists {
      display: flex;

      img {
        width: 1rem;
      }

      .left_msg {
        text-align: left;
        padding: 0.05rem 0.1rem 0 0.1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .goodsspecs {
          color: #999;
          font-size: 0.12rem;
        }


        .goodsprice {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .el-input-number {
            width: 1.3rem;

          }

          span {
            color: #009900;
            font-size: 0.16rem;
            font-weight: bold;
          }
        }
      }
    }

    .store_list {
      margin-bottom: 5px;
    }

  /* 推荐 */
  .cart_rmd {
    padding: 0.1rem 0.05rem 1.1rem 0.05rem;

    .list .goodslist {
      background: none;
      padding: 0;
    }

    .Sold {
      text-align: right;
      color: #999;
    }
  }

  /* 有购物车结算 */

  .settlement {
    position: fixed;
    width: 100%;
    bottom: 0.678rem;
    font-size: 0.18rem;
    color: #fff;
    display: flex;
    .left_check {
      background-color: #333;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.18rem;
      width: 70%;
      .allElection{
        width: 0.18rem;
        height: 0.18rem;
        // border: 1px solid #fff;
        background-color: $sss-color;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        // align-items: center;
        img{
          line-height: 0.18rem;
        }
      }
      .allElectionShow{
        width: 0.18rem;
        height: 0.18rem;
        border: 1px solid #fff;
        border-radius: 50%;
      }
      label {
        color: #fff;
        /deep/ .el-checkbox__label {
          font-size: 0.18rem;
        }
      }
    }
    .right_js,.isDellBatch{
      background-color: #009900;
      line-height: 0.5rem;
      width: 30%;
    }
    .isDellBatch{
      background-color: red !important;
    }
  }
  .overlay{
    position: fixed;
    top: 0;
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  .loading{
    color: $sss-color;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .Recommend{
    margin:0 0.05rem 0.1rem 0.05rem;
    padding: 0.05rem;
    background-color: #fff;
    border-radius: 5px;
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

</style>
