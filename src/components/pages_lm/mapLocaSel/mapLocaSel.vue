<template>
  <div class="mapMain" id="mapLoca" v-if="show">
    <div class="head">
      <van-icon name="arrow-left" size="24" @click="goBack(2)" />
      <span>地图</span>
      <p></p>
    </div>
    <iframe
      id="mapPage"
      width="100%"
      height="100%"
      frameborder="0"
      src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=GSVBZ-24SYP-7RBDL-VEZDC-OTUZ5-XMF3A&referer=myapp&zoom=18"
    ></iframe>
  </div>
</template>

<script>
import $router from "../../../router";
export default {
  created() {
    //向history添加 '/map' 记录
    history.pushState(null, null, "/map");
    // 地址选择监听器
    window.addEventListener("message", this.value, false);
    //监听点击返回时
    window.addEventListener("popstate", this.back, false);
  },
  methods: {
    back() {
      this.goBack(1);
    },
    //当页面返回或选择地址时
    goBack(loc) {
      //移除监听器
      window.removeEventListener("popstate", this.back, false);
      window.removeEventListener("message", this.value, false);
      if (loc === 1 || !loc) {
        this.fun = null;
      } else if (loc === 2) {
        history.back();
      } else {
        if(loc.poiname!=='我的位置') this.fun(loc); 
        history.back();
      }
      this.show = false;
    }
  }
};
</script>   

<style lang="scss" scoped>
.mapMain {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10001;
  .head {
    height: 0.48rem;
    padding: 0 0.15rem;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999;
    span {
      font-size: 0.16rem;
      color: #0f0f0f;
    }
  }
}
</style>