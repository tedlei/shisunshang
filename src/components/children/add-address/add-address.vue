<template>
  <div class="content">
    <div class="common_box left_ttl">联系人</div>
    <div class="common_box ipt_box">
      <div class="left_name">姓名：</div>
      <div class="right_ipt">
        <el-input v-model="input1" placeholder="请填写收货人姓名"></el-input>
      </div>
    </div>
    <div class="common_box ipt_box">
      <div class="left_name">手机号：</div>
      <div class="right_ipt">
        <el-input v-model="input2" placeholder="请填写收货人姓名"></el-input>
      </div>
    </div>
    <div class="common_box left_ttl">收货地址</div>
    <div class="common_box ipt_box">
      <div class="left_name">所在地区：</div>
      <div class="right_ipt select_address">
        <input type="text" v-model="input3" id="getArea" placeholder="请选择地区" value="" readonly="">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="common_box ipt_box">
      <div class="left_name">详细地址：</div>
      <div class="right_ipt">
        <el-input v-model="input4" placeholder="街道，门牌号等"></el-input>
      </div>
    </div>
    <div class="common_box ipt_box">
      <div class="left_name">所在小区：</div>
      <div class="right_ipt">
        <el-input v-model="input5" placeholder="请输入详细地址后再选择小区"></el-input>
      </div>
    </div>

    <div class="common_box ipt_box">
      <div class="left_name">设为默认地址</div>
      <div class="right_ipt" style="text-align: right">
        <el-switch
          v-model="value1"
          active-color="#009900"
          active-text=""
          inactive-text="">
        </el-switch>
      </div>
    </div>

  </div>
  <!--    <button @click="choose">点我选择区域</button>-->
  <!--    <p>您选择的城市为:<span>{{txt1}}</span><span>{{txt2}}</span><span>{{txt3}}</span></p>-->
  <!--    <p class="pwrap" v-if="show">-->
  <!--      <v-distpicker type="mobile" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>-->
  <!--    </p>-->
</template>

<script>

  import VDistpicker from 'v-distpicker'

  export default {
    name: "add-address",
    components: {VDistpicker},
    data() {
      return {
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        value1: false,
      }
    },
    methods: {


      // choose() {
      //       this.show = !this.show
      //     },
      //     onChangeProvince(a) {
      //       console.log(a)
      //       this.txt1 = a.value + '-'
      //     },
      //     onChangeCity(a) {
      //       console.log(a)
      //       this.txt2 = a.value + '-'
      //     },
      //     onChangeArea(a) {
      //       console.log(a)
      //       this.txt3 = a.value
      //       this.show = false
      //     }
      //   }
    },
    mounted() {
      //地址选择
      $('#getArea').getArea({
        defaultArea: [21, 0, 0],
        inpEle: '#getArea',
        normalArea: true
      });
    }
  }
</script>

<style scoped lang="scss">
  .content {
    .common_box {
      margin-bottom: 0;
      text-align: left;
      .left_name{
        min-width: max-content;
      }
    }
    .ipt_box{
      display: flex;
      align-items: center;
      .right_ipt{
        width: 100%;
      }
      .right_ipt /deep/ input{
        background: none;
        padding-left: 0;
        border: none;
        outline: 0;
        line-height: 35px;
        width: 100%;
      }
    }

    .select_address{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 80%;
      i{
        font-size: 0.16rem;
      }
    }

    .left_ttl {
      background: none;
      color: #999999;
    }

    .pwrap {
      height: 100px;
      overflow: auto;
    }
  }
</style>
