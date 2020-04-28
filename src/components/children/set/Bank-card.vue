<template>
  <div>
    <div class="content">
      <!--   添加银行卡     -->
      <div
        class="add_bankcard"
        v-if="banklist.length>0"
        :style="show ?'padding: 0.4rem 0;background-color: #fff;':''"
      >
        <!--   空   -->
        <!-- <div v-show="show" style="background-color: #fff" @click="add_bank">
        <van-icon name="add" class="add_bank clo-g" />
        <div class="clo-9" style="font-size: 0.18rem">添加银行卡</div>
        </div>-->
        <van-swipe-cell
          v-show="!show"
          v-for="(item,index) in banklist"
          :key="index">
          <div
            :class="bank[index]"
            class="m_b_10"
          >
            <div class="msg_box">
              <div class="name"><img :src="item.bank_img" alt=""></div>
              <div>
                <div class="diandian">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div class="diandian">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div class="diandian">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div>{{item.number.slice(item.number.length-4)}}</div>
              </div>
            </div>
          </div>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="delBank(item.id)"/>
          </template>
        </van-swipe-cell>
      </div>
      <!--  空  -->
      <van-empty description="暂无银行卡记录！" v-else/>
    </div>

    <div class="common_btn bottom_fixed add_invoice">
      <router-link :to="{path: '/Bank-card/add-bank-card'}">
        <van-icon name="add"/>
        <span>添加银行卡</span>
      </router-link>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Bank-card",
        data() {
            return {
                banklist: [],
                bank: [],
                show: false
            };
        },
        methods: {
            getbank: function () {
                let _this = this,
                    bankmsg = {
                        method: "get.bank.list"
                    };
                this.$post("/api/v1/bank", bankmsg)
                    .then(response => {
                        if (response.data) {
                            _this.banklist = response.data;
                            for (var i = 0; i < response.data.length; i++) {
                                _this.bank.push(
                                    "bank" + Math.floor(Math.random() * 3)
                                );
                            }
                        } else {
                            this.banklist = [];
                            _this.show = true;
                            this.$store.commit("sendbank", false);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            add_bank: function () {
                this.$router.push({
                    path: "/Bank-card/add-bank-card"
                });
            },
            //删除银行卡
            delBank(id) {
                let ad_data = {
                    method: 'del.bank.list',
                    id: id
                };
                this.$post("/api/v1/bank", ad_data)
                    .then(res => {
                        // console.log(res)
                        if (res.status == 200) {
                            this.$toast('删除成功');
                            this.getbank();
                        } else {
                            this.$toast(res.message);
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted() {
            this.getbank();
            this.$store.commit("sendbank", true);
        },
        destroyed() {
            this.$store.commit("sendbank", false);
        }
    };
</script>

<style scoped lang="scss">
  .content {
    .add_bankcard {
      margin: 10px;
      border-radius: 5px;
      border: 1px solid #f2f2f2;

      .add_bank {
        font-size: 0.4rem;
      }

      .bank0,
      .bank1,
      .bank2 {
        height: 1.3rem;
        background-size: cover;
        border-radius: 5px;

        .msg_box {
          height: 100%;
          color: #000;
          font-size: 0.18rem;
          text-align: left;
          padding: 0.2rem 0.25rem;

          .name {
            > img {
              width: 1.2rem;
              height: 0.35rem;
            }

          }

          > div:nth-child(2) {
            display: flex;
            justify-content: center;
            margin: 0.1rem 0;
          }

          .diandian {
            margin: 0 0.17rem;

            ul {
              width: 0.45rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 0.20rem;

              li {
                list-style: disc;
                color: #b2b2b2;
              }
            }

          }
        }
      }

      .bank0 {
        //   background: url("../../../assets/img/bank1.jpg") no-repeat;
        background-color: #fff;
      }

      .bank1 {
        //   background: url("../../../assets/img/bank2.jpg") no-repeat;
        background-color: #fff;
      }

      .bank2 {
        //   background: url("../../../assets/img/bank3.jpg") no-repeat;
        background-color: #fff;
      }
    }

    .common_style {
      background-color: #fff;
      margin-top: 0.1rem;
    }

  }

  .add_invoice {
    line-height: 0.5rem;
    border-radius: 0;
    i {
      font-size: 0.16rem;
      vertical-align: middle;
      color: #fff;
    }
  }
  .delete-button {
    height: 100%;
  }
</style>
