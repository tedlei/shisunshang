<template>
    <div class="content storeDetails">
        <div class="heder">
            <div>
                <div class="hederImg">
                    <!-- <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt=""> -->
                    <van-image
                      round
                      width="0.5rem"
                      height="0.5rem"
                      fit="cover"
                      src="https://img.yzcdn.cn/vant/cat.jpeg"
                    />
                </div>
                <div class="hederMin">
                    <p>中级天合（重庆）信息</p>
                    <div>
                        <span>公告</span>
                        <span>专营电器的物美价廉111111111</span>
                    </div>
                </div>
            </div>
            <div class="hederMsg">
                <div class="hederMsgIco">
                    <img src="../../assets/img/fx.png" alt="">
                </div>
                <div class="hederMsgIco">
                    <img src="" alt="">
                </div>
                <div @click="isCollection=!isCollection">
                    <van-icon v-if="isCollection==true" name="like" />
                    <van-icon v-else name="like-o" />
                    <span :class="isCollection?'isCollection':''">{{isCollection==true?'已收藏':'收藏店铺'}}</span>
                </div>
            </div>
        </div>
        <!-- Tab -->
        <van-tabs v-model="active" color="#009900" line-width="0.9rem">
            <van-tab title="全部商品" :title-style="active==0?'color: #009900;':'color: #999999;'">
              <div class="sort">
                <div>
                    <span>综合</span>
                    <img src="../../assets/img/xsj.png" alt="">
                </div>
                <div>
                    <span>销量</span>
                    <div class="sortYsj">
                        <img src="../../assets/img/ssj.png" alt="">
                        <img src="../../assets/img/xsj.png" alt="">
                    </div>
                </div>
                <div>
                    <span>价格</span>
                    <div class="sortYsj">
                        <img src="../../assets/img/ssj.png" alt="">
                        <img src="../../assets/img/xsj.png" alt="">
                    </div>
                </div>
                <div class="screen">
                    <span>筛选</span>
                    <img src="../../assets/img/sx.png" alt="">
                </div>
              </div>
              <waresCard></waresCard>
              <div style="color:#999;">暂无更多商品</div>
            </van-tab>
            <van-tab title="商品分类" :title-style="active==1?'color: #009900;':'color: #999999;'">

            </van-tab>
            <van-tab title="店铺详情" :title-style="active==2?'color: #009900;':'color: #999999;'">
                <!-- column -->
                    <div class="column">
                    <div>
                        <span>掌柜名</span>
                        <span>美的旗舰店</span>
                    </div>
                    <div>
                        <span>服务电话</span>
                        <span>400-8888-8888</span>
                    </div>
                    <div>
                        <span>开店事件</span>
                        <span>3年 3月 3天</span>
                    </div>
                    <div>
                        <span>店铺地址</span>
                        <span>重庆市 巴南区 南泉路</span>
                    </div>
                    <div class="columnFoter">
                    <div>
                        <p>5.00</p>
                        <span>描述相符</span>
                    </div>
                     <div>
                        <p>5.00</p>
                        <span>服务态度</span>
                    </div>
                     <div>
                        <p>5.00</p>
                        <span>发货速度</span>
                    </div>
                    </div>
                    </div>
            </van-tab>
        </van-tabs>
        <!-- 商品分类 -->
        <div class="classification" v-show='active==1'>
            <div>
                <sidebars></sidebars>
            </div>
            <div>
                <div class="sorting">
                    <div :class="sortingColor==0?'sortingColor':''" @click="sortingColor = 0">综合排序</div>
                    <div :class="sortingColor==1?'sortingColor':''" @click="sortingColor = 1">销量排序</div>
                    <div :class="sortingColor==2?'sortingColor':''" @click="sortingColor = 2">
                        <span>价格排序</span>
                        <div class="sortYsj">
                            <img src="../../assets/img/ssj.png" alt="">
                            <img src="../../assets/img/xsj.png" alt="">
                        </div>
                    </div>
                </div>
                <div>
                    <waresCard></waresCard>
                </div>

            </div>
        </div>
        <!-- <div class="selectionBox">
            <div>
                <van-icon name="shopping-cart-o" size="0.3rem"/>
                <span>购物车为空</span>
            </div>
            <div class="">去结算</div>
        </div> -->
    </div>
