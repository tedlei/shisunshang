<template>
  <div class="content">
    <div v-show="look">
      <div style="position: relative;color: #fff">
        <img src="../../../assets/img/icon3.png">
        <span style="position: absolute;left: 50px;transform: translateY(-50%);top: 50%">我的团队</span>
      </div>
      <div class="common_box totalperson">
        团队总人数:{{team_num}}人
      </div>
      <div>
        <ul class="team_list">
          <li v-for="(item,index) in msglists" :key="index" @click="openteam(item.id)">
            <div class="left">{{item.name}}:{{item.num}}人</div>
            <div class="right">
              <span>查看</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--  团队详情  -->
    <div class="team_dtl" v-show="!look">
      <table class="tablehead" border="0" cellspacing="0">
        <tr class="headtr">
          <td>头像</td>
          <td>用户</td>
          <td>注册时间</td>
          <td>推荐人</td>
        </tr>
        <tr v-for="(item,index) in team_dtllists" :key="index">
          <td>
            <div class="head">
              <img :src="item.portrait" v-if="item.portrait!=null">
              <img :src="require(`../../../assets/img/news_head.png`)" v-else>
            </div>
          </td>
          <td>
            <div>{{item.name}}</div>
            <div>{{item.phone}}</div>
          </td>
          <td>{{item.add_time}}</td>
          <td>{{item.referee_name == null ? '-':item.referee_name}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
    import Bus from '../../../assets/js/bus';

    export default {
        name: "Myteam",
        data() {
            return {
                look: true,
                team_num: 1,
                msglists: [],
                team_dtllists: []
            }
        },
        methods: {
            getteam: function () {
                let _this = this,
                    teammsg = {
                        method: 'get.user.team.count'
                    };
                this.$post('/api/v1/UserTeam', teammsg)
                    .then((response) => {
                        _this.team_num = response.data.team_num;
                        _this.msglists = response.data.items
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            //查看
            openteam: function (e) {
                let _this = this,
                    teammsg = {
                        method: 'get.user.team.list',
                        level: e
                    };
                this.$post('/api/v1/UserTeam', teammsg)
                    .then((response) => {
                        _this.team_dtllists = response.data.items
                        _this.look = false
                    }).catch(function (error) {
                    console.log(error);
                });
                Bus.$emit('val', true)
            }
        },
        mounted() {
            var _this = this
            Bus.$on('val', (data) => {
                if (data == false) {
                    _this.look = true
                }
            })
            this.getteam();
        }
    }
</script>

<style scoped lang="scss">
  .team_list {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 10px;
      background-color: #fff;
      border-bottom: 1px solid #f2f2f2;

      .right {
        font-size: 0.12rem;
      }

      .right img {
        width: 50px;
        border-radius: 50%;
      }

    }

  }

  .team_dtl {
    table {
      width: 100%;

      tr td {
        padding: 15px;
        background-color: #fff;
        border-bottom: 1px solid #f2f2f2;
        .head{
          img{
            width: 0.35rem;
            height: 0.35rem;
            border-radius: 50%;
          }
        }
      }

      tr.headtr {
        td {
          background-color: #009900;
        }
        color: #fff;

      }


    }
  }
</style>
