<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ current: item.current }"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-form">
          <label for="">邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label for="">密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          class="item-form"
          v-show="model === 'register'"
        >
          <label for="">再次输入密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label for="">验证码</label>
          <el-row :gutter="10">
            <el-col :span="15"
              ><el-input v-model="ruleForm.code"></el-input
            ></el-col>
            <el-col :span="9"
              ><el-button
                type="success"
                @click="getSms()"
                :disabled="codeBtnStatus.status"
                >{{ codeBtnStatus.text }}</el-button
              ></el-col
            >
          </el-row>
        </el-form-item>
        <el-form-item class="item-form">
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            class="login-btn block"
            :disabled="loginBtnStatus"
            >{{ model == "login" ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  stripscript,
  validatePass,
  validateEmail,
  validateVCode,
} from "@/utils/validate";
import {
  reactive,
  ref,
  toRefs,
  onMounted,
  watch,
  onUnmounted,
} from "@vue/composition-api";
import { GetSms, Register, Login } from "@/api/login";
import sha1 from "js-sha1";
export default {
  name: "login",
  /**
     *attrs: (...) == this.$attrs
      emit: (...) == this.$emit
      listeners: (...) == this.$listeners
      parent: (...) == this.$parent
      refs: (...) == this.$refs
      root: (...) == this
      */
  setup(props, { refs, root }) {
    // console.log(context)
    // let  = context;
    console.log(refs);
    // 验证用户名
    let validateUsername = (rule, value, callback) => {
      console.log(value, "用户名");
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback(); //true
      }
    };
    // 验证密码
    let validatePassword = (rule, value, callback) => {
      // 过滤后的数据
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6至20位数字+字母"));
      } else {
        callback();
      }
    };
    // 验证重复密码
    let validatePasswords = (rule, value, callback) => {
      // 如果模块值为login, 直接通过
      if (model.value === "login") {
        callback();
      }
      // 过滤后的数据
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    // 验证验证码
    let validateCode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入验证码"));
      } else if (validateVCode(value)) {
        return callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    //setup中放置data数据，生命周期，自定义函数
    //Reactive:声明单一对象时使用
    //const obj = reactive({count:0})
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" },
    ]);
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: "",
    });
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }],
    });
    //Ref:声明基础数据,取值时使用model.value,改值时使用model.value=register
    //isRef:判断是否是基础数据类型  isRef(model)=true
    //toRefs:toRefs将reactive对象转换为普通对象，保证对象解构或拓展运算符不会丢失原有响应式对象的响应。
    //     function useMousePosition() {
    //     const pos = reactive({
    //         x: 0,
    //         y: 0
    //     });
    //     return toRefs(pos);
    // }
    // const { x, y } = useMousePosition();

    const model = ref("login");
    const timer = ref(null);
    const loginBtnStatus = ref(false);
    const codeBtnStatus = reactive({
      status: false,
      text: "获取验证码",
    });
    /**
     *
     * 声明函数
     *
     *
     * */
    // 切换模块
    const toggleMenu = (data) => {
      menuTab.forEach((elem, index) => {
        elem.current = false;
      });
      data.current = true;
      model.value = data.type;
      resetFormData();
    };
    // 清除表单数据
    const resetFormData = () => {
      refs.ruleForm.resetFields();
    };
    //提交数据
    const submitForm = (formName) => {
      refs[formName].validate((valid) => {
        if (valid) {
          model.value == "login" ? userLogin() : userRegister();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    //登录
    const userLogin = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
      };
      root.$store
        .dispatch("app/login", requestData)
        .then((response) => {
          console.log(response);
          if (response.resCode == 0) {
            root.$message({
              message: response.message,
              type: "success",
              duration: 500,
              onClose: () => {
                clearCountDown();
                root.$router.push({
                  name: "Console",
                });
              },
            });
          }
        })
        .catch((error) => {
          console.log(error, "error");
          // 失败时执行的代码
        });
    };
    //注册
    const userRegister = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
      };
      Register(requestData)
        .then((response) => {
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success",
          });
          // 模拟注册成功
          toggleMenu(menuTab[0]);
          clearCountDown();
        })
        .catch((error) => {
          // 失败时执行的代码
        });
    };
    //获取验证码
    const getSms = () => {
      let requestData = {
        username: ruleForm.username,
        module: model.value,
      };
      // 进行提示
      if (ruleForm.username == "") {
        root.$message.error("邮箱不能为空！！");
        return false;
      }
      if (validateEmail(ruleForm.username)) {
        root.$message.error("邮箱格式有误，请重新输入！！");
        return false;
      }
      codeBtnStatus.status = false;
      // codeBtnStatus.text = "发送中";
      GetSms(requestData)
        .then((res) => {
          console.log(res);
          if (res.resCode == 0) {
            curtDown(60);
            updataButtonStatus({
              status: true,
              text: "再次发送",
            });
          }
        })
        .catch((error) => {
          updataButtonStatus({
            status: true,
            text: "再次发送",
          });
          console.log(error);
        });
    };
    //倒计时
    const curtDown = (time) => {
      //防抖节流
      if (time.value) {
        clearInterval(timer.value);
      }
      timer.value = setInterval(() => {
        time--;
        if (time == 0) {
          clearInterval(timer.value);
          updataButtonStatus({
            status: false,
            text: "重新发送",
          });
        } else {
          codeBtnStatus.text = `倒计时${time}秒`;
        }
      }, 1000);
    };
    /**
     * 清除倒计时
     */
    const clearCountDown = () => {
      // 还原验证码按钮默认状态
      updataButtonStatus({
        status: false,
        text: "发送验证码",
      });
      // 清除倒计时
      clearInterval(timer.value);
    };
    // 更新按钮状态
    const updataButtonStatus = (params) => {
      codeBtnStatus.status = params.status;
      codeBtnStatus.text = params.text;
    };
    /**
     * 生命周期
     */
    // 挂载完成后
    onMounted(() => {});

    /**
     * 销毁页面时
     */
    onUnmounted(() => {});
    return {
      menuTab,
      model,
      ruleForm,
      rules,
      loginBtnStatus,
      codeBtnStatus,
      toggleMenu,
      submitForm,
      getSms,
    };
  },
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
  .login-wrap {
    width: 330px;
    margin: auto;
  }
  .menu-tab {
    text-align: center;
    li {
      display: inline-block;
      width: 88px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      border-radius: 2px;
      cursor: pointer;
    }
    .current {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  .login-form {
    margin-top: 29px;
    label {
      color: #fff;
      display: block;
      margin-bottom: 3px;
      font-size: 14px;
    }
    .block {
      display: block;
      width: 100%;
    }
    .item-from {
      margin-bottom: 13px;
    }
    .login-btn {
      margin-top: 19px;
    }
  }
}
</style>