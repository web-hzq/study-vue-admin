import { GetCategory, GetCategoryAll } from "@/api/news";
const state = {
    qiniuUrl: "http://www-web-jshtml-cn-idva7mx.web-jshtml.cn/"
}
const getters = {
    qiniuUrl: state => state.qiniuUrl
}
const actions = {
    getInfoCategory() {
        return new Promise((resolve, reject) => {
            GetCategory().then((res) => {
                resolve(res)
            }).catch((error) => {
                reject(error)
            })
        })
    }
}
export default {
    namespaced: true,
    actions,
    state,
    getters,
}