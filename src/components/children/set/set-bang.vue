<template>
  <div class="content">
    <p class="tips" v-if="show">设置支付密码需认证身份信息</p>
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        type="tel"
        name="phone"
        label="手机号码"
        readonly 
        placeholder="请输入手机号码"
      />

      <div class="code">
        <van-field
          v-model="code"
          name="code"
          label="短信验证码"
          placeholder="请输入短信验证码"
          :rules="[{ required: true, message: '请输入短信验证码' }]"
        />
        <div class="getcode" @click="getcode">
          获取验证码
        </div>
      </div>
      <p class="tips"></p>
      <van-field
        v-model="password1"
        type="password"
        name="pass2"
        label="设置支付密码"
        placeholder="请输入支付密码"
        :rules="[{ required: true, message: '请输入支付密码' }]"
        v-if="show"
      />

      <van-field
        v-model="password2"
        type="password"
        name="pass2"
        label="再输入支付密码"
        placeholder="请再输入支付密码"
        label-width='100px'
        :rules="[{ required: true, message: '请再输入支付密码' }]"
        v-if="show"
      />
      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit" style="background-color: #009900;border-color: #009900">
          确认
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script>

    export default {
        name: "set-bang",
        data() {
            return {
                phone: '',
                code: '',
                password1: '',
                password2: '',
                show: this.$route.meta.title == '绑定手机号' ? false : true,
            }
        },
        created(){
          let {getuserinfo} = this.$store.getters;
          if(getuserinfo) this.phone = JSON.parse(getuserinfo).phone;
        },
        methods: {
            //获取验证码
            getcode: function () {
                let _this = this;
                let can = _this.show ? 'send.sms.update.paypassword' : 'send.sms.bind.mobile';
                let values = {
                    method: can,
                    phone: this.phone
                };
                this.$post('/api/v1/user', values)
                    .then((response) => {
                        if (response.status == 200) {
                            this.$toast(response.data.msg);
                        } else {
                            this.$toast(response.message);
                        }
                        console.log(response)
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            //提交
            onSubmit(values) {
                let _this = this;
                let can = _this.show ? 'set.user.pay.password' : 'set.user.mobile';
                let url =  '/api/v1/user'

                let addmsg = {
                    method: can
                }
                values = Object.assign(addmsg, values);
                console.log(values)
                this.$post(url, values)
                    .then((response) => {
                        if (response.status == 200) {
                            _this.$toast('成功');
                            setTimeout(() => {
                                _this.$router.back(-1)
                            }, 2000)
                        } else {
                            _this.$toast(response.message);
                        }
                        console.log(response)
                    }).catch(function (error) {
                    console.log(error);
                });
            },
        },
        mounted() {

        }
    }
</script>

<style scoped lang="scss">
  .content {
    .tips {
      padding: 0.1rem;
      text-align: left;
    }

    /deep/ form {
      input, .van-field__error-message {
        text-align: right;
      }
    }

    .code {
      display: flex;
      align-items: center;
      background-color: #fff;

      .getcode {
        min-width: max-content;
        margin-right: 0.16rem;
        padding: 0 5px;
        background-color: #009900;
        color: #fff;
        line-height: 30px;
        border-radius: 30px;
        font-size: 0.12rem;
      }
    }
  }
</style>
