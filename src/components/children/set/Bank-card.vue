<template>
  <div class="content">
    <!--   添加银行卡     -->
    <div class="add_bankcard" :style="show ?'padding: 0.4rem 0;background-color: #fff;':''">
      <!--   空   -->
      <div v-show="show" style="background-color: #fff" @click="add_bank">
        <van-icon name="add" class="add_bank clo-g" />
        <div class="clo-9" style="font-size: 0.18rem">添加银行卡</div>
      </div>

      <div
        v-show="!show"
        :class="bank[index]"
        class="m_b_10"
        v-for="(item,index) in banklist"
        :key="index"
      >
        <div class="msg_box">
          <div class="name">{{item.name}}</div>
          <div>{{item.number}}</div>
        </div>
      </div>
    </div>

    <div class="common_style add_invoice">
        <router-link :to="{path: '/Bank-card/add-bank-card'}">
          <van-icon name="add"/>
          <span>添加银行卡</span>
        </router-link>
      </div>



  </div>
</template>

<script>
export default {
  name: "Bank-card",
  data() {
    return {
      banklist: [],
      bank: [],
      show: false
    };
  },
  methods: {
    getbank: function() {
      let _this = this,
        bankmsg = {
          method: "get.bank.list"
        };
      this.$post("/api/v1/bank", bankmsg)
        .then(response => {
          if (response.data) {
            _this.banklist = response.data;
            for (var i = 0; i < response.data.length; i++) {
              _this.bank.push("bank" + Math.floor(Math.random() * 3));
            }
          } else {
            _this.show = true;
            this.$store.commit("sendbank", false);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    add_bank: function() {
      this.$router.push({
        path: "/Bank-card/add-bank-card"
      });
    },
  },
  mounted() {
    this.getbank();
    this.$store.commit("sendbank", true);
  },
  destroyed() {
    this.$store.commit("sendbank", false);
  }
};
</script>

<style scoped lang="scss">
.content {
  .add_bankcard {
    margin: 10px;
    border-radius: 5px;
    border: 1px solid #f2f2f2;

    .add_bank {
      font-size: 0.4rem;
    }

    .bank0,
    .bank1,
    .bank2 {
      height: 1.3rem;
      background-size: cover;
      border-radius: 5px;

      .msg_box {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #fff;
        font-size: 0.18rem;
        text-align: left;
        padding: 0 0.5rem;

        .name {
          margin-bottom: 0.1rem;
          font-size: 0.14rem;
        }
      }
    }

    .bank0 {
      background: url("../../../assets/img/bank1.jpg") no-repeat;
    }

    .bank1 {
      background: url("../../../assets/img/bank2.jpg") no-repeat;
    }

    .bank2 {
      background: url("../../../assets/img/bank3.jpg") no-repeat;
    }
  }
  .common_style {
      background-color: #fff;
      margin-top: 0.1rem;
    }
    .add_invoice {
      line-height: 0.7rem;
      font-size: 0.17rem;

      i {
        color: #999;
        font-size: 0.2rem;
        vertical-align: middle;
      }
    }
}
</style>
