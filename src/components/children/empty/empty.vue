<template>
  <!--  空  -->
  <div class="none_store">
    <div>
      <img src="../../../assets/img/search_none.png">
      <p v-if="show1">{{text1}}</p>
      <pre v-if="show2">{{text2}}</pre>
      <div class="tolink">
        <router-link v-if="showaddress" :to="{path:url,query:{addressid:'add'}}">{{tolink}}</router-link>
        <router-link v-if="showinvoice" :to="{path:url,query:{state:1}}">{{tolink}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
    import clientWw from "../../../assets/js/conmon";

    export default {
        name: "empty",
        props: {
            isemptytype: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                height: '',
                isempty: false,
                text1: '',
                text2: '',
                tolink: '',
                url: '',
                urlcode: '',
                show1: true,
                show2: true,
                showaddress: false,
                showinvoice: false,
                querys: '{addressid:add}',
            }
        },
        mounted() {
            let acsp = this.isemptytype
            switch (acsp) {
                case 'address':
                    this.text1 = '暂无收货地址'
                    this.text2 = '您可以新增地址以方便收货'
                    this.tolink = '新增收货地址'
                    this.url = '/mine/Add-address'
                    this.showaddress = true
                    break;
                case 'record':
                    this.text1 = '暂无相关记录'
                    this.show2 = false
                    break;
                case 'myinvoice':
                    this.text1 = '暂无发票信息'
                    this.text2 = '您可以新增发票信息已方便使用'
                    this.tolink = '新增发票信息'
                    this.url = '/mine/invoice'
                    this.showinvoice = true
                    break;

            }

        }
    }
</script>

<style scoped lang="scss">
  .none_store {
    display: flex;
    align-items: center;
    height: 100%;
    img {
      width: 33.333%;
      margin: 40px;
    }

    pre {
      color: #999999;
      margin: 10px 0 20px 0;
    }

    .tolink {
      line-height: 40px;
      border-radius: 10px;
      background-color: #009900;
      color: #fff;
      width: 40%;
      margin: 0 auto;
    }
  }
</style>
