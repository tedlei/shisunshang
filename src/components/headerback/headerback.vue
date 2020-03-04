<template>
  <header>
    <i class="el-icon-arrow-left back" @click="$router.back(-1)"></i>
    <ul class="clearfix tips">
      <li class="active">商品</li>
      <li>详情</li>
      <li>评价</li>
    </ul>
  </header>
</template>

<script>
  import { back } from '../../assets/js/conmon';
  export default {
    name: "headerback",
    data() {
      return {}
    },
    methods: {

    }
  }
</script>

<style scoped lang="scss">
  header {
    font-size: 0.16rem;
    display: flex;
    justify-content: center;
    padding: 10px 15px;
    background-color: #fff;
    position: relative;
    position: fixed;
    width: 100%;
    z-index: 9;

  i {
    font-size: 0.28rem;
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
  }

  .tips li {
    padding: 0px 15px 10px 15px;
    float: left;
  }

  .tips li.active {
    border-bottom: 3px solid #009900;
  }
  }
</style>
