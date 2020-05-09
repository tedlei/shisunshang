<template>
  <div class="content list_app">
    <template v-for="(item,i) of list">
      <div class="help_list common_box" :key="i" @click="tapList(item)">
        <div class="help_l" :class="(list.length-1===i)?'border0':''">
          <span class="f1">{{item.title}}</span>
          <van-icon class="f2" name="arrow" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Bus from "../../../assets/js/bus";
export default {
  components: {},
  data() {
    return {
      list: [], //帮助中心列表
    };
  },
  created() {
    let { id, title } = this.$route.query;
    if (title) Bus.$emit("title", title);
    else  Bus.$emit("title", '');
    if (id) this.getHelpList(id);
    if(!id||!title) this.list = [
      { title: "用户端帮助中心", id: 1 },
      { title: "商家端帮助中心", id: 2 }
    ];
  },
  methods: {
    //获取帮助中心列表
    getHelpList(id) {
      let ad_data = {
        method: "get.help.list",
        cate_id: id
      };
      this.$post("/api/v1/news", ad_data)
        .then(res => {
          let { items } = res.data;
          this.list = items;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //跳转
    tapList(item) {
      let path = "/help/twoList";
      if(this.$route.query.id) path = "/help/helpDetail"
      this.$router.push({
        path,
        query: { id: item.id, title: item.title }
      });
    }
  }
};
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

      .f1,
      .f2 {
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
</style>
