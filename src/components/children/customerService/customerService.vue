<template>
  <div class="content">
    <div class="card">
      <div>
        <div>
          <van-image
            width="0.8rem"
            height="0.8rem"
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
        <div>
          <div class="fontWrap fontWrapTwo">
          </div>
          <div class="Specifications">
            <div class="fontWrap fontWrapOne">规格：默认
            </div>
            <div>数量:

            </div>
          </div>
        </div>
      </div>
      <router-link :to="{path:'/goodsdetails/applicationcs',query:{id: '1'}}">
          申请售后
      </router-link>
    </div>
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
    getData () {
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
    },
  },
  created(){
    // this.getData();
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>
<style lang="scss" scoped>
  .card{
    padding: 0.05rem 0.1rem;
    margin-top: 0.05rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    >div:first-child{
      display: flex;
      align-items: center;
      width: 85%;
      >div:nth-child(2){
        width: 100%;
        margin: 0 0.05rem;
        text-align: left;
        .Specifications{
          margin-top: 0.1rem;
          font-size: 0.12rem;
          display: flex;
          color: #999999;
          >div:first-child{
            width: 50%;
          }
        }
        >div:first-child{
          height: 0.4rem;
        }
      }
    }
    a{
      width: 0.7rem;
      color: $sss-color !important;
      border: 1px solid $sss-color;
      border-radius: 10px;
    }
  }
</style>