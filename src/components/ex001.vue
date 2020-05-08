<template>
    <div id='test'>
        <img style="width:100%;" v-if="imgUrl" :src="imgUrl">
    </div>
</template>

<script>
export default {
    components:{
        
    },
    data() {
        return {
            imgUrl:'',
        };
    },
    created(){
        this.loadImg()
    },
    methods: {
        loadImg(){
            let img = new Image();
            let canvas = document.createElement('canvas');
            let can = canvas.getContext("2d");
            img.onload=()=>{
                let {width,height} = img;
                canvas.width = width;
                canvas.height = height;
                can.drawImage(img, 0, 0, width, height);
                let img1 = new Image();
                img1.onload=()=>{
                    can.drawImage(img1, width*0.65, height*0.65,width*0.12,width*0.12);
                    can.font = width*0.0578 +"px bold 黑体";
                    can.fillStyle = "#000";
                    can.textAlign = "center";
                    can.fillText("石笋山旅游景区", width*0.5, height*0.27);
                    can.font = width*0.0266 +"px bold 黑体";
                    can.fillText("石笋山生态平台", width*0.72, height*0.72);
                    can.fillText("二零二零年四月十七日", width*0.72, height*0.78);
                    this.imgUrl = canvas.toDataURL("image/png")
                }
                img1.src = require('../assets/img/zhang.png');
            }
            img.src = require('../assets/img/cx.jpg');
        }
    }
};
</script>
<style lang="scss" scoped>

</style>
