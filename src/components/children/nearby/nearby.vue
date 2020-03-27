<template>
    <div class="content">
        <div class="hrDiv"></div>
        <ul class="ad_list">
            <li v-for="(item,index) in adlists" :key="index">
            <router-link to="">
              <div class="left_img">
                 <van-image
                  width="0.8rem"
                  height="0.8rem"
                  fit="cover"
                  :src="item.imgurl"
                /> 
              </div>
              <div class="right_msg">
                <div class="name">
                    <div class="tt fontWrap fontWrapTwo">
                      {{item.name}}
                    </div>
                  <div class="tt_name fontWrap fontWrapOne">地址：{{item.address}}</div>
                </div>
                <div class="time">
                  <span>电话：{{item.mobile}}</span>
                  <!-- {{item.status}} 0待审核 1不显示 2审核失败  -->
                </div>
              </div>
              <div class="imgDiv">
                  <img v-show="item.status==0" src="../../../assets/img/shz.png" alt="#">
                  <img v-show="item.status==2" src="../../../assets/img/shsb.png" alt="#">
              </div>
            </router-link>
            </li>
        </ul>
        <div class="addTo">
            <router-link to="/mine/merchantApplication">
            <p>╋ 添加入驻</p>
            </router-link>
            <!-- <div>
                <img src="../../../assets/img/addTo.png" alt="">
                <div>
                    添加入驻
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
  export default {
  components: {},
    data() {
        return {
            adlists: [],
        }
    },
    methods: {
        getad: function () {
            let _this = this,
                admsg = {
                    method: 'get.user.this.store.list'
                };
            this.$post('/api/v1/userStore', admsg)
                .then((response) => {
                    console.log(response)
                    this.adlists = response.data;
                }).catch(function (error) {
                    console.log(error);
            });
        },
    },
    mounted() {
        this.getad()
    },
  computed: {
    
  },
  watch: {
    
  }
}
</script>
<style lang="scss" scoped>
   .content {
       .hrDiv{
           height: 0.1rem;
       }
    .ad_list {
      text-align: left;
      li a {
        position: relative;
        padding: 0.1rem;
        margin-bottom: 0.1rem;
        background-color: #fff;
        display: flex;
        border-bottom: 1px solid #f2f2f2;
        .left_img{
            border-radius: 5px;
        }
        .right_msg {
          padding-left: 0.1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .name {
            font-size: 0.16rem;
            .tt{
                font-size: 0.16rem;
            }
            .tt_name {
              font-size: 0.14rem;
              margin: 0.05rem 0;
              color: #999999;
            }
          }

          .time {
            color: #999999;
            font-size: 0.14rem;
          }
        }

      }
    }
  }
  .imgDiv{
        width: 0.6rem;
        height: 0.6rem;
        position: absolute;
        right: 10px;
  }
  .addTo{
        width: 100%;
        padding:0.1rem;
        p{
            width: 100%;
            color: #fff;
            line-height: 0.5rem;
            background-color: $sss-color;
        }
        >div{
            height: 1.4rem;
            padding: 0.1rem 0;
            // background: #f2f2f2;
            background-color: #fff;
            border-radius: 10px;

            >img{
                width: 0.8rem;
                height: 0.8rem;
                margin-bottom: 0.1rem;
            }
            >div{
                margin: 0 auto;
                width: 0.8rem;
                background-color: $sss-color;
                color: #fff;
                border-radius: 10px;
            }
        }
      
  }
</style>