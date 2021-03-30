import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import VueCompositionApi from "@vue/composition-api";
import "./router/premit"
import 'element-ui/lib/theme-chalk/index.css';
import './icons'
//自定义全局方法
import global from "@/utils/global"
Vue.config.productionTip = false
Vue.use(global);
Vue.use(ElementUI);
Vue.use(VueCompositionApi);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')