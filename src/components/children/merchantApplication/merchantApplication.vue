<template>
    <div class='content'>
        <!-- <div>公司信息</div> -->
        <div class="inputs">
            <van-field v-model="input" label="公司名称：" placeholder="请填写公司名称"/>
            <van-field v-model="input1" label="营业时间：" placeholder="请选择营业时间"/>
            <div class="address" @click="show=true">
                <div>
                    <span>公司地址：</span>
                    <span>{{province[0].name}}/{{province[1].name}}/{{province[2].name}}</span>
                </div>
                <van-icon name="arrow" color='#9d9f9f'/>
            </div>
            <van-field v-model="input2" label="详细地址：" placeholder="请输入详细地址"/>
            <van-field v-model="input3" type="number" label="公司电话：" placeholder="请输入公司办公电话"/>
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
                <imgOSSuploader :maxCount='1' @imgUpData='imgUpData'></imgOSSuploader>
            </div>
            <div class="hrDiv"></div>
            <div class="uploaderImgs">
                <p>上传商家展示宣传照：</p>
                <imgOSSuploader :maxCount='3' @imgUpData='imgUpDataTwo'></imgOSSuploader>
            </div>
            <div class="btn" @click="upData">提交申请</div>
        </div>
        <van-overlay :show="show">
            <div class="Mask">
                <van-area :area-list="areaList" 
                    @confirm="confirm"
                    @cancel="show=false"
                />
            </div>
        </van-overlay>
        <van-overlay :show="show2">
            <div class="Mask">
                <van-picker :columns="classArr" 
                    show-toolbar
                    @cancel="onCancel"
                    @confirm="onConfirm"
                />
            </div>
        </van-overlay> 
    </div>
</template>

<script>
import {Area} from '../../../assets/js/Area.js'
import imgOSSuploader from '../../children/imgOSS/uploader'
import imgUpload from '../../../api/imgUpload'
    
export default {
    components: {
        imgOSSuploader,
    },
    data () {
        return {
            areaList: Area,
            province: [
            {name:'选择省'},
            {name:'市'},
            {name:'（区/县）'},
            ],
            show: false,
            classArr: [
            // {
            //     text: '浙江',
            //     children: [
            //         {
            //             text: '杭州',
            //         }
            //     ]
            // }
            ],
            show2: false,
            classList: '请选择公司经营分类',
            upclassId: '',
            message: '',
            input: '',
            input1: '',
            input2: '',
            input3: '',
            upfileList:[],
            upfileListTwo:[],
            imgurls:[],
        }
    },
    methods: {
        confirm ( e ) {
          //   console.log(e);
            this.province = e;
            this.show = false;
        },

        getClassArr () {
            let ad_data = {
              method: "get.user.strre.category.list"
            };
            this.$post('/api/v1/UserStoreCategory', ad_data)
            .then((res) => {
              console.log(res);
              if(res.status==200){
                  for(var i in res.data){
                      this.classArr.push({
                          text: res.data[i].cate_name,
                          children: []
                      });
                      let list = res.data[i].sub;
                      for(var n in list){
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
        onCancel ( e ) {
            //   console.log(e);
          this.show2 = false;
        },
        onConfirm ( e ) {
            //   console.log(e);
            this.classList = e.join('/');
              this.show2 = false;
              for(var i in this.classArr){
                  if(this.classArr[i].text==e[0]){
                      let list = this.classArr[i].children;
                      for(var n in list){
                          if(list[n].text==e[1]){
                            this.upclassId = list[n].id;
                          }
                      }
                  }
              }
            //   console.log(this.upclassId)
            
        },
        imgUpData ( data ) {
            console.log(data);
            this.upfileList = data;
        },
        imgUpDataTwo ( data ) {
            console.log(data);
            this.upfileListTwo = data;

        },
        upData () {
            let imglist = [...this.upfileList,...this.upfileListTwo];
            // console.log(imglist)
            imgUpload(imglist).then(imgurls => {
                // console.log(imgurls)
                let album = [];
                for(var i in imgurls){
                  if(i!=0){
                    album.push(imgurls[i]);
                  }
                }
                let ad_data = {
                    method: "add.user.store.item",
                    name: this.input,
                    province: this.province[0].name,
                    province_id: this.province[0].code,
                    city: this.province[1].name,
                    city_id: this.province[1].code,
                    area: this.province[2].name,
                    area_id: this.province[2].code,
                    address: this.input2,
                    mobile: this.input3,
                    bus_scope: this.message,
                    cate_id: this.upclassId,
                    bus_hours: this.input1,
                    imgurl: imgurls[0],
                    album: album
                };
                console.log(ad_data)
                this.$post('/api/v1/userStore', ad_data)
                .then((res) => {
                    console.log(res);
                    if(res.status==200){
                        this.$router.push({path: '/mine/nearby'});
                    }else{
                        this.$toast(res.message);
                    }
                }).catch(function (error) {
                    console.log(error);
                }); 
            })

        },
        
      
        
  },
  created () {
      this.getClassArr();
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>
<style lang="scss" scoped>
    // .content>div:first-child{
    //     text-align: left;
    //     color: #999999;
    //     font-size: 0.14rem;
    //     padding: 0.1rem 0 0 0.1rem;
    // }
    .inputs{
        margin: 0.1rem  0;
        .address{
            height: 44px;
            background-color: #fff;
            padding: 10px 16px;
            text-align: left;
            display: flex;
            justify-content: space-between;
            align-items: center;
            >div:first-child{
                display: flex;
                font-size: 14px;
                >span:first-child{
                    width: 90px;
                }
                >span:nth-child(2){
                    color: #9d9f9f;
                }
            }
            
        }
        .hrDiv{
            height: 0.1rem;
        }
    }
    .Mask{
        position: absolute;
        bottom: 0;
        width: 100%;
    }
    .uploaderImgs{
        background-color: #fff;
        padding: 0.1rem;
        text-align: left;
        >P{
            margin: 0 0 0.2rem 0;
        }
    }
    .btn{
        line-height: 0.5rem;
        margin: 0.8rem 0.1rem;
        background-color: $sss-color;
        border-radius: 5px;
        color: #fff;
    }
</style>