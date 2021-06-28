<template>
  <div>
    <el-select v-model="data.selectValue" placeholder="请选择" @change="select">
      <el-option
        v-for="item in data.initOption"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
import {
  reactive,
  ref,
  watch,
  onMounted,
  onActivated,
} from "@vue/composition-api";
export default {
  props: {
    config: {
      type: Object,
      default: () => {},
    },
    selectData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit, root }) {
    /**
     * data
     */
    const data = reactive({
      selectValue: "",
      initOption: [],
      option: [
        { value: "truename", label: "姓名" },
        { value: "id", label: "ID" },
        { value: "phone", label: "手机号" },
        { value: "email", label: "邮箱" },
        { value: "title", label: "标题" },
      ],
    });
    /**
     * methods
     */
    /**初始化下拉 */
    const initOption = () => {
      let initData = props.config.init;
      let optionArr = [];
      //校验数据是否为空
      if (initData.length == 0) {
        console.log("option为空，无法显示下拉菜单");
        return false;
      }
      initData.forEach((item) => {
        var arr = data.option.filter((elem) => item == elem.value);//filter返回的是一个数组，需要取第一个元素
        if(arr.length>0){
            optionArr.push(arr[0])
        }
      });
      //数据校验
      if(optionArr.length==0){
          console.log("匹配到的数据为空")
          return false
      }
      console.log(optionArr)
      //初始化赋值
      data.initOption = optionArr
      //初始化默认值
      data.selectValue = optionArr[0].value
      //返回初始值
      emit("update:selectData",optionArr[0])
    };
    //选择触发
    const select = (val)=>{
        let filterData = data.option.filter(item=>item.value==val)[0]
        emit("update:selectData",filterData)
    }
    /**
     * hocks
     */
    onMounted(() => {
        initOption()
    });
    onActivated(() => {});
    return {
      //*******************data*****************
      data,
      //*****************methods****************
      select,
    };
  },
};
</script>

