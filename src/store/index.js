import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const actions = {}
const state = {
  user_address_msg: localStorage.getItem('user_address_msg'),
  addressid: localStorage.getItem('addressid'),
  // user_name: localStorage.getItem('user_name'),
  // isLogin : localStorage.getItem('isLogin')
}
// getters 只会依赖 state 中的成员去更新
const getters = {
  user_address_msg: (state) => state.user_address_msg,
  // userName: (state) => state.user_name,
  // isLogin :(state) => state.isLogin
}
const mutations = {
  user_address_msg: (state, user_address_msg) => {
    state.user_address_msg = user_address_msg
    localStorage.setItem('user_address_msg', JSON.stringify(user_address_msg))
  },
  addressid: (state, addressid) => {
    state.addressid = addressid
    sessionStorage.setItem('addressid', addressid)
  },

  clearaddressid(state) {
    sessionStorage.removeItem('addressid');
    state.addressid = '';
  },
  isLogin(state, status) {
    state.isLogin = status;
    localStorage.setItem('isLogin', status)
  },
  LoginOut(state) {
    localStorage.clear();
    state.user_name = '';
    state.isLogin = false;
  },

}

const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})
export default store;
