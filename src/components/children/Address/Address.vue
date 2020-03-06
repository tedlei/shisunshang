<template>
  <div class="content">
    <ul class="address_list" v-show="addresslist != ''">
      <li class="common_box" v-for="(item, index) in addresslist" :key="item.id">
        <div class="top">
          <div>
            <span>{{item.name}}</span>
            <span>{{item.phone}}</span>
          </div>
          <div class="adress">
            {{item.province}}&nbsp;{{item.city}}&nbsp;{{item.area}}
          </div>
        </div>
        <div class="bottom">
          <div class="mycheck">
            <el-radio class="all" @change="handleCheckAllChange(index)" v-model="radio" :label="index"
                      style="margin-right: 10px">默认地址
            </el-radio>
          </div>
          <div>
            <span class="edit">
               <router-link :to="{path:'/mine/add-address',query:{addressid:item.id}}">
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
    <div class="bottom_fixed add_address" v-show="addresslist != ''">
      <router-link :to="{path:'/mine/add-address',query:{addressid:'add'}}">
        添加收获地址
      </router-link>

    </div>
    <!--  对话框  -->
    <el-dialog
      title="确定删除该地址？"
      :visible.sync="dialogVisible"
      width="80%">
      <span>删除该地址后，将不会恢复</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="delet()">确 定</el-button>
  </span>
    </el-dialog>
    <!--  空  -->
    <empty :isemptytype="isemptytype" v-show="addresslist == ''"></empty>
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
        dialogVisible: false,
        isemptytype: 'address',
        deletid: '',
        addresslist: '',
        radio: ''
      }
    },
    methods: {
      handleCheckAllChange(val) {

        this.radio = val
      },
      //获取地址列表
      getaddress: function () {
        const address = {method: 'get.address.list'}
        this.$post('/api/v1/address', address)
          .then((response) => {
            console.log(response.data)
            this.addresslist = response.data;
            this.$store.commit("user_address_msg", response.data);
            for (let i in response.data) {
              if (response.data[i].default == 1) {
                console.log(i)
                this.radio = Number(i)
              }
            }
          }).catch(function (error) {
          console.log(error);
        })
      },
      //批量删除
      DialogVisible: function (itemid) {
        this.dialogVisible = true;
        this.deletid = itemid
      },
      delet: function () {
        const address = {method: 'del.address.list'};
        address.id = [this.deletid]
        this.$post('/api/v1/address', address)
          .then((response) => {
            this.dialogVisible = false
            this.$message({
              message: '删除成功!',
              type: 'success',
            });
            for (let i in this.addresslist) {
              if (this.addresslist[i].id == this.deletid) {
                this.addresslist.splice(i, 1)
              }
            }
            console.log(this.addresslist)
          }).catch(function (error) {
          console.log(error);
        });
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
