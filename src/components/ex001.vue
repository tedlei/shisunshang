<template>
    <div id='test'>
        <!-- <img style="width:100%;" v-if="imgUrl" :src="imgUrl"> -->
        <div @click="woshifandou">aaaaaaaaaaaaa</div>
        <!-- <iframe style="width:100%;height:100vh;" name="iframekd" frameborder="0" src="https://m.kuaidi100.com/result.jsp?nu=JDX001600503173" ></iframe> -->
    </div>
</template>

<script>
import axios from 'axios'
import {Throttle} from "../assets/js/utils"
export default {
    components:{
        
    },
    data() {
        return {
            imgUrl:'',
        };
    },
    created(){
        // axios.get('https://m.kuaidi100.com/result.jsp?nu=JDX001600503173').then(res=>{
        //         console.log(res)
        //     })
        // this.loadImg();
    },
    mounted(){
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
                // this.imgUrl = canvas.toDataURL("image/png")
                // let img1 = new Image();
                // img1.onload=()=>{
                //     can.drawImage(img1, width*0.65, height*0.65,width*0.12,width*0.12);
                //     can.font = width*0.0578 +"px bold 黑体";
                //     can.fillStyle = "#000";
                //     can.textAlign = "center";
                //     can.fillText("石笋山旅游景区", width*0.5, height*0.27);
                //     can.font = width*0.0266 +"px bold 黑体";
                //     can.fillText("石笋山生态平台", width*0.72, height*0.72);
                //     can.fillText("二零二零年四月十七日", width*0.72, height*0.78);
                    // this.imgUrl = canvas.toDataURL("image/png")
                    // console.log(1)
                    // let imgsss = canvas.toDataURL("image/png")
                    // console.log(imgsss)
                // }
                // img1.src = require('../assets/img/zhang.png');
            }
            img.src = require('../assets/img/sjhbb.jpg');
            
        },
        woshifandou: Throttle(function(){
            console.log('sssssssssssss')
        },2500)
    }
};
</script>
<style lang="scss" scoped>

</style>
