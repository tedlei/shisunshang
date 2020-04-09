<template>
  <div class="content list_app">
    <template v-for="(item,i) of list">
      <div class="help_list" :key="i" @click="tapList(item.id)">
        <div class="help_l" :class="(list.length-1===i)?'border0':''">
          <span class="f1">{{item.title}}</span>
          <van-icon class="f2" name="arrow"/>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                list: [],  //帮助中心列表
            }
        },
        created() {
            this.getHelpList();
        },
        methods: {
            //获取帮助中心列表
            getHelpList() {
                let ad_data = {
                    method: "get.help.list",
                    page: 0,
                    page_size: 10
                }
                this.$post("/api/v1/news", ad_data)
                    .then(res => {
                        let {items} = res.data;
                        this.list = items;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            //跳转到详情
            tapList(id) {
                this.$router.push({path: '/help/helpDetail', query: {id}})
            }
        },
        computed: {},
        watch: {}
    }
</script>
<style lang="scss" scoped>
  .list_app {
    width: 100%;
    background-color: #fff;

    .help_list {
      width: 100%;
      height: 50px;
      padding: 0 10px;
      background-color: #fff;

      .help_l {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .f1, .f2 {
          color: #999;
          font-size: 16px;
        }

        .f2 {
          font-size: 22px;
          font-weight: 400;
        }
      }

      .border0 {
        border: 0;
      }
    }

    .help_list:active {
      background-color: #e0e0e0;
      opacity: 0.8;
    }
  }
</style>
