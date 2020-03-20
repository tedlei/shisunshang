<template>
  <div class="content">
    <div style="position: relative;color: #fff">
      <img src="../../../assets/img/icon3.png">
      <span style="position: absolute;left: 50px;transform: translateY(-50%);top: 50%">待付款</span>
    </div>
    <div class="common_box adress">
      <router-link to="" class="common">
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

    <div class="common_box">
      <div to="" class="common m_b_10">
        <div class="left">
          <img src="../../../assets/img/stoe.png" style="width: 18px">
          <span>
            <p>富锦旗舰店</p>
          </span>
        </div>
        <div class="clo-g right">
          待付款
        </div>
      </div>
      <div class="common goods">
        <div class="left_img"><img src="/static/img/c_goods.9079655.png"></div>
        <div class="center_text">
          <a href="/goodsdetails/order" class="link_div router-link-active">
            <div>富锦年货特产坚果零食大礼包万事如意混合坚果公司送礼盒装</div>
            <div style="color: rgb(153, 153, 153);"><span>规格:1000*10;</span> <span>数量:1</span></div>
          </a>
          <div data-v-46727266="" class="right_price">
            ￥268.00
          </div>
        </div>
      </div>

    </div>
    <div class="common_box">
      <div class="common">
        <div class="left">
          配速方式
        </div>
        <div class="right">
          物流配送
        </div>
      </div>
    </div>
    <div class="common_box">
      <div class="common m_b_10">
        <div>发票信息</div>
        <div class="right">
          <span style="color: #ff0000;margin-right: 10px">系统识别显示不开或者开具</span>
          <span>不开发票</span>
        </div>
      </div>
    </div>
    <div class="common_box">
      <div class="common">
        <div class="left">
          实际付款(含运费￥0.00)
        </div>
        <div class="right">
          ￥268.00
        </div>
      </div>
    </div>

    <div class="common_box">
      <div class="common service">
        <router-link to="">
          <i class="el-icon-service"></i>
          <span>联系客服</span>
        </router-link>
        <router-link to="">
          <i class="el-icon-phone"></i>
          <span>拨打电话</span>
        </router-link>
      </div>
    </div>

    <div class="common_box">
      <div class="common">
        <div class="left">
          订单编号：<span>1244798214824823154</span>
        </div>
        <div class="clo-g right copy">
          复制
        </div>
      </div>
      <div class="common">
        <div class="left">
          创建时间：<span>2010.1.3</span>
        </div>
      </div>
    </div>
<!--  删除  -->
    <div class="delet">
      删除
    </div>
  </div>
</template>

<script>
  export default {
    name: "Orderdetails",
    data() {
      return {}
    }
  }
</script>

<style scoped lang="scss">
  .content {
    padding-bottom: 50px;
    i {
      font-size: 0.18rem;
    }

    .common_box {
      text-align: left;
      padding: 0px;

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

    .service {
      a {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          margin-right: 5px;
          color: #999999;
        }
      }
    }
    .copy{
      padding: 5px 20px;
      border: 1px solid #009900;
      border-radius: 5px;
    }

    .goods {
      display: flex;
      margin: 10px 0;

      .left_img {
        width: 90px;
        margin-right: 10px;
      }

      .center_text {
        width: calc(100% - 90px);
        display: flex;
        padding: 10px 0;

        .link_div {
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-right: 10px;
        }

      }
    }
    .delet{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      line-height: 50px;
      color: #fff;
      background-color: #333333;
    }
  }


</style>
