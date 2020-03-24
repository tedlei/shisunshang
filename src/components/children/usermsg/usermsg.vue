<template>
  <div>
    <div class="list_box">
      <ul class="userinfo">
        <li v-for="(item,index) in msglists" :key="index">
          <div class="left">{{item.left}}</div>
          <div class="right">
            <img :src="require(`../../../assets/img/${item.right}.png`)" v-if="index==0">
            <span v-else>{{item.right}}</span>

          </div>
        </li>
      </ul>
      <!--  退出登录  -->
      <div class="loginout">
        退出登录
      </div>
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
                        left: '头像',
                        right: 'news_head'
                    },
                    {
                        left: '用户名',
                        right: '15320495341'
                    },
                    {
                        left: '用户姓名',
                        right: '陈俊余'
                    },
                    {
                        left: '用户等级',
                        right: '黑钻'
                    },
                    {
                        left: '联系电话',
                        right: '15320495341'
                    },
                    {
                        left: '性别',
                        right: '男'
                    },
                    {
                        left: '出生日期',
                        right: '2022-1-1'
                    },
                    {
                        left: '实名认证',
                        right: '已认证'
                    },
                    {
                        left: '注册时间',
                        right: '2022-2-2'
                    },
                    {
                        left: '注册IP',
                        right: '123.456.54.64'
                    },

                ]
            }
        },
    }
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
