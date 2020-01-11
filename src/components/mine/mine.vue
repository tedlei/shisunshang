<template>
  <div>
    <router-link to="login">
      <div class="home">{{ msg }}</div>
    </router-link>
    <el-button @click="visible = true">Button</el-button>
  </div>

</template>

<script>
    import Axios from 'axios';

    export default {
        name: "home",
        data() {
            return {
                msg: '我的'
            }
        }
    }
</script>

<style lang="scss" scoped>
  .home {
    color: #f00;
  }
</style>
