// import Cookie from 'cookie_js'
// const app = {
//   state: {
//     //组件直接获取state中的值的方法：1.this.$store.state.xxx;2.this.$store.getters.xxx
//     isCollapse: Cookie.get('isCollapse') ? JSON.parse(Cookie.get('isCollapse')) : true,
//     count: 10,
//   },
//   getters: {
//     //可以修改state中的值，类似computed
//     count: state => state.count + 10
//   },
//   /**
//    * 修改state中的值，必须使用mutations中的方法
//    * mutations中的方法使用this.$store.commit('SET_COUNT',100)
//    */
//   mutations: {
//     SET_COLLAPSE(state) {
//       state.isCollapse = !state.isCollapse
//       Cookie.set('isCollapse', JSON.stringify(state.isCollapse))
//       console.log(state.isCollapse)
//     },
//     SET_COUNT(state, value) {
//       state.count = value
//     },
//   },
//   actions: {
//   },
//   modules: {
//   }
// }
// export default app
/**
 * --------------模块化store,使用namespaced命名空间-----------------------
 * 调用mutations中的方法：this.$store.commit('app/SET_COUNT',100)
 */
import Cookie from 'cookie_js'
import { Login } from '@/api/login'
import { setToken, removeToken, setUserName, getUserName, removeUserName } from '@/utils/app'
const state = {
    //组件直接获取state中的值的方法：1.this.$store.state.xxx;2.this.$store.getters.xxx
    isCollapse: Cookie.get('isCollapse') ? JSON.parse(Cookie.get('isCollapse')) : true,
    count: 10,
    to_ken: '',
    username: getUserName() || ''
}
const getters = {
        //可以修改state中的值，类似computed
        count: state => state.count + 10
    }
    /**
     * 修改state中的值，必须使用mutations中的方法
     * mutations中的方法使用this.$store.commit('SET_COUNT',100)
     */
const mutations = {
        SET_COLLAPSE(state) {
            state.isCollapse = !state.isCollapse
            Cookie.set('isCollapse', JSON.stringify(state.isCollapse))
            console.log(state.isCollapse)
        },
        SET_COUNT(state, value) {
            state.count = value
        },
        SET_TOKEN(state, value) {
            state.to_ken = value
        },
        SET_USERNAME(state, value) {
            state.username = value
        },
    }
    /**
     * 调用actions中的方法使用
     * 2.0:this.$store.dispatch('app/login',requestData)
     * 3.0:root.$store.dispatch('app/login',requestData)
     */
const actions = {
    login({ commit }, requestData) {
        return new Promise((resolve, reject) => {
            Login(requestData).then((response) => {
                console.log(response, "vuex")
                let data = response.data
                    // 普通的
                    // content.commit('SET_TOKEN', data.toKen);
                    // content.commit('SET_USERNAME', data.username);
                    // 解构的
                commit('SET_TOKEN', data.token);
                commit('SET_USERNAME', data.username);
                setToken(data.token);
                setUserName(data.username);
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    exit({ commit }) {
        return new Promise((resolve, reject) => {
            removeToken()
            removeUserName()
            commit("SET_USERNAME", "")
            commit("SET_TOKEN", "");
            resolve();
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}