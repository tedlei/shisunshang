<template>
  <div>
    <div class="navigation" v-show="!this.$route.query.recordid">
      <!-- <ul class="clearfix">
        <li v-for="(item,index) in navItems" :key="index" :class="{active:num==index}" @click="getNum(index)">{{item}}</li>
      </ul> -->
      <van-tabs v-model="active" @click="onClick">
        <van-tab v-for="(item,index) in navItems" :key="index" :title="item">
          <!-- 内容 {{ item }} -->
        </van-tab>
      </van-tabs>
    </div>
    <div class="moneybox" :style="this.$route.query.recordid ? {top:43+'px'}:''">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        :immediate-check="false"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item.id" class="moneylist">
          <span>
            <div>{{names[item.money_type_id - 1]}}</div>
            <div class="clo-9">{{item.content}}</div>
          </span>
          <span>
            <div>{{item.content}}</div>
            <div class="clo-9">{{item.add_time}}</div>
          </span>
          <span class="last">
            <div>{{moneytext[item.money_type_id - 1]}}</div>
            <div class="clo-9">￥{{item.money}}</div>
          </span>
        </van-cell>
      </van-list>
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
                        console.log(this.list)
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
                setTimeout(() => {
                    this.getMoney();
                }, 1000);
            },
            //切换
            getNum: function (index) {
                this.num = index;
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
            onClick() {
                this.getData();
            },
        },
        updated() {
            // this.onLoad()
        },
        mounted() {
            // this.getData();
            this.getMoney();
        }
    }
</script>

<style scoped lang="scss">
  .navigation {
    overflow-x: scroll;
    background-color: #fff;
    top: 0.43rem;
    padding: 0 0.1rem;
    border-bottom: 1px solid #f2f2f2;

    ul {
      width: max-content;
      border: none;

      li {
        padding: 0.18rem 0.1rem;
        width: auto;
      }
    }
  }

  /deep/ .van-tabs__line {
    background-color: #009900;
  }

  .moneybox {
    position: absolute;
    top: 1.04rem;
    left: 0;
    right: 0;

    .moneylist {
      div.van-cell__value {
        display: flex;
        justify-content: space-between;

        span {
          width: 40%;

          div {
            padding: 5px 0;
          }
        }

        span.last {
          width: 20%;
        }
      }
    }

    .van-cell:not(:last-child)::after {
      left: 0;
    }
  }
</style>
