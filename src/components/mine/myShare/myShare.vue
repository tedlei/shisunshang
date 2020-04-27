<template>
    <div class="content">
        <div class="btn" v-clipboard:copy="urls"
             v-clipboard:success="onCopy"
             v-clipboard:error="onError" @click="select(1)" v-if="iswc">
            复制推广二维码
            <!-- <img src="../../../assets/img/ewmhban.png" alt=""> -->
        </div>
        <img :src="imgSrc" alt="" v-show="show">
        <div class="minDiv" id="Posters" v-show="!show">
            <div></div>
            <div>
                <div id="qrCode" ref="qrCode"></div>
                <img class="portrait" :src="portrait" alt="">
                <!-- <qrcode :url="urls" 
                    :iconurl="portrait" 
                    :wid="135" 
                    :hei="135"
                    :imgwid="40"
                    :imghei="40">
                </qrcode> -->
            </div>
            <div>
                推广链接：http://www.gjst.net/
            </div>
            <div>识别二维码加入我们</div>
            <!-- <input type="text" v-model="urls" hidden/> -->
        </div>
      <!-- <div class="mycode">
        <div class="qrcode">
          <div id="qrCode" ref="qrCode"></div>
        </div>
        <div style="margin-bottom: 0.2rem;font-size: 0.16rem;font-weight: bold">长按图片分享给好友</div>
        <van-button square  type="primary" class="" v-clipboard:copy="urls"
             v-clipboard:success="onCopy"
             v-clipboard:error="onError" @click="select(1)">复制推广二维码
        </van-button>
        <p>推广网址：<span>{{urls}}</span></p>
        <p>识别二维码加入团队</p>
      </div>
      <input type="text" v-model="urls" hidden/> -->
    </div>
</template>

<script>
    import qrcode from 'vue_qrcodes'
    import html2canvas from "html2canvas";
    import QRCode from 'qrcodejs2'
    export default {
        name: "myShare",
        components:{
            qrcode
        },
        data() {
            return {
                show: false,
                portrait: '',//二维码头像
                urls: '',//二维码地址链接
                imgSrc: '',
                iswc:false,
            }   
        },
        created() {

        },
        methods: {
            select() {
                this.show = false;
            },
            onCopy: function (e) {
                this.$toast('复制成功！')
            },
            onError(e) {
                this.$toast('复制失败！')
            },
            creatQrCode() {
                let arr = location.href.split('/');
                let QRcodeDomainName = arr[0]+"//"+arr[2];
                let userinfo = JSON.parse(this.$store.getters.getuserinfo);
                this.portrait = userinfo.portrait;
                this.urls = QRcodeDomainName + '/?state=' + userinfo.referee_number;
                let qrCode = new QRCode('qrCode', {
                    text: QRcodeDomainName + '/?state=' + userinfo.referee_number, // 需要转换为二维码的内容
                    width: 140,
                    height: 140,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H
                });
                
            },
            //复制
            copyShaneUrl(shareLink){
                // console.log(shareLink);
                var input = document.createElement("input");   // 直接构建input
                input.value = shareLink;  // 设置内容
                // document.body.appendChild(_input);    // 添加临时实例
                input.select();   // 选择实例内容
                document.execCommand("Copy");   // 执行复制
                this.$toast('复制成功')
                // document.body.removeChild(_input); // 删除临时实例
            }
        },
        created(){
            this.$nextTick(() => {
                this.creatQrCode();
            });
        },
        mounted() {
            setTimeout(()=>{
                let Poster = document.getElementById('Posters');
                    // console.dir(Poster);
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
                        // console.log(imgUri)
                        this.imgSrc = imgUri;
                        this.show = true;
                    }
                );
                this.iswc = true;
            },1000);
        },
    }
</script>

<style scoped lang="scss">
    .btn{
        width: 1.6rem;
        height: 0.5rem;
        line-height: 0.5rem;
        background-image: url("../../../assets/img/ewmhban.png");
        background-size: 100% 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -0.8rem;
        margin-top: 200px;
        color: #fff;
        text-align: center;
        font-size: 0.15rem;
    }
    // .qrcode{
    //     border: 4px solid #fff !important;
    //     > > > .logoimg{
    //         border: 3px solid #fff !important;
    //     }
    // }
    .minDiv{
        width: 100%;
        height: 100%;
        background-image: url("../../../assets/img/ewmbj.jpg");
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        >div:first-child{
            height: 1.3rem;
        }
        >div:nth-child(2){
            background-color: #fff;
            padding: 0.05rem;
            position: relative;
            .portrait{
                border: 2px solid #fff;
                position: absolute;
                left: 50%; top: 50%;
                margin-top: -20px;
                margin-left: -20px;
                width: 40px;
                height: 40px;
            }
        }   
    }
</style>
