<template>
  <div class="drag-demos">
    <ul class="img-group">
      <li
        class="img-group-item"
        v-for="(i, ind) in goodsDetail"
        :key="i.id"
        draggable="true"
        :data-index="ind"
        @dragstart.stop="dragstart($event, goodsDetail)"
        @dragenter.stop="dragenter"
        @dragover="dragover"
        @dragend="dragend($event, changeSort)"
      >
        {{ i.value }}
        <!-- <img :src="i" class="pointer" /> -->
        <i class="delete-icon"></i>
      </li>
    </ul>
    <div class="iclass">伪元素</div>

    <mulSelect v-model="finalValue"></mulSelect>

    <el-button @click="handleClick">查看日志</el-button>
  </div>
</template>

<script>
import mulSelect from "./components/mulSelect.vue";
export default {
  components: { mulSelect },
  data() {
    return {
      goodsDetail: [
        {
          id: 1,
          value: "1",
        },
        {
          id: 2,
          value: "2",
        },
        {
          id: 3,
          value: "3",
        },
      ],
      currList: [],
      startIndex: "",
      enterIndex: "",
      finalValue: "",
    };
  },
  watch: {
    "formLabelAlign.value"(val) {
      console.log(val);
    },
    finalValue: {
      handler(val) {
        console.log("finalValue", val);
      },
      immediate: true,
    },
  },
  methods: {
    handleClick() {
      const url = this.$router.resolve({ name: "logDemo" });
      let strWindowFeatures = `
          top=0,
          left=0
      `;
      window.open(url.href, "log_name", strWindowFeatures);
    },

    dragstart(e, list) {
      this.currList = list;
      this.startIndex =
        e.target.getAttribute("data-index") ||
        e.target.parentNode.getAttribute("data-index");
    },
    dragenter(e) {
      this.enterIndex =
        e.target.getAttribute("data-index") ||
        e.target.parentNode.getAttribute("data-index");
    },
    dragover(e) {
      console.log(e);
    },
    dragend(e, callback) {
      // 交换位置
      // this.currList[this.enterIndex] = this.currList.splice(this.startIndex, 1, this.currList[this.enterIndex])[0];
      // 按顺序排序
      if (this.enterIndex < this.startIndex) {
        // 拖动图片到前面
        this.currList.splice(
          this.enterIndex,
          0,
          this.currList[this.startIndex]
        );
        this.currList.splice(Number(this.startIndex) + 1, 1);
      } else {
        // 拖动图片到后面
        this.currList.splice(
          Number(this.enterIndex) + 1,
          0,
          this.currList[this.startIndex]
        );
        this.currList.splice(Number(this.startIndex), 1);
      }
      this.startIndex = "";
      e.preventDefault(); // 设置为可以被拖放
      if (callback) {
        callback();
      }
    },
  },
};
</script>

<style scoped>
.iclass::before {
  /* content: 'aaa'; */
  display: inline;
}
</style>
