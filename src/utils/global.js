export default {
    install(Vue, options) {
        //使用时使用2.0:this.bbb(),3.0:root.bbb()
        Vue.prototype.bbb = function() {
            console.log("Vue全局方法")
        }
    }
}