<template>
  <div class="mapMain" id="mapLoca" v-if="show">
    <div class="head">
      <van-icon name="arrow-left" size="24" @click="backMap" />
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
    let _this = this;
    window.addEventListener(
      "message",
      function(event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        var loc = event.data;
        if (loc && loc.module == "locationPicker") {
          //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          //   console.log(loc, 354365456);
          _this.show = false;
          if (_this.fun) {
            _this.fun(loc);
          }
          _this.fun = null;
        }
      },
      false
    );
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
  },
  methods: {
    backMap() {
      this.show = false;
      this.fun = null;
    },
    goBack() {
      window.removeEventListener("popstate", this.goBack, false);
      this.fun(false);
      this.backMap();
      //replace替换原路由，作用是避免回退死循环
    }
  }
};
</script>   

<style lang="scss" scoped>
.mapMain {
  width: 100%;
  height: 100vh;
  // padding-top:0.48rem;
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