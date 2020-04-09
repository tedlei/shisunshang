<template>
  <div class="upgl-app" :class="item.is_prohibit?'bgh':topUpNum===i?'sel':''" @click="tapSel(i,item.is_prohibit)">
      <div class="upgl_right_icon" v-if="item.is_chaozhi===1">超值</div>
      <p class="upgl_p1">{{item.name}}</p>
      <p class="upgl_p2">
          <span style="font-size:0.13rem">¥</span>
          <span style="margin-left:0.05rem">{{parseInt(item.money)}}</span>
      </p>
      <p>充值余额</p>
      <div class="upgl_cz">{{userMoney}}</div>
  </div>
</template>

<script>
  export default {
    props:['item','isShowRicon','topUpNum','i','userMoney'],
  components: {},
  data () {
    return {
      
    }
  },
  methods: {
    tapSel(i,t){
      if(t){
        this.$notify({ type: 'success', message: '您已开通此等级或之上的会员，请勿重复选择' });
        return
      }
      this.$emit('tapSel',i)
    }
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>
<style lang="scss" scoped>
.upgl-app{
    width: 30%;
    height: 1.27rem;
    margin-top: 0.13rem;
    // margin-left: 0.24rem;
    border:2px solid #E4E4E4;
    border-radius: 12px;
    background-color:#fff;
    position: relative;
    .upgl_right_icon{
        width: 0.36rem;
        height: 0.17rem;
        background:linear-gradient(270deg,rgba(253,55,62,1) 0%,rgba(254,104,87,1) 100%);
        border-top-right-radius: 8px;
        border-bottom-left-radius: 8px;
        font-size: 0.1rem;
        color: #fff;
        position: absolute;
        top: -0.085rem;
        right: 0;
    }
    .upgl_p1{
        margin-top: 0.1rem;
        font-size:0.16rem;
        font-weight:bold;
        color:rgba(51,51,51,1);
        text-align: center;
    }
    .upgl_p2{
        margin-top: 0.05rem;
        font-size: 0.25rem;
        color:$sss-color;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .upgl_cz{
        width: 0.75rem;
        height: 0.18rem;
        margin:0.1rem auto;
        margin-bottom: 0;
        background-color: $sss-color;
        border-radius: 9px;
        font-size: 0.11rem;
        color: #fff;
        text-align: center;
        line-height: 0.18rem;
    }
}
.sel{
  border-color: $sss-color;
  background-color: #FFFAF1;
}
.bgh{
  background: rgba(0,0,0,0.2);
}
</style>