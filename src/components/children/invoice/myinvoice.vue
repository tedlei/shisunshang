<template>
  <div>


    <div class="content">
      <div class="myinvoice" v-if="myinvoicelists">
        <ul class="myinvoice_ul">
          <li @click="entranceAdd(item)" class="common_box" v-for="(item,index) in myinvoicelists" :key="index">
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
      </div>
      <!--  空  -->
      <van-empty description="暂发票记录！" v-else/>
    </div>
    <div class="common_btn bottom_fixed add_invoice">
      <router-link :to="{path:'/mine/invoice',query:{state:1}}">
        <van-icon name="add"/>
        <span>添加发票</span>
      </router-link>
    </div>
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

            //订单选择发票跳转
            entranceAdd(data) {
                // console.log(data)
                if (this.$route.query.entrance == 0) {
                    // console.log(this.$route.query.entrance)
                    this.$store.commit('sendIvcMsg', 2);
                    this.$store.commit('setinvoice', data);
                    // console.log(this.$store.getters.getinvoice);
                    this.$router.go(-2)
                }
            }
        },
        mounted() {
            this.getmsg()
        }
    }
</script>

<style scoped lang="scss">
  .content {
    bottom: 0.5rem;

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
  }


  .add_invoice {
    border-radius: 0;
    line-height: 0.5rem;
    i {
      color: #999;
      font-size: 0.16rem;
      vertical-align: middle;
      color: #fff;
    }
  }
</style>
