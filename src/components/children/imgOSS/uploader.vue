<template>
    <div>
        <van-uploader 
            :after-read="afterRead" 
            v-model="fileList" 
            multiple 
            :max-count="3"
        />
    </div>
</template>

<script>
export default {
    components: {},
    data () {
        return {
            fileList:[],
        }
    },
    methods: {
        uploadImgToken() {
            // console.log(this.imgList)
            let ad_data={
                method: 'get.qiniu.upload.token'
            };
            this.$post('/api/v1/uploads', ad_data)
            .then((res) => {
                console.log(res)
                this.OSS(res.data.token, res.data.domain);
            }).catch(function (error) {
                console.log(error);
            });
        },
        OSS ( token, domain ) {
            let imgList = this.fileList;
            for(let i in imgList){
                const qiniu = require('qiniu-js');
                let postfix = imgList[i].file.name.substring(imgList[i].file.name.lastIndexOf('.'), imgList[i].file.name.length);
                let name = new Date().getTime() + Math.ceil(Math.random()*100)+postfix;
                const putExtra = {
                    fname: imgList[i].file.name,
                    params: {},
                    mimeType: ["image/png", "image/jpeg", "image/jpg"]
                }
                const config = {
                    useCdnDomain: true
                }
                let observable = qiniu.upload(imgList[i].file, name, token, putExtra, config);
                observable.subscribe({
                    next: (result) => {
                    },
                    error: (errResult) => {
                      console.log(errResult)
                    },
                    complete: (result) => {
                        console.log(result)
                        let add = domain+result.key;
                        this.imgurls.push(add);
                        if(this.imgurls.length==imgList.length){
                            console.log(1)
                            //返回参数
                        }
                    }
                })
            }
        },


        afterRead ( file ) {
            // console.log(file);
            this.createImage();
        },
        beforeDelete( e ) {
            console.log(e)
            // this.createImage();
        },
        createImage( ) {
            console.log(this.fileList)
            let self = this;
            for( let i in this.fileList){
                let file = this.fileList[i].file;
                let reader = new FileReader();
                reader.onload = e => {
                    let result = e.target.result;
                    let img = new Image();
                    img.src = result;
                    if(result.length/1024 > 50){
                        img.onload = function() {
                           this.firImg = self.compress(img, 0.7);
                            let imgTwo = self.base64UrlToBlob(this.firImg);
                            console.log(imgTwo)
                            self.fileList[i].file = imgTwo;
                            console.log(self.fileList);
                        }
                    }else{
                        console.log(this.fileList)
                        this.firImg = result
                    }
                };
                // 读取图像
                reader.readAsDataURL(file);
            }
            
        },
        // 压缩图片
        compress(img, size) {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let initSize = img.src.length;
            let width = img.width;
            let height = img.height;
            canvas.width = width;
            canvas.height = height;
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, width, height);
            let ndata = canvas.toDataURL('image/jpeg', size);
            return ndata;
        },
        // 图片格式转换
        base64UrlToBlob (urlData) {
            let arr = urlData.split(','),
              mime = arr[0].match(/:(.*?);/)[1], // 去掉url的头，并转化为byte
              bstr = atob(arr[1]), // 处理异常,将ascii码小于0的转换为大于0
              n = bstr.length,
              u8arr = new Uint8Array(n)
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n)
            }
            //   return new Blob([u8arr], {type: mime})
            let filename = Date.parse(new Date())  + '.jpg';
            return new File([u8arr], filename, {type: mime})
        },
    },
    updated() {
        console.log(this.fileList);
    },
    computed: {
    
    },
    watch: {
    
    }
}
</script>
<style lang="scss" scoped>
  
</style>