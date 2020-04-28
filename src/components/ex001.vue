<template>
  <div style="height:100vh;" @click="test">测试</div>
</template>

<script>
import qrcode from 'vue_qrcodes'
export default {
  data() {
    return {};
  },
  methods: {
    test() {
      this.mapLocaSel(false,res => {
        if(!res) this.$router.replace({ path: "/ex001" });
        console.log(res, 1234532135);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
    
</style>