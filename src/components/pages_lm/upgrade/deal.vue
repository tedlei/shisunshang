<template>
  <div class="deal_app" v-if="value">
    <div style="line-height:0.23rem;text-align:left;padding:0 0.1rem;" v-html="value"></div>
  </div>
</template>

<script>
import Bus from '../../../assets/js/bus.js'
export default {
  data() {
    return {
        value:'',
        topUpNum:'',
        num:'',
        autoHmoney:true
    };
  },
  created() {
    let {topUpNum,autoHmoney,num} = this.$route.query;
    this.topUpNum = topUpNum;
    this.autoHmoney = autoHmoney;
    this.num = num;
    this.getData();
  },
  methods: {
    getData() {
      let ad_data = {
        method: this.num===1?"get.upgrade.service.item":"get.upgrade.privacy.item"
      };
      // get.upgrade.privacy.item
      this.$post("/api/v1/news", ad_data)
        .then(res => {
          this.value = res.data.content;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  beforeDestroy(){
    Bus.$emit('upgr',{topUpNum:this.topUpNum,autoHmoney:this.autoHmoney});
  }
};
</script>

<style lang="scss" scoped>
.deal_app {
  width: 100%;
  padding-top: 0.5rem;
  background-color: #fff;
  // .title {
  //   font-size: 0.18rem;
  //   font-weight: 600;
  //   line-height: 0.3rem;
  //   color: #000;
  //   text-align: center;
  // }
  // .deal_v {
  //   line-height: 0.3rem;
  //   font-size: 0.14rem;
  //   text-align: center;
  // }
}
</style>