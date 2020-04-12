<template>
  <div>
    <div class="list_box">
      <ul class="userinfo">
        <li v-for="(item,index) in msglists" :key="index">
          <div class="left">{{item.left}}</div>
          <div class="right">
            <img :src="item.right" v-if="index==0" />
            <span v-else>{{item.right}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "usermsg",
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
          left: "用户等级",
          right: JSON.parse(this.$store.getters.getuserinfo).level_name
        },
        {
          left: "联系电话",
          right:
            JSON.parse(this.$store.getters.getuserinfo).phone == ""
              ? "未绑定手机号码"
              : JSON.parse(this.$store.getters.getuserinfo).phone
        },
        {
          left: "实名认证",
          right: "未认证"
        },
        {
          left: "注册时间",
          right: JSON.parse(this.$store.getters.getuserinfo).add_time || ""
        }
      ]
    };
  },
  created() {
    this.getUserAuth();
  },
  methods: {
    //获取用户认证信息
    async getUserAuth() {
      let msg = this.msglists[4];
      let ad_data = {method: "get.user.auth.item"};
      let data = await this.$post("/api/v1/userAuth", ad_data);
      if (data) {
        if(data.data){
          switch (data.data.status) {
            case 0:
              msg.right = '待审核'
              break;
            case 1:
              msg.right = '已通过'
              break;
            default:
              msg.right = '未认证'
              break;
          }
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.list_box {
  padding-top: 43px;

  .userinfo {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 10px;
      background-color: #fff;

      .right {
        font-size: 0.12rem;
      }

      .right img {
        width: 50px;
        border-radius: 50%;
      }
    }

    li:nth-last-child(3) {
      margin-top: 10px;
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
}
</style>
