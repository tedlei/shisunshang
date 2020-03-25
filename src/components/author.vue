<template>
  <div>
    正在授权中...
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
                var code = this.getUrlParam('code');
                var state = this.getUrlParam('state');
                let msg = {
                    method: 'login.wechat.oauth2.step2',
                    code: code,
                    referee_mobile: state,
                };
                this.$post('api/v1/user', msg)
                    .then((response) => {
                        if (response.status == 200) {
                            this.$store.commit('isLogin', response.data.token);
                            setTimeout(() => {
                                this.$router.push({
                                    path:'/'
                                })
                            }, 2000)
                        }
                    }).catch(function (error) {
                    console.log(error);
                });

            } else {
                // this.$router.replace('/')
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
