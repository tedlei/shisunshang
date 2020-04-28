<template>
  <div>
    <div class="content">
      <ul class="ad_list">
        <li v-for="(item,index) in adlists" :key="index" class="common_box">
          <div class="ad_a" @click="tapTz({path:'/mine/ad/addetails',query:{id:item.id}})">

            <!-- <router-link :to="{path:'/mine/ad/addetails',query:{id:item.id}}"> -->
            <div class="left_img">
              <van-image
                width="0.8rem"
                height="0.8rem"
                fit="cover"
                :src="item.img"
                style="display: block"
              />
            </div>
            <div class="right_msg">
              <div class="name">
                <div class="tt" style="font-weight: bold;">{{item.title}}</div>
                <div class="tt_name">{{item.desc}}</div>
              </div>
              <div class="time">
                <span>时间：{{item.add_time}}</span>
                <span>来源：{{item.users_id}}</span>
                <div class="font_fx" @click.stop="tapTz({path:'/mine/ad/addetails',query:{id:item.id,type:true}})">
                  点击分享
                </div>
                <!-- <i
                  class="el-icon-share"
                  style="font-size:0.2rem;float:right;"
                  @click.stop="share(item.id)"
                ></i> -->
              </div>
            </div>
            <!-- </router-link> -->
          </div>
          <div class="EditDelete" v-if="dmsg == 'myad' ? true : false">
            <div @click.stop="editAdd(item.id)">
              <van-icon style="margin:0 0.05rem;" name="edit" size="15"/>
              编辑
            </div>
            <div @click.stop="deleteAdd(item.id)">
              <van-icon style="margin:0 0.05rem 0 0.2rem;" name="delete" size="15"/>
              删除
            </div>
          </div>
        </li>
      </ul>

      <!-- <van-popup
        v-model="shareshow"
        :style="{ background:'none',padding:'0.1rem',width:'100%',borderRadius:'5px',height:'100%'}"
        @click="closepop"
      >
        <div style="text-align: right">
          <img style="width:auto;" src="../../../assets/img/zhi.png" class="zhi" />
        </div>
        <div style="color: #fff;">
          <strong>立即分享给好友吧</strong>
          <p>点击屏幕右上角将本页面分享给好友</p>
        </div>
      </van-popup> -->
      <van-empty description="暂无发布记录哦！" v-if="isempty"/>
    </div>

    <div class="common_btn bottom_fixed postAd " v-if="ispostAd">
      <router-link to="/mine/ad/articles">发布文章</router-link>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ad",
        props: ["dmsg"],
        data() {
            return {
                shareshow: false,
                adlists: [],
                ispostAd: this.dmsg == 'myad' ? true : false,
                isempty: false,
            };
        },
        methods: {
            //跳转
            tapTz(value) {
                this.$router.push(value);
            },

            //获取数据
            getad: function () {
                let _this = this,
                    admsg = {
                        method:
                            _this.dmsg == "myad"
                                ? "get.weixin.ad.user.list"
                                : "get.weixin.ad.list"
                    };
                this.$post("/api/v1/weixinAd", admsg)
                    .then(response => {
                        _this.adlists = response.data.items;
                        _this.isempty = response.data.items.length > 0 ? false : true
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            // 删除
            deleteAdd: function (e) {
                this.$dialog.confirm({
                    title: '确定删除该地址？',
                    message: '删除该地址后，将不会恢复!'
                }).then(() => {
                    let admsg = {
                        method: 'del.weixin.ad.list',
                        id: e
                    };
                    this.$post("/api/v1/weixinAd", admsg)
                        .then(response => {
                            if (response.status == 200) {
                                this.$toast({
                                    message: '删除成功!',
                                    type: 'success',
                                });
                                for (let i in this.adlists) {
                                    if (this.adlists[i].id == e) {
                                        this.adlists.splice(i, 1)
                                    }
                                }
                                this.adlists = this.adlists;
                                this.isempty = this.adlists.length > 0 ? false : true
                            }

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }).catch(() => {
                });

            },
            // 编辑
            editAdd: function (e) {
                this.$router.replace({
                    path: '/mine/ad/articles',
                    query: {editId: e, state: 'edit'}
                })
            }
        },
        mounted() {
            this.getad();
        }
    };
</script>

<style scoped lang="scss">
  .content {
    .ad_list {
      text-align: left;

      li {
        padding-bottom: 0.1rem;
        border-bottom: 1px solid #f2f2f2;

        .ad_a {
          display: flex;
          align-items: center;

          .right_msg {
            padding-left: 0.15rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 1;

            .name {
              .tt_name {
                font-size: 0.12rem;
                margin: 0.05rem 0 0.1rem 0;
                text-align: justify;
              }
            }

            .time {
              color: #999999;
              font-size: 0.12rem;

              .font_fx {
                height: 0.25rem;
                text-align: right;
                line-height: 0.25rem;
                font-size: 0.14rem;
                color: #009900;
              }
            }
          }
        }

        .EditDelete {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-top: 0.1rem;
          margin-top: 0.1rem;
          border-top: 1px solid #f2f2f2;

          i {
            vertical-align: -2px;
          }
        }
      }

    }
  }

  .postAd {
    border-radius: 0;
    line-height: 0.5rem;
  }
</style>
