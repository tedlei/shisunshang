<template>
  <div class="content">
    <div class="contentRadio">
      <div v-show="this.$route.query.state == 0">
        <van-radio-group v-model="radio" @change="change">
          <div class="radios">
            <van-radio name="1" checked-color="#07c160">不开发票</van-radio>
          </div>
          <div class="radios">
            <van-radio name="2" checked-color="#07c160">开具发票</van-radio>
            <div @click="myinvoice" class="radios_btn" v-show='radio==2' >我的发票</div>
          </div>
        </van-radio-group>

      </div>
      <van-form @submit="onSubmit">
        <div v-show="radio=='2'">
          <div class="common_box information">
            <div class="informationType">
              <div>
                发票类型
              </div>
              <div>
                <van-radio-group v-model="radioTwo" direction="horizontal">
                  <van-radio name="1" checked-color="#07c160">单位</van-radio>
                  <van-radio name="2" checked-color="#07c160">个人/非企业单位</van-radio>
                </van-radio-group>
              </div>
            </div>
          </div>

          <div v-if="radioTwo=='1'">
            <div class="common_box">
              <van-field
                v-model="companyInput"
                rows="1"
                autosize
                label="*公司抬头"
                name="title"
                type="textarea"
                placeholder="请输入公司抬头名称"
                input-align="right"
              />
              <van-field
                v-model="companyInput2"
                rows="1"
                autosize
                name="number"
                label="*公司税号"
                type="textarea"
                placeholder="请输入公司税号"
                input-align="right"
              />
            </div>

            <div class="common_box">
              <van-field
                v-model="companyInput3"
                rows="1"
                autosize
                label="公司地址"
                name="company_address"
                type="textarea"
                placeholder="请输入公司地址"
                input-align="right"
              />
              <van-field
                v-model="companyInput4"
                rows="1"
                autosize
                label="公司电话"
                name="conpany_phone"
                type="textarea"
                placeholder="请输入公司电话"
                input-align="right"
              />
              <van-field
                v-model="companyInput6"
                rows="1"
                autosize
                label="开户银行"
                name="conpany_bank"
                type="textarea"
                placeholder="请输入开户银行名称"
                input-align="right"
              />
              <van-field
                v-model="companyInput7"
                rows="1"
                autosize
                label="开户账号"
                name="conpany_bank_number"
                type="textarea"
                placeholder="请输入开户银行账号"
                input-align="right"
              />
            </div>
          </div>

          <!--个人-->
          <div class="common_box" v-if="radioTwo=='2'">
            <van-field
              v-model="personalInput"
              rows="1"
              autosize
              label="*抬头名称"
              name="title"
              type="textarea"
              placeholder="建议填写个人姓名/店名"
              input-align="right"
            />
          </div>
        </div>
        <div class="tips">
          <p>填写发票信息前，请仔细阅读
            <span style="color: #2528e7;" @click="show = true">
              《发票须知》
            </span>
          </p>
        </div>
        <div class="common_btn primaryBtn">
          <van-button type="primary" color="#009900" :block="true" native-type="submit">保存</van-button>
        </div>
      </van-form>

    </div>
    <van-overlay :show="show">
      <div class="wrapper" @click.stop>
        <div class="block">
          <p>发票须知</p>
          <p class="blockP">1、公司名称必须为工商注册登记的名称</p>
          <p class="blockP">2、开户银行名称与银行帐号两者必须是您公司开户许可证上的银行帐户</p>
          <p class="blockP">3、未经我司客服人员的允许，财务部门将不接受电话、传真、邮件、邮寄等形式的重开发票申请，如您擅自将发票寄到我公司的任一办公地址，在寄送过程中发生的发票遗失、缺失等情况，恕我们概不负责</p>
          <p class="blockP">4、如果您在收到货物的30天内还未收到发票，请您及时与我们的客服人员联系；超过90天（您成功下单之日起）未与我们联系的，我司将不再为已开发票的订单进行补开发票</p>
          <p class="blockBtn" @click="show = false">我知道了</p>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
    import Bus from "../../../assets/js/bus";

    export default {
        components: {},
        data() {
            return {
                radio: '',
                radioTwo: '1',
                companyInput: '',
                companyInput2: '',
                companyInput3: '',
                companyInput4: '',
                companyInput6: '',
                companyInput7: '',
                personalInput: '',
                show: false,
                shows: true,
            }
        },
        methods: {
            onSubmit(values) {
              // console.log(values);
              if(this.radioTwo=='1'&&this.radio!='1'){
                if(!this.companyInput){
                this.$toast('公司抬头不能为空')
                  return;
                }else if(!this.companyInput2){
                  this.$toast('公司税号不能为空')
                  return;
                }
              }
              if(this.radio=='1'){
                console.log("返回")
                this.$store.commit('sendIvcMsg', this.radio);
                this.$router.back(-1)
                return;
              }
              let parms = {
                  method: 'add.invoice.item',
                  type: Number(this.radioTwo),
                  is_default: 1
              };
              values = Object.assign(parms, values)
              // console.log(values);
              this.$post('/api/v1/Invoice', values)
                  .then((res) => {
                      if (res.status == 200) {
                        this.$store.commit('sendIvcMsg', this.radio);
                        this.$store.commit('setinvoice',values);
                        // console.log(this.$store.getters.getinvoice)
                          this.$toast('添加成功')
                          this.$router.back(-1);
                      } else {
                          this.$toast(res.message)
                      }
                  }).catch(function (error) {
                  console.log(error);
              });
              //调用router回退页面

            },
            change: function (e) {

            },
            myinvoice() {
              this.$router.push({
                path:'/mine/myinvoice',
                query:{entrance: 0}
              })
            }
        },
        mounted() {
            this.$route.query.state == 1 ? this.$store.commit('sendIvc', true) : this.$store.commit('sendIvc', false);
            // console.log(this.$store.state.IvcMsg.toString())
            this.radio = this.$route.query.state == 0 ? this.$store.state.IvcMsg.toString() : '2'
            // console.log(this.radio)
        },
        destroyed() {
            Bus.$off();
            this.$store.commit('sendIvc', false)
        },
        computed: {},
        watch: {}
    }
