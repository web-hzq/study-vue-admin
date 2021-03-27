<template>
  <div id="layout" :class="menuState?'open':'close'">
    <Header></Header>
    <Nav></Nav>
    <Main></Main>
  </div>
</template>
<script>
import Header from "./Components/header";
import Nav from "./Components/nav";
import Main from "./Components/main";
import { computed } from "@vue/composition-api";
export default {
  name: "Layout",
  components: { Header, Nav, Main },
  setup(prop, { root }) {
    const menuState = computed(() => root.$store.state.app.isCollapse);
    return {
      menuState,
    };
  },
};
</script>
<style lang="scss" scoped>
#layout {
  width: 100%;
  height: 100%;
  background-color: rgb(244, 244, 244);
}
</style>
