<template>
    <div>
        <input
          @change="changeVideo"
          id="imgFile"
          class="upload_input"
          type="file"
          accept="video/*"
        />
        
    </div>
</template>

<script>
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