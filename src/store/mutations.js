export default {
  user_address_msg: (state, user_address_msg) => {
    state.user_address_msg = user_address_msg
    sessionStorage.setItem('user_address_msg', JSON.stringify(user_address_msg))
  },
  addressid: (state, addressid) => {
    state.addressid = addressid
    sessionStorage.setItem('addressid', addressid)
  },

  clearaddressid(state) {
    sessionStorage.removeItem('addressid');
    state.addressid = '';
  },

  sendbank(state, res) {
    state.bank = res
  },

  sendRrecord(state, res) {
    state.Rrecord = res
  },

  sendWrecord(state, res) {
    state.Wrecord = res
  },

  sendAtc(state, res) {
    state.Atcb = res
  },
  sendIvc(state, res) {
    state.ivcb = res
  },

  sendIvcMsg(state, res) {
    state.IvcMsg = res
  },

  sendsearchVal(state, res) {
    state.searchVal = res
  },
  sendVal(state, res) {
    state.Val = res
  },

  userinfo(state, res) {
    state.userinfo = res
    // localStorage.setItem('userinfo', res)
  },
  isLogin(state, token) {
    localStorage.setItem('token', token);
    state.isLogin = token;
  },

  // LoginOut(state) {
  //   localStorage.clear();
  //   state.user_name = '';
  //   state.isLogin = false;
  // },

  cartPush(state, data) {
    state.cart.cartdata = data;
  },
  getshopsData(state, data) {
    state.cart.getshops = data;
    // console.log(state.cart.getshops);
  },
  getGoodsData(state, data) {
    state.cart.goodsData = data;
  },
  setLoading(state, data) {
    state.cart.isLoading = !state.cart.isLoading;
    // console.log(state.cart.isLoading)
  },
  setEmpty(state, data) {
    state.cart.empty = !state.cart.empty;
  },
  setEmptyNo(state, data) {
    state.cart.empty = false;
  },
  setinvoice(state, data) {
    state.cart.invoice = data;
  },
  setreceivingAddress(state, data) {
    state.cart.receivingAddress = data;
  },
  setloopUpimgs(state, data) {
    state.cart.loopUpimgs[data.index] = data.fileList;
    // console.log(state.cart.loopUpimgs)
  },

  setphone(state, data) {
    state.phone = data
  },
  setCartNum(state, data) {
    state.cart.cartNum = data;
  },
  setMerchantApplicationObj(state, data) {
    state.cart.merchantApplicationObj = data;
  },
  setMerchantApplicationObjimgF(state, imgF) {
      state.cart.merchantApplicationObj.imgurl = imgF;
  },
  setMerchantApplicationObjimgX(state, imgX) {
    state.cart.merchantApplicationObj.album = imgX;
},
}
