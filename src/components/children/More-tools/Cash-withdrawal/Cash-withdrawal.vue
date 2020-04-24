<template>
  <div class="content">
    <van-form @submit="onSubmit">
      <div class="money_text">
        <p>可提现金额（元）</p>
        <div class="clo-g" style="display: flex;align-items: center">
          ￥
          <van-field
            readonly
            :value="dang"
            @touchstart.native.stop="show = true"
            :style="{'padding-left':'0'}"
          />
        </div>
      </div>

      <van-field
        v-model="dmoney"
        name="money"
        type="number"
        label="提现金额"
        placeholder="请输入提现金额"
      />

      <van-field
        readonly
        clickable
        name="picker"
        :value="value1"
        label=""
        right-icon="arrow-down"
        placeholder="请选择提现账户"
        @click="showPopup('moneytype')"
        />
      <van-field name="money_type_id" :value="money_type_id" v-show="false"></van-field>
      <van-field
        readonly
        clickable
        name="picker"
        :value="value2"
        label=""
        right-icon="arrow-down"
        placeholder="请选择银行账户"
        @click="showPopup('bank')"
      />
      <van-field name="bank_id" :value="bank_id" v-show="false"></van-field>

      <van-field
        readonly
        clickable
        :value="qiti+'元'"
        label="起提金额"
        placeholder=""
      />

      <van-field
        readonly
        clickable
        :value="poundage+'%'"
        label="手续费"
        placeholder=""
      />
      <van-field
        readonly
        clickable
        :value="'必须是'+multiple+'的倍数'"
        label="提现倍数"
        placeholder=""
      />

      <van-field
        v-model="password"
        type="password"
        name="pass2"
        label="交易密码"
        placeholder="交易密码"
      />

      <van-button round block type="info" native-type="submit" class="common_btn" style="margin-top: 0.3rem">
        提交
      </van-button>

    </van-form>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columnsArry"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>

    export default {
        name: "Cash-withdrawal",
        data() {
            return {
                dang: 0.00,
                dmoney: '',
                qiti: '',
                poundage: '',
                multiple: '',
                value1: '',
                value2: '',
                bank_id: '',
                money_type_id: '',
                moneytypeid: [],
                bankid: [],
                dangtype: '',
                columns: {
                    money_type_column: [],
                    bank_columns: []
                },
                columnsArry: [],
                balance: [],
                showPicker: false,
                password: '',
            }
        },
        computed: {},
        methods: {
            //获取提现配置信息
            getpei: function () {
                let parms = {
                    method: 'get.cashed.info',
                }
                this.$post('/api/v1/userMoneyCashed', parms)
                    .then((response) => {
                        let val = response.data.info
                        this.qiti = val.withdrawal_money.values
                        this.poundage = val.withdrawal_poundage.values * 100
                        this.multiple = val.withdrawal_multiple.values
                    }).catch(function (error) {
                    console.log(error);
                })
            },
            //获取银行卡ID
            getID: function () {
                let bankmsg = {
                    method: 'get.bank.list'
                };
                this.$post('/api/v1/bank', bankmsg)
                    .then((response) => {
                        console.log(response);
                        if(response.data==null || response.data.lenght==0){
                            this.$dialog.confirm({
                              title: '绑定银行后才能提现，现在前往绑定银行卡吗？',
                            })
                                .then(() => {
                                    // console.log('马上绑定')
                                    this.$router.push('/set/Bank-card');
                                  // on confirm
                                })
                                .catch(() => {
                                    this.$router.back(-1);
                                  // on cancel
                                });
                        }
                        for (let i in response.data) {
                            this.columns.bank_columns.push(response.data[i].name);
                            this.bankid.push(response.data[i].id);
                        }
                        // console.log(this.columns)
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            //获取账户和余额信息
            getbalance: function () {
                let bankmsg = {
                    method: 'get.cashed.type.list'
                };
                this.$post('/api/v1/userMoneyCashed', bankmsg)
                    .then((response) => {
                        // console.log(response)
                        for (let i in response.data.items) {
                            this.columns.money_type_column.push(response.data.items[i].name);
                            this.moneytypeid.push(response.data.items[i].sequence);
                            this.balance.push(response.data.items[i].balance);
                        }
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            //提交表单 申请提现
            onSubmit(values) {
                if (this.dmoney > this.dang) {
                    this.$toast('提现金额不能大于可提现金额')
                } else {
                    let bankmsg = {
                        method: 'add.cashed.item'
                    };
                    values = Object.assign(bankmsg, values)
                    this.$post('/api/v1/userMoneyCashed', values)
                        .then((response) => {
                            if (response.status == 200) {
                                this.$toast('提现成功')
                            } else {
                                this.$toast(response.message)
                            }
                        }).catch(function (error) {
                        console.log(error);
                    });
                }
                console.log(values);
            },
            // 底部选择省市弹窗
            showPopup(e) {
                this.dangtype = e;
                if (e == 'moneytype') {
                    this.columnsArry = this.columns.money_type_column
                } else {
                    console.log(this.columns);
                    this.columnsArry = this.columns.bank_columns
                }
                this.showPicker = true;
            },
            // 底部选择省市弹窗 确定按钮
            onConfirm(e, index) {
                if (this.dangtype == 'moneytype') {
                    this.value1 = e;
                    this.money_type_id = this.moneytypeid[index];
                    this.dang = this.balance[index];
                } else {
                    this.value2 = e;
                    this.bank_id = this.bankid[index]
                }
                this.showPicker = false;
                // console.log(e)
            },
            // 底部选择省市弹窗 取消按钮
            cancel() {
                this.showPicker = false;
            },
        },
        mounted() {
            this.getpei();
            // console.log(this.$store.getters.getuserinfo.is_set_paypassword==0)
            if(this.$store.getters.getuserinfo.is_set_paypassword==0){
                this.$dialog.confirm({
                  title: '请绑定手机号码设置支付密码之后才能提现，现在前往设置支付密码？',
                })
                    .then(() => {
                        // console.log('马上绑定')
                        this.$router.push('/set/set-pay-password');
                      // on confirm
                    })
                    .catch(() => {
                        this.$router.back(-1);
                      // on cancel
                    });
            }else{
                this.getID();
            }
            this.getbalance();
            this.$store.commit('sendWrecord', true);
        },
        destroyed() {
            this.$store.commit('sendWrecord', false);
        }
    }
</script>

<style scoped lang="scss">
  .content {
    form {
      padding: 0.1rem;
      background-color: #fff;

      .van-cell {
        padding-left: 0;
      }

      .van-cell:not(:last-child)::after {
        left: 0;
      }

      .money_text {
        text-align: left;
        margin-bottom: 0.2rem;

        p {
          font-size: 0.15rem;
        }

        div {
          font-size: 0.23rem;
        }

        /deep/ .van-field__control {
          color: #009900;
        }
      }
    }

  }
  /deep/ .van-field__label{
      text-align: left;
  }
</style>
