<template>
    <div class="content">
        <div class='imgdivfff'>
            <div class="imgDIv" v-for="(item,index) of imgArr" :key="index" @click="ImagePreview(index)">
                <img style="height:3.2rem;" :src="item.url" alt="">
            </div>
        </div>
        <van-overlay style="" :show="show" @click="Closehb">
            <div class="wrapper">
                <div></div>
                <div id="Posters" v-show="!showTwo">
                    <!-- <div id="qrCode" ref="qrCode"></div> -->
                    <div :style="'top:'+top+';'+'left:'+left">
                        <qrcode :url="urls" 
                            :wid="wid" 
                            :hei="hei"
                            :imgwid="50"
                            :imghei="50">
                        </qrcode>
                    </div>
                    <!-- <img @load="olad" ref="zjhb" :src="bkUrl" alt=""> -->
                    <img @load="olad" ref="zjhb" :src="bkUrl" alt="">
                </div>
                <div v-show="showTwo">
                    <img :style="'height:'+ h + 'px'" :src="hbUrl" alt="">
                </div>
            </div>
        </van-overlay>

    </div>
</template>

<script>
    import html2canvas from "html2canvas";
    import qrcode from 'vue_qrcodes'
    export default {
    components: {
        qrcode
    },
    data () {
        return {
            imgArr: [
                {
                    url:require('../../../assets/img/zjhb1.jpg'),
                    top: '50%',
                    left: '50%',
                },
                {
                    url:require('../../../assets/img/zjhb2.jpg'),
                    top: '73.33%',
                    left: '50.06%',
                }
            ],
            index: null,
            urls: null,
            portrait: '',
            show:false,
            showTwo: false,
            hbUrl:'',
            h: '',
            bkUrl: '',
            top:'50%',
            left: '50%',
            wid: 170,
            hei: 170
        }
    },
    methods: {
        creatQrCode() {
            let arr = location.href.split('/');
            let QRcodeDomainName = arr[0]+"//"+arr[2];
            let userinfo = JSON.parse(this.$store.getters.getuserinfo);
            let qrCode = new QRCode('qrCode', {
                text: QRcodeDomainName + '/?state=' + userinfo.referee_number, // 需要转换为二维码的内容
                width: 170,
                height: 170,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
            
        },
        ImagePreview( i ){
            // console.log(i)
            // console.log(this.index)
            if(this.index == i){
                this.showTwo = true;
            }
            this.index = i;
            this.show = true;
            this.bkUrl = this.imgArr[i].url;
            this.top = this.imgArr[i].top;
            this.left = this.imgArr[i].left;
            // this.olad();
        },
        olad(e){
            // console.log(this.$refs.zjhb.width*20);
                let Poster = document.getElementById('Posters');
                // console.dir(Poster.offsetWidth);
                // console.dir(Poster.offsetHeight);
                this.h = Poster.offsetHeight
                let opts = {
                    useCORS: true,
                    width: Poster.offsetWidth,
                    height: Poster.offsetHeight,
                    logging: false,
                    // scale:1,
                    dpi: window.devicePixelRatio
                };
                window.scrollTo(0, 0);
                html2canvas(Poster, opts).then(
                    canvas => {
                        let imgUri = canvas.toDataURL("image/jpeg", 1); // 获取生成的图片的url
                        // console.log(imgUri);
                        this.hbUrl = imgUri;
                        this.showTwo = true;
                    }
                );
            
        },
        Closehb(){
            this.show = false;
            this.showTwo = false;
            // console.log(this.showTwo)
        },
    },
    created(){
        // this.$nextTick(() => {
        //     this.creatQrCode();
        // });
        let arr = location.href.split('/');
        let QRcodeDomainName = arr[0]+"//"+arr[2];
        let userinfo = JSON.parse(this.$store.getters.getuserinfo);
        this.portrait = userinfo.portrait;
        this.urls = QRcodeDomainName + '/?state=' + userinfo.referee_number;
        
    },
    computed: {
        
    },
    watch: {
        
    }
}
</script>
<style lang="scss" scoped>
    .qrcode{
        border: 4px solid #fff !important;
        > > > .logoimg{
            border: 3px solid #fff !important;
        }
    }
    .imgdivfff{
        font-size: 0;
        padding: 0.1rem 0.05rem;
    }
    .imgDIv{
        display: inline-block;
        width: 50%;
        padding: 0.05rem;
        background-size: 100%;
        // background-color: aqua;
        
    }
    .wrapper {
        height: 100%;
        overflow-y: scroll;
        -webkit-overflow-scrolling:touch;
        padding: 0 0.1rem;
        >div:first-child{
            height: 0.48rem;
        }
        >div:nth-child(2){
            position: relative;
            >div:first-child{
                position: absolute;
                // left: 50%; top: 50%;
                margin-top: -85px;
                margin-left: -85px;
            }
            >img{
                width: 100%;
            }
        }
       
    }
</style>