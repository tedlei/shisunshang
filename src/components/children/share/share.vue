<template>
  <div class="content">
    <ul class="share_list">
      <li v-for="(item,index) in sharelists">
        <div class="left_img">
          <img :src="require(`../../../assets/img/${item.goodsimg}.png`)">
        </div>
        <div class="right_msg">
          <div class="name">
            {{item.name}}
          </div>
          <div class="num">
            销量{{item.num}}件
          </div>
          <div class="price">
            <span>￥{{item.price}}</span>
            <i class="el-icon-share"></i>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "share",
    data() {
      return {
        sharelists: [
          {
            goodsimg: 'goods_img',
            name: '现磨新米农家自产长香丝2.5kg煲仔饭丝苗米不抛光长粒香大米',
            num: '998',
            price: '560.00'
          },
          {
            goodsimg: 'goods_img',
            name: '现磨新米农家自产长香丝2.5kg煲仔饭丝苗米不抛光长粒香大米',
            num: '998',
            price: '560.00'
          },
          {
            goodsimg: 'goods_img',
            name: '现磨新米农家自产长香丝2.5kg煲仔饭丝苗米不抛光长粒香大米',
            num: '998',
            price: '560.00'
          },
          {
            goodsimg: 'goods_img',
            name: '现磨新米农家自产长香丝2.5kg煲仔饭丝苗米不抛光长粒香大米',
            num: '998',
            price: '560.00'
          },
          {
            goodsimg: 'goods_img',
            name: '现磨新米农家自产长香丝2.5kg煲仔饭丝苗米不抛光长粒香大米',
            num: '998',
            price: '560.00'
          },
          {
            goodsimg: 'goods_img',
            name: '现磨新米农家自产长香丝2.5kg煲仔饭丝苗米不抛光长粒香大米',
            num: '998',
            price: '560.00'
          },
          {
            goodsimg: 'goods_img',
            name: '现磨新米农家自产长香丝2.5kg煲仔饭丝苗米不抛光长粒香大米',
            num: '998',
            price: '560.00'
          },
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  /deep/ .app {
    padding-bottom: 0;
  }

  .content {
    .share_list {
      background-color: #fff;
      padding: 10px;
      text-align: left;

      li {
        margin-bottom: 20px;
        display: flex;
        border-bottom: 1px solid #f2f2f2;
        padding-bottom: 10px;

        .left_img {
          width: 30vw;
        }

        .right_msg {
          width: 70vw;
          padding-left: 10px;

          .name {
            font-size: 0.16rem;
          }

          .num {
            color: #999999;
          }

          .price {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.18rem;

            span {
              color: #009900;
            }

            i {
              color: #999999;
            }
          }
        }


      }
    }
  }
</style>
