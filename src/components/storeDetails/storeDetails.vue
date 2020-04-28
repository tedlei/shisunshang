<template>
  <div class="content storeDetails">
    <div class="heder">
      <div>
        <div class="hederImg">
          <van-image round width="0.5rem" height="0.5rem" fit="cover" :src="shopData.thumb" />
        </div>
        <div class="hederMin">
          <p>{{shopData.shop_name}}</p>
          <div>
            <span>公告</span>
            <span>{{shopData.summary}}</span>
          </div>
        </div>
      </div>
      <div class="hederMsg">
        <div @click="isCollectionAdd">
          <van-icon v-if="isCollection==true" name="like" />
          <van-icon v-else name="like-o" />
          <span :class="isCollection?'isCollection':''">{{isCollection==true?'已关注':'关注店铺'}}</span>
        </div>
      </div>
    </div>
    <van-tabs v-model="active" color="#009900" line-width="0.9rem" @click="onClick">
      <van-tab title="全部商品" :title-style="active==0?'color: #009900;':'color: #999999;'">
        <div class="main_list">
          <div class="main_list_a">
            <van-list
              v-model="loadingAll"
              :finished="finishedAll"
              finished-text="暂无更多商品"
              @load="getDataTwo"
            >
              <waresCard :cardData="item" v-for="(item,index) of wholelist" :key="index"></waresCard>
            </van-list>
          </div>
        </div>
      </van-tab>
      <van-tab title="商品分类" :title-style="active==1?'color: #009900;':'color: #999999;'">
        <div class="main_class_list">
          <div class="classification" v-show="active==1">
            <div class="sidebar">
              <div
                :class="isBoder==n?'sidebarBoder':''"
                v-for="(item,n) of classlist"
                :key="n"
                @click="addSidebar(n , item.id)"
              >{{item.cate_name}}</div>
            </div>
            <div class="div_right">
              <div class="sorting">
                <div :class="sortingColor==1?'sortingColor':''" @click="sort(1)">综合排序</div>
                <div :class="sortingColor==2?'sortingColor':''" @click="sort(2)">销量排序</div>
                <div :class="sortingColor==3||sortingColor==4?'sortingColor':''" @click="sort()">
                  <span>价格排序</span>
                  <div class="sortYsj">
                    <img src="../../assets/img/ssj.png" alt />
                    <img src="../../assets/img/xsj.png" alt />
                  </div>
                </div>
              </div>
              <div class="div_list">
                <div class="list_abs">
									<van-list
										v-model="loadingClass"
										:finished="finishedClass"
										finished-text="暂无更多商品"
									>
										<!-- @load="getDataList" -->
                  	<waresCard :cardData="item" v-for="(item,index) of classcard" :key="index"></waresCard>
									</van-list>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="店铺详情" :title-style="active==2?'color: #009900;':'color: #999999;'">
        <div class="main_list">
          <div style="height:0.1rem;width:100%;background-color:rgb(242,242,242)"></div>
          <div class="column">
            <div>
              <span>掌柜名</span>
              <span>{{shopData.name1}}</span>
            </div>
            <div>
              <span>服务电话</span>
              <span>{{shopData.phone}}</span>
            </div>
            <div>
              <span>开店时间</span>
              <span>{{shopData.add_time}}</span>
            </div>
            <div>
              <span>店铺地址</span>
              <span>{{shopData.address}}</span>
            </div>
            <div class="columnFoter">
              <div class="font">
                <p>{{shopData.score_ms}}</p>
                <span>描述相符</span>
              </div>
              <div class="xian"></div>
              <div class="font">
                <p>{{shopData.score_fw}}</p>
                <span>服务态度</span>
              </div>
              <div class="xian"></div>
              <div class="font">
                <p>{{shopData.score_fh}}</p>
                <span>发货速度</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import waresCard from "./card/card.vue";
