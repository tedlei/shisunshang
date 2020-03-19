
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

  userinfo(state, res) {
    state.userinfo = res
    sessionStorage.setItem('userinfo', res)
  },
  isLogin(state, token) {
    state.isLogin = token;
    sessionStorage.setItem('isLogin', token)
  },
  LoginOut(state) {
    localStorage.clear();
    state.user_name = '';
    state.isLogin = false;
  },

  cartPush(state, data) {
    state.cart.cartdata = data;
  },
  getshopsData(state, data) {
    state.cart.getshops = data;
    // console.log(state.cart.getshops);
  },
  getGoodsData(state, data) {
    state.cart.goodsData = data;
  }
}
