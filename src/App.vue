<template>
  <div id="app" :class="{app:$route.meta.showFooter}">
    <Footer v-show="$route.meta.showFooter"></Footer>
    <router-view v-if="isRouterAlive"></router-view>
    <loading v-show="$store.getters.getLoading" type="spinner"></loading>
    <div style="height: 0.7rem" v-show="$route.meta.showFooter"></div>
    <search-result></search-result>
    <rqpidNav></rqpidNav>
  </div>
</template>

<script>
    import Footer from './components/footer/footer.vue';
    import Header from "./components/header/header";
    import loading from "./components/loading/loading.vue";
    import SearchResult from "./components/children/searchResult/searchResult.vue";
    import Bus from "./assets/js/bus";
    import wechatAuth from "./assets/js/wechatConfig";
    import rqpidNav from './components/pages_lm/rapidNavigation/rapidNavigation.vue'    
    export default {
        name: 'App',
        components: {SearchResult, Header, Footer, loading,rqpidNav},
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
            this.path = this.$route.path;
        },
        created() {
        },
        watch: {
            // 监听 $route 变化调用分享链接
            '$route'(to, from) {
                // console.log(1111111111111)
                // let ua = window.navigator.userAgent.toLocaleLowerCase();
                // if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                //     if (to.name != 'author') {//判断当前是否是新建的auth路由空白页面
                //         let urls = location.href;
                //         if (this.GetQueryString(urls)) {
                //             let url = urls.split('state')[0].substring(0, urls.split('state')[0].length - 1);
                //             history.pushState(null, null, url);
                //         };
                //         let userinfo = JSON.parse(this.$store.getters.getuserinfo)
                //         if (userinfo) {
                //             let shareConfig = {
                //                 title: '国健生态平台',
                //                 desc: '国健生态平台!Come on.!',
                //                 link: location.href.split('state')[0] + (location.search ? '&' : '?') + 'state=' + userinfo.referee_number,
                //                 imgUrl: 'http://gj.wjeys.com/public/up/gj_wjeys_com-2-2-20191216184918-14_106_130_91-615694.jpg',
                //             };
                //             let url = location.href
                //             wechatAuth(url, shareConfig);
                //         }
                //     }
                // }
            }
        },
        methods: {
            parseURL(url) { 
                var a = document.createElement('a'); 
                a.href = url; 
                return { 
                    source: url, 
                    protocol: a.protocol.replace(':',''), 
                    host: a.hostname, 
                    port: a.port, 
                    query: a.search, 
                    params: (function(){ 
                        var ret = {}, 
                        seg = a.search.replace(/^\?/,'').split('&'), 
                        len = seg.length, i = 0, s; 
                        for (;i<len;i++) { 
                            if (!seg[i]) { continue; } 
                            s = seg[i].split('='); 
                            ret[s[0]] = s[1]; 
                        } 
                        return ret; 
                    })(), 
                    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1], 
                    hash: a.hash.replace('#',''), 
                    path: a.pathname.replace(/^([^\/])/,'/$1'), 
                    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1], 
                    segments: a.pathname.replace(/^\//,'').split('/') 
                }
            },
            reload() {
                this.isRouterAlive = false;            //先关闭，
                this.$nextTick(function () {
                    this.isRouterAlive = true;         //再打开
                })
            },
            //    分享进来进行签名
            shareConfig: function () {
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
                                link:  location.href.split('state')[0] + (location.search ? '&' : '?') + 'state=' + userinfo.referee_number,
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
            let userinfo = {
                method: 'get.user.info'
            }
            if(this.$route.path!='/author'){
                this.$post('/api/v1/user', userinfo)
                .then((response) => {
                    if (response.status == 200) {
                        this.$store.commit('userinfo',JSON.stringify(response.data));
                        // console.log(this.$store.getters.getuserinfo)
                        let sourceUrl = sessionStorage.getItem('sourceUrl');
                        localStorage.setItem("userinfo",JSON.stringify(response.data));
                        if(sourceUrl){
                            
                            // Bus.$emit('wechatAuth', true);
                            var data = this.parseURL(sourceUrl);
                            if(data.path == '/goodsdetails'){
                                sourceUrl = data.path+'?id='+data.params.id;
                                //this.$router.push({ path: sourceUrl})
                                location.href=sourceUrl;
                            }else{
                                sourceUrl = '/';
                                //this.$router.push({ path: sourceUrl})
                                location.href=sourceUrl;
                            }
                            sessionStorage.setItem('sourceUrl','');
                        }
                        //location.href = '/';
                    }else{
                        sessionStorage.clear();
                        localStorage.clear();
                        location.href = '/';
                    }
                }).catch(function (error) {
                    let sourceUrl = sessionStorage.getItem('sourceUrl');
                    sessionStorage.clear();
                    localStorage.clear();
                    location.href = '/';
                    console.log(error);
                });
            }
            // this.shareConfig();
            // this.setgoindex();
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
