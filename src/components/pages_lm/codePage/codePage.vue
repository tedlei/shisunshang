<template>
  <div class="qrCodeMax">
    <div id="qrHome" class="qrconde">
      <img v-if="Url" :src="Url" />
    </div>
  </div>
</template>

<script>
import address from '../../../../static/address';
import Bus from '../../../assets/js/bus';
export default {
    data() {
        return {
            Url: null
        }
    },
    methods:{

    },
    mounted(){
        // console.log(address)
        for(let item of address){
            // console.log(location.host)
            if(location.host==item.domain){
                this.Url = item.qrUrl;
                Bus.$emit('title',item.title);
                // console.log(this.Url)
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.qrCodeMax {
  height: 100vh;
  padding-top:0.48rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;

  .topBack {
    width: 100%;
    height: 0.48rem;
    padding: 0 0.2px;
    border-bottom: 1px solid rgb(242, 242, 242);
    position: absolute;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999;
  }
}
</style>