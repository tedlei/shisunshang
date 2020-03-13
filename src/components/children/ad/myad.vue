<template>
    <div>
      <ad :dmsg="dmsg"></ad>
    </div>
</template>

<script>
    import Ad from "./ad";
    export default {
        name: "myad",
        components: {Ad},
        data(){
            return{
                dmsg:'myad'
            }
        }
    }
</script>

<style scoped>

</style>
