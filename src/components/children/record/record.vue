<template>
  <div style="height: 100%">
    <div class="navigation" v-show="!this.$route.query.recordid">
      <van-tabs v-model="active" @click="getNum">
        <van-tab v-for="(item,index) in navItems" :key="index" :title="item">
          <!-- 内容 {{ item }} -->
        </van-tab>
      </van-tabs>
    </div>
    <div class="content" :style="this.$route.query.recordid ? '':'margin-top: 0.47rem'">
      <div class="moneybox" :style="this.$route.query.recordid ? {top:43+'px'}:''">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
          class="common_box"
        >
          <van-cell v-for="item in list" :key="item.id" class="moneylist" style="width: auto">
          <span>
            <div>{{names[item.money_type_id - 1]}}</div>
            <!-- <div class="clo-9">{{item.content}}</div> -->
          </span>
            <span>
            <div>{{item.content}}</div>
            <div class="clo-9 fontWrap fontWrapOne">{{item.add_time}}</div>
          </span>
            <span class="last">
            <div>{{moneytext[item.money_type_id - 1]}}</div>
            <div class="clo-9">￥{{item.money | moneyFormat}}</div>
          </span>
          </van-cell>
        </van-list>
      </div>
    </div>

  </div>
</template>

<script>

    export default {
        name: "record",
        data() {
            return {
                active: 0,
                num: 0,
                navItems: ['全部', '充值账户', '补贴账户', '推广账户', '代理账户', '签到现金'],
                list: [],
                loading: false,
                finished: false,
                error: false,
                names: ['充值账户', '补贴账户', '推广账户', '代理账户', '签到账户', '生态币账户', '原始股账户'],
                moneytext: ['充值金额', '补贴金额', '推广金额', '代理金额', '签到金额', '生态币金额', '原始股金额',],
                pages: 0
            }
        },
        methods: {
            async getMoney() {
                //获取账户
                let Money = {
                    method: 'get.money.list',
                    page: this.pages,
                    page_size: 20,
                    type: this.$route.query.recordid == undefined ? '' : this.$route.query.recordid,
                };
                this.$post('/api/v1/userMoney', Money)
                    .then((response) => {
                        this.list = this.list.concat(response.data.items)
                        // 加载状态结束
                        this.loading = false;
                        this.pages += response.data.items.length;
                        // 数据全部加载完成
                        if (response.data.items.length < 20) {
                            this.finished = true;
                        }
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            //下拉加载
            onLoad() {
                // 异步更新数据
                    console.log(111111111)
                    this.getMoney();

            },
            //切换
            getNum: function (index) {
                this.getData();
            },
            getData() {
                let ad_data = {
                    method: 'get.money.list',
                    page: 0,
                    page_size: 10,
                    type: this.active
                };
                this.$post('/api/v1/userMoney', ad_data)
                    .then((res) => {
                        console.log(res)
                        this.list = res.data.items;
                    }).catch(function (error) {
                    console.log(error);
                });
            },
        },
        updated() {
            // this.onLoad()
        },
        mounted() {
            setTimeout(()=>{
                this.loading = false;
                this.finished = false;
            },5000)
            this.getMoney();
        }
    }
</script>

<style scoped lang="scss">
  .navigation {
    top: 0.47rem;
    padding: 0 0.1rem;
    width: auto;
    left: 0.1rem;
    right: 0.1rem;
    background-color: #fff;
    border-radius: 5px;

    > > > .van-tabs__line {
      background-color: #009900;
    }
  }

  .content {

    .moneybox {
      .moneylist {
        div.van-cell__value {
          display: flex;
          justify-content: space-between;
          text-align: center;

          > span:first-child {
            width: 20%;
          }

          > span:nth-child(2) {
            width: 55%;
          }

          > span:nth-child(3) {
            width: 25%;
          }


        }
      }

      .van-cell:not(:last-child)::after {
        left: 0;
      }
    }
  }


</style>
