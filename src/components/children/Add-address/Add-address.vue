<template>
  <div class="content">
    <div class="common_box left_ttl">联系人</div>
    <div class="common_box ipt_box">
      <van-field v-model="allinput.input1" label="姓名：" placeholder="请填写收货人姓名"/>
    </div>
    <div class="common_box ipt_box">
      <van-field v-model="allinput.input2" type="number" label="手机号：" placeholder="请填写收货手机号"/>
    </div>
    <div class="common_box left_ttl">收货地址</div>


    <div class="common_box ipt_box">

      <div class="left_name">所在地区：</div>
      <div class="right_ipt select_address">
        <van-cell is-link @click="showPopup" style="padding-left: 0;padding-right: 0">{{Areas}}</van-cell>
      </div>
    </div>


    <van-popup
      v-model="areashow"
      position="bottom"
      :lazy-render='false'
    >
      <!-- <van-area
        :area-list="areaList"
        title=""
        confirm-button-text="保存"
        @confirm="confirm"
        @cancel="cancel"
        :value="defaultCode"
      /> -->
      <van-picker :columns="areaList"
                  show-toolbar
                  confirm-button-text="保存"
                  @cancel="areashow=false"
                  @confirm="confirm"
                  @change="onChange"
                  ref="picker"
      />
    </van-popup>

    <div class="common_box ipt_box">
      <van-field v-model="allinput.input4" label="详细地址：" placeholder="街道，门牌号等"/>
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
        <van-switch v-model="value1" active-color="#009900" inactive-color="#DCDFE6" size="18px"/>

      </div>
    </div>

    <div class="common_btn btn" @click="baocun">
      保存
    </div>
  </div>

</template>

<script>
    import AreaArr from '../../../api/user.json'

    export default {
        name: "Add-address",

        data() {
            return {
                allinput: {
                    input1: '',
                    input2: '',
                    input4: '',
                },
                value1: false,
                defaultCode: '500000,500100,500103',
                show: false,
                areashow: false,
                areaList: AreaArr,
                Areas: '请选择地区',
                chooseAreasCode: {},
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
                            _this.allinput.input1 = addressmsg[i].name
                            _this.allinput.input2 = addressmsg[i].phone
                            _this.allinput.input4 = addressmsg[i].address

                            _this.Areas = addressmsg[i].province + "/" + addressmsg[i].city + "/" + addressmsg[i].area
                            // console.log(_this.Areas);
                            // _this.$refs.picker.setValues(['重庆市', '重庆市', '江北区']);
                            _this.defaultCode = addressmsg[i].province_id + ',' + addressmsg[i].city_id + ',' + addressmsg[i].area_id
                            _this.chooseAreasCode.province = addressmsg[i].province
                            _this.chooseAreasCode.city = addressmsg[i].city
                            _this.chooseAreasCode.area = addressmsg[i].area
                            _this.chooseAreasCode.province_id = addressmsg[i].province_id
                            _this.chooseAreasCode.city_id = addressmsg[i].city_id
                            _this.chooseAreasCode.area_id = addressmsg[i].area_id
                            _this.value1 = addressmsg[i].default == 1 ? true : false
                        }
                    }
                }
            },
            // 底部选择省市弹窗
            showPopup() {
                // console.log(this.chooseAreasCode.province)
                // this.$refs.picker.setValues(['重庆市', '重庆市', '江北区']);
                this.areashow = true;
            },
            onChange(picker, values, index) {
                // console.log(picker)
                // console.log(values)
                // console.log(index)
            },
            // 底部选择省市弹窗 确定按钮
            confirm(e) {
                console.log(e)
                this.areashow = false;
                this.Areas = e.join('/');
                this.chooseAreasCode.province = e[0];
                this.chooseAreasCode.city = e[1];
                this.chooseAreasCode.area = e[2];
                // this.$refs.picker.setValues([e[0], e[1], e[2]]);
                for (let i in this.areaList) {
                    if (this.areaList[i].text == e[0]) {
                        console.log(this.areaList[i].id);
                        this.chooseAreasCode.province_id = this.areaList[i].id;
                        let list = this.areaList[i].children;
                        for (let n in list) {
                            if (list[n].text == e[1]) {
                                console.log(list[n].id)
                                this.chooseAreasCode.city_id = list[n].id;
                                let list2 = list[n].children;
                                for (let s in list2) {
                                    if (list2[s].text == e[2]) {
                                        console.log(list2[s].id)
                                        this.chooseAreasCode.area_id = list2[s].id;
                                    }
                                }
                            }
                        }
                    }
                }
                // console.log(this.chooseAreasCode)
            },
            // 底部选择省市弹窗 取消按钮
            cancel() {
                this.areashow = false;
            },
            //保存
            baocun: function () {
                let newValue = this.$route.query.addressid;
                var flag = 0,
                    _this = this;
                for (let key in _this.allinput) {
                    if (_this.allinput[key] == '') {
                        flag = 1
                    } else if (_this.chooseAreasCode.province == undefined) {
                        flag = 2
                    } else {
                        flag = 0
                    }
                }
                ;
                if (flag == 1) {
                    this.$toast({
                        message: '请填写完整哦',
                        type: 'fail',
                    });
                } else if (flag == 2) {
                    this.$toast({
                        message: '还未选择城市哦',
                        type: 'fail',
                    });
                } else {
                    let _this = this
                    if (newValue == 'add') {
                        // 新增保存
                        let address = {
                            method: 'add.address.item',
                            name: this.allinput.input1,
                            phone: this.allinput.input2,
                            address: this.allinput.input4,
                            default: this.value1 == false ? 0 : 1
                        };
                        let newaddress = Object.assign(address, _this.chooseAreasCode)
                        // console.log(_this.chooseAreasCode);
                        _this.$post('/api/v1/address', newaddress)
                            .then((response) => {
                                if (response.status == 200) {
                                    this.$toast('添加成功');
                                    this.$router.back(-1);
                                } else {
                                    this.$toast(response.message);
                                }
                            }).catch(function (error) {
                            console.log(error);
                        });
                    } else {
                        //修改保存
                        let address = {
                            method: 'set.address.item',
                            name: _this.allinput.input1,
                            phone: _this.allinput.input2,
                            address: _this.allinput.input4,
                            id: _this.$route.query.addressid,
                            default: this.value1 == false ? 0 : 1
                        };
                        let newaddress = Object.assign(address, _this.chooseAreasCode)
                        // console.log(_this.chooseAreasCode);
                        this.$post('/api/v1/address', newaddress)
                            .then((response) => {
                                if (response.status == 200) {
                                    this.$toast('修改成功');
                                    this.$router.back(-1);
                                } else {
                                    this.$toast(response.message);
                                }
                            }).catch(function (error) {
                            console.log(error);
                        });
                    }
                }
            },
        },

        mounted() {
            // this.$refs.picker.setValues(["四川省", "成都市", "锦江区"]);
            // let value = this.$refs.picker.getValues();
            // console.log(value);
            if (this.$route.query.addressid != 'add') {
                this.getmsg();
            }

        },

    }
</script>

<style scoped lang="scss">
  .content {
    .common_box {
      margin-bottom: 0;
      text-align: left;

      > > > .van-cell {
        padding: 0;
      }

      .left_name {
        width: 90px;
      }
    }

    .ipt_box {
      display: flex;
      align-items: center;

      .right_ipt {
        flex: 1;
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

  .btn {
    margin: 0.2rem 0.1rem 0 0.1rem;
  }
</style>
