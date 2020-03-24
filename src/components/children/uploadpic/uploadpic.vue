<template>
  <div class="content">
    <div class="uploader_box">
      <van-uploader
        v-model="fileList"
        multiple
        :max-count="1"
      >
        <div class="uplod_icon">
          <van-icon name="photo"/>
          <div>点击上传照片</div>
        </div>
      </van-uploader>
    </div>

    <div class="uploader_box">
      <strong>规则说明</strong>
      <p>1.本着吃多少送多少的理念，用户在商家消费多少，我们送多少；</p>
      <p>1.本着吃多少送多少的理念，用户在商家消费多少，我们送多少；</p>
      <p>1.本着吃多少送多少的理念，用户在商家消费多少，我们送多少；</p>
    </div>
    <div class="common_btn" style="margin-top: 0.5rem">
      上传
    </div>
  </div>
</template>

<script>
    export default {
        name: "uploadpic",
        data() {
            return {
                fileList: []
            }
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
      border: 1px dashed #999999;
      margin-top: 0.1rem;

      /deep/ .van-uploader {
        height: 100%;
        width: 100%;
        .van-uploader__wrapper,.van-uploader__input-wrapper{
          width: 100%;
          height: 100%;
        }
        .van-uploader__input-wrapper{
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .van-uploader__preview {
          margin: 0 auto;

          .van-uploader__preview-image {
            width: auto;
            height: 1.8rem;
            .van-image__error, .van-image__img, .van-image__loading{
              width: auto;
            }
          }
        }
      }
      .uplod_icon{
        display: inline-block;
        i{
          font-size: 0.5rem;
        }
      }
      strong{
        margin-bottom: 0.1rem;
        display: block;
      }
      p{
        text-align: justify;
        margin-bottom: 0.1rem;
        color: #999999;
      }
    }
  }
</style>
