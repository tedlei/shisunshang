import Vue from 'vue'
import Vuex from 'vuex'

import cart from './state/cartState' //购物车数据
import mutations from './mutations' 
import getters from './getters' 


Vue.use(Vuex)

const actions = {}
const state = {
  user_address_msg: localStorage.getItem('user_address_msg'),
  addressid: localStorage.getItem('addressid'),
  // user_name: localStorage.getItem('user_name'),
  // isLogin : localStorage.getItem('isLogin')
}
// getters 只会依赖 state 中的成员去更新


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
