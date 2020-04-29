<template>
    <div>
        <div v-show='!show' class="">
            <div class="erweima">
                <!-- <qrcode :url="urls" 
                    :iconurl="portrait" 
                    :wid="170" 
                    :hei="170"
                    :imgwid="50"
                    :imghei="50">
                </qrcode> -->
            </div>
            <img src="../assets/img/zjhb1.jpg" @load="tuxiang" ref="tuxiang" alt="">
        </div>
        <canvas v-show='show' id="myCanvas" :width="cwidth" :height="chetght" style="border:1px solid #c3c3c3;">
        </canvas>
    </div>
</template>

<script>
import QRCode from "qrcodejs2";
// import qrcode from 'vue_qrcodes'
export default {
    data() {
        return {
            urls:'http://www.gjst.net',
            portrait: '',
            cwidth: null,
            chetght: null,
            show:false
        };
    },
    components:{
        qrcode
    },
    methods: {
        tuxiang(e){
            this.cwidth = this.$refs.tuxiang.width;
            this.chetght = this.$refs.tuxiang.height;
            this.huatule();
        },
        huatule(){
            var c=document.getElementById("myCanvas");
            var cxt=c.getContext("2d");
            var img=new Image()
            img.src=require("../assets/img/zjhb1.jpg");
            // img.style = "width:" + this.cwidth + 'px;' + "height:" + this.chetght + 'px';
            let w = this.cwidth;
            let h = this.chetght;
            console.log(w);
            img.onload=function (){
                cxt.drawImage(img,0,0,w,h);
            }
            this.show = true;
            // console.log(img);
        }

    },
    created(){
        let userinfo = JSON.parse(this.$store.getters.getuserinfo);
        this.portrait = userinfo.portrait;
    },
    mounted(){
        // this.huatule();
    }
};
</script>
<style lang="scss" scoped>
    .erweima{
        position: absolute;
    }
</style>