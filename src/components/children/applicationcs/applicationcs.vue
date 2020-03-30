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
                    <imgOSSuploader :maxCount='1' @imgUpData='imgUpData'></imgOSSuploader>
                </div>
            </van-cell>
          </div>
          <van-button block type="primary" @click="uploadImg">提交</van-button>
      </div>
  </div>
</template>

<script>
import loading from "../../loading/loading"
import imgOSSuploader from "../imgOSS/uploader"
import imgUpload from '../../../api/imgUpload'
  export default {
  components: {
    imgOSSuploader
  },
  data () {
    return {
      value: '',
      upfileList: []
    }
  },
  methods: {
    afterRead (file) {
      // console.log(file);
    },
    imgUpData ( data ) {
      // console.log(data)
      this.upfileList = data;
    },
    uploadImg() {
      
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