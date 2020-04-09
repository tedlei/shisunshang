<template>
    <div class="content">
        <div class="Payment">
            <img src="../../../assets/img/zfcg.png" alt="">
            <div>订单支付成功！</div>
            <div>
                <div class="information">
                    <span>订单编号：</span>
                    <span style="width:75%" class="fontWrap fontWrapOne">&nbsp;&nbsp;&nbsp;
                        {{$route.query.id+''}}
                    </span>
                </div>
                <div class="information">
                    <span>实付金额：</span>
                    <span style="width:75%" class="fontWrap fontWrapOne">&nbsp;&nbsp;&nbsp;
                        {{oder.total_money}}
                    </span>
                </div>
                <div class="borderDiv"></div>
                <div class="information">
                    <span>商品金额：</span>
                    <span style="width:75%" class="fontWrap fontWrapOne">&nbsp;&nbsp;&nbsp;
                        {{oder.total_goods_money}}
                    </span>
                </div>
                <div class="information">
                    <span>商品运费：</span>
                    <span style="width:75%" class="fontWrap fontWrapOne">&nbsp;&nbsp;&nbsp;
                        {{oder.total_postage}}
                    </span>
                </div>
                <div class="information">
                    <span>保价费：</span>
                    <span style="width:75%" class="fontWrap fontWrapOne">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {{oder.total_offer_money}}
                    </span>
                </div>
                 <div class="information">
                    <span>充值金：</span>
                    <span style="width:75%" class="fontWrap fontWrapOne">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {{oder.pay_cz_money}}
                    </span>
                </div>
                <!-- <div class="information">
                    <span>收货人：</span>
                    <span style="width:75%" class="fontWrap fontWrapOne">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    </span>
                </div>
                <div class="information">
                    <span>收货地址：</span>
                    
                    <span style="width:75%" class="fontWrap fontWrapOne">&nbsp;&nbsp;&nbsp;
                    </span>
                </div> -->
            </div>
            <div @click="seeOrder">查看订单</div>
        </div>
    </div>
</template>

<script>
    export default {
    components: {},
    data () {
        return {
            oder:{}
        }
    },
    methods: {
        getData () {
            let pay_no = this.$route.query.id;
            let ad_data = {
                method: 'get.pay.info',
                pay_no: pay_no
            }
            this.$post('/api/v1/order', ad_data)
            .then((res) => {
                console.log(res)
                this.oder = res.data;
            }).catch(function (error) {
                console.log(error);
            });
        },
        seeOrder () {
            this.$router.push({path: '/goodsdetails/order', query: {orderid: 0}});
        }
    },
    created() {
        this.getData();
    },
    computed: {
      
    },
    watch: {
      
    }
}
</script>
<style lang="scss" scoped>
    .Payment{
        background-color: #fff;
        padding: 0.1rem;
        >img{
            width: 1.3rem;
        }
        >div:nth-child(2){
            font-size: 0.16rem;
            color: $sss-color;
            font-weight: bold;
        }
        >div:nth-child(3){
            margin: 0.2rem 0;
            color: #909090;
            .borderDiv{
                border-top: 1px solid #eaeaea;
            }
            .information{
                text-align: left;
                display: flex;
                margin: 0.1rem 0;
            }
        }
        >div:nth-child(4){
            width: 100%;
            background-color: $sss-color;
            color: #fff;
            font-size: 0.16rem;
            line-height: 0.5rem;
            border-radius: 5px;
            margin-bottom: 0.4rem;
        }
        
    }
</style>