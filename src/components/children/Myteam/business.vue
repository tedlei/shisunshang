<template>
    <div class="content">
        <ul v-if="adlists" class="ad_list">
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
        <div v-show="show">暂无商家</div>
    </div>
</template>

<script>
export default {
    components: {},
    data () {
        return {
            show: false,
            adlists: null
        }
    },
    methods: {
        openteamTwo() {
          let _this = this,
              teammsg = {
                  method: 'get.user.recomment.store.list'
              };
          this.$post('/api/v1/userStore', teammsg)
              .then((res) => {
                console.log(res)
                if(res.status==200){
                    this.adlists = res.data;
                    if(res.data.length == 0 ){
                        this.show=true;
                    }
                }
              }).catch(function (error) {
                console.log(error);
          });
        },
    },
    created () {
        this.openteamTwo();
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
</style>