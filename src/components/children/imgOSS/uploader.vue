<template>
    <div>
        <van-uploader 
            :after-read="afterRead" 
            :before-delete= 'beforeDelete'
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
        'reading',
        'index',
        'imgUrl'
    ],
    data () {
        return {
            fileList:[],
        }
    },
    methods: {
        //文件选择回调
        afterRead ( file ) {
            this.createImage();
        },
        //文件删除回调
        beforeDelete(e, item) {
            // console.log(e);
            // console.log(item.index);
            if(this.$route.query.state!='edit'){
                this.fileList.splice(item.index,1);
            }else{
                this.fileList.splice(item.index,1);
                if(this.reading.length==1){
                    this.$store.commit('setMerchantApplicationObjimgF','1');
                }else{
                    this.$store.commit('setMerchantApplicationObjimgX',this.fileList);
                }
            }
            // this.createImage();
        },
        //图片处理后向父组件抛出
        createImage( ) {
            let self = this;
            for( let i in this.fileList){
                if(this.fileList[i].file){
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
                            // console.log(this.fileList)
                            this.firImg = result
                        }
                    };
                    reader.readAsDataURL(file);
                }
            }
            // console.log(this.fileList)
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
    created() {
        // console.log(this.$route.query.state=='edit');
        // console.log(this.maxCount);
        if(this.$route.query.state=='edit'){
            if(this.reading){
                // console.log(this.reading)
                for(let item of this.reading){
                    this.fileList.push({ url: item})
                }
            }
        }
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