<template>
  <div>
    <header ref="header_h">
      <span style="font-weight: bold">购物车</span>
      <span v-show="true" style="position: absolute;right: 50px;font-size: 16px">编辑</span>
      <i class="el-icon-chat-dot-round"></i>
    </header>

    <!--  空购物车  -->
    <div v-show="false" class="empty_box">
      <img src="../../assets/img/empty.png" style="width:30%">
      <div class="tips">您还未挑选商品哦</div>
      <div class="to_shopping">
        <router-link class="" to="">去商城逛逛</router-link>
      </div>
    </div>

    <!-- 有购物车 -->
    <div class="have_box" v-show="true">
      <div class="store_list" v-for="(item,index) in storelist" :key="item.index">
        <div class="store_top">
          <el-checkbox class="all" v-model="itemcheckAll" :key="index" @change="handleCheckAllChange"></el-checkbox>
          <div class="" style="margin-top: -2px">
            <router-link to="business/storemsg">
              <img src="../../assets/img/stoe.png" style="width: 18px">
              <span class="storename">{{item.storename}}</span>
              <i class="el-icon-arrow-right"></i>
            </router-link>
          </div>
        </div>
        <div class="goods_bot" v-for="(goodsitem,index) in item.goodslist" :key="item.id">
          <el-checkbox v-model="checkitem" :key="index"></el-checkbox>
          <div class="goods_lists">
            <img :src="require(`../../assets/img/${goodsitem.goodsimg}.png`)">
            <div class="left_msg">
              <div>{{goodsitem.goodsmsg}}</div>
              <div class="goodsspecs">规格：{{goodsitem.goodsspecs}}</div>
              <div class="goodsprice">
                <span>￥{{goodsitem.goodsprice}}</span>
                <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!--  推荐  -->

    <div class="cart_rmd">
      <img src="../../assets/img/tj.png" style="margin-bottom: 20px">
      <!--  商品列表  -->
      <div class="list" v-for="(item,index) in lists" :key="index">
        <el-row class="goodslist">
          <el-col :span="12" v-for="(goods, goodsindex) in item.goodsitem" :key="goodsindex">
            <div class="item">
              <img :src="require(`../../assets/img/${goods.goodsimg}.png`)">
              <div style="">
                <div class="goodsdtt">{{goods.goodsname}}</div>
                <div class="Sold">已售：{{goods.Sold}}</div>
                <div class="goodsprice clo-g">{{goods.goodsrice}}</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!--  有购物车结算  -->
    <div class="settlement" v-show="true">
      <div class="left_check">
        <el-checkbox class="all" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin-top: -3px">
          合计：￥{{total}}
        </div>
      </div>
      <div class="right_js">
        去结算
      </div>
    </div>
  </div>

</template>

<script>
  import Axios from 'axios';

  export default {
    name: "my_cart",
    data() {
      return {
        msg: '购物车',
        isIndeterminate: true,
        itemcheckAll: false,
        checkAll: false,
        checkitem: false,
        total:0,
        num: 1,
        lists: [
          {
            'goodsitem': [
              {
                'goodsname': '云阖·永川秀芽【炒青】100g',
                'goodsrice': '￥98.00',
                'Sold': '123件',
                'goodsimg': 'goods_img'
              },
              {
                'goodsname': '云阖·永川秀芽【炒青】100g',
                'goodsrice': '￥98.00',
                'Sold': '123件',
                'goodsimg': 'goods_img'
              },
              {
                'goodsname': '云阖·永川秀芽【炒青】100g',
                'goodsrice': '￥98.00',
                'Sold': '123件',
                'goodsimg': 'goods_img'
              },
              {
                'goodsname': '云阖·永川秀芽【炒青】100g',
                'goodsrice': '￥98.00',
                'Sold': '123件',
                'goodsimg': 'goods_img'
              }
            ],
          },
        ],
        storelist: [
          {
            storename: '富锦旗舰店',
            goodslist: [
              {
                goodsmsg: '富锦年货特产坚果零食大礼包万事如意混合坚果公司送礼盒装',
                goodsimg: 'c_goods',
                goodsspecs: '100*10',
                goodsprice: '98'
              },
              {
                goodsmsg: '富锦年货特产坚果零食大礼包万事如意混合坚果公司送礼盒装',
                goodsimg: 'c_goods',
                goodsspecs: '100*10',
                goodsprice: '98'
              }
            ]
          },
          {
            storename: '富锦旗舰店',
            goodslist: [
              {
                goodsmsg: '富锦年货特产坚果零食大礼包万事如意混合坚果公司送礼盒装',
                goodsimg: 'c_goods',
                goodsspecs: '100*10',
                goodsprice: '98'
              }
            ]
          },
        ]
      }
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      //计数器
      handleChange(value) {
        console.log(value);
      }
    }
  }
</script>

<style lang="scss" scoped>
  body, html {
    background-color: #f2f2f2;
    font-size: 20px;
  }


  /deep/ .el-checkbox__inner {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background: none;
  }

  /deep/ .el-checkbox__inner::after {
    height: 11px;
    left: 6px;
    width: 5px;
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
    padding: 10px 0;
    border-bottom: 1px solid #f2f2f2;
    justify-content: center;
    background-color: #fff;

    span {
      font-size: 18px;
    }

    i {
      font-size: 30px;
      color: #999;
      margin: 0 8px;
      position: absolute;
      right: 0;
    }
  }


  /* 空购物车 */
  .empty_box {
    padding: 40px 0 30px 0;

    .tips {
      font-size: 0.18rem;
      color: #999;
      margin: 30px 0 20px 0;
    }

    .to_shopping a {
      font-size: 0.2rem;
      color: #fff;
      background-color: #009900;
      border-radius: 100px;
      padding: 15px 0;
      width: 45vw;
      display: inline-block;
    }
  }

  /* 有购物车  */
  .have_box {
    .store_list {
      background-color: #fff;
    }

    label {
      margin: 0 10px;
      height: 20px;
    }

    .store_top, .goods_bot {
      display: flex;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #f2f2f2;

      .storename {
        color: #0f0f0f;
        margin: 0 8px 0 4px;
      }
    }

    .goods_lists {
      display: flex;

      img {
        width: 100px;
      }

      .left_msg {
        text-align: left;
        padding: 5px 10px 0 10px;
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
            width: 130px;

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

  }

  /* 推荐 */
  .cart_rmd {
    padding: 10px 10px 50px 10px;

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
    bottom: 67.8px;
    font-size: 0.18rem;
    color: #fff;
    display: flex;
    .left_check {
      background-color: #333;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 17px;
      width: 70%;
      label {
        color: #fff;
        /deep/ .el-checkbox__label {
          font-size: 0.18rem;
        }
      }
    }
    .right_js{
      background-color: #009900;
      line-height: 50px;
      width: 30%;
    }
  }

</style>
