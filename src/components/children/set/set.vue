<template>
  <div>
    <div class="list_box">
      <ul class="set_list">
        <li v-for="(item,index) in msglists" :key="index" @click="set(item.left)">
          <div class="left">{{item.left}}</div>
          <div class="right">
            <img :src="item.right" v-if="index==0" />
            <span v-else>{{item.right}}</span>
            <i class="el-icon-arrow-right" v-show="index!=1&&index!=0"></i>
          </div>
        </li>
      </ul>
    </div>
    <!--  退出登录  -->
    <div class="loginout">退出登录</div>
  </div>
</template>

<script>
export default {
  name: "set",
  data() {
    return {
      msglists: [
        {
          left: "头像",
          right: JSON.parse(this.$store.getters.getuserinfo).portrait
        },
        {
          left: "用户名",
          right: JSON.parse(this.$store.getters.getuserinfo).name
        },

        {
          left: "实名认证",
          right: ""
        },
        {
          left: "地址管理",
          right: ""
        },
        {
          left: "设置支付密码",
          right: ""
        },
        {
          left: "绑定手机",
          right: JSON.parse(this.$store.getters.getuserinfo).phone
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
          left: "关于商城",
          right: ""
        }
      ]
    };
  },
  computed: {
    userinfo() {
      return JSON.parse(this.$store.getters.getuserinfo);
    }
  },
  methods: {
    tc(message, type) {
      this.$notify({ type: type ? type : "warning", message });
    },
    set: function(e) {
      switch (e) {
        case "绑定银行卡":
          this.$router.push({
            path: "/set/Bank-card"
          });
          break;
        case "实名认证":
          this.$router.push({
              path: '/mine/certification',
          })
          // this.getUserrzxx();
          break;
        case "设置支付密码":
          this.$router.push({
            path: "/set/set-pay-password"
          });
          break;
        case "绑定手机":
          this.$router.push({
            path: "/set/set-phone"
          });

          break;
        case "地址管理":
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
        default:
      }
    },

    //获取用户信息
    // async getUserrzxx() {
    //   let ad_data = { method: "get.user.auth.item" };
    //   let data = await this.$post("/api/v1/userAuth", ad_data);
    //   if (data && data.data) {
    //     switch (data.data.status) {
    //       case 0:
    //         this.tc("认证信息审核中");
    //         return;
    //       case 1:
    //         this.tc("实名认证已通过");
    //         return;
    //     }
    //   }
    //   this.$router.push({
    //     path: "/mine/certification"
    //   });
    // }
  },
  mounted() {}
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