</template>

<script>
    import waresCard from './card/card'
    import sidebars from './sidebar/sidebar'
  export default {
  components: {
      'waresCard': waresCard,
      'sidebars': sidebars
  },
  data () {
    return {
      isCollection: false,
      active: 1,
      sortingColor: 0
    }
  },
  methods: {

  },
  computed: {

  },
  watch: {

  }
}
</script>
<style lang="scss" scoped>
    .storeDetails{
        // position: fixed;
        min-height:100vh;
        display: flex;
        flex-direction: column;
        background-color: #fff;
    }
    .heder{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.3rem 0.1rem;
        color: #fff;
        background-image: url('../../assets/img/bjtt.jpg');
        >div:first-child{
            display: flex;
            justify-content: center;
            align-items: center;
            .hederMin{
                padding: 0 0.1rem 0 0.1rem;
                text-align: left;
                p{
                    padding-bottom: 0.13rem;
                    font-size: 0.13rem;
                }
                div{
                    white-space: nowrap;
                    display: flex;
                    align-content: center;
                    span{
                        display: inline-block;
                        font-size: 0.12rem;
                    }
                    >span:first-child{
                        background-color: #009900;
                        padding: 0 0.06rem;
                        border-radius: 5px;
                        margin-right: 0.07rem;
                    }
                    >span:nth-child(2){
                        width: 1.2rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
        .hederMsg{
            display: flex;
            align-items: center;
            .hederMsgIco{
                width: 0.20rem;
                height: 0.20rem;
                background: #cccccc;
                border-radius: 50%;
                margin-right: 0.05rem;
                >img{
                    width: 0.15rem;
                    height: 0.15rem;
                    margin-bottom: 0.01rem;
                }
            }
            >div:nth-child(3){
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.1rem;
                background-color: #009900;
                line-height: 0.25rem;
                border-radius: 20px;
                width: 0.8rem;
                .isCollection{
                    margin-left: 0.08rem;
                }
            }
        }
    }
    .sort{
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #999999;
        line-height: 0.4rem;
        >div{
            display: flex;
            align-items: center;
            img{
                margin-left: 0.05rem;
                width: 0.08rem;
                height: 0.08rem;
            }
            .sortYsj{
                >img{
                    display: block;
                }
            }

        }
        .screen{
            img{
                width: 0.2rem;
                height: 0.2rem;
            }
        }

    }
    .classification{
        flex: 1;
        display: flex;
        >div:first-child{
            width: 21%;
        }
        >div:nth-child(2){
            width: 79%;
            background-color: #fff;
            .sorting{
                display: flex;
                justify-content: space-around;
                padding-left: 0.1rem;
                line-height: 0.4rem;
                color: #999999;
                >div{
                    display: flex;
                    align-items: center;
                    img{
                        margin-left: 0.05rem;
                        width: 0.08rem;
                        height: 0.08rem;
                    }
                    .sortYsj{
                        >img{
                            display: block;
                        }
                    }
                }
                .sortingColor{
                    color: $sss-color;
                }
            }
        }
    }
    .column{
        margin-top: 0.1rem;
        padding: 0.1rem;
        background-color: #fff;
        text-align: left;
        >div>span{
            line-height: 0.35rem;
            color: #999999;
        }
        >div>span:first-child{
            display: inline-block;
            width: 0.85rem;
        }
        .columnFoter{
            display: flex;
            margin-top: 0.2rem;
            color: #999999;
            >div{
                width: 33%;
                text-align: center;
                >p{
                    color: #009900;
                }
            }
        }
    }
    .selectionBox{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 0.7rem;
        background-color: #f2f2f2;
        display: flex;
        justify-content:space-between;
        font-size: 0.18rem;
        color: #9e9e9e;
        >div:first-child{
            margin-left: 0.1rem;
            display: flex;
            align-items: center;
            >span{
                padding-left: 0.11rem;
            }
        }
        >div:nth-child(2){
            line-height: 0.7rem;
            background: #e6e6e6;
            width: 1.2rem;
        }
    }
</style>
