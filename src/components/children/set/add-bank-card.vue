<template>
  <div class="content">
    <p class="tips" @click="matchBank">请填写你的身份信息</p>
    <van-form @submit="onSubmit">
      <!-- <van-field
          v-model="username"
          name="username"
          label="持卡人"
          placeholder="请输入持卡人姓名"
          :rules="[{ required: true, message: '请输入持卡人姓名' }]"
      />-->
      <div class="common_box">
        <van-field v-model="username" name="username" label="持卡人" placeholder="请输入持卡人姓名"/>
      </div>

      <p class="tips">请填写你的银行卡信息</p>
      <div class="common_box">


        <van-field
          v-model="number1"
          type="tel"
          name="number"
          label="银行卡号"
          placeholder="请输入银行卡号"
          :rules="[{ validator, message: '请输入正确银行卡号' }]"
        />
        <div class="bankImg">
          <div>所属银行</div>
          <img v-show="bankUrl!=''&&isTgyz" :src="bankUrl" alt="">
        </div>

        <!-- <van-field
            v-model="number3"
            name="branch"
            label="支行名称"
            placeholder="例如:北京海淀支行行"
            :rules="[{ required: true, message: '支行名称' }]"
        />-->
        <van-field v-model="number3" name="branch" label="支行名称" placeholder="例如：北京海淀支行"/>
        <van-popup v-model="showPicker" position="bottom">
          <van-picker :columns="areaList"
                      show-toolbar
                      confirm-button-text="保存"
                      @cancel="showPicker=false"
                      @confirm="confirm"
          />
        </van-popup>
        <van-field
          readonly
          clickable
          name="picker"
          :value="value"
          label="开户行城市"
          placeholder="点击选择城市"
          @click="showPicker = true"
        />
      </div>

      <p class="tips clo-g">平台智能加密，保障你用卡安全</p>
      <div style="margin: 0.1rem;">
        <van-button
          block
          type="info"
          native-type="submit"
          style="background-color: #009900;border-color: #009900"
        >完成
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
    import Area from "../../../api/user";

    export default {
        name: "add-bank-card",
        data() {
            return {
                username: "",
                number1: "",
                bankUrl: "",
                number2: "",
                number3: "",
                province: '',
                city: "",
                area: "",
                value: "",
                isTgyz: false,
                bank: {},//银行卡信息
                areaList: Area,
                value: "",
                showPicker: false
            };
        },
        watch: {
            number1: function (val) {
                this.isTgyz = false;
                this.bankUrl = '';
            }
        },
        methods: {
            // 底部选择省市弹窗
            showPopup() {
                this.showPicker = true;
            },
            // 底部选择省市弹窗 确定按钮
            confirm(e) {
                this.value = e.join('/');
                this.province = e[0];
                this.city = e[1];
                this.area = e[2];
                this.showPicker = false;

                // console.log(e);
                // console.log(this.province);
            },
            // 底部选择省市弹窗 取消按钮
            cancel() {
                this.showPicker = false;
            },
            onSubmit(value) {
                let _this = this;
                if (_this.value == "") {
                    _this.$toast("请选择开户行城市");
                    return false;
                } else {
                    let addmsg = {
                        method: "add.bank.item",
                        username: this.username,
                        name: this.bank.bankName,
                        branch: this.number3,
                        number: this.number1,
                        province: this.province,
                        city: this.city,
                        area: this.area,
                        default: '1',
                        bank_code: this.bank.bank,
                    };
                    // console.log(addmsg)
                    this.$post("/api/v1/bank", addmsg)
                        .then(response => {
                            if (response.status == 200) {
                                _this.$toast("添加成功");
                                _this.$router.back(-1);
                            } else {
                                _this.$toast(response.message);
                            }
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },
            //银行卡正则效验
            validator(val) {
                // console.log(111111111)
                var pattern = /^\d{16,19}$/;
                if (pattern.test(val)) {
                    this.isTgyz = true;
                    this.matchBank();
                } else {
                    this.isTgyz = false;
                }
                return pattern.test(val);
            },
            //匹配银行卡信息
            matchBank() {
                let ad_data = {
                    method: "get.bank.type",
                    number: this.number1
                };
                this.$post("/api/v1/bank", ad_data)
                    .then(res => {
                        if (res.status == 200) {
                            this.bankUrl = res.data.bankImg;
                            this.bank = res.data;
                        } else {
                            this.$toast('请输入正确的银行卡号码');
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
    };
</script>

<style scoped lang="scss">
  .content {
    .common_box {
      padding: 0 0.1rem;

      > > > .van-cell {
        padding: 0.1rem;
      }
    }

    .tips {
      padding: 0.1rem;
      text-align: left;
      color: #999999;
    }

    /deep/ form {
      .van-field__label {
        text-align: left;
      }

      input,
      .van-field__error-message {
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

  .bankImg {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.1rem;
    background-color: #fff;
    position: relative;

    > img {
      width: 120px;
    }
  }

  .bankImg:after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 16px;
    border-bottom: 1px solid #ebedf0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
  }


</style>
