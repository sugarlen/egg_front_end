<template>
  <div class="login">
    <div class="login-title">
      <router-link to="/about">About</router-link>
    </div>
    <div class="login-container">
      <img class="img-logo" alt="Vue logo" src="../../assets/images/logo.png" />
      <!-- <img class="img-egg" alt="Vue logo" src="../assets/images/egg.png"> -->
      <div class="content">
        <div class="contenter">
          <!-- 登录 -->
          <el-form
            v-if="login"
            :model="formData"
            status-icon
            :rules="rules"
            ref="formData"
            label-width="100px"
            class="ruleForm"
            label-position="top"
            :hide-required-asterisk="true"
          >
            <div class="title">Fried Egg Managment</div>
            <el-form-item prop="user" label="用户名">
              <el-input
                type="text"
                v-model.number="formData.user"
                id="username"
                autocomplete="off"
                placeholder="请输入您的蛋壳名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="pass" label="密码">
              <el-input
                id="password"
                class="password"
                type="password"
                v-model="formData.pass"
                autocomplete="off"
                placeholder="请输入您的蛋壳码"
              ></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 35px">
              <el-button
                class="sign-in"
                style="width: 100%"
                type="warning"
                @click="submitForm('formData')"
                >登录</el-button
              >
              <el-button
                class="sign-up"
                type="warning"
                plain
                @click="login = false"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
          <!-- 注册 -->
          <el-form
            v-if="!login"
            :model="ruleForm"
            status-icon
            :rules="rulesSignUp"
            ref="ruleForm"
            label-position="top"
            label-width="100px"
            class="demo-ruleForm"
          >
            <div class="title-little">注册</div>
            <el-form-item label="用户名" prop="user">
              <el-input v-model.number="ruleForm.user"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                type="password"
                v-model="ruleForm.checkPass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveForm('ruleForm')"
                >提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="login-bottom">1</div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Login",
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      index: 11111111,
      formData: {
        user: "",
        pass: "",
      },
      rules: {
        user: [{ required: true, message: "请输入登录用户名", trigger: "blur" }],
        pass: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
      },
      ruleForm: {
        user: '',
        pass: '',
        checkPass: '',
      },
      rulesSignUp: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      login: true,
    };
  },
  mounted() {
    // this.browser();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$router.push({ path: "/about" });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    saveForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
};
</script>
<style scoped>
::v-deep .el-form--label-top .el-form-item__label {
  padding: 0;
}
::v-deep .el-form-item {
  margin-bottom: 10px;
}
::v-deep .el-button--warning.is-plain:focus,
::v-deep .el-button--warning.is-plain:hover {
  border-color: #fdb851;
  background: #f9deb5;
}
.login {
  height: 100%;
  background: url("../../assets/images/background.jpg") no-repeat left 20%;
  background-size: cover;
}
.login-title {
  height: 100px;
}
.login-container {
  height: calc(100% - 160px);
}
.login-bottom {
  height: 60px;
  position: absolute;
  left: 0;
  bottom: 0;
}
.content {
  width: 360px;
  /* height: 400px; */
  position: relative;
  left: calc(50% - 180px);
  z-index: 9;
  background-color: rgba(251, 252, 241, 0.8);
  /* opacity: 0.9; */
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.contenter {
  /* height: 360px; */
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 10px;
  padding: 20px;
}
.title {
  font-size: 26px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 40px;
  text-align: center;
}
.ruleForm {
  /* margin-bottom: 50px; */
}
.con-title {
  text-align: left;
}
.img-logo {
  position: relative;
  z-index: 9999;
  /* top: 100px; */
  left: calc(50% - 90px);
}

/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
.sign-in {
  width: 100%;
}
.sign-up {
  width: 100%;
  margin-top: 15px;
  margin-left: 0px !important;
}
.title-little{
  font-size: 22px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

