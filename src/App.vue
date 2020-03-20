<template>
  <div id="app" :class="{app:$route.meta.showFooter}">

    <Footer v-show="$route.meta.showFooter"></Footer>
    <router-view/>
  </div>
</template>

<script>
    import Footer from './components/footer/footer.vue';
    import Header from "./components/header/header";

    export default {
        name: 'App',
        components: {Header, Footer},
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

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  html{
    font-size: 100px;
  }
  @media screen and (max-width: 320px) {
    html{
      font-size: 80px !important;
    }
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #0f0f0f;
    font-size: 0.14rem;
  }

  a {
    text-decoration: none;
    color: #999;
  }

  ul li {
    list-style-type: none;
  }


</style>
