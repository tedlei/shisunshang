<template>
  <div class="content">
      <div class="evalua">
          <div class="goodsImg">
            <van-image
              width="0.4rem"
              height="0.4rem"
              fit="cover"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <span style="width:85%" class="fontWrap fontWrapOne">
                啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
            </span>
          </div>
          <div class="evaluaInput">
            <van-cell>
                <van-field 
                    v-model="value" 
                    placeholder="宝贝瞒住你的期待吗？说说它美中不住的地方吧" 
                    :border="false"
                    autosize
                    rows="3"
                    type="textarea"
                    maxlength="200"
                    show-word-limit
                />
                <div class="uploaderImgs">
                    <van-uploader 
                        :after-read="afterRead" 
                        v-model="fileList" 
                        multiple 
                        :max-count="4"
                    />
                </div>
            </van-cell>
          </div>
      </div>
  </div>
</template>

<script>
  export default {
  components: {},
  data () {
    return {
      value: '',
      fileList: [
        // { url: '' },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: 'https://cloud-image', isImage: true }
      ]
    }
  },
  methods: {
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>
<style lang="scss" scoped>
    .content {
        padding-bottom: 50px;
        .evalua{
            padding: 0.1rem 0.1rem;
            background-color: #fff;
            margin-bottom: 0.1rem;
            .goodsImg{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.1rem;
            }
            .uploaderImgs{
                margin: 0.1rem 0;
            }
        }
        
    }
    .van-cell{
        padding: 0 !important;
    }
</style>