<template>
  <!--  空  -->
  <div class="none_store" :style="{'height':height}">
    <div>
      <img src="../../../assets/img/nostore.png">
      <p v-if="show1">{{text1}}</p>
      <pre v-if="show2">{{text2}}</pre>
      <div class="tolink" v-if="show3">
        <router-link :to="{path:url,query:{querys}}">{{tolink}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
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
                show3: true,
                querys: '{addressid:add}',
            }
        },
        mounted() {
            // console.log(this.isemptytype)
            let acsp = this.isemptytype
            switch (acsp) {
                case 'address':
                    this.text1 = '暂无收货地址'
                    this.text2 = '您可以新增地址以方便收货'
                    this.tolink = '新增收货地址'
                    this.url = '/mine/Add-address'
                    this.querys = 'addressid:add'

                    break;
                case 'record':
                    this.text1 = '暂无相关记录'
                    this.show2 = false
                    this.show3 = false
                    break;
                case 'myinvoice':
                    this.text1 = '暂无发票信息'
                    this.text2 = '您可以新增发票信息已方便使用'
                    this.tolink = '新增发票信息'
                    this.url = '/mine/invoice'
                    this.querys = 'state:' + 1
                    break;

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
