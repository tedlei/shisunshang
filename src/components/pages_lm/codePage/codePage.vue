<template>
  <div class="qrCodeMax">
    <div id="qrHome" class="qrconde">
      <img src="http://test.gj.wjeys.com/public/static/vue/weixin_code.jpg" />
    </div>
  </div>
</template>

<script>
export default {};
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