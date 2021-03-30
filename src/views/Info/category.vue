<template>
  <div id="category">
    <el-button type="danger">添加一级分类</el-button>
    <hr class="hr-e9e9e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-wrap">
            <div class="category">
              <!-- 一级分类 -->
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                一级分类
                <div class="button-group">
                  <el-button type="danger" round size="mini">编辑</el-button>
                  <el-button type="success" round size="mini"
                    >添加子级</el-button
                  >
                  <el-button round size="mini">删除</el-button>
                </div>
              </h4>
              <!-- 子级 -->
              <ul>
                <li>
                  子类
                  <div class="button-group">
                    <el-button type="danger" round size="mini">编辑</el-button>
                    <el-button round size="mini">删除</el-button>
                  </div>
                </li>
                <li>
                  子类
                  <div class="button-group">
                    <el-button type="danger" round size="mini">编辑</el-button>
                    <el-button round size="mini">删除</el-button>
                  </div>
                </li>
                <li>子类</li>
                <li>子类</li>
              </ul>
            </div>
            <div class="category">
              <!-- 一级分类 -->
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                一级分类
              </h4>
              <!-- 子级 -->
              <ul>
                <li>子类</li>
                <li>子类</li>
                <li>子类</li>
                <li>子类</li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form label-width="142px" class="from-wrap" ref="categoryFrom">
            <el-form-item label="一级分类名称：" prop="categoryName">
              <el-input v-model="form.categoryName"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称：" prop="secCategoryName">
              <el-input v-model="form.secCategoryName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="submit">确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "@vue/composition-api";
import svgIcon from "../../icons/svgIcon.vue";

export default {
  components: { svgIcon },
  name: "category",
  setup(props, { root }) {
    const form = reactive({
      categoryName: "",
      secCategoryName: "",
    });
    const submit = ()=>{

    }
    return{
        form,
        submit
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.category-wrap {
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 20px;
    }
  }
}
.category {
  line-height: 44px;
  position: relative;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    left: 22px;
    top: 0;
    bottom: 0;
    border-left: 1px dotted #222;
  }
  h4 {
    position: relative;
    padding-left: 40px;
  }
  svg {
    font-size: 17px;
    background-color: #fff;
    position: absolute;
    left: 14px;
    top: 15px;
  }
  li {
    padding-left: 36px;
    margin-left: 24px;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      width: 32px;
      border-bottom: 1px dotted #222;
      left: 0;
      top: 22px;
    }
  }
  li,
  h4 {
    @include webkit(transition, all 0.5s ease 0s);
    &:hover {
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
  .button-group {
    display: none;
    position: absolute;
    z-index: 2;
    right: 11px;
    top: 0px;
    button {
      font-size: 12px;
    }
  }
}
.menu-title {
  padding-left: 22px;
  background-color: #f3f3f3;
  line-height: 44px;
}
.from-wrap {
    width: 410px;
    padding-top: 26px;
}
.hr-e9e9e9{
    margin-top: 30px;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #e9e9e9;
    margin-left: -30px;
    width: calc(100% + 60px);
    
}
</style>