<template>
  <newsdetail :datas="props">

  </newsdetail>
</template>

<script>
    import Newsdetail from "../../children/news/newsdetail";

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

</style>
