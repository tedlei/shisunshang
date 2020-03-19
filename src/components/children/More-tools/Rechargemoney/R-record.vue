<template>
  <div class="content">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      :immediate-check="false"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
      v-if="record_dtllists"
    >
      <van-cell class="moneylist">
        <table class="tablehead" border="0" cellspacing="0">
          <tr class="headtr" v-if="!show">
            <td>充值时间</td>
            <td>充值金额</td>
          </tr>

          <tr class="headtr" v-if="show">
            <td>提现时间</td>
            <td>提现金额</td>
            <td>到账方式</td>
            <td>提现状态</td>
          </tr>
          <tr v-for="(item,index) in record_dtllists" :key="index">
            <td>{{item.add_time}}</td>
            <td>{{item.money}}</td>
            <td v-if="show">银行卡</td>
            <td v-if="show">{{state[item.status]}}</td>
          </tr>
        </table>
      </van-cell>
    </van-list>

    <empty :isemptytype="isemptytype" v-if="!record_dtllists"></empty>
  </div>
</template>

<script>
    import Empty from "../../empty/empty";

    export default {
        name: "R-record",
        components: {Empty},
        props: ['records'],
        data() {
            return {
                record_dtllists: [],
                isemptytype: 'record',
                loading: false,
                finished: false,
                error: false,
                state: ['待处理', '成功', '失败', '已撤回'],
                pages: 0,
                show: false,
            }
        },
        methods: {
            async getlist() {
                let url = this.show ? '/api/v1/userMoneyCashed' : '/api/v1/UserRecharge';
                let parms = {
                    method: this.show ? 'get.cashed.list' : 'get.recharge.list',
                    page: this.pages,
                    page_size: 20
                }
                this.$post(url, parms)
                    .then((response) => {
                        this.record_dtllists = this.record_dtllists.concat(response.data.items)
                        // 加载状态结束
                        this.loading = false;
                        this.pages += response.data.items.length;
                        // 数据全部加载完成
                        if (response.data.items.length < 20) {
                            this.finished = true;
                        }
                    }).catch(function (error) {
                    console.log(error);
                })
            },
            //下拉加载
            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    this.getlist();
                }, 1000);
            },

        },
        mounted() {
            this.getlist();
            if (this.records) {
                this.show = true
            }
            console.log(this.records)
        }
    }
</script>

<style scoped lang="scss">
  .content {
    .moneylist {
      padding: 0;
    }

    table {
      width: 100%;
      text-align: center;
      tr td {
        padding: 15px;
        background-color: #fff;
        border-bottom: 1px solid #f2f2f2;

        .head {
          img {
            width: 0.35rem;
            height: 0.35rem;
            border-radius: 50%;
          }
        }
      }

      tr.headtr {
        td {
          background-color: #009900;
          width: 25%;
        }

        color: #fff;

      }

    }
  }

</style>
