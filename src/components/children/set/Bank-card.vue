<template>
  <div class="content">
    <!--   添加银行卡     -->
    <div class="add_bankcard " @click="aaaa" :style="banklist == '' ?'padding: 0.4rem 0;':''">
      <!--   空   -->
      <div v-show="false" style="background-color: #fff">
        <van-icon name="add" class="add_bank clo-g"/>
        <div class="clo-9" style="font-size: 0.18rem">添加银行卡</div>
      </div>

      <div :class="bank[index]" class="m_b_10" v-for="(item,index) in banklist" :key="index">
        <div class="msg_box">
          <div class="name">{{item.name}}</div>
          <div>{{item.number}}</div>
        </div>
      </div>

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
            }
        },

        methods: {
            aaaa: function () {
                this.$store.commit('sendbank', true);
            },

            getbank: function () {
                let _this = this,
                    bankmsg = {
                        method: 'get.bank.list'
                    };
                this.$post('/api/v1/bank', bankmsg)
                    .then((response) => {
                        _this.banklist = response.data
                        console.log(response)
                        for(var i=0; i<response.data.length; i++){
                            _this.bank.push("bank" + Math.floor(Math.random() * 3));
                        }
                        console.log(this.bank)
                    }).catch(function (error) {
                    console.log(error);
                });
            },
        },
        mounted() {
            console.log(this.getbank())
            console.log(this.$store.getters.getbank)
        }
    }
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

      .bank0,.bank1,.bank2 {

        height: 1.5rem;
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
      .bank0{
        background: url("../../../assets/img/bank1.jpg") no-repeat;
      }
      .bank1{
        background: url("../../../assets/img/bank2.jpg") no-repeat;
      }
      .bank2{
        background: url("../../../assets/img/bank3.jpg") no-repeat;
      }
    }
  }
</style>
