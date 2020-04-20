<template>
    <div>
        <van-uploader 
            :after-read="afterRead" 
            v-model="fileList" 
            multiple 
            :max-count="maxCount"
        />
    </div>
</template>

<script>
export default {
    components: {},
    props:[
        'maxCount',
        'index',
        'imgUrl'
    ],
    data () {
        return {
            fileList:[],
        }
    },
    methods: {
        afterRead ( file ) {
            this.createImage();
        },
        beforeDelete( e ) {
            // this.createImage();
        },
        createImage( ) {
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
                            self.fileList[i].file = imgTwo;
                            // if(self.type) self.fileList[i].type = self.type;
                        }
                    }else{
                        console.log(this.fileList)
                        this.firImg = result
                    }
                };
                reader.readAsDataURL(file);
            }
            console.log(this.fileList)
            this.$emit('imgUpData', this.fileList);
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
    mounted () {
        // console.log(this.index)
    },
    updated() {
        // console.log(this.fileList);
        this.$emit('imgUpData', this.fileList);
    },
    watch:{
        imgUrl(url){
            this.fileList.push({url})
        }
    }
}
</script>
<style lang="scss" scoped>
  
</style>