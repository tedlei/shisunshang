<template>
    <ul class="clearfix select">
        <li :class="active==n?'active':''" v-for="(item,n) of activeList" :key="n"
        @click="activeAdd(n,item.item_id)">{{item.spec_value}}</li>
    </ul>
</template>

<script>
  export default {
  components: {},
  props: [
      "activeList",
      "listIndex",
      "initial",
  ],
  data () {
    return {
      active: 0,
    }
  },
  methods: {
    activeAdd ( n, itemId) {
      this.active = n;
      let _id = itemId + '';
      this.initial[this.listIndex] = _id;
      // console.log(this.initial);
    },
    
  },
  mounted(){
    // console.log(this.initial);
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>
<style lang="scss" scoped>
  .select {
        li {
          color: #999999;
          float: left;
          margin: 0 10px 10px 0;
          line-height: 35px;
          border-radius: 35px;
          border: 1px solid #999;
          padding: 0 15px;
        }

        li.active {
          color: #009900;
          border: 1px solid #009900;
        }
    }
</style>