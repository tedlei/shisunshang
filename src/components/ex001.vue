<template>
    <div>
        <input
          @change="changeVideo"
          id="imgFile"
          class="upload_input"
          type="file"
          accept="video/*"
        />
        <div @click="ditututu"></div>
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
            wechatAuth();
        }
    },
    created(){
        // this.getData();
    },
    mounted(){
    }
}
</script>
<style lang="scss" scoped>
   
</style>