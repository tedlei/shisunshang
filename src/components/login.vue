<template>
  <router-link to="home">
    <div class="login">{{ msg }}</div>
  </router-link>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                msg: '登录'
            }
        }
    }
</script>

<style lang="scss" scoped>
  .login{
    color: red;
  }
</style>
