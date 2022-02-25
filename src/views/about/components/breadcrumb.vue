<template>
  <!-- <div class="breadcrumb"> -->
  <div class="header">
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="formData.url"
          placeholder="请输入URL..."
          style="width: 500px"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="onSubmit"
          ></el-button
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="resetSearch"
          icon="el-icon-refresh-right"
        ></el-button>
      </el-form-item>
    </el-form>
    <div class="user-info">
      <img class="header-icon" src="../../../assets/images/userIcon.png" />
      <span>{{ username }}admin</span>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
export default {
  name: "breadcrumb",
  data() {
    return {
      formData: {
        url: "http://you.163.com/item/detail?id=4028691",
      },
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      let params = {
        ...this.formData,
      };
      this.$emit("search", params);
    },
    resetSearch() {
      this.formData.url = "";
    },
  },
};
</script>
<style scoped>
::v-deep .el-form-item {
  margin-bottom: 0px;
}
.header {
  width: 100%;
  height: 80px;
  line-height: 80px;
  background: #0f1423;
  background-color: #202741;
  position: fixed;
  padding-top: 20px;
}
.header-title {
  margin-left: 50px;
  float: left;
}
.title {
  color: #fff;
  margin-left: 40px;
  font-size: 20px;
}
.user-info {
  float: right;
  margin-right: 50px;
  color: #fff;
}
.user-info > span:last-child {
  margin-left: 40px;
}
.header-icon {
  position: absolute;
  top: 15px;
}
</style>