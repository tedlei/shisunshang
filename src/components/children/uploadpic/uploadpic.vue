<template>
  <div class="content">
    <div class="uploader_box m_b_10">
      <van-uploader
        v-model="fileList"
        :after-read="afterRead"
        multiple
        :max-count="1"
      >
        <div class="uplod_icon">
          <van-icon name="photo"/>
          <div>点击上传照片</div>
        </div>
      </van-uploader>
    </div>
    <van-field v-model="number" type="number" label="" placeholder="请输入金额" class="m_b_10"/>
    <div class="uploader_boxTwo" style="border: none;margin-bottom: 0.4rem">
      <strong>规则说明</strong>
      <div v-if="content" v-html="content"></div>
    </div>
    <div class="common_btn" @click="submits">
      上传
    </div>
  </div>
</template>

<script>
import imgUpload from '../../../api/imgUpload'
    export default {
        name: "uploadpic",
        data() {
            return {
                fileList: [],
                number: '',
                file: '',
                content: null
            }
        },

        methods: {
            //获取规则
            getrule() {
              let ad_data = {
                  method: 'get.promotion.item',
              };
              this.$post('/api/v1/news', ad_data)
                  .then((res) => {
                      console.log(res);
                      this.content = res.data.content;
                  }).catch(function (error) {
                  console.log(error);
              });
            },

            afterRead: function (files) {
                // console.log(files);
                let _this = this;
                let file = files.file;
                let reader = new FileReader();
                reader.onload = e => {
                  let result = e.target.result;
                  let img = new Image();
                  img.src = result;
                  if(result.length/1024 > 50){
                      img.onload = () => {
                          let firImg = _this.compress(img, 0.7);
                          let imgTwo = _this.base64UrlToBlob(firImg);
                          this.file = imgTwo;
                          // console.log(this.file);
                      }
                  }else{
                    this.file = file;
                    console.log(2)
                  }
                  // console.log(this.file);
                };
                reader.readAsDataURL(file);
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

            //上传按钮
            submits() {
                let imglist = [];
                imglist.push({
                  file:this.file,
                });
                // console.log(imglist);
                imgUpload(imglist).then( res => {
                  console.log(res);
                  let _this = this;
                  let parms = {
                      method: 'add.user.ticket.item',
                      money: _this.number,
                      img: res[0],
                      store_id: this.$route.query.store_id,
                  };
                  this.$post('/api/v1/userTicket', parms)
                  .then((res) => {
                    console.log(res);
                    if(res.status==200){
                      this.$toast.success("上传成功");
                      this.$router.back(-1);
                    }
                  }).catch(function (error) {
                    console.log(error);
                  })
                })
                
            }
        },
        created () {
          // console.log(this.$route.query.store_id)
          this.getrule();
        }
    }
</script>

<style scoped lang="scss">
  .content {
    padding-left: 0.1rem;
    padding-right: 0.1rem;

    .uploader_box {
      background-color: #fff;
      height: 2rem;
      padding: 0.1rem;
      border-radius: 5px;
      border: 1px dashed #d2d2d2;
      margin-top: 0.1rem;
      /deep/ .van-uploader {
        height: 100%;
        width: 100%;

        .van-uploader__wrapper, .van-uploader__input-wrapper {
          width: 100%;
          height: 100%;
        }

        .van-uploader__input-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .van-uploader__preview {
          margin: 0 auto;

          .van-uploader__preview-image {
            width: auto;
            height: 1.8rem;

            .van-image__error, .van-image__img, .van-image__loading {
              width: auto;
            }
          }
        }
      }

      .uplod_icon {
        display: inline-block;

        i {
          font-size: 0.5rem;
        }
      }

      strong {
        margin-bottom: 0.1rem;
        display: block;
      }

      p {
        text-align: justify;
        margin-bottom: 0.1rem;
        color: #999999;
      }
    }
    .uploader_boxTwo{
      background-color: #fff;
      padding: 0.1rem;
      border-radius: 5px;
      border: 1px dashed #d2d2d2;
      margin-top: 0.1rem;
      >div{
        text-align: left;
        padding: 0.1rem 0;
      }
    }
  }
</style>
