<template>
  <div id="templateDemo" class="template-demo">
    <div id="pdfDom">
      <div class="markdown-body">
        <div class="markdown-template" v-html="markdownRender"></div>
      </div>
      <mavon-editor
      style="margin-top:20px"
        v-show="editorShow"
        v-model="context"
        :toolbars="toolbars"
        :subfield="false"
        @change="onChange"
      />
      <el-button @click="sendBolg">发送</el-button>
    </div>
    <div class="preview-content-operateBtn">
      <el-progress
        :text-inside="true"
        :stroke-width="24"
        :percentage="60"
        status="success"
      ></el-progress>
      <el-button type="primary" @click="onClickDownLoad">下载PDF模板</el-button>
    </div>
  </div>
</template>

<script>
import htmlToPdf from "@/utils/htmlToPdf.js";
export default {
  name: "template-demo",
  data() {
    return {
      context: " ", //输入的数据
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        mark: true, // 标记
        superscript: true, // 上角标
        quote: true, // 引用
        ol: true, // 有序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        help: true, // 帮助
        code: true, // code
        subfield: true, // 是否需要分栏
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        undo: true, // 上一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
      },
      markdownRender:null,
      editorShow:true
    };
  },
  methods: {
    onClickDownLoad() {
      htmlToPdf.getPdf("测试的pdf");
    },
    sendBolg() {
      console.log(this.context);
      this.editorShow = false;
    },
    onChange(value, render) {
      console.log('--render--', render);
      let renderF = render;
      this.markdownRender = renderF;
      
    },
  },
};
</script>
<style scoped>
.template-demo{
    padding: 20px;
}
.markdown-template{
    box-shadow: rgb(0 0 0 / 10%) 0px 2px 12px 0px;
    border: 1px solid rgb(0 0 0 / 0.2);
    border-radius: 5px;
    min-height: 200px;
    padding: 20px;
}
</style>