<template>
    <div class="content">
        <div class="common_box">
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
        <div :class="isBtn?'btn btnk':'btn'" @click="feedbackAdd">提交反馈</div>
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
            console.log(ad_data);
            return;
            this.$post('/api/v1/bug', ad_data)
                .then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        // this.$store.commit('setLoading');
                        this.$toast('提交成功');
                        this.isBtn= false;
                        this.$router.push({path: '/mine'});
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
</style>