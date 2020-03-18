<template>
  <div class="content">
    <van-form @submit="onSubmit">
      <div class="top_msg">
        <div class="picker_box">
          <van-field
            readonly
            clickable
            name="picker"
            :value="value"
            label="升级类型"
            placeholder=""
            @click="showPicker = true"
          />
          <van-field name="level" :value="level" v-show="false"></van-field>
          <van-icon name="arrow"/>
        </div>
        <van-field label="账户充值余额" :value="yue" readonly/>
      </div>

      <div class="sm">
        <p>平台会员代理升级说明：</p>
        <p v-for="(item,index) in lists" :key="index">
          {{(index+1)+'、'+item.name + ':升级费' + item.give_qd_money + '元' + item.content}}
        </p>
      </div>

      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
    export default {
        name: "upgrade",
        data() {
            return {
                value: '',
                columns: [],
                showPicker: false,
                lists: '',
                yue: '',
                pickid: [],
                level: ''
            }
        },
        methods: {
            //获取
            getmsg: function () {
                let _this = this;
                let msg = {
                    method: 'get.user.upgrade.list'
                };
                this.$post('/api/v1/userLevel', msg)
                    .then((response) => {
                        _this.lists = response.data.list;
                        _this.yue = response.data.user_money;
                        _this.level = response.data.list[0].id;
                        _this.value = response.data.list[0].name + ':升级费' + response.data.list[0].give_qd_money + '元';
                        for (let i in response.data.list) {
                            _this.columns.push(response.data.list[i].name + ':升级费' + response.data.list[i].give_qd_money + '元')
                            _this.pickid.push(response.data.list[i].id)
                        }
                        console.log(_this.level)
                        console.log(response)
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            //选中
            onConfirm(value, index) {
                this.value = value;
                this.level = this.pickid[index];
                this.showPicker = false;
            },
            //    提交
            onSubmit(values) {
                console.log(values);
                let _this = this;
                let msg = {
                    method: 'buy.user.level',
                    level: values.level
                };
                this.$post('/api/v1/userLevel', msg)
                    .then((response) => {
                        if (response.status == 200){
                            _this.$toast('升级成功');
                            setTimeout(() => {
                                _this.$router.back(-1)
                            }, 2000)
                        }else {
                            _this.$toast(response.message)
                        }
                        console.log(response)
                    }).catch(function (error) {
                    console.log(error);
                });
            },
        },
        mounted() {
            this.getmsg()
        }
    }
</script>

<style scoped lang="scss">
  .content {
    .top_msg {
      background-color: #fff;
      margin: 0.1rem 0;

      .picker_box {
        display: flex;
        align-items: center;

        i {
          margin-right: 0.1rem;
          font-size: 0.16rem;
        }
      }

    }

    .sm {
      background-color: #fff;
      padding: 0.25rem;

      p {
        text-align: left;
        text-align: justify;
      }
    }


  }

</style>
