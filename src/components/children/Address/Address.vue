<template>
  <div class="content" :style="addresslist== null ? {paddingBottom:0}:''">
    <ul class="address_list" v-show="addresslist != null">
      <li class="common_box" v-for="(item, index) in addresslist" :key="item.id">
        <div @click="rouMake(item)" class="top">
          <div>
            <span>{{item.name}}</span>
            <span>{{item.phone}}</span>
          </div>
          <div class="adress">
            {{item.province}}&nbsp;{{item.city}}&nbsp;{{item.area}}&nbsp;{{item.address}}
          </div>
        </div>
        <div class="bottom">
          <div class="mycheck">
            <van-radio-group v-model="radio = item.default == 1 ? index : index+1" >
              <van-radio class="all" :name="index" checked-color="#009900" icon-size="16px" @click="handleCheckAllChange(index,item.id)">默认地址
              </van-radio>
            </van-radio-group>
            <!--            <el-radio class="all" @change="handleCheckAllChange(index,item.id)"-->
            <!--                      v-model="radio = item.default == 0 ? index+1 : index" :label="index"-->
            <!--                      style="margin-right: 10px">默认地址-->
            <!--            </el-radio>-->
          </div>
          <div>
            <span class="edit">
               <router-link :to="{path:'/mine/Add-address',query:{addressid:item.id}}">
                <i class="el-icon-edit-outline"></i>
                <span>编辑</span>
              </router-link>
            </span>
            <span @click="DialogVisible(item.id)" :key='item.id'>
              <i class="el-icon-delete"></i>
              <span>删除</span>
            </span>
          </div>
        </div>
      </li>

    </ul>
    <!--  添加  -->
    <div class="bottom_fixed add_address" v-show="addresslist != null">
      <router-link :to="{path:'/mine/Add-address',query:{addressid:'add'}}">
        添加收货地址
      </router-link>

    </div>

    <!--  空  -->
    <empty :isemptytype="isemptytype" v-if="addresslist == null"></empty>
  </div>
</template>

<script>
    import Empty from "../empty/empty";

    export default {
        name: "Address",
        components: {Empty},
        data() {
            return {
                check: false,
                isemptytype: 'address',
                deletid: '',
                addresslist: '',
                radio: ''
            }
        },
        methods: {

            //获取地址列表
            getaddress: function () {
                const address = {method: 'get.address.list'}
                this.$post('/api/v1/address', address)
                    .then((response) => {
                        this.addresslist = response.data;
                        this.$store.commit("user_address_msg", response.data);
                        for (let i in response.data) {
                            if (response.data[i].default == 1) {
                                this.radio = Number(i)
                            }
                        }
                    }).catch(function (error) {
                    console.log(error);
                })
            },
            //设置为默认
            handleCheckAllChange(val, id) {
                console.log(val)
                for (let i in this.$store.state.user_address_msg) {
                    if (val == Number(i)) {
                        this.$store.state.user_address_msg[i].default = 1
                    } else {
                        this.$store.state.user_address_msg[i].default = 0
                    }
                }
                const address = {method: 'set.address.default', id: id}
                this.$post('/api/v1/address', address)
                    .then((response) => {
                        this.radio = val
                        this.radio = true
                    }).catch(function (error) {
                    console.log(error);
                })
            },
            //批量删除
            DialogVisible: function (itemid) {
                this.deletid = itemid;
                this.$dialog.confirm({
                    title: '确定删除该地址？',
                    message: '删除该地址后，将不会恢复!'
                }).then(() => {
                    this.delet()
                }).catch(() => {
                });
            },
            delet: function () {
                const address = {method: 'del.address.list'};
                address.id = this.deletid
                this.$post('/api/v1/address', address)
                    .then((response) => {
                        this.$toast({
                            message: '删除成功!',
                            type: 'success',
                        });
                        for (let i in this.addresslist) {
                            if (this.addresslist[i].id == this.deletid) {
                                this.addresslist.splice(i, 1)
                            }
                        }
                        this.addresslist = this.addresslist.length == 0 ? null : this.addresslist
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            //订单入口选择收货地址
            rouMake(data) {
                if (this.$route.query.id == 'makeorder') {
                    this.$store.commit('setreceivingAddress', data);
                    this.$router.back(-1);
                }
            }
        },
        mounted() {
            this.getaddress()
        }
    }
</script>

<style scoped lang="scss">
  .content {
    padding-bottom: 50px;

    .address_list {
      text-align: left;

      li.common_box {
        padding: 0 10px;
      }

      li {
        .top {
          padding: 15px 0;
          border-bottom: 1px solid #f2f2f2;

          .adress {
            color: #999999;
            margin-top: 5px;
          }
        }

        .bottom {
          padding: 10px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;

          span {
            display: inline-block;
          }

          .edit {
            margin-right: 20px;
          }

        }
      }
    }

    .add_address {
      line-height: 50px;
      color: #fff;
      background-color: #009900;
    }
  }
</style>
