<template>
  <div>
    <canvas id="canvas" :width="widthValue" :height="heightValue">
      当前浏览器不支持canvas元素，请升级或更换浏览器！
    </canvas>
  </div>
</template>

<script>
export default {
  name: "log-demo",
  data() {
    return {
      canvas: null,
    };
  },
  created() {},
  mounted() {
    // 获取 canvas 元素
    this.canvas = document.getElementById("canvas");
    this.draw();
  },
  computed: {
    widthValue() {
      return document.body.clientWidth - 210; //（不包含滚动条）
    },
    heightValue() {
      return document.body.clientHeight - 80; //（不包含工具条）
    },
  },
  methods: {
    draw() {
      // 通过判断getContext方法是否存在来判断浏览器的支持性
      if (!this.canvas.getContext) return;
      // 获取绘图上下文
      var ctx = this.canvas.getContext("2d");

      ctx.font = "14px serif"; // 设置文案大小和字体
      ctx.fillStyle = "#fff";
      let textl = "2022-11-11 测试";
      let textLen = ctx.measureText(textl);
      ctx.fillText(textl, 0, 14);
    },

    // handleClick() {
    //   const url = this.$router.resolve({ name: "/logDemo" });
    //   let strWindowFeatures = `
    //       top=0,
    //       left=0
    //   `;
    //   window.open(url.href, "log_name", strWindowFeatures);
    // },
  },
};
</script>

<style lang="less" scoped>
#canvas {
  background-color: #000;
}
</style>
