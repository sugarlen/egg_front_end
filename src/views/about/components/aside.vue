<template>
  <div class="aside">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      background-color="#8696A7"
      text-color="#fff"
      active-text-color="#ffd04b"
      :show-timeout="200"
      mode="vertical"
      router
    >
      <span class="aside-title">Fried Egg Managment </span>
      <template v-for="(item, index) in routes">
        <el-submenu :index="index + ''" :key="index + ''">
          <template slot="title">
            <!-- <i :class="item.meta.icon"></i> -->
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="child in item.children"
            :index="child.path"
            :key="child.path"
          >
            <!-- <i :class="child.meta.icon"></i> -->
            <span>{{ child.name }}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import asideRoute from "../../../router/asideRoute";
export default {
  name: "asideConment",
  data() {
    return {
      routes: [],
    };
  },
  created() {
    this.routes = JSON.parse(JSON.stringify(asideRoute));
    console.log(this.routes);
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.aside {
  height: 100%;
}
.el-menu-vertical {
  height: 100%;
  text-align: left;
}
.aside-title {
  height: 60px;
  line-height: 60px;
  width: 100%;
  font-weight: 600;
  color: #fff;
  margin-left: 15px;
}
</style>