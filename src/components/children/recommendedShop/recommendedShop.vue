<template>
    <div class='content'>
        <div class="inputs">
            <van-field v-model="input" label="店铺名称：" placeholder="请输入店铺名称"/>
            <van-field v-model="input1" label="联系电话：" placeholder="请输入联系电话"/>
            <div class="address" @click="show=true">
                <div>
                    <span>所属区域：</span>
                    <span>{{province}}/{{city}}/{{county}}</span>
                </div>
                <van-icon name="arrow" color='#9d9f9f'/>
            </div>
            <van-field v-model="input2" label="详细地址：" placeholder="请输入详细地址"/>
            <div class="hrDiv"></div>
            <van-field v-model="input3" label="推荐人：" placeholder="请输入推荐人"/>
            <div class="hrDiv"></div>
            <div class="uploaderImgs">
                <p>上传法人身份证（正反面）：</p>
                <van-uploader 
                    :after-read="afterRead" 
                    v-model="fileList" 
                    multiple 
                    :max-count="2"
                />
            </div>
            <div class="hrDiv"></div>
            <div class="uploaderImgs">
                <p>上传营业执照（3证合一）：</p>
                <van-uploader 
                    :after-read="afterReadTwo" 
                    v-model="fileListTwo" 
                    multiple 
                    :max-count="4"
                />
            </div>
            <div class="btn">提交申请</div>
        </div>
        <van-overlay :show="show">
            <div class="Mask">
                <van-area :area-list="areaList" 
                @confirm="confirm"
                @cancel="show=false"
                />
            </div>
        </van-overlay>
    </div>
</template>

<script>
    import {Area} from '../../../assets/js/Area.js'
  export default {
  components: {},
  data () {
    return {
        areaList: Area,
        province: '选择省',
        city: '市',
        county: '（区/县）',
        show: false,
        input: '',
        input1: '',
        input2: '',
        input3: '',
        fileList: [],
        fileListTwo:[]
    }
  },
  methods: {
      confirm ( e ) {
        //   console.log(e);
          this.province = e[0].name;
          this.city = e[1].name;
          this.county = e[2].name;
          this.show = false;
      },
        afterRead (file) {
          // 此时可以自行将文件上传至服务器
        //   console.log(file);
        },
        afterReadTwo (file) {
          // 此时可以自行将文件上传至服务器
          console.log(file);
        },
  },
  created () {
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>
<style lang="scss" scoped>
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