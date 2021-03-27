import Vue from "vue"
import SvgIcon from "./svgIcon.vue";
Vue.component('svg-icon',SvgIcon)
/**
 * 解析svg文件
 * const req = require.context('./svg', false, /\.svg$/);
 * 参数1：指定解析文件的目录
 * 参数2：是否遍历子级目录
 * 参数3：定义遍历文件规则
 */
const req = require.context('./svg', false, /\.svg$/); // 获取当前svg目录所有为.svg结尾的文件
const requireAll = (requireContext) => {
    return requireContext.keys().map(requireContext);  // 解析获取的.svg文件的文件名称，并返回
};
requireAll(req);