<template>
  <div class="content">
    <van-field v-model="text" placeholder="填写文章标题" style="margin: 10px 0"/>
    <div>
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="30"
        placeholder="输入文章内容"
        show-word-limit
      />
      <van-field name="uploader" label="文件上传">
        <template #input>
          <!-- <van-uploader v-model="uploader" multiple :max-count="1" :after-read="afterRead"/> -->
          <imgOSSuploader :maxCount='1' @imgUpData='imgUpData'></imgOSSuploader>
        </template>
      </van-field>
    </div>
    <div class="tips">
      <p>温馨提示:</p>
      <div class="clo-9">你填写的标题和详细说明如果需要使用变量，请用【姓名】、【微信昵称】、【电话】代替。</div>
    </div>
    <div class="fabu">
      <van-button block type="primary" :disabled="disabled" :loading="loading" native-type="submit"
                  @click="onSubmitTwo">
        发布
      </van-button>
    </div>
  </div>
</template>

<script>
import imgOSSuploader from "../imgOSS/uploader"
import imgUpload from '../../../api/imgUpload'
export default {
    components:{
        imgOSSuploader,
    },
    name: "articles",
    //刷新页面
    inject:['reload'],
    data() {
        return {
            text: '',
            message: '',
            uploader: [],
            loading: false,
            disabled: false,
            Files: '',
        }
    },
    methods: {
        afterRead(file) {
            // console.log(file)
        },
        imgUpData( data ) {
          console.log(data)
          this.Files = data;
        },

        //提交
        onSubmitTwo() {
          if(this.message==''){
            this.$toast('发布内容不能为空')
          }else if(this.text==''){
            this.$toast('发布标题不能为空')
          }else if(this.Files.length==0){
            this.$toast('发布图片不能为空')
          }else{
            imgUpload(this.Files).then(res => {
              console.log(res)
              let ad_data = {
                  method: 'add.weixin.ad.item',
                  img: res[0],
                  title: this.text,
                  desc: this.message,
              }
              this.$post('/api/v1/weixinAd', ad_data)
                  .then((res) => {
                      if (res.status == 200) {
                          this.$toast({
                              type: 'success',
                              message: '发布成功',
                          });
                          //刷新页面
                          this.$router.push({path: '/mine/ad/myad'});
                          // this.reload();
                      }
                  }).catch(function (error) {
                  console.log(error);
              });
            })
          }
          
        },
    },
    mounted() {}
}
</script>

<style scoped lang="scss">
  .content {
    .tips {
      text-align: left;
      padding: 20px 10px 30px 10px;

      p {
        font-size: 0.18rem;
      }
    }

    .fabu {
      padding: 0 10px;

      button {
        background-color: #009900;
      }
    }
  }
</style>
