<template>
  <div class="content">
    <div class="newsdetails">
      <div class="main" v-html="content"></div>
      <div class="add_time">
        <span>{{add_time}}</span>
        <span>阅读量：{{click_times}}</span>
      </div>
    </div>
  </div>
</template>

<script>
    import Bus from "../../../assets/js/bus";

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
            }
        },
        methods: {
            getnews: function () {
                let news = {
                    method: this.datas == 'helpdetails' ? "get.help.item" : 'get.news.item',
                    id: this.$route.query.id
                };
                //获取新闻列表
                this.$post('/api/v1/news', news)
                    .then((response) => {
                        if (response.status = 200) {
                            this.content = response.data.content
                            this.add_time = response.data.add_time
                            this.click_times = response.data.click_times
                            Bus.$emit('title', response.data.title)
                        } else {
                            this.$toast(response.message)
                        }
                        // let textareaHtml = response.data.content
                        // let srcReg = /src=([\'\"]?([^\'\"]*)[\'\"]?)/ig;
                        // if(textareaHtml){
                        //     textareaHtml = textareaHtml.replace(srcReg,"src='"+this.serverSrc+"$2"+"'");
                        //     this.content = textareaHtml;
                        // }
                    }).catch(function (error) {
                    console.log(error);
                });
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

<style scoped lang="scss">
  .content {
    .newsdetails {
      background-color: #fff;
      margin: 0.1rem;
      padding: 0.2rem;
      border-radius: 5px;

      .main {
        text-align: left;
        margin: 0.2rem 0;
        text-indent: 2em;

        > > > img {
          margin: 0.1rem 0;
        }
      }

      .add_time {
        color: #999999;
        display: flex;
        justify-content: space-between;
      }
    }
  }

</style>
