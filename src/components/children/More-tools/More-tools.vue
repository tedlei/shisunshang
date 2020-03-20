<template>
  <div class="content">
    <div class="toolslist" v-for="(item,index) in toolslist" :key="index">
      <strong class="tll">{{item.tll}}</strong>
      <ul class="clearfix">
        <li v-for="(itemli,liindex) in item.list" :key="liindex">
          <router-link :to="{path:itemli.linkto}">
            <div style="margin-bottom: 10px">
              <img :src="require(`../../../assets/img/${itemli.img}.png`)" style="width: 34px">
            </div>
            <div>
              {{itemli.text}}
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "More-tools",
        data() {
            return {
                toolslist: [
                    {
                        tll:'必备工具',
                        list: [
                            {
                                img: 'mgj1',
                                text: '账户充值',
                                linkto:'/mine/Rechargemoney'
                            },
                            {
                                img: 'mgj2',
                                text: '资金提现',
                                linkto:'/mine/Cash-withdrawal'
                            },
                            {
                                img: 'mgj3',
                                text: '账户互转',
                                linkto:'/mine/Trans'
                            },
                            {
                                img: 'mgj4',
                                text: '发票专区',
                                linkto:''
                            },
                            {
                                img: 'mgj5',
                                text: '实名认证',
                                linkto:'/mine/certification'
                            },
                            {
                                img: 'mgj6',
                                text: '主题换肤',
                                linkto:''
                            },
                            {
                                img: 'mgj7',
                                text: '绑定银行卡',
                                linkto:''
                            },
                            {
                                img: 'mgj8',
                                text: '卡券管理',
                                linkto:''
                            },
                        ]
                    },
                    {
                        tll:'参与互动',
                        list: [
                            {
                                img: 'gj1',
                                text: '营销广告',
                                linkto:'/mine/ad'
                            },
                            {
                                img: 'gj2',
                                text: '我的分享',
                                linkto:'/mine/ad'
                            },
                            {
                                img: 'gj3',
                                text: '商品分享',
                                linkto:'/mine/share'
                            },
                            {
                                img: 'gj4',
                                text: '收货地址',
                                linkto:'/mine/Address'
                            },
                            {
                                img: 'gj5',
                                text: '个人信息',
                                linkto:'/mine/usermsg'
                            },
                            {
                                img: 'gj6',
                                text: '我的团队',
                                linkto:'/mine/Myteam'
                            },
                            {
                                img: 'gj7',
                                text: '财务记录',
                                linkto:'/mine/record'
                            },
                            {
                                img: 'gj8',
                                text: '关于我们',
                                linkto:'/mine/ad'
                            },
                        ]
                    },
                    {
                        tll:'国健合作',
                        list: [
                            {
                                img: 'gj1',
                                text: '营销广告',
                                linkto:''
                            },
                            {
                                img: 'gj2',
                                text: '我的分享',
                                linkto:''
                            },
                            {
                                img: 'gj3',
                                text: '商品分享',
                                linkto:''
                            },
                            {
                                img: 'gj4',
                                text: '收货地址',
                                linkto:''
                            },
                        ]
                    }
                ]
            }
        },

    }
</script>

<style scoped lang="scss">
.content{
  .toolslist{
    background-color: #fff;
    border-radius: 5px;
    margin-top: 0.15rem;
    padding: 0.15rem;
    strong.tll{
      display: block;
      text-align: left;
      font-size: 0.16rem;
      position: relative;
      text-indent: 0.1rem;
      margin-bottom: 0.1rem;
    }
    strong.tll:after{
      content: '';
      width: 3px;
      display: inline-block;
      background-color: #009900;
      position: absolute;
      left: 0;
      top: 4px;
      bottom: 4px;
    }
    strong.tll:before{
      content: '';
      display: inline-block;
      position: absolute;
      border-top: 1px solid #f2f2f2;
      left: -0.15rem;
      right:-0.15rem;
      bottom: -0.1rem;
    }

    ul{

      li{
        float: left;
        width: 25%;
        padding: 15px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
}
</style>
