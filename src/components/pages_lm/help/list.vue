<template>
  <div class="content list_app">
      <van-tabs
      class="nav"
      v-model="active"
      swipe-threshold="3"
      line-width="calc(29.3333% - 4px)"
      title-active-color="#009900"
      title-inactive-color="#fff"
      animated
      @click="getNum"
    >
    <van-tab v-for="(item,index) in navItems" :key="index" :title="item.text">
    </van-tab>
    </van-tabs>
    <template v-for="(item,i) of list">
      <div class="help_list common_box" :key="i" @click="tapList(item.id)">
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
                active: 0,
                navItems: [
                    {text: "用户指南", wholeData: []},
                    {text: "商家指南", wholeData: []},
                    {text: "待评价", wholeData: []}
                ],
                list: [],  //帮助中心列表
            }
        },
        created() {
            this.getHelpList();
        },
        methods: {
            getNum( e ){
                console.log(e)
            },
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

    .help_list {
        color: #000;
      height: 50px;
      background-color: #fff;

      .help_l {
        width: 100%;
        height: 100%;
        // border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .f1, .f2 {
            color: #000;
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
  > > > .nav {
      .van-tabs__nav {
        background-color: #009900;
      }

      .van-tabs__wrap {
        height: auto;
        padding: 0.1rem;
        background-color: #f2f2f2;
      }

      .van-tab {
        line-height: 0.3rem;
        z-index: 9;
      }

      .van-tabs__nav--line {
        padding-bottom: 0;
        border-radius: 0.3rem;
        border: 1px solid #f2f2f2;
      }

      .van-tabs__line {
        background-color: #fff;
        top: 2px;
        bottom: 2px;
        height: auto;
        border-radius: 0.3rem;
      }

      .van-list {
        padding: 0 0.1rem;
      }
    }
</style>
