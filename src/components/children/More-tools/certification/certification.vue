<template>
  <div class="content">
    <div class="certification">
      <van-form @submit="onSubmit">
        <p class="tips">身份信息(必填)</p>
        <van-field
          v-model="username"
          name="username"
          label=""
          placeholder="真实姓名"
          :rules="[{ required: true, message: '请填写真实姓名' }]"
        />
        <van-field
          v-model="number1"
          type="tel"
          name="number"
          label=""
          placeholder="您的身份证号码(将做加密处理)"
          :rules="[{ required: true, message: '请填写身份证号码' }]"
        />
        <p class="tips">您的手机号码(必填)</p>
        <van-field
          v-model="number2"
          name="name"
          type="tel"
          label=""
          placeholder="填写一致的手机号码"
          :rules="[{ required: true, message: '请填写手机号码' }]"
        />
        <p class="tips">身份证正反面(必填)</p>
        <div class="unload_pic">
          <div class="zheng">
            <div class="box">
              <van-uploader v-model="ZfileList" :after-read="ZafterRead" :max-count="1"/>
              <p>上传身份证正面</p>
            </div>

            <p class="m_b_10">示例</p>
            <img src="../../../../assets/img/Zidcard.png">
          </div>
          <div class="fan clearfix">
            <div class="box">
              <van-uploader v-model="FfileList" :after-read="FafterRead" :max-count="1"/>
              <p>上传身份证反面</p>
            </div>

            <p class="m_b_10">示例</p>
            <img src="../../../../assets/img/Fidcard.png">
          </div>

        </div>


      </van-form>

    </div>

  </div>
</template>

<script>
    export default {
        name: "certification",
        data() {
            return {
                username: '',
                number1: '',
                number2: '',
                ZfileList: [],
                FfileList: [],
            }
        },
        methods: {
            // 上传图片
            ZafterRead(file) {
                console.log(file)
                file.status = 'uploading';
                file.message = '上传中...';

                setTimeout(() => {
                    file.status = 'failed';
                    file.message = '上传失败';
                }, 1000);
            },
            FafterRead(file) {
                file.status = 'uploading';
                file.message = '上传中...';

                setTimeout(() => {
                    file.status = 'failed';
                    file.message = '上传失败';
                }, 1000);
            },
            //保存提交表单
            onSubmit(values) {
            }
        }
    }
</script>

<style scoped lang="scss">
  .content {
    .certification {
      .tips {
        padding: 0.1rem 0.16rem;
        text-align: left;
        color: #999999;
      }

      .unload_pic {
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        padding: 0.2rem 0.1rem;

        .zheng, .fan {
          width: 48%;

          /deep/ .van-uploader__upload {
            margin: 0;
            margin-bottom: 0.1rem;
          }
        }

        .box {
          margin-bottom: 0.2rem;
          padding: 0.2rem;
          background-color: #f2f2f2;
        }

        img {
          width: 80%;
        }
      }
    }
  }
</style>
