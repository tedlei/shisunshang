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
        v-model="money"
        name="提现金额"
        label="提现金额"
        placeholder="请输入提现金额"
        :rules="[{ required: true, message: '请输入提现金额' }]"
      />


      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label=""
        placeholder="请选择提现账户"
        @click="showPicker = true"
      />

      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label=""
        placeholder="请选择银行账户"
        @click="showPicker = true"
      />

      <van-field
        readonly
        clickable
        :value="10+'元'"
        label="起提金额"
        placeholder=""
      />

      <van-field
        readonly
        clickable
        :value="3+'%'"
        label="手续费"
        placeholder=""
      />
      <van-field
        readonly
        clickable
        :value="'必须是10的倍数'"
        label="提现倍数"
        placeholder=""
      />

      <van-field
        v-model="password"
        type="password"
        name="pass2"
        label="交易密码"
        placeholder="交易密码"
        :rules="[{ required: true, message: '请填交易密码' }]"
      />

      <van-button round block type="info" native-type="submit" class="common_btn" style="margin-top: 0.3rem">
        提交
      </van-button>

    </van-form>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
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
                username: '',
                dang: 0.00,
                money: '',
                value: '',
                columns: [],
                showPicker: false,
                password:''
            }
        },
        methods: {

            //提交表单
            onSubmit(values) {
                console.log('submit', values);
            },
            // 底部选择省市弹窗
            showPopup() {
                this.showPicker = true;
            },
            // 底部选择省市弹窗 确定按钮
            onConfirm(e) {

                console.log(e)
            },
            // 底部选择省市弹窗 取消按钮
            cancel() {
                this.showPicker = false;
            },
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

      .van-cell:not(:last-child)::after{
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
</style>
