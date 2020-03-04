<template>
  <div class="content">
    <ul class="ad_list">
      <li v-for="(item,index) in adlists">
        <div class="left_img">
          <img :src="require(`../../../assets/img/${item.goodsimg}.png`)">
        </div>
        <div class="right_msg">
          <div class="name">
            <div class="tt">{{item.tt}}</div>
            <div class="tt_name">{{item.name}}</div>
          </div>
          <div class="time">
            <span>时间：{{item.num}}</span>
            <span>来源：{{item.price}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "ad",
    data() {
      return {
        adlists: [
          {
            goodsimg: 'goods_img',
            tt: '柴米油盐酱醋茶',
            name: '现磨新米农家自产长香丝2.5kg煲仔饭丝苗米不抛光长粒香大米',
            num: '998',
            price: '560.00'
          },
          {
            goodsimg: 'goods_img',
            tt: '柴米油盐酱醋茶',
            name: '现磨新米农家自产长香丝2.5kg煲仔饭丝苗米不抛光长粒香大米',
            num: '998',
            price: '560.00'
          },
          {
            goodsimg: 'goods_img',
            tt: '柴米油盐酱醋茶',
            name: '现磨新米农家自产长香丝2.5kg煲仔饭丝苗米不抛光长粒香大米',
            num: '998',
            price: '560.00'
          },
          {
            goodsimg: 'goods_img',
            tt: '柴米油盐酱醋茶',
            name: '现磨新米农家自产长香丝2.5kg煲仔饭丝苗米不抛光长粒香大米',
            num: '998',
            price: '560.00'
          },
          {
            goodsimg: 'goods_img',
            tt: '柴米油盐酱醋茶',
            name: '现磨新米农家自产长香丝2.5kg煲仔饭丝苗米不抛光长粒香大米',
            num: '998',
            price: '560.00'
          },
          {
            goodsimg: 'goods_img',
            tt: '柴米油盐酱醋茶',
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
  .content {
    .ad_list {
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
          display: flex;
          flex-direction: column;
          justify-content: center;
          .name {
            font-size: 0.16rem;
            .tt_name {
              font-size: 0.14rem;
              margin: 5px 0;
            }
          }

          .time {
            color: #999999;
            font-size: 0.12rem;
          }
        }

      }
    }
  }
</style>
