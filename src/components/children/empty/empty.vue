<template>
    <!--  空  -->
    <div class="none_store" v-show="empty" :style="{'height':height}">
        <div>
            <img src="../../../assets/img/nostore.png">
            <p>{{text1}}</p>
            <pre>{{text2}}</pre>
            <div class="tolink">
                <router-link :to="{path:linkurl,query:querycan}">{{linkto}}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "empty",
        props: ['isemptytype'],
        data() {
            return {
                height: '',
                text1: '',
                text2: '',
                linkto: '',
                linkurl: '',
                querycan: '',
                empty: false,
            }
        },
        created() {
          this.empty = false
        },
        mounted() {
            let pros_data = this.isemptytype
            switch (pros_data) {
                case 'address':
                    this.text1 = '暂无收货地址'
                    this.text2 = '您可以新增地址以方便收货'
                    this.linkto = '新增收货地址'
                    this.linkurl = '/mine/add-address'
                    this.querycan = {addressid: 'add'}
                    break
                case '分类':

                    break
            }
            this.height = ((document.documentElement.clientHeight || document.body.clientHeight) - 43) + 'px';
        }
    }
</script>

<style scoped lang="scss">
    .none_store {
        display: flex;
        align-items: center;
        background-color: #fff;

        img {
            width: 33.333%;
            margin: 50px;
        }

        pre {
            color: #999999;
            margin: 10px 0 20px 0;
        }

        .tolink {
            line-height: 50px;
            border-radius: 50px;
            background-color: #009900;
            color: #fff;
            width: 40%;
            margin: 0 auto;
        }
    }
</style>
