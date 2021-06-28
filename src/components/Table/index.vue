<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="日期" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
  </el-table>
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
    props:{
        tableData:{
            type:Array,
            default:[]
        }
    },
  setup(props, { emit, root }) {
    /**
     * data
     */
    const data = reactive({
        
    });
    /**
     * methods
     */
    const method1 = () => {};
    /**
     * hocks
     */
    onMounted(() => {});
    onActivated(() => {});
    return {
      //*******************data*****************
      data,
      //*****************methods****************
      method1,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>