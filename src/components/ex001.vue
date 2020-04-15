<template>
    <div>
        <input
          @change="changeVideo"
          id="imgFile"
          class="upload_input"
          type="file"
          accept="video/*"
        />
        <div @click="ditututu">滴滴滴滴滴滴</div>
    </div>
</template>

<script>
    import wechatAuth from "../assets/js/wechatConfig";
export default {
    components:{},
    props:{},
    data(){
      return {


      }
    },
    watch:{},
    computed:{},
    methods:{
        changeVideo(file) {
            console.log(file)
            var fileM = document.getElementById("imgFile").files[0];
            console.log(fileM)
        },
        ditututu() {
            let shareConfig = {
                title: '国健生态平台',
                desc: '国健生态平台!Come on.!',
                link: location.href.split('state')[0] + (location.search ? '&' : '?') + 'state=' + userinfo.referee_number,
                imgUrl: 'http://gj.wjeys.com/public/up/gj_wjeys_com-2-2-20191216184918-14_106_130_91-615694.jpg',
            };
            let url = location.href;
            wechatAuth(url,shareConfig,1);
        }
    },
    created(){
        // this.getData();
        localStorage.clear();
        // sessionStorage.setItem("usertoken",'')
    },
    mounted(){
    }
}
</script>
<style lang="scss" scoped>
   
</style>