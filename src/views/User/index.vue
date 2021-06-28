<template>
  <div>
    <ElTable :tableData="data.tableData" :tHeader="data.tHeader"></ElTable>
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
import ElTable from "@c/Table/index.vue";
export default {
  components: { ElTable },
  setup(props, { emit, root }) {
    /**
     * data
     */
    const data = reactive({
      tHeader:[
        {
          prop:"date",
          label:"日期"
        },
        {
          prop:"name",
          label:"姓名"
        },
        {
          prop:"address",
          label:"地址"
        }
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
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
<style lang="sass" scoped>
</style>
