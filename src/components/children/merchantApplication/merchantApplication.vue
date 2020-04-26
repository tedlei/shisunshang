<template>
  <div class='content'>
    <!-- <div>公司信息</div> -->
    <div class="inputs">
      <van-field v-model="input" label="公司名称：" placeholder="请填写公司名称"/>
      <!-- <van-field v-model="input1" label="营业时间：" placeholder="请填写营业时间"/> -->
      <div class="address" >
        <div>
          <span class="addressSpan">营业时间：</span>
          <div class="startDatetime" @click="showDatetime=true">
              <span>{{currentTimeMsg}}</span>
            <van-icon name="arrow" color='#9d9f9f'/>
          </div>
          &nbsp;一&nbsp;至&nbsp;一&nbsp;&nbsp;
          <div class='startDatetime' @click="showDatetimeTwo=true">
              <span>{{currentTimeMsgTwo}}</span>
            <van-icon name="arrow" color='#9d9f9f'/>
          </div>
        </div>
      </div>
      <div class="address" @click="show=true">
        <div>
          <span class="addressSpan">公司地址：</span>
          <span>{{province[0]}}/{{province[1]}}/{{province[2]}}</span>
        </div>
        <van-icon name="arrow" color='#9d9f9f'/>
      </div>
      <van-field v-model="input2" label="详细地址：" placeholder="请输入详细地址"/>
      <van-field v-model="input3" type="number" label="公司电话：" placeholder="请输入公司办公电话"/>
      <!-- <van-field v-model="Recommender" type="number" label="推荐人：" placeholder="请输入推荐人电话（选填）"/> -->
      <div class="hrDiv"></div>
      <div class="address" @click="show2=true">
        <div>
          <span>经营分类：</span>
          <span>
              {{classList}}
          </span>
        </div>
        <van-icon name="arrow" color='#9d9f9f'/>
      </div>
      <div class="hrDiv"></div>
      <van-field
        v-model="message"
        rows="3"
        autosize
        label="经营范围："
        type="textarea"
        maxlength="200"
        placeholder="请输入公司经营范围"
        show-word-limit
      />
      <div class="hrDiv"></div>
      <div class="uploaderImgs">
        <p>上传商家首页封面：</p>
        <imgOSSuploader :maxCount='1' :reading='readingF' @imgUpData='imgUpData'></imgOSSuploader>
      </div>
      <div class="hrDiv"></div>
      <div class="uploaderImgs">
        <p>上传商家展示宣传照：</p>
        <imgOSSuploader :maxCount='9' :reading='readingX' @imgUpData='imgUpDataTwo'></imgOSSuploader>
      </div>
      <div :class="btnBk?'btn btnTwo':'btn'" @click="upData">{{$route.query.state=='edit'?'保存':'提交申请'}}</div>
      <!-- <div @click="ditu">滴滴滴滴滴滴</div> -->
    </div>

    <van-popup
      v-model="show"
      position="bottom"
      >
      <!-- <van-area 
        :area-list="areaList"
        confirm-button-text="保存"
        @confirm="confirm"
        @cancel="show=false"
      /> -->
      <van-picker :columns="areaList"
                  show-toolbar
                  confirm-button-text="保存"
                  @cancel="show=false"
                  @confirm="confirm"
      />
    </van-popup>
    <van-popup
      v-model="show2"
      position="bottom"
    >
      <van-picker :columns="classArr"
                  show-toolbar
                  confirm-button-text="保存"
                  @cancel="show2=false"
                  @confirm="onConfirm"
      />
    </van-popup>
    <!--    <van-overlay :show="show">-->
    <!--      <div class="Mask">-->

    <!--      </div>-->
    <!--    </van-overlay>-->


    <!--    <van-overlay :show="show2">-->
    <!--      <div class="Mask">-->
    <!--        -->
    <!--      </div>-->
    <!--    </van-overlay>-->
    <!-- 时间选择器 -->
    <van-popup
      v-model="showDatetime"
      position="bottom"
        >
        <van-datetime-picker
            v-model="currentTime"
            type="time"
            :min-hour="0"
            :max-hour="24"
            @confirm="formatter"
            />
    </van-popup>
    <van-popup
      v-model="showDatetimeTwo"
      position="bottom"
        >
        <van-datetime-picker
            v-model="currentTimeTwo"
            type="time"
            :min-hour="0"
            :max-hour="24"
            @confirm="formatterTwo"
            />
    </van-popup>
  </div>
</template>

