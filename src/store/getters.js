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
  //获取银行卡列表信息
  getbankinfo: (state) => state.banklist,

  getRrecord: (state) => {
    return state.Rrecord;
  },

  getWrecord: (state) => {
    return state.Wrecord;
  },

  getuserinfo: (state) => {
    return state.userinfo;
  },
  // userName: (state) => state.user_name,
  isLogin: (state) => state.isLogin,
  getLoading (state) {
    return state.cart.isLoading;  
  },
  getEmpty (state) {
      return state.cart.empty;
  },
  getinvoice (state) {
    return state.cart.invoice;
  },
  getreceivingAddress (state) {
    return state.cart.receivingAddress;
  },
  getloopUpimgs (state) {
    return state.cart.loopUpimgs;
  },
  getQRcodeDomainName (state) {
    return state.cart.QRcodeDomainName;
  }
}
