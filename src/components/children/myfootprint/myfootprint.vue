<template>

  <div class="common_box">
    <!--  足迹，收藏，店铺  -->
    <div v-if="$route.query.printid != 3 && isData">

      <!-- <div class="footprint" v-for="(item,index) in goodslist" :key="index">
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
          </div>
        </div>
      </div> -->

      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                offset="50"
                @load="getData">
        <div class="footprint" v-for="(item,index) in goodslist" :key="index">
          <div v-show="$store.getters.getEmpty" :class="item.checked ?'addRadioTwo':'addRadio'"
               @click="chooseShopGoods(index)">
            <van-icon name="success" color="#fff"/>
          </div>
          <div class="img_box">
            <van-image
              width="0.9rem"
              height="0.9rem"
              fit="cover"
              :src="item.imgsrc"
              @click="todetail(index)"
            />
          </div>
          <div class="right_msg">
            <p>{{item.name}}</p>
            <div>
              <span class="clo-g" v-show="$route.query.printid != 1">￥{{item.price}}</span>
              <span class="" v-show="$route.query.printid == 1">{{item.companynam}}</span>
            </div>
          </div>
        </div>
      </van-list>


      <div class="bottom_box" v-show="$store.getters.getEmpty">
        <div class="mycheck left_check">
          <!-- <el-checkbox class="all" v-model="checkAll" @change="handleCheckAllChange"
            style="margin-right: 0.1rem"></el-checkbox> -->
          <div :class="checkAll ?'allElection':'allElectionShow'" @click="handleCheckAllChange">
            <div v-show="checkAll">
              <van-icon name="success" color="#fff"/>
            </div>
          </div>
          <span>全选</span>
        </div>
        <div class="right_delet" @click="deleteCollection">
          删除
        </div>
      </div>
    </div>
    <!--  空  -->
    <empty v-show="isEmpty"></empty>

    <!-- 评价   -->
    <div v-if="$route.query.printid == 3 && isData">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                offset="100"
                @load="getData">
        <div class="evaluation" v-for="(item,index) in evaluation_lists" :key="index">
          <div class="left_img" @click="todetail(index)">
            <!-- <img :src="item.goods.imgsrc"> -->
            <div>
              <van-image
                width="0.5rem"
                height="0.5rem"
                fit="cover"
                :src="item.goods==undefined||item.goods==null?'':item.goods.imgsrc"
              />
            </div>
            <div class="one">
              <div>
                <span class="fontWrap fontWrapOne">{{item.goods==undefined||item.goods==null?'':item.goods.name}}</span>
                <span>{{item.add_time}}</span>
              </div>
              <!-- <div class="evaluationicon" @click="deleteCollection(item.id)"> -->
              <div class="evaluationicon" @click.stop="tapDelete(item.id)">
                <van-icon size="20" name="delete"/>
              </div>
            </div>
          </div>
          <div class="right_msg">
            <ul>
              <li>
                <div>
                  <span class="fontWrap fontWrapTwo">评价：{{item.content}}</span>
                  <!-- <span>符合度：{{item.fhd}}</span>
                  <span>态度：{{item.td}}</span>
                  <span>物流：{{item.wl}}</span> -->
                </div>
              </li>
              <li>
                <p>{{item.liuyan}}</p>
                <div class="pei" v-if="item.imgarr.length>0">
                  <img v-for="(imgitem,index) in item.imgarr" :src="imgitem" :key="index">
                </div>
              </li>
              <!-- <li class="goods_li">
                <router-link to="">
                  <img :src="require('../../../assets/img/pei1.png')">
                  <div class="left_g_msg">
                    {{item.msg}}
                  </div>
                  <i data-v-c66815a2="" class="el-icon-arrow-right"></i>
                </router-link>
              </li> -->
              <li v-if="item.huifu">
                <span>商家回复：</span>{{item.huifu}}
              </li>
            </ul>
          </div>
        </div>
      </van-list>
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
                titlelist: ['我的收藏', '我的关注', '我的足迹', '我的评价'],
                isEmpty: false,
                isData: false,
                checkAll: false,
                goodslist: [],  //我的收藏、我的关注、我的足迹列表
                evaluation_lists: [],   //评价列表
                page: 0,
                loading: false,   //是否正在获取数据
                finished: false   //数据是否获取完成

            }
        },
        methods: {
            handleCheckAllChange() {
                // console.log(this.checkAll)
                this.checkAll = !this.checkAll;
                if (this.checkAll) {
                    for (let i in this.goodslist) {
                        this.goodslist[i].checked = true;
                    }
                } else {
                    for (let i in this.goodslist) {
                        this.goodslist[i].checked = false;
                    }
                }
            },
            isChooseAll() {
                var flag1 = true;
                for (var i = 0, len = this.goodslist.length; i < len; i++) {
                    if (this.goodslist[i]['checked'] == false) {
                        flag1 = false;
                        break;
                    }
                }
                flag1 == true ? this.checkAll = true : this.checkAll = false;
            },
            chooseShopGoods(index) {
                console.log(1)
                this.goodslist[index].checked = !this.goodslist[index].checked
                // this.isChooseAll();
            },

            myfootprintDataPush(data) {
                // console.log(data);
                for (var i in data) {
                    if (data[i].goods != undefined && data[i].goods != null) {
                        this.goodslist.push({
                            id: data[i].goods.id,
                            goodsimg: data[i].goods.imgsrc,
                            name: data[i].goods.name,
                            price: data[i].goods.price,
                            imgsrc: data[i].goods.imgsrc,
                            checked: false
                        })
                    }
                }
            },

            collectionShop(data) {
                this.goodslist = [];
                for (var i in data) {
                    this.goodslist.push({
                        id: data[i].id,
                        name: data[i].shop_name,
                        imgsrc: data[i].thumb,
                        checked: false
                    })
                }
                // console.log(this.goodslist)
            },

            footprintPush(data) {
                // this.goodslist = [];
                for (var i in data) {
                    let {id, goods} = data[i]
                    this.goodslist.push({
                        id,
                        name: goods ? goods.name : '',
                        imgsrc: goods ? goods.imgsrc : '',
                        price: goods ? goods.price : '',
                        checked: false,
                        goods_id:goods.id
                    })
                }
            },
            //跳转
            todetail: function (e) {
                let printid = this.$route.query.printid;
                let list = this.goodslist;
                let evaluation_lists = this.evaluation_lists;
                console.log(printid)
                console.log(list[e])
                if (printid == '0') {
                    this.$router.push({
                        path: '/goodsdetails',
                        query: {
                            id: list[e].id
                        }
                    });
                } else if(printid == '2'){
                    this.$router.push({
                        path: '/goodsdetails',
                        query: {
                            id: list[e].goods_id
                        }
                    });
                }else if (printid == '1') {
                    this.$router.push({
                        path: '/storeDetails',
                        query: {
                            id: list[e].id
                        }
                    });
                }else if (printid == '3'){
                    this.$router.push({
                        path: '/goodsdetails',
                        query: {
                            id: evaluation_lists[e].goods.id
                        }
                    });

                }
            },

            //获取数据
            getData(num) {
                if (this.$route.query.printid == 0) {
                    let ad_data = {
                        method: 'get.collect.goods.list',
                        page: num ? this.goodslist.length + num : this.page,
                        page_size: num ? num : 10
                    };
                    this.$post('/api/v1/userCollectGoods', ad_data)
                        .then((res) => {
                            this.loading = false;   //是否处于加载状态  否
                            let {items} = res.data
                            this.page += items.length;
                            // this.goodslist = [];
                            if (items.length > 0) {
                                this.isData = true;
                                this.myfootprintDataPush(items);
                                if (this.goodslist.length < 10) {
                                    this.finished = true;
                                }
                            } else {
                                this.finished = true;
                            }
                            if (this.goodslist.length > 0) this.isEmpty = false;
                            else this.isEmpty = true;

                        }).catch(function (error) {
                        console.log(error);
                    });
                } else if (this.$route.query.printid == 1) {
                    let ad_data = {
                        method: 'get.collect.shops.list',
                        page: num ? this.goodslist.length + num : this.page,
                        page_size: num ? num : 10
                    };
                    this.$post('/api/v1/userCollectShops', ad_data)
                        .then((res) => {
                            this.loading = false;   //是否处于加载状态  否
                            let {items} = res.data
                            this.page += items.length;
                            // this.goodslist = [];
                            if (items.length > 0) {
                                this.isData = true;
                                this.collectionShop(res.data.items);
                                if (this.goodslist.length < 10) {
                                    this.finished = true;
                                }
                            } else {
                                this.finished = true;
                            }
                            if (this.goodslist.length > 0) this.isEmpty = false;
                            else this.isEmpty = true;
                        }).catch(function (error) {
                        console.log(error);
                    });
                } else if (this.$route.query.printid == 2) {
                    let ad_data = {
                        method: 'get.user.footprint.list',
                        page: num ? this.goodslist.length + num : this.page,
                        page_size: num ? num : 10
                    };
                    this.$post('/api/v1/UserFootprint', ad_data)
                        .then((res) => {
                            this.loading = false;   //是否处于加载状态  否
                            let {items} = res.data
                            this.page += items.length;
                            // this.goodslist = [];
                            if (items.length > 0) {
                                this.isData = true;
                                this.footprintPush(items);
                                if (this.goodslist.length < 10) {
                                    this.finished = true;
                                }
                            } else {
                                this.finished = true;
                            }
                            if (this.goodslist.length > 0) this.isEmpty = false;
                            else this.isEmpty = true;
                        }).catch(function (error) {
                        console.log(error);
                    });
                } else if (this.$route.query.printid == 3) {
                    let ad_data = {
                        method: 'get.user.comment.list',
                        page: num ? this.evaluation_lists.length + num : this.page,
                        page_size: num ? num : 10
                    };
                    this.loading = true;   //是否处于加载状态  是
                    this.$post('/api/v1/GoodsComment', ad_data)
                        .then((res) => {
                            this.loading = false;   //是否处于加载状态  否
                            let items = res.data
                            if (items && items.length > 0) {
                                this.page += items.length;
                                this.isData = true;
                                this.evaluation_lists = this.evaluation_lists.concat(items);
                                if (this.evaluation_lists.length < 10) {
                                    this.finished = true;
                                }
                            } else {
                                this.finished = true;
                            }
                            if (this.evaluation_lists.length > 0) this.isEmpty = false;
                            else this.isEmpty = true;
                        }).catch(function (error) {
                        console.log(error);
                    });
                }

            },

            //删除收藏商品
            deleteCollection(evaluationid) {
                let _id = [];
                // if(evaluationid != undefined || evaluationid != '' || evaluationid != null){
                //     _id = evaluationid;
                // }else{
                // }
                for (var i in this.goodslist) {
                    if (this.goodslist[i].checked) {
                        _id.push(this.goodslist[i].id)
                    }
                };

                // console.log(_id);
                if (this.$route.query.printid == 0) {
                    let ad_data = {
                        method: "del.collect.goods.list",
                        id: _id
                    };
                    console.log(ad_data);
                    this.$post('/api/v1/userCollectGoods', ad_data)
                        .then((res) => {
                            console.log(res);
                            if (res.status == 200) {
                                // this.getData();
                                this.deleteList(_id);
                            }
                        }).catch(function (error) {
                        console.log(error);
                    });
                } else if (this.$route.query.printid == 1) {
                    console.log("删除商家")
                    let ad_data = {
                        method: "del.collect.shops.list",
                        id: _id
                    };
                    console.log(ad_data);
                    this.$post('/api/v1/userCollectShops', ad_data)
                        .then((res) => {
                            console.log(res);
                            if (res.status == 200) {
                                this.deleteList(_id);
                            }
                        }).catch(function (error) {
                        console.log(error);
                    });
                } else if (this.$route.query.printid == 2) {
                    let ad_data = {
                        method: "del.cuser.footprint.list",
                        id: _id
                    };
                    this.deleteList(_id)
                    // console.log(ad_data);
                    this.$post('/api/v1/UserFootprint', ad_data)
                        .then((res) => {
                            console.log(res);
                            if (res.status == 200) {
                                // this.getData();
                                // this.goodslist
                                this.deleteList(_id)
                            }
                        }).catch(function (error) {
                        console.log(error);
                    });
                } else if (this.$route.query.printid == 3) {
                    let ad_data = {
                        method: "del.goods.comment.list",
                        id: _id
                    };
                    this.$post('/api/v1/goodsComment', ad_data)
                        .then((res) => {
                            console.log(res);
                            if (res.status == 200) {
                                this.getData();
                            }
                        }).catch(function (error) {
                        console.log(error);
                    });
                }

            },

            //删除数组数据
            deleteList(arr) {
                let {goodslist} = this
                for (var list of arr) {
                    for (var i in goodslist) {
                        if (goodslist[i].id === list) {
                            goodslist.splice(i, 1);
                        }
                    }
                }
                this.getData(arr.length)
            },


            //删除评价
            tapDelete(id) {
                let {evaluation_lists} = this
                let ad_data = {
                    method: 'del.goods.comment.list',
                    id: [id]
                };
                this.$post('/api/v1/goodsComment', ad_data)
                    .then((res) => {
                        if (res.data) {
                            for (var i in evaluation_lists) {
                                if (evaluation_lists[i].id === id) {
                                    evaluation_lists.splice(i, 1);
                                }
                            }
                        }
                    }).catch(function (error) {
                    console.log(error);
                });
            },


            //取消关注店铺
        },
        created() {
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
    padding-top: 47px;
    margin: 0;
    // height: 100%;
    // background-color: #fff;
    .footprint {
      display: flex;
      align-items: center;
      padding: 12px 10px 10px 10px;
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
        display: flex;
        align-items: center;
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
      border-bottom: 1px solid #f2f2f2;
      padding: 0 0.1rem;

      .left_img {
        display: flex;
        border-bottom: 1px solid #e0dddd;
        padding: 0.1rem 0;

        > div:first-child {
          margin-right: 0.1rem;
        }

        .one {
          width: 100%;
          text-align: left;
          height: 0.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;

          > div:first-child {
            > span:first-child {
              color: #000;
            }

            > span:nth-child(2) {
              color: #999999;
              font-size: 0.13rem;
            }
          }
        }
      }

      .right_msg {
        padding: 0.1rem 0 0.1rem 0.6rem;

        span {
          color: #999999;
        }

        li {
          text-align: left;
          margin-bottom: 10px;


          .pei {
            display: flex;
            justify-content: space-between;

            > img {
              width: 0.8rem;
              height: 0.8rem;
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

  .addRadio, .addRadioTwo {
    width: 0.18rem;
    height: 0.18rem;
    border: 1px solid #999999;
    border-radius: 50%;
  }

  .addRadioTwo {
    background-color: $sss-color;
  }

  .evaluationicon {

  }

  .allElection {
    width: 0.18rem;
    height: 0.18rem;
    background-color: $sss-color;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0.03rem;
    margin-right: 0.1rem;
  }

  .allElectionShow {
    width: 0.18rem;
    height: 0.18rem;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-right: 0.1rem;

  }
</style>
