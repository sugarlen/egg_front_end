<template>
  <div class="pas-fonts">
    <div class="login-form">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="text"
            v-model="ruleForm.pass"
            autocomplete="off"
            style="font-family:'password'; font-size:12px;"
          />
          <input type="text"
            v-model="ruleForm.pass"
            autocomplete="off"
            style="font-family:password; font-size:12px;"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "pas-fonts",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
};
</script>

<style scoped>
 /* @font-face {
  font-family: 'password';
  src: url('../../assets/fonts/PasswordEntry.eot');
  src: local('☺'),
    url('../../assets/fonts/PasswordEntry.eot?#iefix') format('embedded-opentype'), 
    url('../../assets/fonts/PasswordEntry.ttf');
} */
.pas-fonts {
  padding: 20px;
}
.login-form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>