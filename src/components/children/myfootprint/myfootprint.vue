<template>

  <div class="common_box">
    <!--  足迹，收藏，店铺  -->
    <div v-show="$route.query.printid != 3">
      <div class="footprint" v-for="(item,index) in goodslist" :key="index">
        <el-checkbox v-model="checkitem" :key="index" v-show="false"></el-checkbox>
        <div class="img_box">
          <img :src="require(`../../../assets/img/${item.goodsimg}.png`)">
        </div>
        <div class="right_msg">
          <p v-show="$route.query.printid != 1">{{item.name}}</p>
          <div>
            <span class="clo-g" v-show="$route.query.printid != 1">￥{{item.price}}</span>
            <span class="" v-show="$route.query.printid == 1">{{item.companynam}}</span>
            <i class="el-icon-delete"></i>
          </div>
        </div>
      </div>
      <div class="bottom_box">
        <div class="mycheck left_check">
          <el-checkbox class="all" v-model="checkAll" @change="handleCheckAllChange"
                       style="margin-right: 10px"></el-checkbox>
          <span>已选择5件商品</span>
        </div>
        <div class="right_delet">
          删除
        </div>
      </div>
    </div>
    <!--  空  -->
    <empty></empty>

    <!-- 评价   -->
    <div v-show="$route.query.printid == 3">
      <div class="evaluation" v-for="(item,index) in evaluation_lists">
        <div class="left_img">
          <img src="../../../assets/img/news_head.png">
        </div>
        <div class="right_msg">
          <ul>
            <li>
              <div class="one">
                <p>{{item.storename}}</p>
                <span>{{item.add_time}}</span>
                <i class="el-icon-delete"></i>
              </div>
              <div>
                <span>评价：{{item.pj}}</span>
                <span>符合度：{{item.fhd}}</span>
                <span>态度：{{item.td}}</span>
                <span>物流：{{item.wl}}</span>
              </div>
            </li>
            <li>
              <p>{{item.liuyan}}</p>
              <div class="pei">
                <img v-for="(imgitem,index) in item.imglist" :src="require(`../../../assets/img/${imgitem}.png`)">
              </div>
            </li>
            <li class="goods_li">
              <router-link to="">
                <img :src="require(`../../../assets/img/${item.goods}.png`)">
                <div class="left_g_msg">{{item.msg}}</div>
                <i data-v-c66815a2="" class="el-icon-arrow-right"></i>
              </router-link>

            </li>
            <li>
              <span>商家回复：</span>
              {{item.huifu}}
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Empty from "../empty/empty";

  export default {
    name: "myfootprint",
    components: {Empty},
    data() {
      return {
        checkitem: false,
        checkAll: false,

        goodslist: [
          {
            goodsimg: 'icon2',
            name: '沧海系列皮带石英商务男士手表钟表 情侣表黑色GS3886S/D-B',
            price: '268.00',
            companynam: '黄州友商信息科技有限公司',
          },
          {
            goodsimg: 'icon2',
            name: '沧海系列皮带石英商务男士手表钟表 情侣表黑色GS3886S/D-B',
            price: '268.00',
            companynam: '黄州友商信息科技有限公司',
          },
          {
            goodsimg: 'icon2',
            name: '沧海系列皮带石英商务男士手表钟表 情侣表黑色GS3886S/D-B',
            price: '268.00',
            companynam: '黄州友商信息科技有限公司',
          },
          {
            goodsimg: 'icon2',
            name: '沧海系列皮带石英商务男士手表钟表 情侣表黑色GS3886S/D-B',
            price: '268.00',
            companynam: '黄州友商信息科技有限公司',
          },
          {
            goodsimg: 'icon2',
            name: '沧海系列皮带石英商务男士手表钟表 情侣表黑色GS3886S/D-B',
            price: '268.00',
            companynam: '黄州友商信息科技有限公司',
          },
        ],
        evaluation_lists: [
          {
            storename: '乡村基',
            add_time: '2020年1月17日',
            pj: '2星',
            fhd: '2星',
            td: '2星',
            wl: '2星',
            liuyan: '买香米就你家了，真空小包装，不抛光，真正的 东北香米，煮饭特好吃，五星好评，吃完再来买！',
            imglist: [],
            goods: 'banner',
            msg: '简箪 现磨新米农家自产长香丝2.5kg煲仔饭丝苗米...',
            huifu: '买香米就你家了，真空小包装，不抛光，真正的东北香米，煮饭特好吃，五星好评，吃完再来买！'
          },
          {
            storename: '乡村基',
            add_time: '2020年1月17日',
            pj: '2星',
            fhd: '2星',
            td: '2星',
            wl: '2星',
            liuyan: '买香米就你家了，真空小包装，不抛光，真正的 东北香米，煮饭特好吃，五星好评，吃完再来买！',
            imglist: ['pei1', 'pei2', 'pei3'],
            goods: 'banner',
            msg: '简箪 现磨新米农家自产长香丝2.5kg煲仔饭丝苗米...',
            huifu: '买香米就你家了，真空小包装，不抛光，真正的东北香米，煮饭特好吃，五星好评，吃完再来买！'
          }
        ],
      }
    },
    methods: {
      handleCheckAllChange: function (e) {

        this.checkitem = this.checkAll
      }
    },
    mounted() {

    }
  }
</script>

<style scoped lang="scss">


  .common_box {
    padding: 0;
    padding-top: 43px;
    margin-bottom: 0;

    .footprint {
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #f2f2f2;

      .img_box {
        width: 90px;
        margin: 0 15px 0 10px;
      }

      .right_msg {
        text-align: left;
        width: calc(100% - 115px);

        div {
          margin-top: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          i {
            font-size: 0.18rem;
            color: #999999;
          }
        }
      }
    }

    .bottom_box {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      color: #fff;
      display: flex;

      .left_check {
        padding-left: 10px;
        background-color: #333;
        line-height: 50px;
        width: 70%;
        text-align: left;
      }

      .right_delet {
        background-color: #009900;
        line-height: 50px;
        width: 30%;
      }


    }

    .evaluation {
      display: flex;
      padding: 10px;
      border-bottom: 1px solid #f2f2f2;

      .left_img {
        width: 80px;
        margin-right: 10px;
      }

      .right_msg {
        width: calc(100% - 90px);

        span {
          color: #999999;
        }

        li {
          text-align: left;
          margin-bottom: 10px;

          .one {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }

          .pei {
            display: flex;
            justify-content: space-between;

            img {
              width: 30%;
            }
          }
        }

        li.goods_li a {
          display: flex;
          padding: 10px;
          background-color: #f2f2f2;
          align-items: center;
          justify-content: space-between;

          img {
            width: 60px;
            margin-right: 10px;
          }
        }
      }
    }
  }


</style>
