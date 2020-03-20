<template>
    <div class="content">
      <div class="contentRadio">
        <van-radio-group v-model="radio">
          <div class="radios">
            <van-radio name="1" checked-color="#07c160">不开发票</van-radio>
          </div>
          <div class="radios">
            <van-radio name="2" checked-color="#07c160">开具发票</van-radio>
          </div>
        </van-radio-group>
        <div>
          <p>填写发票信息前，请仔细阅读
            <span @click="show = true">
              《发票须知》
            </span>
            </p>
        </div>
        <div v-show="radio=='2'">
          <div class="information">
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
            <div v-show="radioTwo=='1'"> 
              <van-field
                v-model="companyInput"
                rows="1"
                autosize
                label="*公司抬头"
                type="textarea"
                placeholder="请输入公司抬头名称"
                input-align="right"
              />
              <van-field
                v-model="companyInput2"
                rows="1"
                autosize
                label="*公司税号"
                type="textarea"
                placeholder="请输入公司税号"
                input-align="right"
              />
            </div>
            <div v-show="radioTwo=='2'">
              <van-field
                v-model="personalInput"
                rows="1"
                autosize
                label="*抬头名称"
                type="textarea"
                placeholder="建议填写个人姓名/店名"
                input-align="right"
              />
            </div>
          </div>
          <div style="height:0.1rem" v-show="radioTwo=='1'"></div>
          <div v-show="radioTwo=='1'">
            <van-field
              v-model="companyInput3"
              rows="1"
              autosize
              label="公司地址"
              type="textarea"
              placeholder="请输入公司地址"
              input-align="right"
            />
            <van-field
              v-model="companyInput4"
              rows="1"
              autosize
              label="公司电话"
              type="textarea"
              placeholder="请输入公司电话"
              input-align="right"
            />
            <van-field
              v-model="companyInput5"
              rows="1"
              autosize
              label="公司地址"
              type="textarea"
              placeholder="请输入公司地址"
              input-align="right"
            />
            <van-field
              v-model="companyInput6"
              rows="1"
              autosize
              label="开户银行"
              type="textarea"
              placeholder="请输入开户银行名称"
              input-align="right"
            />
            <van-field
              v-model="companyInput7"
              rows="1"
              autosize
              label="开户账号"
              type="textarea"
              placeholder="请输入开户银行账号"
              input-align="right"
            />
          </div>
        </div>
        <div class="primaryBtn">
            <van-button type="primary" color="#009900" :block="true" @click="upload">保存</van-button>
        </div>
      </div>
      <van-overlay :show="show" >
        <div class="wrapper" @click.stop>
          <div class="block">
            <p>发票须知</p>
            <p class="blockP">1、发票须知发票须知发票须知发票须知发票须知发票须知</p>
            <p class="blockP">2、发票须知发票须知发票须知发票须知发票须知发票须知</p>
            <p class="blockP">3、发票须知发票须知发票须知发票须知发票须知发票须知</p>
            <p class="blockP">4、发票须知发票须知发票须知发票须知发票须知发票须知</p>
            <p class="blockBtn" @click="show = false">我知道了</p>
          </div>
        </div>
      </van-overlay>
    </div>
</template>

<script>
  export default {
  components: {},
  data () {
    return {
      goods_id: '',
      goods_num: '',
      goods_sku_id: [],
      buy_type: '',

       radio: '1',
       radioTwo: '1',
       companyInput: '',
       companyInput2: '',
       companyInput3: '',
       companyInput4: '',
       companyInput5: '',
       companyInput6: '',
       companyInput7: '',
       personalInput: '',
       show: false
    }
  },
  methods: {
      upload () {
        this.$router.push({path:'/goodsdetails/makeorder',query:{
          id: this.goods_id,
          num: this.goods_num, 
          goods_sku_id: this.goods_sku_id, 
          buy_type: this.buy_type,
          information: this.radio
        }});
      }
  },
  created (){
    console.log(this.$route.query);
    if(this.$route.query.id==undefined || this.$route.query.num==undefined || this.$route.query.goods_sku_id==undefined){
      console.log(1)
      this.$router.push({path:'/'});
      return;
    }
    this.goods_id = this.$route.query.id;
    this.goods_num = this.$route.query.num;
    this.goods_sku_id = this.$route.query.goods_sku_id;
    this.buy_type = this.$route.query.buy_type;
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>
<style lang="scss" scoped>
    .contentRadio{
      background-color: #f2f2f2;
      text-align: left;
      .radios{
        width: 100%;
        padding: 0 0.1rem;
        height: 0.5rem;
        display: flex;
        background-color: #fff;
      }
      >div:nth-child(2){
        padding: 0.1rem 0.1rem;
        line-height: 0.3rem;
        margin-bottom: 0.2rem;
        >p{
          >span{
            color: #2528e7;
          }
        }
      }
      .information{
        margin-top: 0.1rem;
        background-color: #fff;
        .informationType{
          padding: 0.1rem;
          border-bottom: 1px solid #f2f2f2;
          display: flex;
          justify-content: space-between;
        }
      }
      .primaryBtn{
        margin: 0.7rem auto;
        width: 90%;
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
     color: #cccccc;
     >p:first-child{
       display: block;
       font-size: 0.16rem;
       line-height: 0.4rem;
       color: #000;
     }
     .blockP{
       text-align: left;
       margin-bottom: 0.1rem;
     }
     .blockBtn{
       display: block;
       border-top: 1px solid #cccccc;
       font-size: 0.16rem;
       color: $sss-color;
       margin-top: 0.2rem;
       line-height: 0.6rem;
     }
    }
</style>