<template>
    <r-record :records="records"></r-record>
</template>

<script>

    import RRecord from "../Rechargemoney/R-record";
    export default {
        name: "withdrawRecord",
        components: {RRecord},
        data(){
            return{
                records:'withdraw'
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
