<template>
  <div class="shop">
      <div class="shopHeder">
          <div class="shopHederImg"></div>
          <div class="shopHederName">
            <p>
                {{$store.state.cart.getshops.name}}
            </p>
              <span>综合评分</span>
              <span class="shopHederNameS">
                {{$store.state.cart.getshops.score_zh}}
              </span>
          </div>
      </div>
      <div class="min">
          <div class="minOne" v-for="(item,n) of minlist" :key="n">
              <p>{{item.num}}</p>
              <p>{{item.tiele}}</p>
          </div>
          <div class="msg">
              <div>
                  <span>描述相符</span>
                  <span class="shopHederNameS">
                {{$store.state.cart.getshops.score_ms}}
                  </span>
              </div>
              <div>
                  <span>服务态度</span>
                  <span class="shopHederNameS">
                {{$store.state.cart.getshops.score_fw}}

                  </span>
              </div>
              <div>
                  <span>发货速度</span>
                  <span class="shopHederNameS">
                {{$store.state.cart.getshops.score_fh}}

                  </span>
              </div>
          </div>
      </div>
      <div class="footer">
            <div @click="isCollectionAdd">
                <div class="footerImg">
                    <van-icon v-if="isCollection" name="like" />
                    <van-icon v-else name="like-o" />
                </div>
                <div>收藏店铺</div>
            </div>
            <div>
                <router-link :to="{path:'/storeDetails',query:{id:$store.state.cart.getshops.id}}">
                    <div class="storeDetails">
                        <div class="footerImgS">
                            <img class="footerImgShop" src="../../../assets/img/shop.png" alt="#">
                        </div>
                        <div>进入店铺</div>
                    </div>
                </router-link>
            </div>
      </div>
  </div>
</template>

<script>
  export default {
  components: {
      
  },
  props: [
  ],
  data () {
    return {
      minlist: [ {num: "32", tiele: "全部商品"}, {num: "41", tiele: "关注人数"}],
      isCollection: false,
    }
  },
  methods: {
    isCollectionAdd () {
        this.$store.commit('setLoading');
        let _id = this.$store.state.cart.getshops.id;
        let list = [];
        list.push(_id);
        if(!this.isCollection){
            console.log("我是收藏")
            let ad_data = {
            method: 'add.collect.shops.item',
            shop_id: _id
            };
            this.$post('/api/v1/userCollectShops', ad_data)
            .then((res) => {
              console.log(res)
              if(res.status==200){
                this.$store.commit('setLoading');
              }else{
                this.$store.commit('setLoading');
                this.$toast.fail('关注失败');
              }
            }).catch(function (error) {
                console.log(error);
            });
        }else{
            console.log("我是取消收藏")
            let ad_data = {
            method: 'del.collect.shops.list',
            id: list
            };
            this.$post('/api/v1/userCollectShops', ad_data)
            .then((res) => {
                console.log(res)
                if(res.status==200){
                    this.$store.commit('setLoading');
                }
              
            }).catch(function (error) {
                console.log(error);
            });
        }
        // this.$store.commit('setLoading');
        this.isCollection = !this.isCollection;
    },
  },
  created () {
        // console.log(this.$store.state.cart.getshops.is_follow)
        this.isCollection = this.$store.state.cart.getshops.is_follow == 0 ? false:true; 
  },
  updated () {
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>
<style lang="scss" scoped>
    .shop{
        padding: 0.1rem;
        background-color: #fff;
        margin-bottom: 0.1rem;
        .shopHeder{
            display: flex;
            align-items: center;
            .shopHederImg{
                width: 1rem;
                height: 0.5rem;
                background-color: wheat;
                border-radius: 10px;
            }
            .shopHederName{
                margin: 0 0.1rem;
                >P:first-child{
                    overflow:hidden; 
                    text-overflow:ellipsis;
                    display:-webkit-box; 
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:1;
                }
                span{
                    font-size: 0.12rem;
                    color:  #999;
                }
                .shopHederNameS{
                    color: #009900;
                }
            }
        }
        .min{
            display: flex;
            align-items: center;
            margin: 0.1rem 0;
            .minOne{
                width: 34%;
                p{
                    border-right: 1px solid #e1e1e1;
                }
                p:nth-child(2){
                    color: #999999;
                }
            }
            .msg{
                width: 32%;
                line-height: 0.25rem;
                span{
                    color:  #999;
                }
                .shopHederNameS{
                    color: #009900;
                }
            }
        }
        .footer{
            display: flex;
            justify-content: space-around;
            >div{
                line-height: 0.3rem;
                border: 1px solid #e1e1e1;
                border-radius: 30px;
                padding: 0 0.25rem;
                margin: 0 0.2rem;
                display: flex;
                align-items: center;
                >div:nth-child(2){
                    color: #999;
                }
                .footerImg{
                    padding: 0.05rem 0.05rem 0 0;
                    
                }
                .storeDetails{
                    display: flex;
                    align-items: center;
                    color: #999999;
                }
                .footerImgS{
                    margin-right: 0.03rem;
                    .footerImgShop{
                        width: 0.14rem;
                        height: 0.14rem;
                    }
                }
            }
            
        }
    }
</style>