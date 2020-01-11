<template>
  <div id="app">

    <footer>
      <div class="footer_guide">
        <!--    首页导航      -->
        <router-link to="/">
          <div class="guide_item" :class="{on : '/msite'===$route.path}">
              <span class="item_icon">
                <i class="iconfont icon-home"></i>
              </span>
            <span>首页</span>
          </div>
        </router-link>
        <!--    分类导航      -->
        <router-link to="/classification">
          <div class="guide_item" :class="{on : $route.path.indexOf('/search')!=-1}">
              <span class="item_icon">
                <i class="iconfont icon-fenlei"></i>
              </span>
            <span>分类</span>
          </div>
        </router-link>
        <!--    附近商家导航      -->
        <router-link to="/store">
          <div href="javascript:;" class="guide_item" :class="{on : '/order'===$route.path}">
              <span class="item_icon">
                <i class="iconfont icon-fujin"></i>
              </span>
            <span>附近商家</span>
          </div>
        </router-link>
        <!--    购物车导航      -->
        <router-link to="/my_cart">
          <div href="javascript:;" class="guide_item" :class="{on : '/order'===$route.path}">
              <span class="item_icon">
                <i class="iconfont icon-cart"></i>
              </span>
            <span>购物车</span>
          </div>
        </router-link>
        <!--    我的导航      -->
        <router-link to="/mine">
          <div href="javascript:;" class="guide_item" :class="{on : '/profile'===$route.path}">
              <span class="item_icon">
                <i class="iconfont icon-mine"></i>
              </span>
            <span>我的</span>
          </div>
        </router-link>
      </div>

    </footer>
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
  * {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  a{
    text-decoration: none;
    color: #999;
  }

  ul li {
    list-style-type: none;
  }

  footer{
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    padding:1vh 0;
  }

  .footer_guide {
    display: flex;
    justify-content: space-around;
  }

  .guide_item {
    display: inline-block;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .item_icon {
    display: inline-block;
    i{
      display: inline-block;
      background-size: auto 200%;
    }
  }

  .icon-home {
    width: 30px;
    height: 36px;
    background: url('~@/assets/img/nav_icon.png') no-repeat;
    background-position: 0 0;
  }

  .icon-fenlei{
    width: 36px;
    height: 36px;
    background: url('~@/assets/img/nav_icon.png') no-repeat;
    background-position: -36px 0;
  }

  .icon-fujin{
    width: 25px;
    height: 36px;
    background: url('~@/assets/img/nav_icon.png') no-repeat;
    background-position: -81px 0;
  }

  .icon-cart{
    width: 36px;
    height: 36px;
    background: url('~@/assets/img/nav_icon.png') no-repeat;
    background-position: -115px 0;
  }

  .icon-mine{
    width: 25px;
    height: 36px;
    background: url('~@/assets/img/nav_icon.png') no-repeat;
    background-position: -158px 0;
  }
</style>
