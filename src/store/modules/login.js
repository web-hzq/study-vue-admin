import Cookie from 'cookie_js'
import { Login } from '../../api/login'
const state = {}
const getters = {}
/**
   * 修改state中的值，必须使用mutations中的方法
   * mutations中的方法使用this.$store.commit('SET_COUNT',100)
   */
const mutations = {
  login(content, requestData) {
    return new Promise((resolve, reject) => {
      Login(requestData).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}