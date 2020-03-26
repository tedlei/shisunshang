<template>
  <van-popup
    v-model="show"
    :style="{ height: '100%',width:'100%',backgroundColor:'#f2f2f2' }"
  >
    <header>
      <div class="top">
        <i class="el-icon-arrow-left back" @click="Popup" style="left: 5px;"></i>
        <div>签到</div>
      </div>
      <div>
        <ul class="leiji_ul clearfix">
          <li>
            <div class="lei_num">{{total_day}}</div>
            <div>累计签到/天</div>
          </li>
          <li>
            <div class="lei_num">{{qd_money | moneyFormat}}</div>
            <div><img src="../.././assets/img/jinbi.png" style="width: 0.24rem"></div>
          </li>
        </ul>
      </div>
    </header>
    <div id="calendar">
      <!-- 年份 月份 -->
      <div class="month">
        <ul>
          <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
          <li class="arrow">❮</li>
          <li class="year-month">
            <span class="choose-year">{{ currentYear }}</span>/
            <span class="choose-month">{{ currentMonth }}月</span>
          </li>
          <li class="arrow">❯</li>
        </ul>
      </div>
      <!-- 星期 -->
      <ul class="weekdays">
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li style="color:red">六</li>
        <li style="color:red">日</li>
      </ul>
      <!-- 日期 -->
      <ul class="days">
        <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
        <li v-for="dayobject in days">
          <!--本月-->
          <!--如果不是本月  改变类名加灰色-->

          <span v-if="dayobject.day.getMonth()+1 != currentMonth"
                class="other-month">{{ dayobject.day.getDate() }}</span>
          <span v-else>
              <span v-if="dayobject.isSign===true" class="active">{{ dayobject.day.getDate() }}</span>
              <span v-else-if="dayobject.todaysigin === istoday" class="todaysigin">{{ dayobject.day.getDate() }}</span>
              <span v-else>{{ dayobject.day.getDate() }}</span>
          </span>

        </li>
      </ul>
      <div class="share">
        <div class="left">
          <span class="yqd">
            <i style="color: #33a6ff;">●</i>
            <span>已签到</span>
          </span>
          <!--          <span>-->
          <!--            <i>●</i>-->
          <!--            <span>未签到</span>-->
          <!--          </span>-->
          <span class="jinri">
            <i style="color: #ff6a69;">○</i>
            <span>今日</span>
          </span>
        </div>
        <div class="share_btn" style="color: #ff6a69;" @click="shareshow = true,frist = false" v-show="!isshow">分享签到
        </div>
      </div>
    </div>
    <div class="submitsign" v-if="isshow" @click="submitsign">我要签到</div>
    <div class="submitsign" v-else style="background-color: #eca69f">今日已签到</div>
    <van-popup
      v-model="shareshow"
      :style="{ background:'#fff',padding:'0.1rem',width:'50%',borderRadius:'5px'}"
    >
      <div class="qdjesuccess" v-show="frist">签到成功!</div>
      <div class="qdje">今日获得签到金:{{sign_money}}</div>
      <img src="../../assets/img/liwu.png" style="margin: 0.1rem 0"/>
      <div class="my_share" @click="myshare">我要分享</div>
    </van-popup>
  </van-popup>
</template>

