<template>
  <div class="content">
    <van-form @submit="onSubmit">
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
        <!--      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />-->

      </div>
      <div class="tips">
        <p>温馨提示:</p>
        <div class="clo-9">你填写的标题和详细说明如果需要使用变量，请用【姓名】、【微信昵称】、【电话】代替。</div>
      </div>

      <div class="fabu">
        <van-button block type="primary" :disabled="disabled" :loading="loading" native-type="submit">
          发布
        </van-button>
      </div>
    </van-form>
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
                this.Files = file
            },
            onSubmit: function (values) {
                let _this = this;
                let formData = new FormData();
                formData.append('file', _this.Files.file);
                formData.append('method', 'add.weixin.ad.item');
                formData.append('title', this.text);
                formData.append('desc', this.message);
                formData.append('token', tokens.tokens);
                if (this.text == '' || this.message == '' || this.Files == '') {
                    _this.$toast({
                        type: 'fail',
                        message: '请填写完整',
                    })
                } else {
                    _this.loading = true
                    _this.disabled = true
                    axios.interceptors.request.use(
                        config => {
                            config.headers = {
                                'Content-Type': 'multipart/form-data'
                            }
                            return config;
                        }
                    )
                    const instance = axios.create({
                        withCredentials: true
                    })
                    instance.post(baseURL.baseURL + '/api/v1/weixinAd', formData)
                        .then((response) => {
                            response = response.data
                            if (response.status == 200) {
                                _this.$toast({
                                    type: 'success',
                                    message: '发布成功',
                                })
                                setTimeout(() => {
                                    _this.$toast.clear();
                                    window.location.reload()
                                }, 2000)
                            } else {
                                _this.$toast({
                                    type: 'fail',
                                    message: response.message,
                                })
                            }
                        }).catch(function (error) {
                        console.log(error);
                    });
                }
            },
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
