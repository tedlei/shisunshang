<template>
  <div style="height:100vh;" @click="test">测试</div>
</template>

<script>
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
.goodsDiv {
  display: inline-block;
  height: 300px;
  width: 50%;
  padding: 0.2rem;
  line-height: 300px;
  color: #fff;
  > div {
    border: 2px solid red;
    background-color: #121452;
  }
}
</style>