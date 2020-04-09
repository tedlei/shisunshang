<template>
  <div class="main_box">
    <header ref="header_h">
      <div @click="opensearch" style="width: 100%;margin:0 0.1rem">
        <search :dmsg="msg"></search>
      </div>

      <!-- <i class="el-icon-plus"></i> -->
    </header>
    <el-container :style="{'height': height,'backgroundColor':'#f2f2f2'}">
      <el-aside width="1rem">
        <ul class="left">
          <li v-for="(item,index) in leftlists" :key="index" :class="num==index?'active':''"
              @click="getNum(index,item.children)">
            <span>{{item.text}}</span>
          </li>
        </ul>
      </el-aside>

      <el-container>
        <el-main style="position: relative;">
          <ul v-show="isUlliTwo " :style="'margin-top:'+isUlliTwoHeight*0.51+'rem'" class="erji">
            <li v-for="(item1,index1) in navChildren" :key="index1" @click="isUlliTwoAdd(item1.id)">
              {{item1.cate_name}}
            </li>
          </ul>
          <ul class="cpylist">
            <li v-for="(item,index) in cpylist" :key="index">
              <router-link :to="{path:'/business/storemsg',query:{id: item.id}}">
              <div class="imgDiv">
                <van-image
                  width="0.78rem"
                  height="0.78rem"
                  fit="cover"
                  :src="item.imgurl"
                />
              </div>
              <div class="right_msg">

                  <p class="p1 fontWrap fontWrapOne">
                    <span>{{item.name}}</span>
                    <span v-show="item.label == 1" class="quality">品质商家</span>
                  </p>
                  <div style="margin: 0.02rem 0;" class="address">
                    <span>地址：</span>
                    <span class="fontWrap fontWrapTwo">
                        {{item.address}}
                      </span>
                  </div>
                  <div class="address">
                    <span>电话：</span>
                    <span>
                        {{item.mobile}}
                      </span>
                  </div>
                  <!-- <p class="long">{{item.long}}</p> -->
              </div>
              </router-link>
            </li>
          </ul>
        </el-main>
      </el-container>
    </el-container>
    <router-link to="/mine/nearby">
    <div class="iconDiv">
      <img src="../../assets/img/fjsj.png" alt="">
      <div>商家入驻</div>
    </div>

    </router-link>
  </div>
</template>

<script>
    import Header from "../header/header";
    import Search from "../search/search";
    import clientWw from "../../assets/js/conmon";
    import Bus from "../../assets/js/bus";
    export default {
        name: "business",
        components: {Search, Header},
        data() {
            return {
                msg: '附近商家',
                height: '1rem',
                num: 0,
                isUlliTwo: true,
                isUlliTwoHeight: 1,
                navChildren: [],
                leftlists: [],
                cpylist: []
            }
        },
        methods: {
            //搜索
            opensearch: function () {
                Bus.$emit('searchval', true)
            },
            getNum(index, children) {
                this.num = index;
                this.navChildren = children;
                this.isUlliTwoHeight = index;
                this.isUlliTwo = true;
                if (index == 0) {
                    this.getDataTwo();
                }
            },
            navPush(list) {
                for (var i in list) {
                    this.leftlists.push({
                        id: list[i].id,
                        text: list[i].cate_name,
                        children: list[i].sub,
                    })
                }
                this.leftlists.unshift({
                    id: 0,
                    text: '全部',
                    children: [],
                })
            },
            getData() {
                let ad_data = {
                    method: "get.user.strre.category.list"
                };
                this.$post('/api/v1/UserStoreCategory', ad_data)
                    .then((res) => {
                        console.log(res);
                        if (res.status == 200) {
                            this.navPush(res.data);
                            this.getDataTwo();
                        }
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            getDataTwo(id) {
                let ad_data = {};
                if (id) {
                    // console.log("有Id")
                    ad_data = {
                        method: "get.user.store.list",
                        cate_id: id,
                        page: 0,
                        page_size: 20
                    };
                } else {
                    ad_data = {
                        method: "get.user.store.list",
                        cate_id: 0,
                        page: 0,
                        page_size: 20
                    };
                }
                this.$post('/api/v1/userStore', ad_data)
                    .then((res) => {
                        console.log(res);
                        if (res.status == 200) {
                            this.cpylist = res.data;
                        }
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            isUlliTwoAdd(id) {
                this.isUlliTwo = false;
                this.getDataTwo(id);
            }
        },
        created() {
            this.getData();
        },
        mounted() {
            let clientW = clientWw.clientWw()
            let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
            let topH = this.$refs.header_h.offsetHeight;
            this.height = (h - topH - 70 * clientW / 100) / clientW + 'rem';
        }
    }
</script>

<style lang="scss" scoped>
  header {
    display: flex;
    align-items: center;
    padding: 0.1rem 0;
    border-bottom: 1px solid #f2f2f2;

    .location {
      min-width: 0.8rem;
      font-weight: bold;
    }

    .el-icon-plus {
      font-size: 0.18rem;
      color: #999;
      margin: 0 0.2rem 0 0.08rem;

    }
  }

  aside {
    background-color: #fff;
    overflow: visible;
    border-right: 1px solid #f2f2f2;

    .left {
      position: relative;
    }

    .left > li {
      line-height: 0.5rem;
      box-sizing: border-box;

    }

    .left > li {
      border-left: 3px solid #fff;
      border-bottom: 1px solid #f2f2f2;
    }

    .active {
      color: $sss-color;
      background-color: #f2f2f2;
      border-left: 3px solid $sss-color !important;
    }

    .left > li.all {
      position: relative;
    }

    .left > li.all:after {
      content: '';
      display: inline-block;
      width: 0.05rem;
      height: 100%;
      background-color: #009900;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .erji {
    border-left: 1px solid #f2f2f2;
    color: #000;
    width: 0.9rem;
    position: absolute;
    top: 0;
    left: -0.05rem;
    z-index: 50;
    background-color: #fff;

    li {
      border-bottom: 1px solid #f2f2f2;
      line-height: 0.5rem;
    }

    li:active {
      color: $sss-color !important;
    }
  }

  section .el-main {
    padding: 0.05rem;

    .cpylist > li {
      background-color: #fff;
      padding: 0.05rem;
      margin-bottom: 0.05rem;
      text-align: left;
      >a{
        display: flex;
        align-items: center;
      }
      .right_msg {
        margin-left: 0.05rem;
        width: 100%;
        .p1 {
          color: #000 !important;
          font-size: 0.14rem;
          display: flex;
          justify-content: space-between;
          .quality{
            display: inline-block;
            line-height: 0.18rem;
            background-color: #009900;
            border-radius: 0.18rem;
            padding: 0 5px;
            color: #fff;
            font-size: 0.12rem;
          }
        }

        .address {
          display: flex;
          align-items: center;
          color: #999;
          font-size: 0.12rem;
        }

        p.long {
          text-align: right;
          color: #009900;
          font-size: 0.12rem;
        }
      }
    }


  }
  .iconDiv{
    position: fixed;
    bottom: 0.8rem;
    right: 0.15rem;
    >img{
      border-radius: 50%;
      box-shadow: 0px 0px 10px 5px rgba(36, 35, 35, 0.3);
      width: 0.45rem;
      height: 0.45rem;
    }
    >div{
      margin: 0.05rem 0;
      color: #fff;
      border-radius: 10px;
      padding: 0 0.05rem;
      background-color: $sss-color;
      // text-shadow: 0 0 5px #000;
      box-shadow: 0px 0px 10px 5px rgba(36, 35, 35, 0.3);
    }

  }
</style>
