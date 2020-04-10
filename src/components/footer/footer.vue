<template>
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
      <router-link to="/business">
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
                <van-icon v-show="$route.path=='/my_cart'&&$store.getters.getCartNum>0" 
                name="shopping-cart" 
                color="#099000" 
                size="20" 
                :info="$store.getters.getCartNum"/>
                <van-icon v-show="$route.path=='/my_cart'&&$store.getters.getCartNum==0" 
                name="shopping-cart" 
                color="#099000" 
                size="20"/>
                <van-icon v-show="$route.path!='/my_cart'&&$store.getters.getCartNum>0" 
                name="shopping-cart-o" 
                color="#999999" 
                size="20" 
                :info="$store.getters.getCartNum"/>
                <van-icon v-show="$route.path!='/my_cart'&&$store.getters.getCartNum==0" 
                name="shopping-cart-o" 
                color="#999999" 
                size="20"/>
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
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped lang="scss">
  footer {
    width: 100%;
    height: 0.7rem;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    padding: 0 0.08rem;
    z-index: 999;
    border-top: 1px solid #f2f2f2;
    display: flex;
    align-items: center;
    span {
      color: #999999;
    }
  }

  .footer_guide {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .guide_item {
    display: inline-block;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .item_icon {
    display: inline-block;

    i {
      display: inline-block;
      background-size: auto 300%;
    }
  }

  .icon-home {
    width: 0.21rem;
    height: 0.21rem;
    background: url('../../assets/img/nav_icon.png') no-repeat;
    background-position: -0.32rem -0.42rem;
  }

  .icon-fenlei {
    width: 0.22rem;
    height: 0.21rem;
    background: url('../../assets/img/nav_icon.png') no-repeat;
    background-position: 0 -0.42rem;

  }

  .icon-fujin {
    width: 0.21rem;
    height: 0.21rem;
    background: url('../../assets/img/nav_icon.png') no-repeat;
    background-position: -0.585rem -0.42rem;
  }

  .icon-cart {
    width: 0.21rem;
    height: 0.21rem;
    background: url('../../assets/img/nav_icon.png') no-repeat;
    background-position: -0.85rem -0.42rem;
  }

  .icon-mine {
    width: 0.21rem;
    height: 0.21rem;
    background: url('../../assets/img/nav_icon.png') no-repeat;
    background-position: -1.16rem -0.42rem;
  }

  .router-link-exact-active span {
    color: #009900;
  }

  .router-link-exact-active .icon-home {
    background-position: -0.32rem 0;
  }

  .router-link-exact-active .icon-fenlei {
    background-position: 0 0;

  }

  .router-link-exact-active .icon-fujin {
    background-position: -0.585rem 0;
  }

  .router-link-exact-active .icon-cart {
    background-position: -0.85rem 0;
  }

  .router-link-exact-active .icon-mine {
    background-position: -1.16rem 0;
  }
</style>
