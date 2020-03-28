<template>

  <div class="common_box">
    <!--  足迹，收藏，店铺  -->
    <div v-show="$route.query.printid != 3 && goodslist.length != 0">
      <div class="footprint" v-for="(item,index) in goodslist" :key="index">
        <div v-show="$store.getters.getEmpty" :class="item.checked ?'addRadioTwo':'addRadio'" @click="chooseShopGoods(index)">
            <van-icon name="success" color="#fff"/>
        </div>
        <div class="img_box">
          <van-image
            width="0.9rem"
            height="0.9rem"
            fit="cover"
            :src="item.imgsrc"
          />
        </div>
        <div class="right_msg">
          <p>{{item.name}}</p>
          <div>
            <span class="clo-g" v-show="$route.query.printid != 1">￥{{item.price}}</span>
            <span class="" v-show="$route.query.printid == 1">{{item.companynam}}</span>
            <!-- <span class="" v-show="$route.query.printid == 2">{{item.companynam}}</span> -->
            <!-- <i class="el-icon-delete"></i> -->
          </div>
        </div>
      </div>
      <div class="bottom_box" v-show="$store.getters.getEmpty">
        <div class="mycheck left_check">
          <el-checkbox class="all" v-model="checkAll" @change="handleCheckAllChange"
            style="margin-right: 0.1rem"></el-checkbox>
          <span>全选</span>
        </div>
        <div class="right_delet" @click="deleteCollection">
          删除
        </div>
      </div>
    </div>
    <!--  空  -->
    <empty v-show="goodslist.length == 0"></empty>

    <!-- 评价   -->
    <div v-show="$route.query.printid == 3">
      <div class="evaluation" v-for="(item,index) in evaluation_lists" :key="index">
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
                <img v-for="(imgitem,index) in item.imglist" :src="require(`../../../assets/img/${imgitem}.png`)" :key="index">
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
        titlelist: ['我的收藏','我的关注','我的足迹','我的评价'],
        checkAll: false,
        goodslist: [
          // {
          //   goodsimg: 'icon2',
          //   name: '沧海系列皮带石英商务男士手表钟表 情侣表黑色GS3886S/D-B',
          //   price: '268.00',
          //   companynam: '黄州友商信息科技有限公司',
          //   checked: false
          // },
          // {
          //   goodsimg: 'icon2',
          //   name: '沧海系列皮带石英商务男士手表钟表 情侣表黑色GS3886S/D-B',
          //   price: '268.00',
          //   companynam: '黄州友商信息科技有限公司',
          //   checked: false
          // },

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
        page: 0,
      }
    },
    methods: {
      handleCheckAllChange () {
        // console.log(this.checkAll)
        if(this.checkAll){
          for(let i in this.goodslist){
            this.goodslist[i].checked = true;
          }
        }else{
          for(let i in this.goodslist){
            this.goodslist[i].checked = false;
          }
        }
      },
      isChooseAll () {
        var flag1 = true;
        for ( var i = 0, len = this.goodslist.length; i < len; i++ ) {
          if ( this.goodslist[i]['checked'] == false ) {
            flag1 = false;
            break;
          }
        }
        flag1 == true ? this.checkAll = true : this.checkAll = false;
      },
      chooseShopGoods (index) {
        // console.log(1)
        this.goodslist[index].checked = !this.goodslist[index].checked
        this.isChooseAll();
      },

      myfootprintDataPush (data) {
        console.log(data);
        for(var i in data){
          if(data[i].goods !=undefined && data[i].goods != null){
            this.goodslist.push({
              id: data[i].id,
              goodsimg: data[i].goods.imgsrc,
              name: data[i].goods.name,
              price: data[i].goods.price,
              imgsrc: data[i].goods.imgsrc,
              checked: false
            })
          }
        }
        // console.log(this.goodslist)
      },

      collectionShop (data) {
        for(var i in data){
          this.goodslist.push({
            id: data[i].id,
            name: data[i].company,
            imgsrc: data[i].thumb,
            checked: false
          })
        }
        // console.log(this.goodslist)
      },

      footprintPush (data) {
        this.goodslist = [];
        for(var i in data){
          this.goodslist.push({
            id: data[i].id,
            name: data[i].goods.name,
            imgsrc: data[i].goods.imgsrc,
            price: data[i].goods.price,
            checked: false
          })
        }
      },

      //获取数据
      getData () {
        if(this.$route.query.printid==0){
          let ad_data = {
            method: 'get.collect.goods.list',
            page: this.page,
            page_size: 10
          };
          this.$post('/api/v1/userCollectGoods', ad_data)
          .then((res) => {
            console.log(res)
            this.myfootprintDataPush(res.data.items);
          }).catch(function (error) {
              console.log(error);
          });
        }else if(this.$route.query.printid==1){
          // console.log("收藏商家")
          let ad_data = {
            method: 'get.collect.shops.list'
          };
          this.$post('/api/v1/userCollectShops', ad_data)
          .then((res) => {
            console.log(res)
            this.collectionShop(res.data.items);
          }).catch(function (error) {
              console.log(error);
          });
        }else if(this.$route.query.printid==2){
          let ad_data = {
            method: 'get.user.footprint.list'
          };
          this.$post('/api/v1/UserFootprint', ad_data)
          .then((res) => {
            console.log(res)
            
            this.footprintPush(res.data.items);
          }).catch(function (error) {
              console.log(error);
          });
        }

      },

      //删除收藏商品
      deleteCollection () {
        this.$store.commit("setLoading");
        let _id = [];
        for(var i in this.goodslist){
          if(this.goodslist[i].checked){
            _id.push(this.goodslist[i].id)
          }
        };
        // console.log(_id)
        if(this.$route.query.printid==0){
          let ad_data = {
            method: "del.collect.goods.list",
            id: _id
          };
          console.log(ad_data);
          this.$post('/api/v1/userCollectGoods', ad_data)
          .then((res) => {
            console.log(res);
            if(res.status == 200){
              this.$store.commit("setLoading");
            }
          }).catch(function (error) {
              console.log(error);
          });
        }else if(this.$route.query.printid==1){
          // console.log("删除商家")
          let ad_data = {
            method: "del.collect.shops.list",
            id: _id
          };
          console.log(ad_data);
          this.$post('/api/v1/userCollectShops', ad_data)
          .then((res) => {
            console.log(res);
            if(res.status == 200){
              this.$store.commit("setLoading");
              this.getData();
            }
          }).catch(function (error) {
              console.log(error);
          });
        }else if(this.$route.query.printid==2){
          let ad_data = {
            method: "del.cuser.footprint.list",
            id: _id
          };
          // console.log(ad_data);
          this.$post('/api/v1/UserFootprint', ad_data)
          .then((res) => {
            console.log(res);
            if(res.status == 200){
              this.$store.commit("setLoading");
              this.getData();
            }
          }).catch(function (error) {
              console.log(error);
          });
        }

      }

      //取消关注店铺
    },
    created () {
      console.log(this.$route.query);
      let index = this.$route.query.printid;
      document.title = this.titlelist[index];
      this.getData();
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
  .addRadio,.addRadioTwo{
    width: 0.18rem;
    height: 0.18rem;
    border: 1px solid #999999;
    border-radius: 50%;
  }
  .addRadioTwo{
    background-color: $sss-color;
  }

</style>
