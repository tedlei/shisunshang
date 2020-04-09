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
    import Bus from "./assets/js/bus";
    import wechatAuth from "./assets/js/wechatConfig";

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
        created() {
        },
        watch: {
            // 监听 $route 变化调用分享链接
            '$route'(to, from) {
                // console.log(1111111111111)
                let ua = window.navigator.userAgent.toLocaleLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    if (to.name != 'author') {//判断当前是否是新建的auth路由空白页面
                        let urls = location.href;
                        if (this.GetQueryString(urls)) {
                            let url = urls.split('state')[0].substring(0, urls.split('state')[0].length - 1);
                            history.pushState(null, null, url);
                        };
                        let userinfo = JSON.parse(this.$store.getters.getuserinfo)
                        if (userinfo) {
                            let shareConfig = {
                                title: '国健生态平台',
                                desc: '国健生态平台!Come on.!',
                                link: userinfo.referee_number,
                                imgUrl: 'http://gj.wjeys.com/public/up/gj_wjeys_com-2-2-20191216184918-14_106_130_91-615694.jpg',
                            };
                            let url = location.href
                            wechatAuth(url, shareConfig);
                        }
                    }
                }
            }
        },
        methods: {
            reload() {
                this.isRouterAlive = false;            //先关闭，
                this.$nextTick(function () {
                    this.isRouterAlive = true;         //再打开
                })
            },
            //    分享进来进行签名
            shareConfig: function () {
                // console.log(2222222222222)
                let ua = window.navigator.userAgent.toLocaleLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    if (this.$route.name != 'author') {//判断当前是否是新建的auth路由空白页面
                        let urls = location.href;
                        if (this.GetQueryString(urls)) {
                            let url = urls.split('state')[0].substring(0, urls.split('state')[0].length - 1);
                            history.pushState(null, null, url);
                        };
                        let userinfo = JSON.parse(this.$store.getters.getuserinfo)
                        if (userinfo) {
                            let shareConfig = {
                                title: '国健生态平台',
                                desc: '国健生态平台!Come on.!',
                                link: userinfo.referee_number,
                                imgUrl: 'http://gj.wjeys.com/public/up/gj_wjeys_com-2-2-20191216184918-14_106_130_91-615694.jpg',
                            };
                            let url = location.href
                            wechatAuth(url, shareConfig);
                        }
                    }
                }
            },
            //判断是否有state
            GetQueryString: function (name) {
                if (name.indexOf("state") >= 0) {
                    return true
                } else {
                    return false
                }
            },
            setgoindex: function () {
                if (window.history.length <= 2) {
                    if (location.href.indexOf('?') === -1) {
                        window.location.href = location.href + '?goindex=true'
                    } else if (location.href.indexOf('?') !== -1 && location.href.indexOf('goindex') === -1) {
                        window.location.href = location.href + '&goindex=true'
                    }
                }
            }
        },
        mounted() {
            this.path = this.$route.path;
            this.shareConfig();
            this.setgoindex();
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
