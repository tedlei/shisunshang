<template>
  <div class="content">
    <div class="newsdetails">
      <div class="main" v-html="content"></div>
      <div class="add_time" v-if="!$route.query.type">
        <span>{{add_time}}</span>
        <span>阅读量：{{click_times}}</span>
      </div>
    </div>
  </div>
</template>

<script>
    import Bus from "../../../assets/js/bus";
    import {ImagePreview} from 'vant';
    export default {
        name: "newsdetail",
        props: ['datas'],
        data() {
            return {
                title: '',
                content: '',
                add_time: '',
                click_times: '',
                propsdata: [],
                imgUrlList:[],   //获取富文本图片路径
            }
        },
        methods: {
            getnews: function () {
                let {id,type} = this.$route.query;
                let news = null
                if(id){
                  news = {
                    method: this.datas == 'helpdetails' ? "get.help.item" : 'get.news.item',
                    id
                  };
                }
                if(type){
                  news = {method:"get.contact.item"}
                }
                //获取新闻列表
                this.$post('/api/v1/news', news)
                    .then((response) => {
                        if (response.status = 200) {
                            // this.content = response.data.content
                            this.add_time = response.data.add_time
                            this.click_times = response.data.click_times
                            this.updateImg(response.data.content)
                            Bus.$emit('title', type?'关于我们':response.data.title)
                        } else {
                            this.$toast(response.message)
                        }
                    }).catch(function (error) {
                    console.log(error);
                });
            },

            //给图片添加class
            updateImg(value){
              this.content = value.replace(/<img/g,"<img class='tapClass'")
            }
        },
        updated(){
          let doc = document.getElementsByClassName('tapClass');
          for(let item of doc){
            this.imgUrlList.push(item.src)
            item.onclick = ()=>{ImagePreview(this.imgUrlList)}; 
          }
        },
        destroyed() {
            Bus.$emit('title', '')
        },
        mounted() {
            this.getnews();
        }
    }
</script>
<style lang="scss">
.content>.newsdetails>.main{
  overflow: hidden;
  p{
    width: 100%;
  }
  span{
    text-indent: 2em;
  }
}
</style>

<style scoped lang="scss">
  .content {
    .newsdetails {
      background-color: #fff;
      margin: 0.1rem;
      padding: 0.1rem;
      border-radius: 5px;
      .main {
        width: 100%;
        text-align: left;
        margin: 0.2rem 0;
        // text-indent: 2em;
      }

      .add_time {
        color: #999999;
        display: flex;
        justify-content: space-between;
      }
    }
  }

</style>
