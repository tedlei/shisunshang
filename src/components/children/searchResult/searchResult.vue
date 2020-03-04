<template>
  <div>
    <div class="navigation">
      <ul class="clearfix">
        <li v-for="(item,index) in navItems" :class="{active:num==index}" @click="getNum(index)">{{item}}</li>
      </ul>
    </div>
    <div class="common_box content">
      <el-row class="introduce_img" :gutter="10">
        <el-col v-for="(item,index) in list" :key="index" :span="12" class="lists">
          <div class="grid-content bg-purple">
            <img src="../../../assets/img/company1.png">
            <div class="msg">
              <div class="text">
                <span class="vip">会员区</span>
                {{item.text}}
              </div>
              <div class="yishou">已售：{{item.num}}件</div>
              <div class="clo-g price">￥{{item.price}}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "searchResult",
    data() {
      return {
        num: 0,
        navItems: ['全部', '茶叶', '副食品', '水果', '补品', '日用品'],
        list: [
          {
            text: '富锦年货特产坚果零食大礼包',
            num: 323,
            price: 268.00
          },
          {
            text: '富锦年货特产坚果零食大礼包',
            num: 323,
            price: 268.00
          },
          {
            text: '富锦年货特产坚果零食大礼包',
            num: 323,
            price: 268.00
          },
          {
            text: '富锦年货特产坚果零食大礼包',
            num: 323,
            price: 268.00
          },
        ]
      }
    },
    methods: {
      getNum: function (index) {
        this.num = index;
      }
    }
  }
</script>

<style scoped lang="scss">
  .navigation {
    overflow-x: scroll;
    background-color: #fff;
    top: 56px;

    ul {
      width: max-content;

      li {
        padding: 18px 20px;
        width: auto;
      }
    }
  }

  .common_box {
    background: none;
    margin-bottom: 0;
  }

  .content {
    padding-top: 127px;

    .lists {
      margin-bottom: 10px;

      .grid-content {
        background-color: #fff;
        border-radius: 3px;
        overflow: hidden;

        .msg {
          padding: 10px;
          text-align: left;

          .text {
            font-size: 0.16rem;

            .vip {
              background-color: #009900;
              color: #fff;
              display: inline-block;
              line-height: 16px;
              border-radius: 5px;
              padding: 4px;
            }
          }

          .yishou {
            font-size: 0.12rem;
            color: #999999;
            margin: 10px 0;
            text-align: right;
          }

        }

      }

    }
  }
</style>
