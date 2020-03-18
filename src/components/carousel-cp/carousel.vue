<template>
  <el-carousel :interval="4000" type="card" :height="boxHeight+'px'" :autoplay="false">
    <el-carousel-item v-for="(item,index) in bannerlists" :key="index">
      <img :src="require(`../../assets/img/${item}.png`)" ref="imgSize">
    </el-carousel-item>
  </el-carousel>
</template>
<script>
  const CARD_SCALE = 0.5;
  export default {
    name: "carousel",
    props: ['hmsg'],
    data() {
      return {
        boxHeight:'',
        bannerlists:[]
      }
    },
    methods: {

    },
    mounted() {

      let pros_data = this.hmsg
      if(pros_data == '首页'){
        this.bannerlists = ['home_banner','home_banner','home_banner','home_banner','home_banner','home_banner','home_banner',]
      }
      setTimeout(() => {
        console.log(this.$refs.imgSize[0].height)
        this.boxHeight = this.$refs.imgSize[0].height;
      },100)

      // this.$nextTick(() => {
      //   this.boxHeight = this.$refs.imgSize[0].height * 1.5;
      // })
    }
  }
</script>

<style scoped lang="scss">
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 100px;
    margin: 0;
  }


  .el-carousel__item:nth-child(2n) {

  }

  .el-carousel__item:nth-child(2n+1) {

  }

  element.style {
    transform: translateX(-39.44px) scale(0.83)
  }
</style>
