<template>
  <div class="content">
    <div class="store_banner">
      <img src="../../../assets/img/storebanner.png">
    </div>
    <div class="common_box store_msg">
      <div class="name">
        {{name}}
      </div>
      <div class="time">
        营业时间：{{starttime}} - {{endtime}}
      </div>
      <div class="adress">
        <div>地址：{{adress}}</div>
        <div class="clo-g juli">距你步行3.63公里</div>
      </div>
    </div>

    <div class="common_box introduce">
      <p>经营范围：食品销售经营、巴马水专营、日用百货、食品销售经营、巴马水专营、
        日用百货、食品销售经营、巴马水专营、日用百货、食品销售经营、巴马水专营、
        日用百货、</p>
      <el-row class="introduce_img" :gutter="20">
        <el-col v-for="(item,index) in 3" :key="index" :span="8" >
          <div class="grid-content bg-purple"><img src="../../../assets/img/company1.png"></div>
        </el-col>
      </el-row>

    </div>
    <div class="footer">
      <div class="left_hujiao">
        <i class="el-icon-phone"></i>
        <span>呼叫</span>
      </div>
      <div class="right_daohang">
        <i class="el-icon-position"></i>
        <span>导航</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StoreMsg",
    data() {
      return {
        name: '重庆安利科技技术有限公司',
        starttime: '09:00',
        endtime: '18:00',
        adress: '重庆市江北区金渝大道168号'
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    .store_msg {
      text-align: left;
      padding: 15px;

      .name {
        font-size: 0.18rem;
      }

      .time {
        margin: 10px 0;
        color: #999999;
      }

      .adress {
        display: flex;
        justify-content: space-between;
        align-items: center;

      }
    }

    .introduce {
      p {
        text-align: justify;
        line-height: 2;
        margin-bottom: 10px;
      }
    }

    .footer {
      color: #fff;
      font-size: 0.18rem;
      display: flex;
      justify-content: space-between;
      position: fixed;
      bottom: 0;
      width: 100%;
      .left_hujiao{
        width: 50%;
        background-color: #333;
        line-height: 50px;
      }
      .right_daohang{
        background-color: #009900;
        line-height: 50px;
        width: 50%;
      }

    }

  }

</style>
