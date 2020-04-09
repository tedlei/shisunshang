<template>
  <div>
    <div class="headBg">
      <header class="">
        <div style="text-align: right">
          <router-link to="/mine/set"><i class="el-icon-setting"></i></router-link>
        </div>
        <div class="user">
          <div style="display: flex">
            <div class="user_header">
              <router-link to="/mine/usermsg">
                <img :src="portrait" class="">
              </router-link>
            </div>
            <div class="user_msg">
          <span class="user_name">
            {{JSON.parse(this.$store.getters.getuserinfo).weixinname}}
          </span>
              <span class="user_phone">
            {{phone}}
          </span>
              <div class="vip_lv">
                <span>
                  {{userinfo.level_name}}
                  <img src="../../assets/img/vip_icon.png" style="width: 12px;"
                       v-if="userinfo.level == 1">
                  <img src="../../assets/img/vipM.png" style="width:auto;height: 0.12rem;"
                       v-if="userinfo.level == 2 && userinfo.level_type == 1">
                  <img src="../../assets/img/vipM.png" style="width:auto;height: 0.12rem;"
                       v-if="userinfo.level == 2 && userinfo.level_type == 2">
                  <div class="vip_expire">
<!--                    <p v-if="userinfo.level_type == 0">{{expireTime | expireTime(userinfo.level_end_time,'year')}}</p>-->
                    <p
                      v-if="userinfo.level_type == 1">{{expireTime | expireTime(userinfo.level_end_time,'month')}}</p>
                    <p
                      v-else-if="userinfo.level_type == 2">{{expireTime | expireTime(userinfo.level_end_time,'day')}}</p>
                  </div>
                </span>

              </div>

            </div>
          </div>
          <div class="user_up">
            <div class="Recharge" @click="Recharge">充值活动</div>
            <div class="shengji" @click="upgrade">会员升级</div>
          </div>
        </div>

        <ul class="bot_lists clearfix">
          <li v-for="(item,index) in headerlists" :key="item.index">
            <router-link :to="{path:'/mine/myfootprint',query: {printid:index}}">
              <div style="margin: 13px 0 10px 0">{{item.num}}</div>
              <div>{{item.name}}</div>
            </router-link>
          </li>
        </ul>
      </header>
      <!--   累计   -->
      <div class="leiji m_b_10">
        <ul class="leiji_list clearfix">
          <li>
            <div>{{day_money}}/{{total_money}}</div>
            <div>今日/累计收入</div>
          </li>
          <li>
            <div>{{use_money}}</div>
            <div>累计消费</div>
          </li>
          <li>
            <div>{{cashed_money}}</div>
            <div>累计提现</div>
          </li>
        </ul>
      </div>
    </div>
    <!--  我的资产  -->
    <div class="m_b_10 conmon_box my_zc">
      <div class="conmon_deader">
        <span class="left_text">我的资产</span>
      </div>

      <ul class="zc_lists clearfix">
        <li v-for="(item,index) in zclists" :key="index">
          <router-link :to="{path:'/mine/record',query:{recordid:index + 1}}">
            <div
              style="padding-bottom: 0.05rem;margin-bottom: 0.05rem;border-bottom: 1px solid #999;display: inline-block">
              {{ item.num | moneyFormat}}
            </div>
            <div style="margin-bottom: 0.1rem">{{ item.totalnum | moneyFormat}}</div>
            <div>{{item.name}}</div>
          </router-link>
        </li>
      </ul>
    </div>

    <!--  我的订单  -->
    <div class="m_b_10 conmon_box my_order">
      <div class="conmon_deader">
        <span class="left_text">我的订单</span>
        <span class="right_link">
          <router-link :to="{path:'/goodsdetails/order', query:{orderid:0}}">全部订单<i
            class="el-icon-arrow-right"></i></router-link>
        </span>
      </div>

      <ul class="order_lists clearfix">
        <li v-for="(item,index) in orderlists" :key="index">
          <router-link :to="{path: item.router, query:{orderid:item.orderid}}">
            <div style="margin-bottom: 0.1rem">
              <img :src="require(`../../assets/img/${item.img}.png`)" style="height: 0.24rem;width: auto">
            </div>
            <div>{{item.name}}</div>
          </router-link>
        </li>
      </ul>
    </div>
    <!--  我的工具  -->
    <div class="m_b_10 conmon_box my_order">
      <div class="conmon_deader">
        <span class="left_text">我的工具</span>
        <span class="right_link">
          <router-link to="/mine/More-tools">更多工具<i class="el-icon-arrow-right"></i></router-link>
        </span>
      </div>

      <ul class="gj_lists clearfix">
        <li v-for="(item,index) in gjlists" :key="item.index">
          <router-link :to="{path:item.linkto}">
            <div style="margin-bottom: 0.1rem">
              <img :src="require(`../../assets/img/${item.img}.png`)" style="width: 0.34rem">
            </div>
            <div>{{item.name}}</div>
          </router-link>
        </li>
      </ul>
    </div>
    <!--  游戏互动  -->
    <!--    <div class="m_b_10 conmon_box my_game">-->
    <!--      <div class="conmon_deader">-->
    <!--        <span class="left_text">游戏互动</span>-->
    <!--        <span class="right_link">-->
    <!--          <router-link to="">查看更多<i class="el-icon-arrow-right"></i></router-link>-->
    <!--        </span>-->
    <!--      </div>-->

    <!--      <ul class="gj_lists clearfix">-->
    <!--        <li v-for="(item,index) in gamelists" :key="item.index">-->
    <!--          <router-link :to="{path:item.linkto}">-->
    <!--            <div style="margin-bottom: 10px">-->
    <!--              <img :src="require(`../../assets/img/${item.img}.png`)" style="width: 34px">-->
    <!--            </div>-->
    <!--            <div>-->
    <!--              <div>{{item.name}}</div>-->
    <!--              <div style="color: #999;font-size: 0.12rem">{{item.text}}</div>-->
    <!--            </div>-->
    <!--          </router-link>-->
    <!--        </li>-->
    <!--      </ul>-->
    <!--    </div>-->

  </div>

