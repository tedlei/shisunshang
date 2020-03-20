<template>
  <!--  空  -->
  <div class="none_store" :style="{'height':height}">
    <div>
      <img src="../../../assets/img/nostore.png">
      <p>{{text1}}</p>
      <pre>{{text2}}</pre>
      <div class="tolink">
        <router-link :to="{path:url,query:{addressid:urlcode}}">{{tolink}}</router-link>
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
                addressid:'',
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
                    this.urlcode = 'add',
                        this.addressid = 'id'
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
      margin: 0.5rem;
    }

    pre {
      color: #999999;
      margin: 10px 0 20px 0;
    }

    .tolink {
      line-height: 0.5rem;
      border-radius: 0.5rem;
      background-color: #009900;
      color: #fff;
      width: 40%;
      margin: 0 auto;
    }
  }
</style>
