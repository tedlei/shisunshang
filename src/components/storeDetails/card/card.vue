<template>
    <div>
        <div class="commodities">
            <div class="commoditiesImg">
                <van-image
                  width="0.8rem"
                  height="0.8rem"
                  fit="cover"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
            </div>
            <div class="commoditiesContent">
                <div>瀑布流滚动加载，用于展示长列表，当11111列表即将滚动到底部时，会触发事件并加载更多列表项。</div>
                <div>
                    <div>
                        <span class="commoditiesMsg">￥9.90</span>
                        <span class='commoditiesMsgs'>￥15.87</span>
                    </div>
                    <!-- <div class="commoditiesStepper">
                        <van-icon name="plus" />
                    </div> -->
                </div>
            </div>
        </div>
        <!-- 分割线 -->
        <van-divider />
    </div>
</template>

<script>
  export default {
  components: {},
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