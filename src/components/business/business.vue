<template>
  <div class="main_box">
    <header ref="header_h">
      <!-- <div class="clo-g location">
        <i class="el-icon-location-outline"></i>
        <span>重庆</span>
      </div> -->
      <div style="margin-right:0.1rem"></div>
      <search :dmsg="msg"></search>
      <i class="el-icon-plus"></i>
    </header>
    <el-container :style="{'height': height,'backgroundColor':'#f2f2f2'}">
      <el-aside width="0.9rem">
        <ul class="left">
          <li v-for="(item,index) in leftlists" :key="index" :class="num==index?'active':''"
              @click="getNum(index,item.children)">
            <span>{{item.text}}</span>
          </li>
        </ul>
      </el-aside>

      <el-container>
        <el-main style="position: relative;">
          <ul v-show="isUlliTwo " :style="'margin-top:'+isUlliTwoHeight*0.4+'rem'" class="erji">
            <li v-for="(item1,index1) in navChildren" :key="index1" @click="isUlliTwoAdd(item1.id)">
              {{item1.cate_name}}
            </li>
          </ul>
          <ul class="cpylist">
            <li v-for="(item,index) in cpylist" :key="index">
              <div class="imgDiv">
                <van-image
                  width="0.78rem"
                  height="0.78rem"
                  fit="cover"
                  :src="item.imgurl"
                />
              </div>
              <div class="right_msg">
                <router-link :to="{path:'/business/storemsg',query:{id: item.id}}">
                  <p class="p1 fontWrap fontWrapOne">
                    {{item.name}}
                  </p>
                  <div style="margin: 0.02rem 0;" class="address">
                    <span style="width:56px">地址:</span>
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
                </router-link>

              </div>
            </li>
          </ul>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
    import Header from "../header/header";
    import Search from "../search/search";
    import clientW from "../../assets/js/conmon";

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
        leftlists: [
          // {
          //   text: '全部',
          //   children: [
          //     // {
          //     //   text: '温州',
          //     //   // id，作为匹配选中状态的标识符
          //     //   id: 1,
          //     // },
          //     // {
          //     //   text: '内锅',
          //     //   // id，作为匹配选中状态的标识符
          //     //   id: 2,
          //     // }
          //   ]
          // },
          // {
          //   text: '品质购物',
          //   id: 1,
          //   children: [
          //     {
          //       text: '温州',
          //       // id，作为匹配选中状态的标识符
          //       id: 1,
          //     },
          //     {
          //       text: '内锅',
          //       // id，作为匹配选中状态的标识符
          //       id: 2,
          //     }
          //   ]
          // },
          // {
          //   text: '狗蛋大妈',
          //   id: 2,
          //   children: [
          //     {
          //       text: '梅梅',
          //       // id，作为匹配选中状态的标识符
          //       id: 1,
          //     },
          //     {
          //       text: '靓仔',
          //       // id，作为匹配选中状态的标识符
          //       id: 2,
          //     }
          //   ]
          // },
        ],
        cpylist: [
          // {
          //   img: 'company',
          //   title: '重庆安利科技技术有限公司',
          //   address: '重庆市渝北加工区七路与金渝大道交叉口北100米',
          //   phone: '023-6345645',
          //   long: '3.14公里'
          // },
        ]
      }
    },
    methods: {
      getNum  (index, children) {
        this.num = index;
        this.navChildren = children;
        this.isUlliTwoHeight = index;
        this.isUlliTwo = true;
        if(index==0){
          this.getDataTwo();
        }
      },
      navPush (list){
        for(var i in list){
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
        // console.log(this.leftlists)
      },
      getData () {
        // this.$store.commit("setLoading");
        let ad_data = {
          method: "get.user.strre.category.list"
        };
        this.$post('/api/v1/UserStoreCategory', ad_data)
        .then((res) => {
          console.log(res);
          if(res.status==200){
            // this.$store.commit("setLoading");
            this.navPush(res.data);
            this.getDataTwo();
          }
        }).catch(function (error) {
            console.log(error);
        });
      },
      getDataTwo ( id ) {
        let ad_data = {};
        if(id){
          // console.log("有Id")
          ad_data = {
            method: "get.user.store.list",
            cate_id: id,
            page: 0,
            page_size: 20
          };
        }else{
          // console.log("没得Id")
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
          if(res.status==200){
            this.cpylist = res.data;
          }
        }).catch(function (error) {
            console.log(error);
        });
      },
      isUlliTwoAdd ( id ) {
        this.isUlliTwo = false;
        this.getDataTwo(id);
      }
    },
    created () {
      this.getData();
    },
    mounted() {
      let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
      let topH = this.$refs.header_h.offsetHeight;
      this.height = (h - topH - 70*clientW/100)/clientW + 'rem';
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
      line-height: 0.4rem;
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
      line-height: 0.4rem;
    }

    li:active {
      color: $sss-color !important;
    }
  }

  section .el-main {
    padding: 0.05rem;

    .cpylist > li {
      display: flex;
      align-items: center;
      background-color: #fff;
      padding: 0.05rem;
      margin-bottom: 0.05rem;
      text-align: left;

      .right_msg {
        margin-left: 0.05rem;

        .p1 {
          color: #000 !important;
          font-size: 0.14rem;
        }

        .address {
          display: flex;
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
</style>