</template>

<script>

    import Header from "../header/header";
    import '../../assets/js/filter'

    export default {
        name: "mine",
        components: {Header},
        data() {
            return {
                msg: '我的',
                userinfo: JSON.parse(this.$store.getters.getuserinfo),
                expireTime: '到期时间：',
                username: '',
                portrait: '',
                phone: '',
                level_name: '',
                day_money: 0,
                total_money: 0,
                use_money: 0,
                cashed_money: 0,
                headerlists: [
                    {
                        num: 0,
                        name: '收藏商品'
                    },
                    {
                        num: 0,
                        name: '关注店铺'
                    },
                    {
                        num: 0,
                        name: '浏览足迹'
                    },
                    {
                        num: 0,
                        name: '我的评价'
                    }],
                zclists: [
                    {
                        num: 0,
                        name: '充值账户',
                        totalnum: 0,
                    },
                    {
                        num: 0,
                        name: '补贴账户',
                        totalnum: 0,
                    },
                    {
                        num: 0,
                        name: '推广账户',
                        totalnum: 0,
                    },
                    {
                        num: 0,
                        name: '代理账户',
                        totalnum: 0,
                    },
                    {
                        num: 0,
                        name: '签到现金',
                        totalnum: 0,
                    },
                    {
                        num: 0,
                        name: '生态币账户',
                        totalnum: 0,
                    },
                    // {
                    //     num: 0,
                    //     name: '原始股账户',
                    //      totalnum:0,
                    // },
                ],
                orderlists: [
                    {
                        img: 'dfk',
                        name: '待付款',
                        router: '/goodsdetails/order',
                        orderid: 1
                    },
                    {
                        img: 'dfh',
                        name: '待发货',
                        router: '/goodsdetails/order',
                        orderid: 2
                    },
                    {
                        img: 'dsh',
                        name: '待收货',
                        router: '/goodsdetails/order',
                        orderid: 3
                    },
                    {
                        img: 'dpj',
                        name: '待评价',
                        router: '/goodsdetails/order',
                        orderid: 'evaluate'

                    },
                    {
                        img: 'sh',
                        name: '售后',
                        router: '/goodsdetails/customerService',
                        orderid: 5
                    }
                ],
                gjlists: [
                    {
                        img: 'gj1',
                        name: '营销广告',
                        linkto: '/mine/ad'
                    },
                    {
                        img: 'gj2',
                        name: '我的分享',
                        linkto: '/mine/myShare'
                    },
                    {
                        img: 'gj3',
                        name: '商品分享',
                        linkto: '/mine/share'
                    },
                    {
                        img: 'gj4',
                        name: '收货地址',
                        linkto: '/mine/Address'
                    },
                    {
                        img: 'gj5',
                        name: '个人信息',
                        linkto: '/mine/usermsg'
                    },
                    {
                        img: 'gj6',
                        name: '我的团队',
                        linkto: '/mine/Myteam'
                    },
                    {
                        img: 'gj7',
                        name: '财务记录',
                        linkto: '/mine/record'
                    },
                    {
                        img: 'gj8',
                        name: '关于我们',
                        linkto: '/mine/ad'
                    }],
                gamelists: [
                    {
                        img: 'gj1',
                        name: 'QQ飞车',
                        text: '0元领一箱水果',
                        linkto: ''
                    },
                    {
                        img: 'gj1',
                        name: 'QQ飞车',
                        text: '0元领一箱水果',
                        linkto: ''
                    },
                    {
                        img: 'gj1',
                        name: 'QQ飞车',
                        text: '0元领一箱水果',
                        linkto: ''
                    },
                    {
                        img: 'gj1',
                        name: 'QQ飞车',
                        text: '0元领一箱水果',
                        linkto: ''
                    },
                ]
            }
        },
        //计算剩余时间
        filters: {
            expireTime: function (val, end_time, type) {
                let during = new Date(parseInt(end_time) * 1000);
                let expireTimes = '';
                switch (type) {
                    case 'year':
                        expireTimes = during.toLocaleDateString().replace(/\//g, '-');
                        break;
                    case 'month':
                        expireTimes = during.toLocaleDateString().replace(/\//g, '-');
                        break;
                    case 'day':
                        expireTimes = during.toLocaleDateString().replace(/\//g, '-');
                        break;
                }
                return val + expireTimes
            },
        },
        methods: {
            //获取用户信息并存储
            getuserinfo: function () {
                let _this = this;
                let data = _this.userinfo;
                for (let i in _this.zclists) {
                    _this.zclists[i].num = Number(data['money' + (Number(i) + 1)])
                }
                _this.portrait = data.portrait;
                _this.username = data.name;
                _this.phone = data.phone;
                _this.level_name = data.level_name;
            },
            //获取收藏数量，累计
            getuserindex: function () {
                let _this = this;
                let userindex = {
                    method: 'get.user.index.data'
                }
                this.$post('/api/v1/user', userindex)
                    .then((response) => {
                        _this.headerlists[0].num = response.data.collect_goods_num
                        _this.headerlists[1].num = response.data.collect_shops_num
                        _this.headerlists[2].num = response.data.footprint_num
                        _this.headerlists[3].num = response.data.comment_num
                        _this.day_money = response.data.day_money
                        _this.total_money = response.data.total_money
                        _this.use_money = response.data.use_money
                        _this.cashed_money = response.data.cashed_money

                        for (let i in _this.zclists) {
                            _this.zclists[i].totalnum = Number(response.data['money' + (Number(i) + 1)])
                        }
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            //充值活动
            Recharge: function () {
                this.$router.push({
                    path: '/mine/Recharge'
                })
            },
            //在线升级
            upgrade: function () {
                this.$router.push({
                    path: '/upgrade'
                })
            },

        },
        mounted() {
            this.getuserinfo();
            this.getuserindex();
        }
    }
</script>

<style lang="scss" scoped>
  .headBg {

    background: url("../../assets/img/vip_head.jpg") no-repeat;

    header {
      padding: 0.1rem;

      color: #fff;

      .el-icon-setting {
        font-size: 0.2rem;
        font-weight: bold;
      }

      .user {
        display: flex;
        justify-content: space-between;

        .user_header {
          overflow: hidden;
          border-radius: 50%;
          padding: 1px;
          background-color: #fff;
          width: 0.6rem;
          height: 0.6rem;
          margin-right: 0.2rem;

          img {
            border-radius: 50%;
          }
        }

        .user_msg {
          text-align: left;

          .vip_lv {
            margin-top: 5px;
          }

          .vip_lv span {
            text-align: center;
            display: inline-block;
            align-items: center;
            padding: 0 5px;
            background-color: rgba(0, 0, 0, 0.2);
            line-height: 0.2rem;
            border-radius: 0.2rem;
            font-size: 0.12rem;

            .vip_expire {
              margin-left: 5px;
              display: inline-block;
            }
          }

        }

        .user_up {
          margin-top: 0.3rem;

          .Recharge, .shengji {
            line-height: 0.18rem;
            border-radius: 0.18rem;
            padding: 0 0.1rem;
            font-size: 0.12rem;
            width: max-content;
          }

          .Recharge {
            background-color: red;
            margin-bottom: 5px;
          }

          .shengji {
            background-color: #235f23;
          }
        }
      }

      .bot_lists li {
        float: left;
        width: 25%;
      }


    }

    .leiji {
      color: #fff;

      .leiji_list {
        padding: 0.1rem;
        background-color: rgba(0, 0, 0, .2);

        li {
          float: left;
          width: 33.3333%;
        }
      }
    }

  }

  /*  */
  .conmon_box {
    background-color: #fff;
    padding: 0 0.1rem;
  }

  .conmon_deader {
    padding: 0.15rem 0;
    display: flex;
    justify-content: space-between;

    .left_text {
      font-size: 0.18rem;
      font-weight: bold;
    }
  }

  .zc_lists li, .gj_lists li {
    float: left;
    width: 25%;
    padding: 0.15rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .order_lists li {
    float: left;
    width: 20%;
    padding: 0.15rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /*  */

</style>
