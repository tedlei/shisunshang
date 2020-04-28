<template>
  <div class="content">
    <div class="exchage_box">
      <div class="common_box">
        <van-radio-group v-model="radio" @change="change">
          <van-radio :name="index" checked-color="#009900" v-for="(item,index) in tanslist" :key="index">
            <div class="right_box">
              <div class="money_box">
                <span>从</span>
                <div>
                  <div class="clo-g">{{item.form_name}}</div>
                  <div class="">￥{{item.form_money | moneyFormat}}</div>
                </div>
              </div>
              <van-icon name="down" style="font-size:0.24rem;transform: rotate(-90deg);" class="clo-9"/>
              <div class="money_box">
                <span>至</span>
                <div>
                  <div class="clo-g">{{item.goto_name}}</div>
                  <div class="">￥{{item.goto_money | moneyFormat}}</div>
                </div>
              </div>
            </div>
          </van-radio>
        </van-radio-group>
      </div>

      <van-form @submit="onSubmit">
        <div class="common_box">
          <van-field v-model="form_id" name="form_id" v-show="false"/>
          <van-field v-model="goto_id" name="goto_id" v-show="false"/>
          <div style="position: relative">
            <van-field
              v-model="money"
              name="money"
              label="转账金额：￥"
              placeholder="请输入转账金额"
              type="number"
              :rules="[{ required: true, message: '请输入转账金额' }]"
            />
            <div class="alltans clo-g" @click="alltans">
              金额全转
            </div>
          </div>
          <van-field
            v-model="bili"
            name="用户名"
            label="转账比例："
            readonly

          />
          <van-field
            v-model="message"
            name="desc"
            rows="2"
            autosize
            label="转账说明"
            type="textarea"
            maxlength="50"
            placeholder=""
            show-word-limit
          />
        </div>
        <div style="margin: 0 0.1rem">
          <van-button block type="info" native-type="submit"  class="common_btn" >
            立即转账
          </van-button>
        </div>
      </van-form>


    </div>

  </div>
</template>

<script>
    export default {
        name: "Trans",
        data() {
            return {
                radio: 0,
                money: null,
                bili: '',
                message: '',
                tanslist: [],
                form_id: '',
                goto_id: '',
            }
        },
        methods: {
            getmsg: function () {
                let msg = {
                    method: 'get.trans.money.list'
                };
                this.$post('/api/v1/UserTrans', msg)
                    .then((response) => {
                        this.tanslist = response.data.items;
                        this.form_id = this.tanslist[this.radio].money_type_id_from;
                        this.goto_id = this.tanslist[this.radio].money_type_id_goto;
                        this.bili = this.tanslist[0].form_name + '转' + this.tanslist[0].goto_name + '为1：' + this.tanslist[0].limit_multiple;
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            //change
            change: function (e) {
                this.bili = this.tanslist[e].form_name + '转' + this.tanslist[e].goto_name + '为1：' + this.tanslist[e].limit_multiple;
                this.form_id = this.tanslist[e].money_type_id_from;
                this.goto_id = this.tanslist[e].money_type_id_goto;

            },
            //全转
            alltans: function () {
                this.money = this.tanslist[this.radio].form_money;
            },
            //提交表单
            onSubmit(values) {
                let msg = {
                    method: 'add.trans.money.item',
                };
                values = Object.assign(msg, values);
                this.$post('/api/v1/UserTrans', values)
                    .then((response) => {
                        if (response.status == 200) {
                            this.$toast('转账成功');
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000)
                        } else {
                            this.$toast(response.message);
                        }
                    }).catch(function (error) {
                    console.log(error);
                });
            },
        },
        mounted() {
            this.getmsg()
        }
    }
</script>

<style scoped lang="scss">
  .content {
    .exchage_box {
      .right_box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .money_box {
          display: flex;
          align-items: center;
          padding: 0.05rem 0.1rem;
          width: 40%;
          border-radius: 4px;
          background-color: #f2f2f2;

          span {
            margin-right: 0.2rem;
          }
        }
      }

      .van-radio {
        margin: 0.1rem 0;
      }

      /deep/ .van-radio__label {
        width: 100%;
      }
    }

    .van-form {
      .alltans {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        padding: 10px 10px 10px 0;
      }

      .van-cell {
        border: 1px solid #f2f2f2;
        margin-bottom: 0.2rem;
        border-radius: 4px;
      }

      .van-cell:not(:last-child)::after {
        content: none;
      }
    }
  }
</style>
