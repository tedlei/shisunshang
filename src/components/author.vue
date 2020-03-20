<template>
  <div>
    授权页
  </div>
</template>

<script>
    export default {
        name: "author",
        data() {
            return {}
        },
        async created() {
            // 如果连接中有微信返回的 code，则用此 code 调用后端接口，向微信服务器请求用户信息
            // 如果不是从微信重定向过来的，没有带着微信的 code，则直接进入首页
            if (this.$route.query.code) {
                var code = localStorage.getItem('code');
                var state = localStorage.getItem('state');
                let msg = {
                    method: 'login.wechat.oauth2.step2',
                    code: code,
                    referee_mobile: state,
                };
                this.$post('api/v1/user', msg)
                    .then((response) => {
                        if (response.status == 200) {
                            console.log(response.data.token)
                            this.$store.commit('isLogin', response.data.token);
                            setTimeout(() => {
                                this.$router.push({
                                    path:'/#/author'
                                })
                            }, 1000)
                        }
                        console.log(response)
                    }).catch(function (error) {
                    console.log(error);
                });

            } else {
                this.$router.replace('/')
            }
            // this.login()
        },
        // computed: {
        //     listenStore() {
        //         return this.$store.getters.isLogin;
        //     }
        // },
        // watch: {
        //     listenStore: {
        //         handler(newValue, oldValue) {
        //             console.log(newValue)
        //
        //         },
        //         deep: true
        //     }
        // },
        methods: {
            login: function () {
                let _this = this;
                var code = this.getUrlParam('code');//获取url 上面的code
                if (!code) {//假如没code
                    // setTimeout(() => {
                    //     // const url = encodeURIComponent('http://m.wjeys.com/');
                    //     // const appid = 'wxf730b0b04586d06f';
                    //     // window.location.href = 'http://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + url + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
                    //      这是个自己写的授权页面处理逻辑的访问微信授权登录后微信重定向回到自己页面携带code
                    //      redirect_uri 回调地址重定向 页面的路由失效 然后就跳转不到首页了
                    // }, 5000)
                    this.getUserCode();//请求服务器获取code
                } else {
                    //使用code 去登录
                    console.log('第二步')
                    var state = this.getUrlParam('state');//获取url 上面的code
                    let msg = {
                        method: 'login.wechat.oauth2.step2',
                        code: code,
                        referee_mobile: state,
                    };
                    this.$post('api/v1/user', msg)
                        .then((response) => {
                            if (response.status == 200) {
                                _this.$store.commit('isLogin', response.data.token);
                                setTimeout(() => {
                                    //获取beforeLoginUrl，我们的前端页面
                                    let url = window.localStorage.getItem("beforeLoginUrl");
                                    console.log(url)
                                    //跳转
                                    this.$router.push(url);
                                }, 1000)
                            }
                            console.log(response)
                        }).catch(function (error) {
                        console.log(error);
                    });
                }
            },
            // 解析url参数并获取code
            getUrlParam: function (name) {   //name为要获取的参数名
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var rrr = decodeURIComponent(window.location.search);
                var r = rrr.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },

            // 请求服务器获取code 方法
            getUserCode: function () {
                const url = encodeURIComponent('http://m.wjeys.com/');
                let back_url = url;
                let referee_mobile = '';
                let msg = {
                    method: 'login.wechat.oauth2.step1',
                    back_url: back_url,
                    referee_mobile: referee_mobile,
                }
                this.$post('api/v1/user', msg)// 获取用户信息,后端可首先通过cookie,session等判断,没有信息则通过code获取
                    .then((response) => {
                        if (response.status == 200) {
                            window.location.href = response.data
                        }
                    }).catch(function (error) {
                });
            }

        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
