<template>
  <div>


    <div class="content">
      <div class="hrDiv"></div>
      <ul class="ad_list">
        <li v-for="(item,index) in adlists" :key="index" class="common_box">
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
              <img v-if="item.status==0" src="../../../assets/img/shz.png" alt="#">
              <img v-else src="../../../assets/img/shsb.png" alt="#">
            </div>
          </router-link>
          <div class="Divider"></div>
          <div class="EditDelete">
            <div @click="editAdd(item.id,item)">
              <van-icon style="margin:0 0.05rem;" name="edit" size="15"/>
              编辑
            </div>
            <div @click="deleteAdd(item.id)">
              <van-icon style="margin:0 0.05rem 0 0.2rem;" name="delete" size="15"/>
              删除
            </div>
          </div>
        </li>
      </ul>

    </div>

    <div class="common_btn bottom_fixed addTo">
      <router-link to="/mine/merchantApplication">
        <p> + 添加入驻</p>
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
                        // console.log(response)
                        if (response.status == 200) {
                            this.adlists = response.data;
                        } else {
                            this.$toast(response.message);
                        }
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            //编辑按钮
            editAdd(id, data) {
                this.$store.commit('setMerchantApplicationObj', data);
                // console.log(this.$store.getters.getMerchantApplicationObj)
                this.$router.push({path: '/mine/merchantApplicationEidet', query: {state: 'edit', id: id}})
                //   this.$router.push({path:'/mine/merchantApplicationEidet'})
            },
            //删除按钮
            deleteAdd(id) {
                this.$dialog.confirm({
                    title: '删除不能撤销，确认删除？',
                })
                    .then(() => {
                        // on confirm
                        let data = {
                            method: "del.user.this.store.item",
                            id: id
                        };
                        this.$post('/api/v1/userStore', data)
                            .then((response) => {
                                // console.log(response)
                                if (response.status == 200) {
                                    this.getad();
                                } else {
                                    this.$toast(response.message)
                                }
                            }).catch(function (error) {
                            console.log(error);
                        });
                    })
                    .catch(() => {
                        // on cancel
                    });
            }
        },
        mounted() {
            this.getad()
        },
        computed: {},
        watch: {}
    }
</script>
<style lang="scss" scoped>
  .content {
    bottom: 0.5rem;

    .hrDiv {
      height: 0.1rem;
    }

    .ad_list {
      text-align: left;

      li {
        > a {
          position: relative;
          padding: 0 0 0.1rem 0;
          display: flex;
          // border-bottom: 1px solid #f2f2f2;
          .left_img {
            border-radius: 5px;
          }

          .right_msg {
            padding-left: 0.1rem;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .name {
              font-size: 0.16rem;

              .tt {
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

        .Divider {
          height: 1px;
          background-color: #ebedf0;
        }

        .EditDelete {
          display: flex;
          justify-content: flex-end;
          padding: 0.05rem 0.1rem 0.05rem 0;
          // color: $sss-color;
          > div {
            display: flex;
            align-items: center;
          }
        }
      }

    }
  }

  .imgDiv {
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    right: 10px;
  }

  .addTo {
    line-height: 0.5rem;
    border-radius: 0;

    p {

    }

    > div {
      height: 1.4rem;
      padding: 0.1rem 0;
      // background: #f2f2f2;
      background-color: #fff;
      border-radius: 10px;

      > img {
        width: 0.8rem;
        height: 0.8rem;
        margin-bottom: 0.1rem;
      }

      > div {
        margin: 0 auto;
        width: 0.8rem;
        background-color: $sss-color;
        color: #fff;
        border-radius: 10px;
      }
    }

  }
</style>
