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
          <tr class="headtr">
            <td>充值时间</td>
            <td>充值金额</td>
          </tr>
          <tr v-for="(item,index) in record_dtllists" :key="index">
            <td>
              <div>{{item.add_time}}</div>
            </td>
            <td>{{item.money}}</td>
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
        data() {
            return {
                record_dtllists: [],
                pages: 0,
                isemptytype: 'record',
                loading: false,
                finished: false,
                error: false,
                pages:0
            }
        },
        methods: {
            async getlist() {
                let parms = {
                    method: 'get.recharge.list',
                    page: this.pages,
                    page_size:20
                }
                this.$post('/api/v1/UserRecharge', parms)
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
            this.getlist()
        }
    }
</script>

<style scoped lang="scss">
  .content {
    .moneylist{
      padding: 0;
    }
    table {
      width: 100%;

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
        }

        color: #fff;

      }

    }
  }

</style>
