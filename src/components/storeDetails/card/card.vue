<template>
    <div>
        <router-link :to="{path:'/goodsdetails',query:{id: cardData.id}}">
        <div class="commodities">
            <div class="commoditiesImg">
                <van-image
                  width="0.8rem"
                  height="0.8rem"
                  fit="cover"
                  :src="cardData.imgsrc"
                />
            </div>
            <div class="commoditiesContent">
                <div>
                    {{cardData.name}}
                </div>
                <div>
                    <div>
                        <span class="commoditiesMsg">￥
                            {{cardData.price}}
                        </span>
                        <!-- <span class='commoditiesMsgs'>￥
                            {{cardData.line_price}}
                        </span> -->
                    </div>
                    <!-- <div class="commoditiesStepper">
                        <van-icon name="plus" />
                    </div> -->
                </div>
            </div>
        </div>
        <!-- 分割线 -->
        <van-divider />
        </router-link>
    </div>
</template>

<script>
  export default {
  components: {},
  props:[
      "cardData"
  ],
  data () {
    return {
      
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
    .commodities{
        margin-top: 0.1rem;
        padding: 0 0.1rem;
        display: flex;
        align-items: center;
        .commoditiesContent{
            margin-left: 0.1rem;
            >div:first-child{
                text-align: left;
                margin-bottom: 0.1rem;
                overflow:hidden; 
                text-overflow:ellipsis;
                display:-webkit-box; 
                -webkit-box-orient:vertical;
                -webkit-line-clamp:2; //超出几行显示
            }
            >div:nth-child(2){
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                .commoditiesMsg{
                    color: #009900;
                    font-size: 0.16rem;
                }
                .commoditiesMsgs{
                    color: #999999;
                    text-decoration: line-through;
                    font-size: 0.12rem;
                }
                .commoditiesStepper{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 0.05rem;
                    width: 0.2rem;
                    height: 0.2rem;
                    background-color: #009900;
                    border-radius: 50%;
                    color: #fff;
                    font-size: 0.12rem;
                }
            }
            
        }
    }
</style>