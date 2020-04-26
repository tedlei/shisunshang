<template>
  <div class="overlay">
    <div class="overlayDiv">
      <van-loading type="spinner" size="24px" color="#fff" vertical>
        <span class="loading">
          加载中...
        </span>
      </van-loading>
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

  },
  computed: {

  },
  watch: {

  }
}
</script>
<style lang="scss" scoped>
    .overlay{
      position: fixed;
      top: 0;
      min-width: 100vw;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 99999999;
    }
    .overlayDiv{
      background-color: rgba(0, 0, 0, 0.4);
      padding: 0.1rem;
      border-radius: 10px;
    }
    .loading{
      color: #fff;
    }
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
</style>
