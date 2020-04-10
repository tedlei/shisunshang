<template>
  <div class="content">
    <div class="myinvoice" v-if="myinvoicelists">
      <ul class="myinvoice_ul">
        <li class="common_style" v-for="(item,index) in myinvoicelists" :key="index">

          <van-swipe-cell :before-close="beforeClose">
            <!--            <template #left>-->
            <!--              <van-button square type="primary" text="选择" />-->
            <!--            </template>-->
            <van-cell :border="false" :title="item.title" :value="'税号：'+item.number"/>
<!--            <p class="section">税号：{{item.number}}</p>-->
            <template #right>

              <van-button square type="default" text="设为默认"
                          :style="{'background-color': '#ccc', 'color': '#fff !important'}"/>
              <van-button square type="default" text="删除"
                          :style="{'background-color': '#009900', 'color': '#fff !important'}"/>
            </template>
          </van-swipe-cell>

          <!--          <mt-cell-swipe-->
          <!--            :right="[-->
          <!--                {-->
          <!--                    content: '设为默认',-->
          <!--                    style: {'background-color': '#ccc', 'color': '#fff !important'}-->
          <!--                },-->
          <!--                {-->
          <!--                    content: '删除',-->
          <!--                    style: {'background-color': '#009900', 'color': '#fff !important'},-->
          <!--                    handler: () => isdelet(item.id)-->
          <!--                }]"-->
          <!--            :title="item.title"-->
          <!--          >-->
          <!--            <p class="section">税号：{{item.number}}</p>-->
          <!--          </mt-cell-swipe>-->

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
            // instance 为对应的 SwipeCell 实例
            beforeClose({ position, instance }) {
                switch (position) {
                    case 'left':
                    case 'cell':
                    case 'outside':
                        instance.close();
                        break;
                    case 'right':
                        this.$dialog.confirm({
                            message: '确定删除吗？'
                        }).then(() => {
                            instance.close();
                        }).catch(() => {

                        });
                        break;
                }
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
        > > > .van-swipe-cell {

          .van-cell{
            text-align: left;
            display: block;
          }
          .van-cell__value{
            text-align: left;
          }

          .van-swipe-cell__right{
            font-size: 0;
            .van-button {
              height: 100%;
              border: none;
            }
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