<script>
    import {Area} from '../../../assets/js/Area.js'
    import imgOSSuploader from '../../children/imgOSS/uploader'
    import imgUpload from '../../../api/imgUpload'
    import AreaArr from '../../../api/user.json'
    import ditu from '../../../assets/js/wechatConfig'
    import {Throttle} from "../../../assets/js/utils"

    export default {
        components: {
            imgOSSuploader,
        },
        data() {
            return {
                areaList: AreaArr,
                province: [
                    '选择省',
                    '市',
                    '（区/县）',
                ],
                show: false,
                classArr: [ ],
                show2: false,
                classList: '请选择公司经营分类',
                upclassId: '',
                message: '',
                Recommender: '',
                input: '',
                input1: '',
                input2: '',
                input3: '',
                upfileList: [],
                readingF: [], 
                upfileListTwo: [],
                readingX: [],
                imgurls: [],
                btnBk: false,
                currentTime: '08:00',
                currentTimeMsg: '开始时间',
                showDatetime: false,
                showDatetimeTwo: false,
                currentTimeTwo: '12:00',
                currentTimeMsgTwo: '结业时间',
            }
        },
        methods: {
            formatter(value){
                // console.log(value)
                this.currentTimeMsg = value;
                this.showDatetime=false;
            },
            formatterTwo(value){
                this.currentTimeMsgTwo = value;
                this.showDatetimeTwo=false;
            },
            confirm(e) {
                console.log(e);
                this.province = e;
                this.show = false;
                let list = this.areaList.filter( item => {
                  return item.text==e[0];
                });
                // console.log(list);
                this.province.push(list[0].id);
                let listTwo = list[0].children.filter( item => {
                  return item.text==e[1];
                });
                // console.log(listTwo)
                this.province.push(listTwo[0].id);

                let listSan = listTwo[0].children.filter( item => {
                  return item.text==e[2];
                });
                // console.log(listSan)
                this.province.push(listSan[0].id);
                // console.log(this.province);
            },

            getClassArr() {
              let ad_data = {
                  method: "get.user.strre.category.list"
              };
              this.$post('/api/v1/UserStoreCategory', ad_data)
                  .then((res) => {
                      // console.log(res);
                      if (res.status == 200) {
                          for (var i in res.data) {
                              this.classArr.push({
                                  text: res.data[i].cate_name,
                                  children: []
                              });
                              let list = res.data[i].sub;
                              for (var n in list) {
                                  this.classArr[i].children.push({
                                      id: list[n].id,
                                      text: list[n].cate_name,
                                  })
                              }
                          }
                      }
                  }).catch(function (error) {
                  console.log(error);
              });
            },
            onConfirm(e) {
                // console.log(e);
                this.classList = e.join('/');
                this.show2 = false;
                for (var i in this.classArr) {
                    if (this.classArr[i].text == e[0]) {
                        let list = this.classArr[i].children;
                        for (var n in list) {
                            if (list[n].text == e[1]) {
                                this.upclassId = list[n].id;
                            }
                        }
                    }
                }
                // console.log(this.upclassId)

            },

            imgUpData(data) {
                console.log(data);
                this.upfileList = data;
            },
            imgUpDataTwo(data) {
                // console.log(data);
                this.upfileListTwo = data;
            },
            //提交按钮节流后提交
            upData:Throttle( function() {
                // console.log(this);
                this.btnBk= true;
                this.$store.commit('setLoading');
                let imglist = [...this.upfileList, ...this.upfileListTwo];
                // console.log(imglist)
                if(this.input==''){
                  this.$toast('公司名称不能为空');
                  this.$store.commit('setLoading');
                  this.btnBk= false;
                  return;
                }else if(this.currentTimeMsg=='开始时间'&&this.currentTimeMsgTwo=='结业时间'){
                  this.$toast('营业开始时间和结业时间不能为空');
                  this.$store.commit('setLoading');
                  this.btnBk= false;
                  return;

                }else if(this.province[0]=='选择省'){
                  this.$toast('请选择公司地址');
                  this.$store.commit('setLoading');
                  this.btnBk= false;
                  return;

                }else if(this.input2==''){
                  this.$toast('详细地址不能为空');
                  this.$store.commit('setLoading');
                  this.btnBk= false;
                  return;

                }else if(this.input3==''){
                  this.$toast('公司电话不能为空');
                  this.$store.commit('setLoading');
                  this.btnBk= false;
                  return;

                }else if(this.classList=='请选择公司经营分类'){
                  this.$toast('请选择公司经营分类');
                  this.$store.commit('setLoading');
                  this.btnBk= false;
                  return;

                }else if(this.message==''){
                  this.$toast('经营范围不能为空');
                  this.$store.commit('setLoading');
                  this.btnBk= false;
                  return;

                }else if(this.upfileList.length==0){
                    this.$toast('封面不能为空');
                    this.$store.commit('setLoading');
                    this.btnBk= false;
                    return;

                }else if(this.upfileListTwo.length==0){
                  this.$toast('宣传照不能为空');
                  this.$store.commit('setLoading');
                  this.btnBk= false;
                  return;
                }
                if(imglist.length==0){
                    this.$store.commit('setLoading');
                    this.btnBk= false;
                    return;
                }
                imgUpload(imglist).then(imgurls => {
                    // console.log(imgurls)
                    let album = [];
                    for (var i in imgurls) {
                        if (i != 0) {
                            album.push(imgurls[i]);
                        }
                    }
                    let ad_data = {
                        method: "add.user.store.item",
                        name: this.input,
                        province: this.province[0],
                        province_id: this.province[3],
                        city: this.province[1],
                        city_id: this.province[4],
                        area: this.province[2],
                        area_id: this.province[5],
                        // referee: this.Recommender,
                        address: this.input2,
                        mobile: this.input3,
                        bus_scope: this.message,
                        cate_id: this.upclassId,
                        bus_hours: this.currentTimeMsg+'~'+this.currentTimeMsgTwo,
                        imgurl: imgurls[0],
                        album: album
                    };
                    // console.log(ad_data)
                    this.$post('/api/v1/userStore', ad_data)
                        .then((res) => {
                            // console.log(res);
                            if (res.status == 200) {
                                this.$notify({ type: 'success', message: '入驻成功' });
                                this.$store.commit('setLoading');
                                this.btnBk= false;
                                this.$router.push({path: '/mine/nearby'});
                            } else {
                                this.$store.commit('setLoading');
                                this.btnBk= false;
                                this.$toast(res.message);
                            }
                        }).catch(function (error) {
                        console.log(error);
                    });
                })
            },1500),
            //编辑保存
            editAdd() {

            },
          
            //获取坐标
            isGteLocation(value){
              if(!value){
                this.$dialog.alert({
                  title: '提示',
                  message: '获取位置失败,是否重新获取',
                }).then(() => {
                  this.getLocation(this.isGteLocation); 
                }) .catch(() => {
                })
              }else{
                this.tc('获取坐标成功'+value.latitude+" "+value.longitude)
              }
            }
        },
        created() {
            // this.getLocation(this.isGteLocation);   //获取坐标
            // console.log(this.$store.getters.getMerchantApplicationObj)
            // console.log(this.$route.query.id)
            // if(this.$route.query.id){
            //   let obj = this.$store.getters.getMerchantApplicationObj;
            //   this.input = obj.name;
            //   this.input1 = obj.bus_hours;
            //   this.province[0] = obj.province;
            //   this.province[1] = obj.city;
            //   this.province[2] = obj.area;
            //   this.input2 = obj.address;
            //   this.input3 = obj.mobile;
            //   this.classList = obj.category1.cate_name+ '/' +obj.category.cate_name;
            //   this.message = obj.bus_scope;
            //   this.readingF[0] = obj.imgurl;
            //   this.readingX = obj.album;
            // }
            this.getClassArr();
        },
        mounted(){
          // console.log(AreaArr)
        },
        computed: {},
        watch: {}
    }