</script>
<style lang="scss" scoped>
  .contentRadio {
    text-align: left;
    .common_box{
      padding: 0 0.1rem;
      >>>.van-cell{
        padding: 0.1rem;
      }
    }
    .tips {
      padding: 0.1rem 0.1rem;
      line-height: 0.3rem;
      margin-bottom: 0.2rem;
    }
    .radios {
      width: 100%;
      padding: 0 0.1rem;
      height: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      .radios_btn{
        width: 1rem;
        height: 0.3rem;
        line-height: 0.3rem;
        text-align: center;
        background-color: #07c160;
        color: #fff;
        border-radius: 5px;
      }
    }

    > div {

      > p {
        > span {
          color: #2528e7;
        }
      }
    }

    .information {
      margin-top: 0.1rem;
      background-color: #fff;
      .informationType {
        padding: 0.1rem;
        display: flex;
        justify-content: space-between;
      }
    }

    .primaryBtn {
      margin: 0.1rem;
    }
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 2.8rem;
    background-color: #fff;
    border-radius: 10px;
    padding: 0.15rem 0.15rem 0 0.15rem;
    color: #a09f9f;

    > p:first-child {
      display: block;
      font-size: 0.16rem;
      line-height: 0.4rem;
      color: #000;
    }

    .blockP {
      text-align: left;
      margin-bottom: 0.1rem;
    }

    .blockBtn {
      display: block;
      border-top: 1px solid #cccccc;
      font-size: 0.16rem;
      color: $sss-color;
      margin-top: 0.2rem;
      line-height: 0.6rem;
    }
  }
</style>
