<template>
  <div id="app">
    <div class="continer" v-if="!(path === '/login')">
      <footer>
        <ul>
          <li>首页</li>
          <li>分类</li>
          <li>附近商家</li>
          <li>购物车</li>
          <li>我的</li>
        </ul>
      </footer>
    </div>

    <router-view/>
  </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                path: '',
            }
        },
        beforeUpdate() {
            this.path = this.$route.path
        },
        mounted() {
            this.path = this.$route.path
        },
        watch: {
            $router(to, from) {
                this.path = to.path
            }
        }
    }
</script>

<style lang="scss" scoped>
  *{
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  ul li{
    list-style-type: none;
  }
</style>
