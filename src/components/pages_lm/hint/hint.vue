<template>
  <div class="hint-app" v-if="show">
      <div class="hint_main" id="hint">
          <van-icon :name="type" class="hint_icon" />
          <p class="hint_p">{{text}}</p>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.hint-app{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .hint_main{
        width: 1.3rem;
        height: 1.3rem;
        padding:0 5px;
        background-color: rgba(0,0,0,0.7);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .hint_icon,.hint_p{
            color: #fff;
            font-size: 0.35rem;
        }
        .hint_p{
            margin-top: 5px;
            font-size: 0.13rem;
        }
    }
}
</style>