<template>
    <div class="content">
        <div class='imgdivfff'>
            <div class="imgDIv" @click="show = true">
                <img src="../../../assets/img/zjhb1.jpg" alt="">
            </div>
            <div class="imgDIv">
                <img src="../../../assets/img/ewmbj.jpg" alt="">
            </div>
        </div>
        <van-overlay :show="show" @click="show = false">
            <div class="wrapper">
                <div></div>
                <div>
                    <img src="../../../assets/img/zjhb1.jpg" alt="">
                </div>
            </div>
        </van-overlay>

    </div>
</template>

<script>
    export default {
    components: {},
    data () {
        return {
            show:false,
        }
    },
    methods: {
      
    },
    computed: {
      
    },
    watch: {
      
    }
}
</script>
<style lang="scss" scoped>
    .imgdivfff{
        font-size: 0;
        padding: 0.1rem 0.05rem;
    }
    .imgDIv{
        display: inline-block;
        width: 50%;
        padding: 0.05rem;
        background-size: 100%;
        // background-color: aqua;
        
    }
    .wrapper {
        height: 100%;
        overflow-y: auto;
        >div:first-child{
            height: 0.48rem;
        }
        >img{
            width: 95%;
        }
    }
</style>