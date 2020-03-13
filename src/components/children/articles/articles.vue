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
          <van-uploader v-model="uploader" multiple :max-count="1"/>
        </template>
      </van-field>

    </div>
    <div class="tips">
      <p>温馨提示:</p>
      <div class="clo-9">你填写的标题和详细说明如果需要使用变量，请用【姓名】、【微信昵称】、【电话】代替。</div>
    </div>

    <div class="fabu">
      <van-button block type="primary" native-type="submit">
        发布
      </van-button>
    </div>

  </div>
</template>

<script>
    export default {
        name: "articles",
        data(){
            return{
                text:'',
                message:'',
                uploader: [],
            }
        }
    }
</script>

<style scoped lang="scss">
.content{
 .tips{
   text-align: left;
   padding: 20px 10px 30px 10px;
   p{
     font-size: 0.18rem;
   }
 }
  .fabu{
    padding: 0 10px;
    button{
      background-color: #009900;
    }
  }
}
</style>