// import sidebars from './sidebar/sidebar'
export default {
  components: {
    waresCard: waresCard
    //   'sidebars': sidebars
  },
  data() {
    return {
      isCollection: false,
      active: 0,
      shopData: {},
      wholelist: [],
      isBoder: 0,
      classlist: [],  //商品分类
        
      
      classcard: [],
      currentTime: "12:00",

      //控制全部商品
      loadingAll: false,
			finishedAll: false,
			allSize:0,

			//控制分类商品
			loadingClass:false,
			finishedClass:false,
			classSize:0,
      sortingColor: 1, //排序方式
			// sort:1,
    };
  },
  methods: {
    getData() {
      let _id = this.$route.query.id;
      let ad_data = {
        method: "get.goods.shop.item",
        shop_id: _id
      };
      this.$post("/api/v1/GoodsCom", ad_data)
        .then(res => {
          console.log(res);
          this.shopData = res.data;
          this.shopData.phone =
            res.data.phone.slice(0, 3) +
            "*********" +
            res.data.phone.slice(res.data.phone.length - 4);
          this.isCollection = res.data.is_follow == 1 ? true : false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //收藏店铺
    isCollectionAdd() {
      this.$store.commit("setLoading");
      let _id = this.$route.query.id;
      let list = [];
      list.push(_id);
      if (!this.isCollection) {
        console.log("我是收藏");
        let ad_data = {
          method: "add.collect.shops.item",
          shop_id: _id
        };
        this.$post("/api/v1/userCollectShops", ad_data)
          .then(res => {
            console.log(res);
            if (res.status == 200) {
              this.$store.commit("setLoading");
              this.$toast.success("关注成功");
            } else {
              this.$store.commit("setLoading");
              this.$toast.fail("关注失败");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        console.log("我是取消收藏");
        let ad_data = {
          method: "del.collect.shops.list",
          id: list
        };
        this.$post("/api/v1/userCollectShops", ad_data)
          .then(res => {
            console.log(res);
            if (res.status == 200) {
              this.$store.commit("setLoading");
              this.$toast.success("取消关注");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      // this.$store.commit('setLoading');
      this.isCollection = !this.isCollection;
    },

    onClick(name, title) {
      // console.log(title)
      if (title == "商品分类") {
        
        this.getDataList(0);
      }
    },

    //全部商品
    getDataTwo() {
			let _id = this.$route.query.id;
			let {allSize,wholelist} = this
      let ad_data = {
        method: "get.shop.goods.list",
        shop_id: _id,
				cate_id: "0",
				size:allSize,
				page_size:10
			};
      this.$post("/api/v1/goods", ad_data)
        .then(res => {
					let list = res.data;
					this.allSize += list.length;
					this.wholelist =wholelist.concat(list);
					if(list.length<10||this.wholelist.length<10){
						this.finishedAll = true
					}
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //分类
    getDataClass() {
      let _id = this.$route.query.id;
      let ad_data = {
        method: "get.shop.goods.category.list",
        shop_id: _id
      };
      this.$post("/api/v1/GoodsCategory", ad_data)
        .then(res => {
          this.classlist = [{ cate_name: "全部商品" }];
          for (var i in res.data) {
            this.classlist.push({
              cate_name: res.data[i].cate_name,
              id: res.data[i].id
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
		},
		
		//点击分类时
    addSidebar(n, id) {
      this.isBoder = n;
      this.getDataList(id,true);
		},
		
		//点击排序
		sort(num){
			if(num)	this.sortingColor = num;
			else this.sortingColor = this.sortingColor===3?4:3;
			// this.classcard = [];
			this.getDataList(this.classid,true);
		},

    //获取分类商品
    getDataList(classid,boo) {
			let _id = this.$route.query.id;
			let {classSize,classcard,sortingColor} = this;
      let ad_data = {
				method: "get.shop.goods.list",
        shop_id: _id,
        cate_id: classid?classid:0,
        page: classSize,
				page_size: 10,
				sort:sortingColor
      };
			if(boo){
				this.classSize = 0;
				ad_data.page = 0;
				classcard = []
				this.classcard = [];
				this.finishedClass = false;
			}
      this.$post("/api/v1/Goods", ad_data)
        .then(res => {
					let list = res.data;
					this.loadingClass = false
					this.classSize = list.length;
					this.classcard = classcard.concat(list);
					console.log(this.classcard.length)
					if(list.length<10||this.classcard<10){
						this.finishedClass = true;
					}
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.getData();
    this.getDataClass();
  },
  computed: {},
  watch: {}
};
</script>

<style lang="scss">
.storeDetails {
  overflow: hidden;
  .van-tabs {
		flex: 1;
		display: flex;
		flex-direction: column;
    .van-tabs__content {
			flex: 1;
      .van-tab__pane {
        height: 100%;
        .main_list {
          height: 100%;
          position: relative;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          .main_list_a {
            width: 100%;
						height: 100%;
            position: absolute;
          }
          .column {
            background-color: #fff;
            text-align: left;
            > div {
              padding: 0.07rem 0.2rem;
              border-bottom: 1px solid rgb(242, 242, 242);
            }
            > div:last-child {
              border: 0;
            }
            > div > span {
              line-height: 0.35rem;
              color: #999999;
            }
            > div > span:first-child {
              display: inline-block;
              width: 0.85rem;
            }
            .columnFoter {
              display: flex;
              margin-top: 0.2rem;
              color: #999999;
              align-items: center;
              .font {
                width: 33%;
                text-align: center;
                > p {
                  color: #009900;
                }
              }
              .xian {
                width: 2px;
                height: 25px;
                background: rgb(242, 242, 242);
              }
            }
          }
        }
        .main_class_list {
          height: 100%;
          .classification {
            display: flex;
            height: 100%;
            // width: 100%;
            .sidebar {
              width: 100px;
              height: 100%;
              line-height: 0.45rem;
              background-color: #f2f2f2;
              font-size: 0.13rem;
              > div {
                padding: 0 0.1rem;
                border-bottom: 1px solid #cccccc;
                border-left: 3px solid #f2f2f2;
                box-sizing: border-box;
              }
              .sidebarBoder {
                border-left: 3px solid $sss-color;
                color: $sss-color;
              }
            }
            .div_right {
              flex: 1;
              background-color: #fff;
              display: flex;
              flex-direction: column;
              .sorting {
                display: flex;
                justify-content: space-around;
                padding-left: 0.1rem;
                line-height: 0.4rem;
                color: #999999;
                > div {
                  display: flex;
                  align-items: center;
                  img {
                    margin-left: 0.05rem;
                    width: 0.08rem;
                    height: 0.08rem;
                  }
                  .sortYsj {
                    > img {
                      display: block;
                    }
                  }
                }
                .sortingColor {
                  color: $sss-color;
                }
              }
              .div_list {
                // background: #000;
                flex: 1;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                position: relative;
                .list_abs {
									width: 100%;
                  position: absolute;
									.van-list{
										// padding-bottom: 1rem;
									}
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.storeDetails {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: fixed;
  .heder {
    width: 100%;
    height: 1.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.1rem;
    color: #fff;
    background-image: url("../../assets/img/bjtt.jpg");
    > div:first-child {
      display: flex;
      justify-content: center;
      align-items: center;
      .hederMin {
        padding: 0 0.1rem 0 0.1rem;
        text-align: left;
        p {
          padding-bottom: 0.13rem;
          font-size: 0.13rem;
        }
        div {
          white-space: nowrap;
          display: flex;
          align-content: center;
          span {
            display: inline-block;
            font-size: 0.12rem;
          }
          > span:first-child {
            background-color: #009900;
            padding: 0 0.06rem;
            border-radius: 5px;
            margin-right: 0.07rem;
          }
          > span:nth-child(2) {
            width: 1.2rem;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .hederMsg {
      display: flex;
      align-items: center;
      .hederMsgIco {
        width: 0.2rem;
        height: 0.2rem;
        background: #cccccc;
        border-radius: 50%;
        margin-right: 0.05rem;
        > img {
          width: 0.15rem;
          height: 0.15rem;
          margin-bottom: 0.01rem;
        }
      }
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.1rem;
        background-color: #009900;
        line-height: 0.25rem;
        border-radius: 20px;
        width: 0.8rem;
        .isCollection {
          margin-left: 0.08rem;
        }
      }
    }
  }
  .main {
    width: 100%;
    flex: 1;
  }
}
</style>
