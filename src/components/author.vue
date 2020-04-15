<template>
  <div style="height: 100%;background-color: #fff">
    <img src="../assets/img/kai.jpg">
  </div>
</template>

<script>
    import Bus from "../assets/js/bus";

    export default {
        name: "author",
        data() {
            return {}
        },
        created() {
            let token = localStorage.getItem('token');
            if (!token) {
                // 如果连接中有微信返回的 code，则用此 code 调用后端接口，向微信服务器请求用户信息
                // 如果不是从微信重定向过来的，没有带着微信的 code，则直接进入首页
                if (this.$route.query.code) {
                    let code = this.getUrlParam('code');
                    let state = this.getUrlParam('state');
                    let msg = {
                        method: 'login.wechat.oauth2.step2',
                        code: code,
                        referee_mobile: state,
                    };
                    this.$post('api/v1/user', msg)
                        .then((response) => {
                            if (response.status == 200) {
                                this.$store.commit('isLogin', response.data.token);
                                Bus.$emit('getHot', true);
                                //获取用户信息并存储
                                let userinfo = {
                                    method: 'get.user.info'
                                }
                                this.$post('/api/v1/user', userinfo)
                                    .then((response) => {
                                        if (response.status == 200) {
                                            let sourceUrl = localStorage.getItem('sourceUrl');
                                            this.$store.commit('userinfo', JSON.stringify(response.data));
                                            Bus.$emit('wechatAuth', true);
                                            setTimeout(() => {
                                                this.$router.push({
                                                    path: sourceUrl
                                                })
                                            }, 2000);

                                            // let phone = JSON.parse(store.getters.getuserinfo).phone;
                                            // if (!phone) {
                                            //   Dialog({
                                            //     message: '去绑定手机号码',
                                            //   }).then(() => {
                                            //     router.push({
                                            //       path: '/set/set-phone'
                                            //     })
                                            //   });
                                            // }
                                        }
                                    }).catch(function (error) {
                                    console.log(error);
                                });
                            }
                        }).catch(function (error) {
                        console.log(error);
                    });

                } else {
                    this.$router.replace('/')
                }
            } else {
                Bus.$emit('getHot', true);
                this.$router.replace('/')
            }


        },

        methods: {
            // 解析url参数并获取code
            getUrlParam: function (name) {   //name为要获取的参数名
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var rrr = decodeURIComponent(window.location.search);
                var r = rrr.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },


        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