<script>
    import Header from "../header/header";
    import Bus from "../../assets/js/bus";

    export default {
        name: "Signin",
        components: {Header},
        data() {
            return {
                currentDay: 1,
                currentMonth: 1,
                currentYear: 1970,
                currentWeek: 1,
                total_day: '',
                qd_money: '',
                days: [],
                arrDate: [],
                istoday: new Date().getDate(),
                isMonth: new Date().getMonth() + 1,
                show: false,
                isshow: false,
                log_id: localStorage.getItem('log_id') || '',
                shareshow: false,
                sign_money: localStorage.getItem('sign_money') || '',
                frist: true,
            }
        },

        methods: {
            //获取签到历史
            getsign: function () {
                let msg = {
                    method: 'get.sign.time.list'
                };
                this.$post('/api/v1/userSign', msg)
                    .then((response) => {
                        this.arrDate = response.data.list.map(Number);
                        this.total_day = response.data.total_day;
                        this.qd_money = response.data.qd_money;
                        this.show = this.arrDate.indexOf(this.istoday) == -1 ? true : false;
                        this.isshow = this.arrDate.indexOf(this.istoday) == -1 ? true : false;
                        this.initData(null);
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            //点击分享签到
            myshare: function (e) {
                let msg = {
                    method: 'add.sign.share.item',
                    id:this.log_id
                };
                this.$post('/api/v1/userSign', msg)
                    .then((response) => {
                        if (response.status == 200){
                            this.$toast('分享成功');
                            this.show = false;
                            this.shareshow = false;

                        }
                    }).catch(function (error) {
                    console.log(error);
                });

            },
            //提交签到
            submitsign: function () {
                let index = this.arrDate.indexOf(this.istoday);
                if (index == -1) {
                    let msg = {
                        method: 'add.sign.item'
                    };
                    this.$post('/api/v1/userSign', msg)
                        .then((response) => {
                            if (response.status == 200) {
                                this.arrDate.push(this.istoday);
                                this.isshow = this.arrDate.indexOf(this.istoday) == -1 ? true : false;
                                this.shareshow = true;
                                this.total_day = this.total_day + 1;
                                this.qd_money = Number(this.qd_money) + Number(response.data.sign_money);
                                this.sign_money = response.data.sign_money;
                                this.log_id = Number(response.data.log_id);
                                localStorage.setItem('log_id', this.log_id);
                                localStorage.setItem('sign_money', this.sign_money);
                                this.initData(null);
                            } else {
                                this.$toast(response.message)
                            }
                        }).catch(function (error) {
                        console.log(error);
                    });
                }
            },
            //数据初始化
            initData: function (cur) {
                var date;
                if (cur) {
                    date = new Date(cur);
                } else {
                    var now = new Date();
                    var d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1));
                    d.setDate(42);
                    date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
                }
                this.currentDay = date.getDate();
                this.currentYear = date.getFullYear();
                this.currentMonth = date.getMonth() + 1;

                this.currentWeek = date.getDay(); // 1...6,0
                if (this.currentWeek == 0) {
                    this.currentWeek = 7;
                }
                var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);
                this.days.length = 0;
                // 今天是周日，放在第一行第7个位置，前面6个
                //初始化本周
                for (var i = this.currentWeek - 1; i >= 0; i--) {
                    var d = new Date(str);
                    d.setDate(d.getDate() - i);
                    var dayobject = {}; //用一个对象包装Date对象  以便为以后预定功能添加属性
                    dayobject.day = d;

                    this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
                    if (dayobject.day.getMonth() + 1 == this.currentMonth) {
                        for (let j = 0; j <= 6; j++) {
                            if (i + j == 6) {
                                this.days[j].isSign = this.isVerDate(d.getDate());
                                this.days[j].todaysigin = i + 1;
                            }

                        }
                    }
                }
                //其他周
                for (let i = 1; i <= 42 - this.currentWeek; i++) {
                    let d = new Date(str);
                    d.setDate(d.getDate() + i);
                    let dayobject = {};

                    dayobject = {day: d, isSign: this.isVerDate(d.getDate()), todaysigin: i + 1}

                    this.days.push(dayobject);

                }

            },
            isVerDate(v) {
                return this.arrDate.includes(v)
            },
            // pickPre: function (year, month) {
            //     var d = new Date(this.formatDate(year, month, 1));
            //     d.setDate(0);
            //     this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
            // },
            // pickNext: function (year, month) {
            //     var d = new Date(this.formatDate(year, month, 1));
            //     d.setDate(42);
            //     this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
            // },

            // 返回 类似 2016-01-02 格式的字符串
            formatDate: function (year, month, day) {
                var y = year;
                var m = month;
                if (m < 10) m = "0" + m;
                var d = day;
                if (d < 10) d = "0" + d;
                return y + "-" + m + "-" + d
            },
            //弹窗消失
            Popup: function () {
                this.show = false;
            },
        },
        mounted() {
            Bus.$on('signtans', (data) => {
                if (data == true) {
                    this.show = true
                }
            });
            this.initData(null);
            this.getsign()
        }
    }
</script>

<style scoped lang="scss">
  header {
    background-color: #ff726a;
    color: #fff;

    .top {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      line-height: 0.43rem;
      font-size: 0.18rem;

      i {
        position: absolute;
        left: 5px;
        font-size: 0.28rem;
      }
    }

    .leiji_ul {
      height: 1.2rem;
      font-size: 0.12rem;
      margin-top: 0.2rem;

      li {
        .lei_num {
          font-size: 0.2rem;
        }

        float: left;
        width: 50%;
      }
    }
  }

  #calendar {
    width: 90%;
    margin: 0 auto;
    border-radius: 10px;
    background-color: #fff;
    margin-top: -0.5rem;
    margin-bottom: 0.2rem;

    .share {
      display: flex;
      justify-content: space-between;
      padding: 0.1rem;

      .left {
        span {
          color: #999999;

          i {

            font-style: normal;
          }
        }

      }
    }
  }

  .month {
    width: 100%;
  }

  .month ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  .year-month {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }


  .choose-year {

  }

  .choose-month {
    text-align: center;
  }

  .arrow {
    padding: 0.3rem;
  }


  .month ul li {
    font-size: 0.18rem;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  .weekdays {
    margin: 0;
    padding: 0.1rem 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .weekdays li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
  }

  .days {
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .days li {
    list-style-type: none;
    display: inline-block;
    width: 14.2%;
    text-align: center;
    padding-bottom: 0.15rem;
    padding-top: 0.15rem;
    font-size: 0.1rem;
    color: #000;
  }

  .days li span {
    width: 0.3rem;
    height: 0.3rem;
    line-height: 0.3rem;
    display: inline-block;
  }

  .days li .active {
    border-radius: 50%;
    background: #33a6ff;
    color: #fff;
  }

  .days li .todaysigin {
    border: 1px solid #f00;
    border-radius: 50%;
  }

  .days li .other-month {
    color: gainsboro;
  }

  .submitsign {
    line-height: 0.5rem;
    background-color: #ff7566;
    border-radius: 0.5rem;
    width: 90%;
    margin: 0 auto;
    color: #fff;
    font-size: 0.2rem;
  }

  .my_share {
    padding: 0.05rem;
    border-radius: 5px;
    background-color: #33a6ff;
    color: #fff;
    margin-top: 0.1rem;

  }

  .qdjesuccess {
    font-size: 0.18rem;
    color: #f00;
  }

</style>
