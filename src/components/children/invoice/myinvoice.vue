<template>
  <div class="content">
    <div class="myinvoice" v-if="myinvoicelists">
      <ul class="myinvoice_ul">
        <li class="common_style" v-for="(item,index) in myinvoicelists" :key="index">
          <van-swipe-cell ref="vanswipe">
            <van-cell :border="false" :title="item.title" :value="'税号：'+item.number"/>

            <template #right>

              <van-button square type="default" text="设为默认"
                          :style="{'background-color': '#ccc', 'color': '#fff !important'}"/>
              <van-button square type="default" text="删除" @click="beforeDelet(item.id)"
                          :style="{'background-color': '#009900', 'color': '#fff !important'}"/>
            </template>
          </van-swipe-cell>
        </li>
      </ul>
      <div class="common_style add_invoice">
        <router-link :to="{path:'/mine/invoice',query:{state:1}}">
          <van-icon name="add"/>
          <span>添加发票</span>
        </router-link>
      </div>
    </div>
    <empty :isemptytype="isemptytype" v-else></empty>
  </div>
</template>

<script>

    import Empty from "../empty/empty";
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
            beforeDelet: function (e) {
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
                        this.myinvoicelists = this.myinvoicelists.length == 0 ? null : this.myinvoicelists
                    }).catch(function (error) {
                    console.log(error);
                });
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

          .van-cell {
            text-align: left;
            display: block;
          }

          .van-cell__value {
            text-align: left;
          }

          .van-swipe-cell__right {
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
