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
        <input type="text" v-model="input3" id="getArea" placeholder="请选择地区" readonly>

        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <van-area
      :area-list="areaList"
      :columns-placeholder="['请选择', '请选择', '请选择']"
      title="标题"
    />
    <div class="common_box ipt_box">
      <div class="left_name">详细地址：</div>
      <div class="right_ipt">
        <el-input v-model="input4" placeholder="街道，门牌号等"></el-input>
      </div>
    </div>
    <!--    <div class="common_box ipt_box">-->
    <!--      <div class="left_name">所在小区：</div>-->
    <!--      <div class="right_ipt">-->
    <!--        <el-input v-model="Allinput.input5" placeholder="请输入详细地址后再选择小区"></el-input>-->
    <!--      </div>-->
    <!--    </div>-->

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
<!--  <button @click="choose">点我选择区域</button>-->
<!--  <p>您选择的城市为:<span>{{txt1}}</span><span>{{txt2}}</span><span>{{txt3}}</span></p>-->
<!--  <p class="pwrap" v-if="show">-->
<!--    <v-distpicker type="mobile" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>-->
<!--  </p>-->
</template>

<script>
    export default {
        name: "Add-address",

        data() {
            return {
                input1: '',
                input2: '',
                input3: '',
                input4: '',
                value1: false,
                defaultArea: [],
                show:false,
            }
        },
        computed: {
            listenStore() {
                return this.$store.state.addressid;
            }
        },
        watch: {
            listenStore: {
                handler(newValue, oldValue) {
                    if (newValue == 'add' || typeof (newValue) == 'number') {
                        console.log(321)
                        this.baocun(newValue)
                    }
                },
                deep: true
            }
        },
        methods: {
            //获取编辑信息
            getmsg: function () {
                let _this = this,
                    addressid = _this.$route.query.addressid,
                    addressmsg = typeof (_this.$store.getters.user_address_msg) == 'object' ?
                        _this.$store.getters.user_address_msg : JSON.parse(_this.$store.getters.user_address_msg);
                if (addressid) {
                    for (let i in addressmsg) {
                        if (addressid == addressmsg[i].id) {
                            _this.Allinput.input1 = addressmsg[i].name
                            _this.Allinput.input2 = addressmsg[i].phone
                            _this.Allinput.input3 = addressmsg[i].province + "," + addressmsg[i].city + "," + addressmsg[i].area
                            _this.Allinput.input4 = addressmsg[i].address
                            _this.defaultArea = [addressmsg[i].province_id, addressmsg[i].city_id, addressmsg[i].area_id]
                            _this.value1 = addressmsg[i].default == 1 ? true : false
                            // this.Allinput.input5 = addressmsg[i].address
                        }
                    }
                }
            },
            //地址选择
            // getArea: function () {
            //     var Area = [];
            //     if (this.$route.query.addressid == 'add') {
            //         console.log(321)
            //         Area = [21, 0, 0]
            //     } else {
            //         Area = this.defaultArea == [] ? [21, 0, 0] : this.defaultArea
            //     }
            //     $('#getArea').getArea({
            //         defaultArea: Area,
            //         inpEle: '#getArea',
            //         normalArea: true
            //     });
            //
            // },
            //保存
            baocun: function (newValue) {
                var flag = true;
                for (let key in allinput) {
                    if (allinput[key] == '') {
                        flag = false
                    } else {
                        flag = true
                    }
                }
                ;
                if (!flag) {
                    this.$message({
                        message: '请填写完整哦!',
                        type: 'warning',
                    });
                } else {
                    let _this = this
                    if (newValue == 'add') {
                        // 新增保存
                        let address = {
                            method: 'add.address.item',
                            name: this.Allinput.input1,
                            phone: this.Allinput.input2,
                            address: this.Allinput.input4,
                            id: this.$route.query.addressid,
                            default: this.value1 == false ? 0 : 1
                        };
                        let getArea = $('#getArea').getArea();
                        let newaddress = Object.assign(address, getArea)
                        _this.$post('/api/v1/address', newaddress)
                            .then((response) => {
                                _this.$message({
                                    message: '添加成功!',
                                    type: 'warning',
                                    onClose: function () {
                                        _this.$router.back(-1);
                                        window.location.reload()
                                    }
                                });
                                console.log(response.data)
                            }).catch(function (error) {
                            console.log(error);
                        });
                    } else {
                        //修改保存
                        let address = {
                            method: 'set.address.item',
                            name: this.Allinput.input1,
                            phone: this.Allinput.input2,
                            address: this.Allinput.input4,
                            id: this.$route.query.addressid,
                            default: this.value1 == false ? 0 : 1
                        };
                        let getArea = $('#getArea').getArea();
                        let newaddress = Object.assign(address, getArea)
                        this.$post('/api/v1/address', newaddress)
                            .then((response) => {
                                console.log(response.data)
                            }).catch(function (error) {
                            console.log(error);
                        });
                    }
                }
            },



        },

        mounted() {
            //这个是钩子函数
            //如果cartView函数要执行，必须先执行钩子函数
            //这个钩子函数完成了对cratView函数的调用
            //应该注意的是，使用mounted 并不能保证钩子函数中的 this.$el 在 document 中。为此还应该引入    Vue.nextTick/vm.$nextTick
            if (this.$route.query.addressid != 'add') {
                console.log(this.$route.query.addressid)
                // this.getmsg()
            }
        },
        updated() {
            console.log(11)
        }
    }
</script>

<style scoped lang="scss">
  .content {
    .common_box {
      margin-bottom: 0;
      text-align: left;

      .left_name {
        min-width: max-content;
      }
    }

    .ipt_box {
      display: flex;
      align-items: center;

      .right_ipt {
        width: 100%;
      }

      .right_ipt /deep/ input {
        background: none;
        padding-left: 0;
        border: none;
        outline: 0;
        line-height: 35px;
        width: 100%;
      }
    }

    .select_address {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 80%;

      i {
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
