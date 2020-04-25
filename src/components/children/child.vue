<template>
  <div style="height: 100%">
<!--    <headerback v-show="$route.meta.goods"></headerback>-->
    <orderheader v-show="!$route.meta.goods"></orderheader>
    <router-view></router-view>


  </div>
</template>

<script>

    // import Headerback from "../headerback/headerback";
    import Orderheader from "./orderheader";

    export default {
        name: "child",
        components: {Orderheader},
        data() {
            return {
                visible: false
            }
        },
        methods: {

        }
    }
</script>

<style scoped lang="scss">

</style>
