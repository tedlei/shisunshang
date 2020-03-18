import router from "../router";

export default {
  // userName: (state) => state.user_name,
  // isLogin :(state) => state.isLogin
  cartTotalprice(state) {
    let shops = state.cart.cartdata.shops;
    let totalprice = 0;
    for (let i in shops) {
      let goods = shops[i].goods;
      for (let n in goods) {
        // return goods[n].price*goods[n].total_num;
        totalprice += goods[n].price * goods[n].total_num;
      }
    }
    // console.log(totalprice);
    return totalprice;
  },
  getSpecifications(state) {
    let initialName = '';
    let list = state.cart.goodsData.specData.spec_attr;
    // console.log(state.cart.goodsData.specData.spec_attr);
    // console.log(list);
    for (var i in list) {
      //   initialName.push( list[i].spec_items[0].item_id );
      // console.log(1)
      initialName += list[i].spec_items[0].spec_value + '*';
    }
    // console.log(initialName);
    return initialName;
  },
  user_address_msg: (state) => state.user_address_msg,
  getbank: (state) => {
    return state.bank;
  },
  getRrecord: (state) => {
    return state.Rrecord;
  },

  getuserinfo: (state) => {
    return state.userinfo;
  },
  // userName: (state) => state.user_name,
  isLogin :(state) => state.isLogin

}
