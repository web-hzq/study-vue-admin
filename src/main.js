import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';

import VueCompositionApi from "@vue/composition-api";
import "./router/premit"
import 'element-ui/lib/theme-chalk/index.css';
import './icons'
import * as d3 from "d3";
//自定义全局方法
import global from "@/utils/global"
Vue.config.productionTip = false
Vue.use(global);
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.prototype.$d3 = d3;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')