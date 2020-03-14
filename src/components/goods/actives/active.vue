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
      // activeOne: [],
      getCart: '',
    }
  },
  methods: {
    activeAdd ( n, itemId) {
      this.active = n;
      let _id = itemId + '';
      // let _id = toString(itemId);
      // console.log(_id)
      this.initial[this.listIndex] = _id;
      // this.$emit('getCart',_id);
      // for (var i in this.initial) {
      //   this.getCart += this.initial[i];
      // }
      // console.log(this.getCart);
    },
    
  },
  mounted(){
    // console.log(this.listIndex);
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