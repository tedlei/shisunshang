import Vue from 'vue'
import Vuex from 'vuex'


import cart from './state/cartState' //购物车数据
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)


const state = {
  user_address_msg: sessionStorage.getItem('user_address_msg'),
  addressid: sessionStorage.getItem('addressid'),
  bank: false,
  Rrecord: false,
  Wrecord: false,
  Atcb: false,
  ivcb: false,
  IvcMsg: 1,
  searchVal: '',
  Val:'',
  userinfo: localStorage.getItem('userinfo'),
  isLogin: localStorage.getItem('isLogin')
}
// getters 只会依赖 state 中的成员去更新

const actions = {}
const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
  modules: {
    cart: cart
  }
})
export default store;
