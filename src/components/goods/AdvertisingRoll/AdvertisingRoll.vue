<template>
<div class="marquee-wrap" v-if='listData'>
    <ul class="marquee-list" :class="{'animate-up': animateUp}">
      <li v-for="(item, index) in listData" :key="index">
          <!-- {{item}} -->
          <div class="listData">
              <div>
                  <img v-if="item.users.portrait" :src="item.users.portrait" alt="">
                  <img v-else src="../../../assets/img/morent.jpg" alt="">
                </div>
              <div class="fontWrap fontWrapOne">{{item.date}}，</div>
              <div class="fontWrap fontWrapOne">{{item.users.weixinname}}，购买了此商品</div>
          </div>
      </li>
    </ul>
  </div>  
</template>

<script>
    export default {
        data () {
            return {
                animateUp: false,
                listData: null,
                timer: null
            }
        },
        mounted() {
            // console.log(this.$route.query)
            this.getlistData();
            this.timer = setInterval(this.scrollAnimate, 5500);
        },
        methods: {
            getlistData(){
                let ad_data = {
                    method: "get.goods.order.history",
                    goods_id: this.$route.query.id
                };
                this.$post("/api/v1/goods", ad_data)
                    .then(res => {
                        // console.log(res)
                        this.listData = res.data;

                        })
                    .catch(function(error) {
                        console.log(error);
                    });
            },
            scrollAnimate() {
                this.animateUp = true
                setTimeout(() => {
                    this.listData.push(this.listData[0])
                    this.listData.shift()
                    this.animateUp = false
                }, 500)
            }
        },
        destroyed() {
            this.timer = null
        }   
    }
</script>
<style lang="scss" scoped>
    .marquee-wrap  {
        width: 92%;
        height: 30px;
        border-radius: 20px;
        background: rgba($color: #000000, $alpha: 0.6);
        margin: 0 auto;
        overflow: hidden;
        .marquee-list {
          li {
            width: 100%;
            height: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            padding: 0 20px;
            list-style: none;
            line-height: 30px;
            text-align: center;
            color: #fff;
            font-weight: 400;
          }
        }
        .animate-up {
          transition: all 0.5s ease-in-out;
          transform: translateY(-40px);
        }
    }
    .listData{
        display: flex;
        justify-content: left;
        align-items: center;
        >div:first-child{
            display: flex;
            justify-content: center;
            align-items: center;
            >img{
                width: 0.25rem;
                height: 0.25rem;
                margin-right:0.2rem;
                border-radius: 50%;
            }
        }
        >div:nth-child(3){
            text-align: left;
            margin-right:0.2rem;
        }
    }
</style>