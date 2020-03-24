<template>
  <div class="content">
    <div class="myinvoice" v-if="myinvoicelists">
      <ul class="myinvoice_ul">
        <li class="common_style" v-for="(item,index) in myinvoicelists" :key="index">
          <mt-cell-swipe
            :right="[
                {
                    content: '设为默认',
                    style: {'background-color': '#ccc', 'color': '#fff !important'}
                },
                {
                    content: '删除',
                    style: {'background-color': '#009900', 'color': '#fff !important'},
                    handler: () => isdelet(item.id)
                }]"
            :title="item.title"
          >
            <p class="section">税号：{{item.number}}</p>
          </mt-cell-swipe>

        </li>
      </ul>
      <div class="common_style add_invoice">
        <router-link :to="{path:'/mine/invoice',query:{state:1}}">
          <van-icon name="add"/>
          <span>添加发票</span>
        </router-link>
      </div>
    </div>
    <empty :isemptytype="isemptytype" v-if="!myinvoicelists"></empty>
  </div>
</template>

<script>

    import Empty from "../empty/empty";
    import Vue from 'vue'
    import {CellSwipe} from 'mint-ui';

    Vue.component(CellSwipe.name, CellSwipe);
    export default {
        name: "myinvoice",
        components: {Empty},
        data() {
            return {
                myinvoicelists: [],
                isemptytype: 'myinvoice',
                rightButtons: [],
            }
        },
        methods: {
            //获取列表
            getmsg: function () {
                let parms = {
                    method: 'get.invoice.list'
                };
                this.$post('/api/v1/invoice', parms)
                    .then((res) => {
                        this.myinvoicelists = res.data
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            //是否删除
            isdelet: function (e) {
                this.$dialog.confirm({
                    title: '温馨提示',
                    message: '确定删除此发票吗？'
                }).then(() => {
                    this.delet(e)
                }).catch(() => {

                });
            },
            //删除选中发票信息
            delet: function (e) {
                let parms = {
                    method: 'del.invoice.list',
                    id: [e]
                };
                this.$post('/api/v1/Invoice', parms)
                    .then((res) => {
                        for (let i in this.myinvoicelists) {
                            if (this.myinvoicelists[i].id == e) {
                                this.myinvoicelists.splice(i, 1)
                            }
                        }
                        this.myinvoicelists = this.myinvoicelists.length == 0 ? null : this.addresslist
                    }).catch(function (error) {
                    console.log(error);
                });
                console.log(e)
            },
            //    设为默认
        },
        mounted() {
            this.getmsg()
        }
    }
</script>

<style scoped lang="scss">
  .content {
    .common_style {
      background-color: #fff;
      margin-top: 0.1rem;
    }

    .myinvoice_ul {
      li {

        /deep/ .mint-cell {
          display: flex;
          height: 0.7rem;
          align-items: center;

          .mint-cell-wrapper {
            display: block;
            text-align: left;
            padding: 0 0.2rem;

            .mint-cell-title {
              font-size: 0.17rem;
              margin-bottom: 0.1rem;
            }
          }


          .mint-cell-swipe-button {
            width: 0.7rem;
            padding: 0;
            line-height: 0.7rem;
          }

        }


        .section {
          font-size: 0.15rem;
          color: #999999;
        }
      }

    }

    .add_invoice {
      line-height: 0.7rem;
      font-size: 0.17rem;

      i {
        color: #999;
        font-size: 0.2rem;
        vertical-align: middle;
      }
    }
  }
</style>
