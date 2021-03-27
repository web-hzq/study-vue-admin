import router from './index'
import store from "../store/index"
import { getToken, removeToken, removeUserName } from "../utils/app"

const whiteRouter = ['/login']; // indexOf方法，判断数组中是否存在指定的某个对象，如果不存在，则返回-1
//路由守卫
router.beforeEach((to, from, next) => {
    /**
     * 1.to:目标页面router对象
     * 2.from:起始页面router对象
     * 3.next:回调，next()有参数时会继续跳转到参数页面，此时会再次触发router.beforeEach方法，因此会产生死循环，所以设置whiteRouter白名单解决该问题；next()无参数时会跳转到to中router对象中path指定的页面
     */
    if (getToken()) {
        if (to.path == "/login") {
            removeToken()
            removeUserName()
            store.commit("SET_USERNAME", "")
            store.commit("SET_TOKEN", "")
            next()
        } else {
            next()
        }
        console.log("token存在")
    } else {
        if (whiteRouter.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }

})