<template>
    <div class="list_app">
        
    </div>
</template>

<script>
import waresCard from '../card/card'
export default {
    props:['wholelist'],
    components: {waresCard},
    data() {
        return {};
    },
    methods: {},
    computed: {},
    watch: {}
};
</script>
<style lang="scss" scoped>
.list_app{
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
}
</style>