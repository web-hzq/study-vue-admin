<template>
  <el-dialog
    title="新增"
    :visible.sync="data.dialog_info_flag"
    @close="close"
    width="580px"
    @opened="openDialog"
  >
    <el-form :model="data.form" ref="addInfoForm">
      <el-form-item
        label="类别："
        :label-width="data.formLabelWidth"
        prop="category"
      >
        <el-select v-model="data.form.category" placeholder="请选择活动区域">
          <el-option
            v-for="item in data.categoryOption"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="标题："
        :label-width="data.formLabelWidth"
        prop="title"
      >
        <el-input v-model="data.form.title" placehoder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item
        label="概况："
        :label-width="data.formLabelWidth"
        prop="content"
      >
        <el-input
          type="textarea"
          v-model="data.form.content"
          placehoder="请输入内容"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="danger" :loading="data.submitLoading" @click="submit"
        >确定</el-button
      >
      <!-- <el-button type="danger">确定</el-button> -->
    </div>
  </el-dialog>
</template>
<script>
/**
 * vue2.0
 */
// export default {
//   name: "dialogInfo",
//   props: {
//     flag: {
//       type: Boolean,
//       default: false,
//     },
//     category: {
//       type: Array,
//       default: () => [],
//     },
//   },
//   data() {
//     return {
//       dialog_info_flag: false,
//     };
//   },
//   watch: {
//     flag: {
//       handler(newValue, oldValue) {
//         this.dialog_info_flag = newValue;
//       },
//     },
//   },
//   methods: {
//     close() {
//       // this.dialog_info_flag = false;
//       this.$emit("update:flag", false);
//       this.$emit("close")
//       // emit("update:flag", false);
//     },
//     openDialog() {
//       this.dialog_info_flag = true;
//     },
//   },
// };

/**
 * -------------------------------------------
 */

/**
 * vue3.0
 */
import { onMounted, reactive, ref, watch } from "@vue/composition-api";

export default {
  name: "dialogInfo",
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit, root, refs }) {
    const data = reactive({
      dialog_info_flag: false,
      formLabelWidth: "70px",
      form: {
        category: "",
        title: "",
        content: "",
      },
      //分类下拉
      categoryOption: [],
      //按钮加载
      submitLoading: false,
    });
    watch(() => {
      data.dialog_info_flag = props.flag
    });
    const close = () => {
      data.dialog_info_flag = false;
      emit("update:flag", false);
    };
    const openDialog = () => {
      data.dialog_info_flag = true;
    };
    const submit = () => {};
    onMounted(() => {
      console.log(emit, "dddddddddddddddd");
    });
    return {
      data,
      close,
      openDialog,
      submit,
    };
  },
};
</script>
