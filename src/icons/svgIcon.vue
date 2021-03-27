<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
import { ref, computed, onMounted } from "@vue/composition-api";
export default {
  name: "svgIcon",
  props: {
    // 分页
    iconClass: {
      type: String, // 定义接收的值类型
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    //计算属性，监听props中数据变化，得出结果并返回新结果
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    });
    return {
      iconName,
      svgClass,
    };
  },
};
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor; //可以修改svg颜色，currentColor继承上级元素的color属性
}
</style>