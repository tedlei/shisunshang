<template>
  <div class="content tl_app" v-if="list.length>0">
    <div class="tl_list" v-for="(item,i) of list" :key='i' @click="tapList(item)">{{item.name}}</div>
  </div>
</template>

<script>
import Bus from '../../../assets/js/bus';
export default {
  data() {
    return {
      list:[],
    };
  },
  created() {
    let { id, title } = this.$route.query;
    Bus.$emit("title",title);
    this.getList(id);
  },
  methods: {
    getList(id) {
      let ad_data = {
        method:'get.help.category.list',
        group_id:id
      };
      this.$post("/api/v1/news", ad_data)
        .then(res => {
          this.list = res.data.items;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //跳转到详情
    tapList(item) {
        this.$router.push({path: '/help', query: {id:item.id,title:item.name}})
    }
  }
};
</script>

<style lang="scss" scoped>
.tl_app {
  padding:0 0.1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  bottom:inherit;
  .tl_list{
    width: 49%;
    height: 0.9rem;
    margin-top: 0.1rem;
    border-radius: 10px;
    background-color: #fff;
    text-align: center;
    line-height: 0.9rem;
    font-size: 0.2rem;
    color: #0F0F0F;
  }
  // .tl_list:nth-child(2n){
  //   margin-left: 2%;
  // }
}
</style>