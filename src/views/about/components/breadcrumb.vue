<template>
    <div class="breadcrumb">
        <el-breadcrumb separator="/" style="line-height: 60px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <!-- <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    name:'breadcrumb'
}
</script>
<style>
.breadcrumb {
    height: 100%;
    line-height: 60px;
    width: 100%;
    background-color: #fff;
    padding: 0 20px;
}
    
</style>