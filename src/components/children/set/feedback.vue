<template>
    <div class="content">
        <div class="common_box" v-show="isFkcg">
            <van-field
              v-model="message"
              rows="4"
              :border="false"
              autosize
              type="textarea"
              maxlength="200"
              placeholder="请输入反馈内容"
              show-word-limit
            />
            <div class="upImg">
                <imgOSSuploader :maxCount='4' @imgUpData='imgUpData'></imgOSSuploader>
            </div>
        </div>
        <div :class="isBtn?'btn btnk':'btn'" @click="feedbackAdd" v-show="isFkcg">提交反馈</div>
        <div class="cg" v-show="!isFkcg">
            <img src="../../../assets/img/fkcg.png" alt="">
            <div>反馈成功</div>
            <div>感谢你对平台的关注和支持，我们会认真处理你的反馈，尽快修复和完善相关功能</div>
        </div>
    </div>
</template>

<script>
    import imgOSSuploader from '../../children/imgOSS/uploader'
    import imgUpload from '../../../api/imgUpload' 
    import {Throttle} from "../../../assets/js/utils"
    export default {
    components: {
        'imgOSSuploader':imgOSSuploader
    },
    data () {
        return {
            message: '',
            file:[],
            isFkcg: true,
            isBtn: true
        }
    },
    methods: {
        //上传组件回调
        imgUpData(data){
            this.file = data;
        },
        //节流后提交
        feedbackAdd:Throttle( function() {
            this.isBtn = true;
            if(this.message==''){
                this.$toast('内容不能为空');
                return;
            }
            if(this.file==0){
                this.upadd();
            }else{
                mgUpload(imglist).then(imgurls => {
                    this.upadd(imgurls);
                });
            }
        },1500),
        upadd(url){
            let arr = [];
            if(url)arr=url;
            let ad_data = {
                method: 'add.bug.item',
                content: this.message,
                content2: arr
            };
            // console.log(ad_data);
            this.$post('/api/v1/bug', ad_data)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        // this.$store.commit('setLoading');
                        // this.$toast('提交成功');
                        this.isBtn= false;
                        this.isFkcg=false;
                        // this.$router.push({path: '/mine'});
                    } else {
                        // this.$store.commit('setLoading');
                        this.isBtn= false;
                        this.$toast(res.message);
                    }
                }).catch(function (error) {
                console.log(error);
            });
        }
    },
    computed: {
        
    },
    watch: {
        'message': function(newVal){
            // console.log(typeof(newVal));
            // console.log(newVal=='')
            if(newVal==''){
                this.isBtn=true;
            }else{
                this.isBtn=false;
            }
            // this.fullname = newVal + '-' + this.lastname
        },
    }
}
</script>
<style lang="scss" scoped>
    .upImg{
        padding-left: 0.1rem;
        display: flex;
    }
    .btn{
        width: 85%;
        margin: 0.5rem auto;
        height: 0.4rem;
        line-height: 0.4rem;
        color: #fff;
        border-radius: 20px;
        background-color: $sss-color;
    }
    .btnk{
        background-color: #cccccc;
    }
    .cg{
        padding-top: 0.6rem;
        >img{
            width: 0.8rem;
            height: 0.8rem;
        }
        >div:nth-child(2){
            margin-top: 0.2rem;
            margin-bottom: 0.07rem;
            font-size: 0.15rem;
        }
        >div:nth-child(3){
            margin: 0 auto;
            width: 2.3rem;
            font-size: 0.1rem;
            color: #7b7b7b;
        }
    }
</style>