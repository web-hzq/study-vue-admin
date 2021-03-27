<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <!-- 子路由显示区 -->
        <keep-alive>
          <!-- 需要缓存 -->
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <!-- 不需要缓存 -->
        <router-view v-if="!$route.meta.keepAlive" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup() {},
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
  height: 100vh;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30;
  padding-right: 30px;
  box-sizing: border-box;
}
.open {
  .main-content {
    padding-left: $navMenu + 30;
  }
}
.close {
  .main-content {
    padding-left: $navMenuMin + 30;
  }
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0 30px;
  background-color: #fff;
  box-sizing: border-box;
}
</style>
