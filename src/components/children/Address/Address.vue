<template>
  <div class="content">
    <ul class="address_list" v-show="!isempty">
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
            <el-checkbox class="all" v-model="check" @change="" style="margin-right: 10px">默认地址</el-checkbox>
          </div>
          <div>
            <span class="edit">
              <i class="el-icon-edit-outline"></i>
              <span>编辑</span>
            </span>
            <span>
              <i class="el-icon-delete"></i>
              <span>删除</span>
            </span>
          </div>
        </div>
      </li>
      <li class="common_box">
        <div class="top">
          <div>
            <span>哒哒哒的</span>
            <span>15320495341</span>
          </div>
          <div class="adress">
            重庆市&nbsp;重庆市&nbsp;重庆市
          </div>
        </div>
        <div class="bottom">
          <div class="mycheck">
            <el-checkbox class="all" v-model="check" @change="" style="margin-right: 10px">默认地址</el-checkbox>
          </div>
          <div>
            <span class="edit">
              <i class="el-icon-edit-outline"></i>
              <span>编辑</span>
            </span>
            <span>
              <el-button type="text" @click="dialogVisible = true" style="color: #0f0f0f;">
                <i class="el-icon-delete"></i>
                <span>删除</span>
              </el-button>
            </span>

          </div>
        </div>
      </li>
    </ul>
    <!--  添加  -->
    <div class="bottom_fixed add_address" v-show="!isempty">
      <router-link to="/mine/add-address">
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
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
    <!--  空  -->
    <empty :isempty="isempty"></empty>
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
                isempty: false,
                addresslist: [],
            }
        },
        mounted() {
            const address = {method: 'get.address.list'}
            //获取新闻列表
            this.$post('/api/v1/address', address)
                .then((response) => {
                    console.log(response.data)
                    if (response.data.length == 0) {
                        this.isempty = true
                    } else {
                        this.addresslist = response.data
                    }

                }).catch(function (error) {
                console.log(error);
            });
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
