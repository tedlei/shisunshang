<template>
  <div>
    <div class="headBg">
      <header class>
        <div style="text-align: right;padding-top: 0.05rem;">
          <router-link to="/mine/set">
            <van-icon name="setting-o" size="20"/>
          </router-link>
        </div>
        <div class="user" v-if="userinfo">
          <div style="display: flex">
            <div class="user_header">
              <img :src="userinfo.portrait"/>
            </div>
            <div class="user_msg">
              <p class="user_name">{{userinfo.weixinname}}</p>
              <span class="user_phone">{{userinfo.phone}}</span>
              <div class="vip_lv">
                <span>
                  {{userinfo.level_name}}
                  <img
                    src="../../assets/img/vip_icon.png"
                    style="width: 12px;"
                    v-if="userinfo.level == 1"
                  />
                  <img
                    src="../../assets/img/vipM.png"
                    style="width:auto;height: 0.12rem;"
                    v-if="userinfo.level == 2 && userinfo.level_type == 1"
                  />
                  <img
                    src="../../assets/img/vipM.png"
                    style="width:auto;height: 0.12rem;"
                    v-if="userinfo.level == 2 && userinfo.level_type == 2"
                  />
                  <div class="vip_expire" v-if="userinfo.level_end_time > Math.floor(new Date() / 1000)">
                    <!--   <p v-if="userinfo.level_type == 0">{{expireTime | expireTime(userinfo.level_end_time,'year')}}</p>-->
                    <p>{{expireTime | expireTime(userinfo.level_end_time,'day')}}</p>

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
              <div style="margin: 13px 0 5px 0">{{item.num}}</div>
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
              style="padding-bottom: 0.05rem;margin-bottom: 0.05rem;border-bottom: 1px solid #999;display: inline-block"
            >{{ item.totalnum}}
            </div>
            <!--  | moneyFormat -->
            <div style="margin-bottom: 0.1rem">{{ item.num}}</div>
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
          <router-link :to="{path:'/goodsdetails/order', query:{orderid:0}}">
            全部订单
            <van-icon name="arrow"/>
          </router-link>
        </span>
      </div>
      <ul class="order_lists clearfix">
        <template v-for="(item,index) in orderlists">
          <li style="position: relative;" v-if="index!==orderlists.length-1" :key="index">
            <div v-show="item.num>0" class="order_lists_info">{{item.num>99?99:item.num}}</div>
            <!-- <router-link :to="{path: item.router, query:{orderid:item.orderid}}"> -->
            <div @click="CustomerService(item.router,item.orderid)" style="margin-bottom: 0.1rem">
              <img
                :src="require(`../../assets/img/${item.img}.png`)"
                style="height: 0.24rem;width: auto"
              />
            </div>
            <div>{{item.name}}</div>
            <!-- </router-link> -->
          </li>
        </template>
      </ul>
    </div>
    <!--  我的工具  -->
    <div class="m_b_10 conmon_box my_order">
      <div class="conmon_deader">
        <span class="left_text">我的工具</span>
        <span class="right_link">
          <!-- <router-link to="/mine/More-tools">
            更多工具
            <van-icon name="arrow" />
          </router-link> -->
        </span>
      </div>

      <ul class="gj_lists clearfix">
        <li v-for="(item) in gjlists" :key="item.index">
          <router-link :to="{path:item.linkto}">
            <div style="margin-bottom: 0.1rem">
              <img :src="require(`../../assets/img/${item.img}.png`)" style="width: 0.34rem"/>
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


    export default {
        name: "mine",
        components: {Header},
        data() {
            return {
                msg: "我的",
                userinfo: JSON.parse(sessionStorage.getItem("userinfo")),
                expireTime: "到期时间：",
                day_money: 0, //收入
                total_money: 0, //收入
                use_money: 0, //消费
                cashed_money: 0, //提现
                headerlists: [
                    {
                        num: 0,
                        name: "收藏商品"
                    },
                    {
                        num: 0,
                        name: "关注店铺"
                    },
                    {
                        num: 0,
                        name: "浏览足迹"
                    },
                    {
                        num: 0,
                        name: "我的评价"
                    }
                ],
                zclists: [
                    {
                        num: 0,
                        name: "充值账户",
                        totalnum: 0
                    },
                    {
                        num: 0,
                        name: "补贴账户",
                        totalnum: 0
                    },
                    {
                        num: 0,
                        name: "推广账户",
                        totalnum: 0
                    },
                    {
                        num: 0,
                        name: "代理账户",
                        totalnum: 0
                    },
                    {
                        num: 0,
                        name: "签到现金",
                        totalnum: 0
                    },
                    {
                        num: 0,
                        name: "原始股账户",
                        totalnum: 0
                    },
                    {
                        num: 0,
                        name: "生态币账户",
                        totalnum: 0
                    }
                ],
                orderlists: [
                    {
                        img: "dfk",
                        name: "待付款",
                        router: "/goodsdetails/order",
                        orderid: 1,
                        num: ""
                    },
                    {
                        img: "dfh",
                        name: "待发货",
                        router: "/goodsdetails/order",
                        orderid: 2,
                        num: ""
                    },
                    {
                        img: "dsh",
                        name: "待收货",
                        router: "/goodsdetails/order",
                        orderid: 3,
                        num: ""
                    },
                    {
                        img: "dpj",
                        name: "待评价",
                        router: "/goodsdetails/order",
                        orderid: 4,
                        num: ""
                    },
                    {
                        img: "sh",
                        name: "已完成",
                        router: "/goodsdetails/customerService",
                        orderid: 5,
                        num: ""
                    }
                ],
                gjlists: [
                    {
                        img: "gj1",
                        name: "营销广告",
                        linkto: "/mine/ad"
                    },
                    {
                        img: "gj2",
                        name: "推广二维码",
                        linkto: "/mine/myShare"
                    },
                    {
                        img: "gj6",
                        name: "我的分享",
                        linkto: "/mine/Myteam"
                    },
                    // {
                    //   img: "gj4",
                    //   name: "收货地址",
                    //   linkto: "/mine/Address"
                    // },
                    // {
                    //   img: "gj5",
                    //   name: "个人信息",
                    //   linkto: "/mine/usermsg"
                    // },
                    {
                        img: "gj3",
                        name: "商品分享",
                        linkto: "/mine/share"
                    },
                    {
                        img: "gj7",
                        name: "财务记录",
                        linkto: "/mine/record"
                    },

                    {
                        img: 'mgj1',
                        name: '账户充值',
                        linkto: '/mine/Rechargemoney'
                    },
                    {
                        img: 'mgj2',
                        name: '资金提现',
                        linkto: '/mine/Cash-withdrawal'
                    },
                    {
                        img: 'mgj3',
                        name: '账户互转',
                        linkto: '/mine/Trans'
                    },
                    {
                        img: "gj9",
                        name: "商家入驻",
                        linkto: "/mine/nearby"
                    },
                    // {
                    //     img: 'mgj4',
                    //     name: '发票专区',
                    //     linkto: '/mine/myinvoice'
                    // },
                    // {
                    //     img: 'mgj5',
                    //     name: '实名认证',
                    //     linkto:'/mine/certification'
                    // },
                    // {
                    //     img: 'mgj6',
                    //     name: '主题换肤',
                    //     linkto:'/huanfu'
                    // },
                    // {
                    //     img: 'mgj7',
                    //     name: '绑定银行卡',
                    //     linkto:'/set/Bank-card'
                    // },
                    // {
                    //     img: 'mgj8',
                    //     name: '卡券管理',
                    //     linkto:'/kajuan'
                    // },
                    {
                        img: "gj8",
                        name: "关于我们",
                        linkto: "/help/helpDetail?type=gy"
                    },

                ],
                gamelists: [
                    {
                        img: "gj1",
                        name: "QQ飞车",
                        text: "0元领一箱水果",
                        linkto: ""
                    },
                    {
                        img: "gj1",
                        name: "QQ飞车",
                        text: "0元领一箱水果",
                        linkto: ""
                    },
                    {
                        img: "gj1",
                        name: "QQ飞车",
                        text: "0元领一箱水果",
                        linkto: ""
                    },
                    {
                        img: "gj1",
                        name: "QQ飞车",
                        text: "0元领一箱水果",
                        linkto: ""
                    }
                ]
            };
        },
        //计算剩余时间
        filters: {
            expireTime: function (val, end_time, type) {
                let during = new Date(parseInt(end_time) * 1000);
                let expireTimes = "";
                switch (type) {
                    case "year":
                        expireTimes = during.toLocaleDateString().replace(/\//g, "-");
                        break;
                    case "month":
                        expireTimes = during.toLocaleDateString().replace(/\//g, "-");
                        break;
                    case "day":
                        expireTimes = during.toLocaleDateString().replace(/\//g, "-");
                        break;
                }
                return val + expireTimes;
            }
        },
        methods: {
            //订单跳转
            CustomerService(router, id) {
                if (id == 5) {
                    this.$toast("功能暂未上线");
                } else {
                    this.$router.push({path: router, query: {orderid: id}});
                }
            },
            //获取用户信息
            async getuserinfo() {
                let ad_data = {
                    method: "get.user.info"
                };
                let {zclists} = this;
                let {data} = await this.$post("/api/v1/user", ad_data);
                if (data) {
                    this.userinfo = data;
                    this.$store.commit("userinfo", JSON.stringify(data));
                    for (let i in zclists) {
                        zclists[i].totalnum = parseFloat(data["money" + (i * 1 + 1)]).toFixed(
                            2
                        );
                    }

                    //未绑定手机号时跳转
                    if (!data.phone) {
                        this.$dialog
                            .confirm({
                                title: "提示",
                                message: "未绑定手机号，是否去绑定？"
                            })
                            .then(() => {
                                this.$router.push({path: "/set/set-phone"});
                            });
                    }
                }
            },
            //获取收藏数量，累计
            async getuserindex() {
                let _this = this;
                let userindex = {
                    method: "get.user.index.data"
                };
                let {zclists, headerlists, orderlists} = this;
                let {data} = await this.$post("/api/v1/user", userindex);
                if (data) {
                    let {
                        collect_goods_num,
                        collect_shops_num,
                        footprint_num,
                        comment_num,
                        day_money,
                        total_money,
                        use_money,
                        cashed_money,
                        order_array
                    } = data;
                    headerlists[0].num = collect_goods_num; //收藏商品
                    headerlists[1].num = collect_shops_num; //关注店铺
                    headerlists[2].num = footprint_num; //浏览逐级
                    headerlists[3].num = comment_num; //我的评价

                    //收入
                    this.day_money = day_money;
                    this.total_money = total_money;

                    //累计消费
                    this.use_money = use_money;

                    //累计提现
                    this.cashed_money = cashed_money;

                    for (let i in zclists) {
                        zclists[i].num = data["money" + (i * 1 + 1)].toFixed(2);
                    }

                    //订单数量
                    for (let n in order_array) {
                        orderlists[n].num = order_array[n];
                    }
                }
            },
            //充值活动
            Recharge: function () {
                this.$router.push({
                    path: "/mine/Recharge"
                });
            },
            //在线升级
            upgrade: function () {
                this.$router.push({
                    path: "/upgrade"
                });
            }
        },
        created() {
            this.getuserinfo();
            this.getuserindex();
        }

    };
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
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .user_msg {
          text-align: left;

          .user_name {
            width: 1.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

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
              display: inline-block;
            }
          }
        }

        .user_up {
          margin-top: 0.3rem;

          .Recharge,
          .shengji {
            line-height: 0.18rem;
            border-radius: 0.18rem;
            padding: 0.03rem 0.1rem;
            font-size: 0.12rem;
            width: max-content;
          }

          .Recharge {
            background-color: red;
            margin-bottom: 5px;
          }

          .shengji {
            // margin-top:0.05rem;
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
        background-color: rgba(0, 0, 0, 0.2);
        display: flex;

        li {
          // float: left;
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

  .zc_lists li,
  .gj_lists li {
    float: left;
    width: 25%;
    padding: 0.15rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .order_lists {
    display: flex;
    justify-content: space-between;
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
  .order_lists_info {
    position: absolute;
    top: 5px;
    right: 10px;
    width: 16px;
    height: 16px;
    background: red;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 0.1rem;
    font-weight: bold;
  }
</style>
