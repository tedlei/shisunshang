<template>
  <div class="content">
    <div class="certification">
      <van-form @submit="onSubmit" ref="sub">
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
      <div class="explain">
        <p class="ttl">为什么要实名认证？</p>
        <p>实名认证的目的是验证所绑定的账户是否属于本人。 有两方面的好处：</p>
        <p>一是确保账户中的资金只可能被提现到本人的银行卡中，保障 资金安全；</p>
        <p>二是账户的实名关系保证了在投资后所得到的电子合同的合法 性，保障合法权益。需要在首次投资前进行实名认证，仅需要 输入真实姓名和身份证号码。</p>
      </div>

    </div>

  </div>
</template>

<script>
    import Bus from "../../../../assets/js/bus";

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
        created() {

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
                console.log(values)
            }
        },
        mounted() {
            this.$store.commit('sendAtc', true);
            // 用$on事件来接收参数
            var _this = this
            Bus.$on('Atc', (data) => {
                console.log(21231321)
                if (data == true) {
                    // _this.$refs.sub.submit();
                }
            })
        },
        destroyed() {
            Bus.$off('Atc');
            this.$store.commit('sendAtc', false);
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

    .explain {
      margin: 0 0.1rem;
      padding: 0.2rem 0;

      p {
        color: #999999;
        text-align: left;
      }

      p.ttl {
        color: #0f0f0f;
        text-align: center;
        margin-bottom: 0.2rem;
      }
    }
  }
</style>
