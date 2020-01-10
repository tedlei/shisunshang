<template>
  <router-link to="login">
    <div class="home">{{ msg }}</div>
  </router-link>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {
                msg: '首页'
            }
        }
    }
</script>

<style lang="scss" scoped>
  .home {
    color: #f00;
  }
</style>
