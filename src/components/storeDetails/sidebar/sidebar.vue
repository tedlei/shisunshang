<template>
    <div class="sidebar">
        <div :class="isBoder==n?'sidebarBoder':''" v-for="(item,n) of list" :key="n"
        @click="addSidebar(n)">{{item}}</div>
    </div>
</template>

<script>
  export default {
  components: {},
  data () {
    return {
      list: ['全部商品', '厨房检点', '厨房检点', '厨房检点', '厨房检点', '厨房检点', '厨房检点'],
      isBoder: 0
    }
  },
  methods: {
      addSidebar ( n ){
          this.isBoder = n;
      },
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>
<style lang="scss" scoped>
    .sidebar{
        height: 100%;
        line-height: 0.45rem;
        background-color: #f2f2f2;
        font-size: 0.10rem;
        >div{
            padding: 0 0.1rem;
            border-bottom: 1px solid #cccccc;
            border-left: 3px solid #f2f2f2;
            box-sizing: border-box;
        }
        .sidebarBoder{
            border-left: 3px solid $sss-color;
            color: $sss-color;
        }
    }
</style>