<template>
  <!--  空  -->
  <div class="none_store" v-show="isempty" :style="{'height':height}">
    <div>
      <img src="../../../assets/img/nostore.png">
      <p>没有收藏的商品|店铺</p>
      <pre>去商城转转吧</pre>
      <div class="tolink">
        <router-link to="/classification">去商城逛逛</router-link>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "empty",
        props: {
            isempty: {
                type: Boolean,
                default: ''
            },
        },
        data() {
            return {
                height: '',
            }
        },
        mounted() {
            this.height = ((document.documentElement.clientHeight || document.body.clientHeight) - 43) + 'px';
        }
    }
</script>

<style scoped lang="scss">
  .none_store {
    display: flex;
    align-items: center;
    background-color: #fff;

    img {
      width: 33.333%;
      margin: 50px;
    }

    pre {
      color: #999999;
      margin: 10px 0 20px 0;
    }

    .tolink {
      line-height: 50px;
      border-radius: 50px;
      background-color: #009900;
      color: #fff;
      width: 40%;
      margin: 0 auto;
    }
  }
</style>
