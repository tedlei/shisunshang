<template>
  <div>
    <div class="list_box">
      <ul class="set_list">
        <li v-for="(item,index) in msglists" :key="index" @click="set(item.left)">
          <div class="left">{{item.left}}</div>
          <div class="right">
              {{index==3?user.level_name:''}}
            <img :src="item.right" v-if="index==0"/>
            <span v-else>{{item.right}}</span>
            <i class="el-icon-arrow-right" v-show="index!=1&&index!=0&&index!==2"></i>
          </div>
        </li>
      </ul>
    </div>
    <!--  退出登录  -->
    <!-- <div class="loginout">退出登录</div> -->
  </div>
</template>

<script>
    export default {
        name: "set",
        data() {
            return {
                user: {},
                msglists: [
                    {
                        left: "头像",
                        right: JSON.parse(this.$store.getters.getuserinfo).portrait
                    },
                    {
                        left: "真实姓名",
                        right: JSON.parse(this.$store.getters.getuserinfo).name
                    },
                    {
                        left: "微信昵称",
                        right: JSON.parse(this.$store.getters.getuserinfo)
                            .weixinname
                    },
                    {
                        left: "等级",
                        right: "",
                    },

                    {
                        left: "实名认证",
                        right: JSON.parse(this.$store.getters.getuserinfo).auth_state == 1 ? '已认证' : '未认证'
                    },
                    {
                        left: "收货地址管理",
                        right: ""
                    },
                    {
                        left: "绑定手机",
                        right: JSON.parse(this.$store.getters.getuserinfo).phone
                    },
                    {
                        left: "设置支付密码",
                        right: JSON.parse(this.$store.getters.getuserinfo).is_set_paypassword == 1 ? '已设置' : '未设置'
                    },
                    {
                        left: "绑定银行卡",
                        right: ""
                    },

                    {
                        left: "清除缓存",
                        right: ""
                    },

                    {
                        left: "反馈中心",
                        right: ""
                    }
                ]
            };
        },
        computed: {
            // userinfo() {
            //   return JSON.parse(this.$store.getters.getuserinfo);
            // }
        },
        methods: {
            set: function (e) {
                switch (e) {
                    case "绑定银行卡":
                        this.$router.push({
                            path: "/set/Bank-card"
                        });
                        break;
                    case "等级":
                        this.$router.push({
                            path: "/set/Grade"
                        });
                        break;
                    case "实名认证":
                        if (JSON.parse(this.$store.getters.getuserinfo).auth_state == 0) {
                            this.$router.push({
                                path: "/mine/certification"
                            })
                        } else {
                            this.$toast("此账号已认证");
                        };
                        break;
                    case "设置支付密码":
                        this.getUserrzxx(2);
                        break;
                    case "绑定手机":
                        this.getUserrzxx(1);
                        break;
                    case "收货地址管理":
                        this.$router.push({
                            path: "/mine/Address"
                        });
                        break;
                    case "清除缓存":
                        window.localStorage.clear();
                        this.$toast({
                            message: "清除成功"
                        });
                        break;
                    case "反馈中心":
                        this.$router.push({
                            path: '/set/feedback',
                        })
                        break;
                    default:
                }
            },

            //获取用户信息
            getUserrzxx(num) {
                let data = this.$store.getters.getuserinfo;
                // console.log(JSON.parse(data));
                if (data) {
                    if (!JSON.parse(data).phone) {
                        if (num === 1) {
                            this.$router.push({
                                path: "/set/set-phone"
                            });
                        } else this.$toast("请绑定手机号后再试");
                    } else {
                        if (num === 2) {
                            this.$router.push({
                                path: "/set/set-pay-password"
                            });
                        } else {
                            this.$toast("此账号已绑定手机号");
                        }
                        ;
                    }
                    ;

                }
            }
        },
        created() {
            let user = JSON.parse(this.$store.getters.getuserinfo);
            this.user = user;
            // console.log(this.$store.getters.getuserinfo)
        }
    };
</script>

<style scoped lang="scss">
  .list_box {
    padding-top: 43px;

    .set_list {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 10px;
        background-color: #fff;

        .right {
          font-size: 0.12rem;
          color: #999999;
        }

        .right img {
          width: 50px;
          border-radius: 50%;
        }

        el-icon-arrow-right {
        }
      }

      li:nth-child(2) .right {
        color: inherit;
      }

      li:nth-last-child(2),
      li:nth-last-child(7) {
        margin-top: 10px;
      }

      > li:nth-child(10) {
        margin: 10px 0;
      }
    }
  }

  .loginout {
    font-size: 0.18rem;
    color: #009900;
    line-height: 40px;
    margin: 40px 10px;
    background-color: #fff;
    border-radius: 4px;
  }
</style>
