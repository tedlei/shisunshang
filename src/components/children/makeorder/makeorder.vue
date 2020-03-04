<template>
  <div class="content">
    <div class="tips">
      <span class="clo-g">应国家快递实名制规定，收件人须填写真实信息。</span>
      <i class="el-icon-circle-close"></i>
    </div>
    <div class="common_box adress">
      <router-link to="/mine/Address" class="common">
        <div class="left">
          <i class="el-icon-location"></i>
          <span>
            <p>大哥&nbsp;15320495341</p>
            <p>重庆市&nbsp;江北区&nbsp;五里店</p>
          </span>
        </div>
        <div class="right">
          <i class="el-icon-arrow-right"></i>
        </div>
      </router-link>
    </div>

    <div class="common_box allmsg">
      <router-link to="business/storemsg" class="common m_b_10">
        <div class="left">
          <img src="../../../assets/img/stoe.png" style="width: 18px">
          <span>
            <p>富锦旗舰店</p>
          </span>
        </div>
        <div class="right">
          <i class="el-icon-arrow-right"></i>
        </div>
      </router-link>

      <router-link to="" class="common m_b_10">
        <img src="../../../assets/img/c_goods.png" style="width: 100px">
        <div class="right">
          <span>共1件</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </router-link>

      <div class="common delivery">
        <div class="left">
          配速方式
        </div>
        <div class="right">
          物流配送
        </div>
      </div>

      <div class="common liuyan">
        <div style="width: max-content;min-width: 70px;">买家留言：</div><el-input v-model="input" placeholder="(选填)可输入20字买家留言" maxlength="20"></el-input>
      </div>

      <router-link to="" class="common m_b_10">
        <div>发票信息</div>
        <div class="right">
          <span>不开发票</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </router-link>

      <div class="price">
        <div class="left">
          <span>商品金额</span>
          <span class="clo-g">￥268.00</span>
        </div>
        <div class="right">
          <span>运费</span>
          <span class="clo-g">+￥0.00</span>
        </div>
      </div>
    </div>
    <!--  底部提交  -->
    <div class="clearfix bot_submit">
      <div class="left_text">实付款：￥268.00</div>
      <div class="right_btn"><router-link to="/goodsdetails/order?orderid=1">提交订单</router-link></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "makeorder",
    data(){
      return{
        input:''
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    i {
      font-size: 0.18rem;
    }

    .tips {
      padding: 0 10px;
      background-color: #ffebea;
      display: flex;
      justify-content: space-between;
      /*align-items: center;*/
      line-height: 40px;

      i {
        line-height: 40px;
        color: #999999;
      }
    }

    .common_box {
      text-align: left;
      padding: 0 10px;
      .common {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #f2f2f2;
      }

      .left {
        display: flex;
        align-items: center;

        i, img {
          margin-right: 10px;
          color: #999999;
        }

      }

      .right {
        i {
          color: #999999;
        }

      }

    }

    .liuyan .el-input /deep/ input{
      background:none;
    }

    .price{
      padding: 10px 0;
      .left,.right{
        display: flex;
        justify-content: space-between;
      }
    }

    .bot_submit {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      line-height: 50px;
      color: #ffff;

      .left_text {
        padding-left: 10px;
        background-color: #333;
        float: left;
        width: 50%;
        text-align: left;
      }

      .right_btn {
        background-color: #009900;
        float: right;
        width: 50%;
      }
    }

  }


</style>
