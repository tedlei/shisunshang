<template>
    <div>
        <div>
            <van-button type="primary" size="small" @click="add">生成海报</van-button>
        </div>
        <div class="Cover" v-show="isCover">
            <div v-show="!show">
                <div class="PosterDiv" id="Posters" :style="{'width':w+'px','height':h+'px'}">
                    <div>
                        <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
                        <div>
                            <p>泰国香米美国产啊啊啊啊啊啊啊啊啊啊啊啊啊啊</p>
                            <p>给你推荐了一个好东西</p>
                        </div>
                    </div>
                    <img v-show="isGoods_infoImgsrc" style="width:100%;height:235px" src="https://img.yzcdn.cn/vant/cat.jpeg" alt="海报图片">
                    <!-- <img v-show="!isGoods_infoImgsrc" style="width:100%;height:235px" src="../../assets/img/mrtp.png" alt="海报图片"> -->
                    <div class="PosterDivMoney">￥560.00</div>
                    <div class="PosterDivQRcode">
                        <div>简单 仙魔香米号吃好好好好吃的2.5kg不抛光的向居民们的米</div>
                        <div class="qrcode" id="qrCode" ref="qrCode"></div>
                    </div>
                </div>
            </div>  
            <div class="haibao" v-show="show">
                <div class="CloseQRcodeDomainName" @click="isCover=false">
                    <img src="../assets/img/hbx.png" alt="">
                </div>
               <img style="width: 100%; heigth:100%;" :src="imgResult" alt="#">
            </div>
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2';
import html2canvas from 'html2canvas';
export default {
  components:{},
  props:{},
  data(){
    return {
        isCover: false,
        show: false,
        isGoods_infoImgsrc: true,
        w: 260,
        h: 410,
	    imgResult:"",//下载的图片
        
    }
  },
  watch:{},
  computed:{},
  methods:{
      add(){
            this.isCover = true;
            setTimeout(()=>{
                if(!this.show){
                  this.downloadImage();
                }
            },800);
      },
    async getData() {
        let ad_data = {method: 'get.goods.recommend.list'};
        let data = await this.$post('/api/v1/goods', ad_data);
        console.log(data);
        // .then((res) => {
        
        // }).catch(function (error) {
        //   console.log(error);
        // });
    },
      //海报二维码
      getQRcodeDomainName(){
        let userinfo = JSON.parse(this.$store.getters.getuserinfo);
        let QRcodeDomainName = this.$store.getters.getQRcodeDomainName;
        let routes = this.$route.path + '?id=' + this.$route.query.id;
        let qrCode = new QRCode('qrCode', {
            text: QRcodeDomainName + routes + '&state=' + userinfo.referee_number, // 需要转换为二维码的链接
            width: 150,
            height: 150,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        })
      },

      //生成海报
      downloadImage() {
		let opts = {
			useCORS: true,
			width: this.w,
			height: this.h,
			logging:false,
            // scale:1,
            dpi: window.devicePixelRatio,
        };
        // console.log(opts);
		window.scrollTo(0,0);
		html2canvas(document.getElementById("Posters"),opts).then((canvas)=> {
			let imgUri = canvas.toDataURL("image/jpeg",1); // 获取生成的图片的url
			// console.log(imgUri)
            this.imgResult=imgUri;
            this.show = true;
            // clearTimeout();
			// this.$nextTick(()=>{
            //     // console.log(this.$refs)
			// 	this.$refs.download.click()
			// })
		});
	}
  },
  created(){
    //   this.$nextTick( ()=>{
    //     this.getQRcodeDomainName();
    //   })
      this.getData();
  },
  mounted(){
  }
}
</script>
<style lang="scss" scoped>
    .qrcode {
        width: 70px;
        height: 70px;
    }
    .Cover{
        position: fixed;
        top: 0;
        min-width: 100vw;
        min-height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        .PosterDiv{
            padding: 0.1rem;
            border-radius: 10px;
            background-color: #fff;
            >div:first-child{
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                >img{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 5px;
                }
                >div{
                    text-align: left;
                    p{
                        width: 190px;
                        white-space:nowrap;
                        overflow:hidden;
                        text-overflow:ellipsis;
                    }
                    >p:nth-child(2){
                        color: #999999;
                        font-size: 12px;
                    }
              }
            }
            .PosterDivMoney{
                margin: 10px 10px 5px 10px;
                text-align: left;
                color: $sss-color;
                font-weight: bold;
            }
            .PosterDivQRcode{
                display: flex;
                justify-content: space-between;
                align-items: center;
                text-align: left;
                padding:0 5px 0 10px;
                >div:first-child{
                    width: 150px;
                    height: 60px;
                    overflow:hidden;
                }
            //   img{
            //     width: 60px;
            //     height: 60px;
            //     margin-left: 10px;
            //   }
            }
        }
    }
    .haibao{
        width: 260px;
        height: 410px;
        position: relative;
        border-radius: 10px;
        .CloseQRcodeDomainName{
            width: 25px;
            height: 25px;
            position: absolute;
            top: -10px;
            right: -10px;
        }
        >img{
            border-radius: 10px;
        }
    }
</style>