</script>
<style lang="scss" scoped>
  // .content>div:first-child{
  //     text-align: left;
  //     color: #999999;
  //     font-size: 0.14rem;
  //     padding: 0.1rem 0 0 0.1rem;
  // }
  .inputs {
    margin:0 0 0.1rem 0;

    .address {
      height: 44px;
      background-color: #fff;
      padding: 10px 16px;
      text-align: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
        text-align: center;
        .addressSpan{
            width: 90px;
            text-align: center;
        }
      > div:first-child {
        display: flex;
        font-size: 14px;

        > span:first-child {
          width: 90px;
        }

        > span:nth-child(2) {
          color: #9d9f9f;
        }
      }

    }

    .hrDiv {
      height: 0.1rem;
    }
  }

  .Mask {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .uploaderImgs {
    background-color: #fff;
    padding: 0.1rem;
    text-align: left;

    > P {
      margin: 0 0 0.2rem 0;
    }
  }

  .btn {
    line-height: 0.5rem;
    margin: 0.8rem 0.1rem;
    background-color: $sss-color;
    border-radius: 5px;
    color: #fff;
  }
  .btnTwo{
    background-color: #9d9f9f;
  }
  .wrapper{
        width: 100%;
        height: 100%;
        display: flex;
        align-items:flex-end;
  }
  .startDatetime{
      width: 0.9rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #9d9f9f;
  }
</style>
