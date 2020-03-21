<template>
  <div class="content">
    <div class="myinvoice" v-if="!myinvoicelists">
      <ul class="myinvoice_ul">
        <li class="common_style">
          <mt-cell-swipe
            :right="rightButtons"
            title="中集天合（重庆）信息技术有限公司"
          >
            <p class="section">asasa</p>
          </mt-cell-swipe>

        </li>
      </ul>
      <div class="common_style add_invoice">
        <van-icon name="add"/>
        <span>添加发票</span>
      </div>
    </div>
    <empty :isemptytype="isemptytype" v-if="myinvoicelists"></empty>
  </div>
</template>

<script>

    import Empty from "../empty/empty";
    import Vue from 'vue'
    import {CellSwipe} from 'mint-ui';

    Vue.component(CellSwipe.name, CellSwipe);
    export default {
        name: "myinvoice",
        components: {Empty},
        data() {
            return {
                myinvoicelists: [],
                isemptytype: 'myinvoice',
                rightButtons: [],
            }
        },
        created() {
            this.rightButtons = [
                {
                    content: '设为默认',
                    style: {'background-color': '#ccc', 'color': '#fff !important'}
                },
                {
                    content: '删除',
                    style: {'background-color': '#009900', 'color': '#fff !important'},
                    handler: () => this.$messagebox('delete')
                }
            ];
        },
        methods: {
            leftButtonHandler(evt) {
                console.log(123);
            }
        }
    }
</script>

<style scoped lang="scss">
  .content {
    .common_style {
      background-color: #fff;
      margin-top: 0.1rem;
    }

    .myinvoice_ul {
      li {

        /deep/ .mint-cell {
          display: flex;
          height: 0.7rem;
          align-items: center;
          .mint-cell-wrapper {
            display: block;
            text-align: left;
            padding: 0 0.2rem;
            .mint-cell-title {
              font-size: 0.17rem;
              margin-bottom: 0.1rem;
            }
          }


            .mint-cell-swipe-button {
              width: 0.7rem;
              padding: 0;
              line-height: 0.7rem;
            }

        }


        .section {
          font-size: 0.15rem;
          color: #999999;
        }
      }

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
