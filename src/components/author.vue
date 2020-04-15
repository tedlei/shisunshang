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
            let ua = window.navigator.userAgent.toLocaleLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                 let code = this.getUrlParam('code');
                if(!code){
                    //请求微信授权,并跳转到 /WxAuth 路由
                    let appId = 'wxf730b0b04586d06f'
                    let url = 'http://m.wjeys.com/author';
                    let redirectUrl = encodeURIComponent(url);
                    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state='state'#wechat_redirect`
                }else{
                    let state = sessionStorage.getItem('state');
                    let msg = {
                        method: 'login.wechat.oauth2.step2',
                        code: code,
                        referee_mobile: state,
                    };
                    this.$post('api/v1/user', msg)
                        .then((res) => {
                            if (res.status == 200) {
                                localStorage.setItem('usertoken',res.data.token);
                                //location.href="/";
                                location.replace('/');
                                // Bus.$emit('getHot', true);

                            }
                        }).catch(function (error) {
                        console.log(error);
                    });
                }
            }else{
                let msg = {
                    method: 'login.wechat.oauth2.test',
                };
                this.$post('api/v1/user', msg)
                    .then((res) => {
                        // console.log(res);
                        if (res.status == 200) {
                            localStorage.setItem('usertoken',res.data.token);
                            console.log('授权完毕')
                            location.replace('/');
                            //location.href="/";
                            // Bus.$emit('getHot', true);
                        }
                    }).catch(function (error) {
                    console.log(error);
                });
            }
           
        },

        methods: {
            // 解析url参数并获取code
            getUrlParam: function (variable) {   //name为要获取的参数名
                var query = window.location.search.substring(1);
                var vars = query.split("&");
                for (var i=0;i<vars.length;i++) {
                        var pair = vars[i].split("=");
                        if(pair[0] == variable){return pair[1];}
                }
                return(false);
            },
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
