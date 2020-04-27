<template>
  <div class="content">
    <van-field v-model="text" placeholder="填写文章标题" style="margin: 10px 0;font-weight: bold;"/>
    <div>
      <van-field
        v-model="message"
        rows="4"
        type="textarea"
        maxlength="500"
        placeholder="输入文章内容"
        show-word-limit
      />
      <van-field name="uploader" label="文件上传">
        <template #input>
          <imgOSSuploader :maxCount='1' :reading='readingF' @imgUpData='imgUpData'></imgOSSuploader>
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
    import Bus from "../../../assets/js/bus";

    export default {
        components: {
            imgOSSuploader,
        },
        name: "articles",
        //刷新页面
        inject: ['reload'],
        data() {
            return {
                text: '',
                message: '',
                uploader: [],
                loading: false,
                disabled: false,
                Files: '',
                readingF: [],
                isedit: false,
            }
        },
        methods: {
            imgUpData(data) {
                this.Files = data;
                console.log(data)
            },

            //提交
            onSubmitTwo() {
                if (this.message == '') {
                    this.$toast('发布内容不能为空')
                } else if (this.text == '') {
                    this.$toast('发布标题不能为空')
                } else if (this.Files.length == 0) {
                    this.$toast('发布图片不能为空')
                } else {
                    console.log(this.Files[0].file)
                    if (this.Files[0].file) {
                        imgUpload(this.Files).then(res => {
                            let ad_data = {
                                method: this.isedit == true ? 'set.weixin.ad.item' : 'add.weixin.ad.item',
                                img: res[0],
                                title: this.text,
                                desc: this.message,
                            };
                            ad_data = this.isedit == true ? {...ad_data, ...{id: Number(this.$route.query.editId)}} : ad_data
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
                    } else {
                        let ad_data = {
                                method: this.isedit == true ? 'set.weixin.ad.item' : 'add.weixin.ad.item',
                                img: this.readingF[0],
                                title: this.text,
                                desc: this.message,
                            };
                        ad_data = this.isedit == true ? {...ad_data, ...{id: Number(this.$route.query.editId)}} : ad_data
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
                    }

                }

            },
            //获取编辑信息
            getmsg: function (e) {
                let _this = this,
                    admsg = {
                        method: "get.weixin.ad.user.list"
                    };
                this.$post("/api/v1/weixinAd", admsg)
                    .then(response => {
                        if (response.status == 200) {
                            for (let i in response.data.items) {
                                if (response.data.items[i].id == e) {
                                    _this.text = response.data.items[i].title;
                                    _this.message = response.data.items[i].desc;
                                    _this.readingF[0] = response.data.items[i].img;
                                    Bus.$emit('editAdd', _this.readingF);
                                }
                            }

                        }
                        console.log(response)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted() {

            if (this.$route.query.editId) {
                this.isedit = true
                this.getmsg(this.$route.query.editId)
            } else {
                this.isedit = false
            }

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
