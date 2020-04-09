<template>
  <newsdetail :datas="props"></newsdetail>
</template>

<script>
    import Newsdetail from "../../children/news/newsdetail.vue";

    export default {
        components: {Newsdetail},
        data() {
            return {
                props: 'helpdetails',
            }
        },
        created() {

        },
        methods: {},
        computed: {},
        watch: {},

    }
</script>
<style lang="scss" scoped>
.deta_app{
  padding:5px 10px;
}
</style>
