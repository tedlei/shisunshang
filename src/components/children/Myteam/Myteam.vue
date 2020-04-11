<template>
  <div class="content">
    <div v-show="look&&!isbusiness">
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
      <div class="hrDiv"></div>
      <div>
        <ul class="team_list">
          <li @click="openteamTwo">
            <div class="left">
              推荐附近商家:
              {{business_num}}
              家</div>
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
    <!-- 附近商家 -->
    <ul v-if="adlists&&isbusiness" class="ad_list">
        <li v-for="(item,index) in adlists" :key="index">
        <router-link to="">
              <div class="left_img">
                 <van-image
                  width="0.8rem"
                  height="0.8rem"
                  fit="cover"
                  :src="item.imgurl"
                /> 
              </div>
              <div class="right_msg">
                <div class="name">
                    <div class="tt fontWrap fontWrapTwo">
                      {{item.name}}
                    </div>
                  <div class="tt_name fontWrap fontWrapOne">地址：{{item.address}}</div>
                </div>
                <div class="time">
                  <span>电话：{{item.mobile}}</span>
                  <!-- {{item.status}} 0待审核 1不显示 2审核失败  -->
                </div>
              </div>
              <div class="imgDiv">
                  <img v-show="item.status==0" src="../../../assets/img/shz.png" alt="#">
                  <img v-show="item.status==2" src="../../../assets/img/shsb.png" alt="#">
              </div>
        </router-link>
        </li>
    </ul>
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
                team_dtllists: [],
                business_num: 0,
                isbusiness: false,
                adlists: null,
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
            //推荐商家数量
            getbusiness () {
              let _this = this,
                    teammsg = {
                        method: 'get.user.recomment.store.count'
                    };
                this.$post('/api/v1/userStore', teammsg)
                    .then((res) => {
                      // console.log(res)
                      this.business_num = res.data.num;
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
            },
            //查看2
            openteamTwo() {
              this.$route.meta.title = '附近商家';
              console.log(this.$route.meta.title)
              let _this = this,
                  teammsg = {
                      method: 'get.user.recomment.store.list'
                  };
              // this.$post('/api/v1/userStore', teammsg)
              //     .then((res) => {
              //       console.log(res)
              //       if(res.status==200){
              //         this.adlists = res.data;
              //         this.isbusiness = true;
              //       }else{
              //         this.$toast("暂无商家")
              //       }
              //     }).catch(function (error) {
              //       console.log(error);
              // });
            },
        },
        mounted() {
            var _this = this
            Bus.$on('val', (data) => {
                if (data == false) {
                    _this.look = true
                }
            })
            this.getteam();
            this.getbusiness();
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
  .hrDiv{
    height: 0.1rem;
  }
   .content {
       .hrDiv{
           height: 0.1rem;
       }
    .ad_list {
      text-align: left;
      li a {
        position: relative;
        padding: 0.1rem;
        margin-bottom: 0.1rem;
        background-color: #fff;
        display: flex;
        border-bottom: 1px solid #f2f2f2;
        .left_img{
            border-radius: 5px;
        }
        .right_msg {
          padding-left: 0.1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .name {
            font-size: 0.16rem;
            .tt{
                font-size: 0.16rem;
            }
            .tt_name {
              font-size: 0.14rem;
              margin: 0.05rem 0;
              color: #999999;
            }
          }

          .time {
            color: #999999;
            font-size: 0.14rem;
          }
        }

      }
    }
  }
  .imgDiv{
        width: 0.6rem;
        height: 0.6rem;
        position: absolute;
        right: 10px;
  }
</style>
