<template>
  <div id="nav-wrap">
    <h1 class="logo"><img src="../../../assets/logo.png" alt="" /></h1>
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="!isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      :router="true"
    >
      <template v-for="(item, index) in route">
        <el-submenu :index="index + ''" :key="item.id" v-if="!item.hidden">
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <el-menu-item
            :index="citem.path"
            v-for="(citem, cindex) in item.children"
            :key="cindex"
            >{{ citem.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import {
  reactive,
  ref,
  toRefs,
  onMounted,
  watch,
  onUnmounted,
  computed,
} from "@vue/composition-api";
import svgIcon from "../../../icons/svgIcon.vue";
export default {
  components: { svgIcon },
  name: "slideNav",
  setup(props, { root }) {
    const route = reactive(root.$router.options.routes);
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };

    /**
     * computed监听
     */
    const isCollapse = computed(() => root.$store.state.app.isCollapse);
    /**
     * 生命周期
     */
    // 挂载完成后
    onMounted(() => {
      console.log(root.$store);
    });
    /**
     * 销毁页面时
     */
    onUnmounted(() => {});
    return {
      isCollapse,
      route,
      handleOpen,
      handleClose,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-wrap {
  position: fixed;
  left: 0;
  height: 100vh;
  background-color: rgb(52, 74, 95);
  @include webkit(transition, all 0.3s ease 0s);
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
  .logo {
    text-align: center;
    img {
      margin: 28px auto 25px;
      width: 92px;
      @include webkit(transition, all 0.3s ease 0s);
    }
  }
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
}
.close {
  #nav-wrap {
    width: $navMenuMin;
  }
  .logo img {
    width: 60% !important;
  }
}
</style>
