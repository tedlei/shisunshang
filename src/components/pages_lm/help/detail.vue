<template>
  <div class="deta_app" v-html="detail?detail.content:''">
  </div>
</template>

<script>
import Bus from '@/assets/js/bus';
  export default {
  components: {},
  data () {
    return {
      detail:null,   //帮助中心详情
    }
  },
  created(){
      let {id} = this.$route.query
      if(id){
          this.getDetail(id);
      } 
  },
  methods: {
    //获取帮助中心详情
    getDetail(id){
        let ad_data={
            method:	"get.help.item",
            id 
        }
        this.$post("/api/v1/news", ad_data)
        .then(res => {
            this.detail = res.data;
            console.log(res.data.title,456)
            Bus.$emit('title',res.data.title)
        })
        .catch(function(error) {
            console.log(error);
        });
    }
  },
  computed: {
    
  },
  watch: {
    
  },
  beforeDestroy(){
      Bus.$emit('title','')
  }
}
</script>
<style lang="scss" scoped>
.deta_app{
  padding:5px 10px;
}
</style>