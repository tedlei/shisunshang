<template>
    <div>
        <div>
            <qrcode url="http://www.gjst.net/" :iconurl="tou" :wid="200" :hei="200"></qrcode>
        </div>
        
    </div>
</template>

<script>
import qrcode from 'vue_qrcodes'
export default {
    components:{
        qrcode
    },
    props:{},
    data(){
      return {
           tou: ''
      }
    },
    watch:{},
    computed:{},
    methods:{
        
        
    },
    created(){
        let user = JSON.parse(this.$store.getters.getuserinfo);
        this.tou = user.portrait;
        // console.log(user);
    },

};
</script>
<style lang="scss" scoped>
    
</style>