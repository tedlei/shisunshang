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
          <van-uploader v-model="uploader" />
        </template>
      </van-field>
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
                uploader: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
            }
        }
    }
</script>

<style scoped>

</style>
