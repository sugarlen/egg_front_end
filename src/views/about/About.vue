<template>
  <div class="about">
    <el-container>
      <el-aside width="200px">
        <Aside />
        
      </el-aside>
      <el-container>
        <el-header>
          <BreadCrumb />
        </el-header>
        <el-main class="main">
          <AppMain />
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Aside from './components/aside.vue'
import BreadCrumb from './components/breadcrumb.vue'
import AppMain from './components/appmain.vue'
export default {
  name:'about',
  components: { Aside, BreadCrumb, AppMain }
}
</script>
<style scoped>
::v-deep .el-container{
  height: 100%;
}
.about{
  height: 100%;
}
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    /* line-height: 200px; */
    height: 100%;
    position: fixed;
  }

  .el-header {
    position: fixed;
    left: 200px;
    width: 100%;
    padding: 0;
  }
  
  .el-footer {
    position: fixed;
    left: 200px;
    width: 100%;
    bottom: 0;
  }
  
  .el-main {
    background-color: #f0f2f5;
    color: #333;
    /* text-align: center;
    line-height: 160px; */
    padding: 70px 10px 10px 210px;
    min-height: calc(100% - 100px);
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  </style>