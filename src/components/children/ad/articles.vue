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
            <van-uploader v-model="uploader" multiple :max-count="1" :after-read="afterRead"/>
          </template>
        </van-field>
      </div>
      <div class="tips">
        <p>温馨提示:</p>
        <div class="clo-9">你填写的标题和详细说明如果需要使用变量，请用【姓名】、【微信昵称】、【电话】代替。</div>
      </div>
      <div class="fabu">
        <van-button block type="primary" :disabled="disabled" :loading="loading" native-type="submit" @click="onSubmitTwo">
          发布
        </van-button>
      </div>
  </div>
</template>

<script>
    import axios from 'axios'
    import baseURL from '../../../api/https'
    import tokens from '../../../api/https'

    export default {
        name: "articles",
        data() {
            return {
                text: '',
                message: '',
                uploader: [],
                loading: false,
                disabled: false,
                Files: '',
                // show: true,
                // actions: [
                //     {name: '选项'},
                //     {name: '选项'},
                //     {name: '选项', subname: '描述信息'}
                // ]
            }
        },
        methods: {
            afterRead(file) {
                // 此时可以自行将文件上传至服务器
                console.log(file)
                this.Files = file.file
            },
           
            onSubmitTwo() {
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
              let qiniu = require('qiniu-js');
              const postfix = this.Files.name.substring(this.Files.name.lastIndexOf('.'), this.Files.name.length);
              let name = new Date().getTime() + Math.ceil(Math.random()*100)+postfix;
              // console.log(name)
              const putExtra = {
                fname: this.Files.name,
                params: {},
                mimeType: ["image/png", "image/jpeg", "image/jpg"]
              }
              const config = {
                useCdnDomain: true
              }
              let observable = qiniu.upload(this.Files, name, token, putExtra, config);
              // let subscription = observable.subscribe(observer) // 上传开始
              observable.subscribe({
                next: (result) => {
                // 主要用来展示进度
                  // console.log(result)
                },
                error: (errResult) => {
                // 失败报错信息
                  console.log(errResult)
                },
                complete: (result) => {
                // 接收成功后返回的信息
                  console.log(result)
                  let key = domain+result.key;
                  let ad_data = {
                    method: 'add.weixin.ad.item',
                    img: key,
                    title: this.text,
                    desc: this.message,
                  }
                  this.$post('/api/v1/weixinAd', ad_data)
                  .then((res) => {
                      console.log(res)
                      if (res.status == 200) {
                        this.$toast({
                            type: 'success',
                            message: '发布成功',
                        })
                        window.location.reload()
                      }
                  }).catch(function (error) {
                      console.log(error);
                  });

                }
              })


            }
        },
        mounted() {

        }
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
