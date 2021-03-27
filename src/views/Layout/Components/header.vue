<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconClass="menu" className="menu" />
    </div>
    <div class="pull-right header-icon">
      <div class="user-info pull-left">
        <img src="../../../assets/images/face.jpg" alt="" />
        {{ username }}
      </div>
      <div class="header-icon pull-left" @click="logout">
        <svg-icon iconClass="exit" className="exit" />
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "@vue/composition-api";
export default {
  setup(props, { root }) {
    console.log(root)
    const username =computed(()=>root.$store.state.app.username);
    const navMenuState = () => {
      root.$store.commit("app/SET_COLLAPSE");
    };
    const logout = () => {
      root.$store.dispatch("app/exit").then(()=>{
        root.$router.push({
          name:"Login"
        })
      })
    };
    return {
      username,
      navMenuState,
      logout,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
  background-color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  height: 75px;
  line-height: 75px;
  display: flex;
  justify-content: space-between;
  @include webkit(transition, all 0.3s ease 0s);
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
}
.header-icon {
  padding: 0 32px;
  display: inline-block;
  svg {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
  &.pull-right {
    display: flex;
    padding-right: 0;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 0 28px;
  }
  img {
    display: inline-block;
    margin-bottom: -12px;
    margin-right: 18px;
    border-radius: 50px;
  }
}
.open {
  #header-wrap {
      left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
}

</style>
