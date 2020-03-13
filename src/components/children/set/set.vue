<template>
  <div>
    <div class="list_box">
      <ul class="set_list">
        <li v-for="(item,index) in msglists" :key="index" @click="set(index)">
          <div class="left">{{item.left}}</div>
          <div class="right">
            <img :src="require(`../../../assets/img/${item.right}.png`)" v-if="index==0">
            <span v-else>{{item.right}}</span>
            <i class="el-icon-arrow-right" v-show="index!=1"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "set",
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
                        left: '性别',
                        right: '陈俊余'
                    },
                    {
                        left: '出生日期',
                        right: '黑钻'
                    },
                    {
                        left: '实名认证',
                        right: '15320495341'
                    },
                    {
                        left: '地址管理',
                        right: ''
                    },
                    {
                        left: '设置支付密码',
                        right: ''
                    },
                    {
                        left: '绑定手机',
                        right: '男'
                    },
                    {
                        left: '绑定银行卡',
                        right: ''
                    },

                    {
                        left: '清除缓存',
                        right: '已认证'
                    },

                    {
                        left: '关于商城',
                        right: '123.456.54.64'
                    },
                ]
            }
        },
        methods:{
            set:function (e) {
                if (index == 2){

                }
            }
        }
    }
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

      li:nth-last-child(2), li:nth-last-child(7) {
        margin-top: 10px;
      }
    }
  }

</style>
