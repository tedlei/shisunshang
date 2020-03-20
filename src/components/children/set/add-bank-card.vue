<template>
  <div class="content">
    <p class="tips">请填写你的身份信息</p>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="持卡人"
        placeholder="请输入持卡人姓名"
        :rules="[{ required: true, message: '请输入持卡人姓名' }]"
      />
      <!--      <van-field-->
      <!--        v-model="number"-->
      <!--        type="tel"-->
      <!--        name="身份证号码"-->
      <!--        label="身份证号码"-->
      <!--        placeholder="请输入持卡人身份证号码"-->
      <!--        :rules="[{ required: true, message: '请输入持卡人身份证号码' }]"-->
      <!--      />-->
      <p class="tips">请填写你的银行卡信息</p>
      <van-field
        v-model="number1"
        type="tel"
        name="number"
        label="银行卡号"
        placeholder="请输入银行卡号"
        :rules="[{ required: true, message: '银行卡号' }]"
      />
      <van-field
        v-model="number2"
        name="name"
        label="银行名称"
        placeholder="列如:中国银行"
        :rules="[{ required: true, message: '银行名称' }]"
      />
      <van-field
        v-model="number3"
        name="branch"
        label="支行名称"
        placeholder="列如:北京海淀支行行"
        :rules="[{ required: true, message: '支行名称' }]"
      />

      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label="开户行城市"
        placeholder="点击选择城市"
        @click="showPicker = true"
      />


      <van-popup
        v-model="showPicker"
        position="bottom"
      >
        <van-area
          :area-list="areaList"
          title=""
          confirm-button-text="保存"
          @confirm="confirm"
          @cancel="cancel"
          :value="defaultCode"
        />
      </van-popup>
      <div v-show="false">
        <van-field v-model="province" name="province"/>
        <van-field name="city" v-model="city"/>
        <van-field name="area" v-model="area"/>
      </div>

      <!--        <div class="code">-->
      <!--          <van-field-->
      <!--            v-model="code"-->
      <!--            name="持卡人"-->
      <!--            label="持卡人"-->
      <!--            placeholder="请输入持卡人姓名"-->
      <!--            :rules="[{ required: true, message: '请输入持卡人姓名' }]"-->
      <!--          />-->
      <!--          <div class="getcode">-->
      <!--            获取验证码-->
      <!--          </div>-->
      <!--        </div>-->
      <p class="tips clo-g">平台智能加密，保障你用卡安全</p>

      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit" style="background-color: #009900;border-color: #009900">
          完成
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
    import {Area} from '../../../assets/js/Area'

    export default {
        name: "add-bank-card",
        data() {
            return {
                username: '',
                number1: '',
                number2: '',
                number3: '',
                province: '',
                city: '',
                area: '',
                value: '',
                areaList: Area,
                value: '',
                defaultCode: '500000,500100,500103',
                showPicker: false,
            }
        },

        methods: {
            // 底部选择省市弹窗
            showPopup() {
                this.showPicker = true;
            },
            // 底部选择省市弹窗 确定按钮
            confirm(e) {
                this.value = e[0].name + ',' + e[1].name + ',' + e[2].name;
                this.province = e[0].name;
                this.city = e[1].name;
                this.area = e[2].name;
                this.showPicker = false;
                console.log(e)
            },
            // 底部选择省市弹窗 取消按钮
            cancel() {
                this.showPicker = false;
            },
            onSubmit(values) {
                let _this = this;
                if (_this.value == '') {
                    _this.$toast('请选择开户行城市');
                    return false
                } else {
                    let addmsg = {
                        method: 'add.bank.item'
                    }
                    values = Object.assign(addmsg,values)
                    this.$post('/api/v1/bank', values)
                        .then((response) => {
                            if (response.status == 200){
                                _this.$toast('添加成功');
                                setTimeout(()=>{
                                    _this.$router.back(-1)
                                },2000)
                            }else {
                                _this.$toast(response.message);
                            }
                            console.log(response)
                        }).catch(function (error) {
                        console.log(error);
                    });
                }

            },

        },

    }
</script>

<style scoped lang="scss">
  .content {
    .tips {
      padding: 0.1rem 0.16rem;
      text-align: left;
      color: #999999;
    }

    /deep/ form {
      .van-field__label {
        text-align: left;
      }

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
