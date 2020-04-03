<template>
  <div id="app" :class="{app:$route.meta.showFooter}">

    <Footer v-show="$route.meta.showFooter"></Footer>
    <router-view v-if="isRouterAlive"></router-view>
    <loading v-show="$store.getters.getLoading"></loading>
    <div style="height: 0.7rem" v-show="$route.meta.showFooter"></div>
    <search-result></search-result>
  </div>
</template>

<script>
    import Footer from './components/footer/footer.vue';
    import Header from "./components/header/header";
    import loading from "./components/loading/loading";
    import SearchResult from "./components/children/searchResult/searchResult";
    import wechatAuth from "./assets/js/wechatConfig";
    import Bus from "./assets/js/bus";

    export default {
        name: 'App',
        components: {SearchResult, Header, Footer, loading},
        provide() {
            return {
                reload: this.reload
            }
        },
        data() {
            return {
                path: '',
                isRouterAlive: true
            }
        },
        beforeUpdate() {
            this.path = this.$route.path
        },
        methods: {
            reload() {
                this.isRouterAlive = false;            //先关闭，
                this.$nextTick(function () {
                    this.isRouterAlive = true;         //再打开
                })
            },

        },
        mounted() {
            this.path = this.$route.path;
            Bus.$on('wechatAuth', (data) => {
                if (data == true) {
                    let shareConfig = {
                        title: this.$router.name,
                        desc: '欢迎光临欢迎光临欢迎光临欢迎光临',
                        link: JSON.parse(this.$store.getters.getuserinfo).referee_number,
                        imgUrl: '',
                    };
                    wechatAuth('first',shareConfig);
                }
            });

        },
    }
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  body, html {
    background-color: #f2f2f2;
  }


  html {
    font-size: 100px;
    height: 100%;
  }

  @media screen and (max-width: 320px) {
    html {
      font-size: 80px !important;
    }
  }

  body {
    height: 100%;
  }

  #app {
    height: 100%;
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
