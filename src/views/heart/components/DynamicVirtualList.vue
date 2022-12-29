<template>
  <div
    ref="containerRef"
    class="list-container"
    :style="size"
    @scroll="scrollHandler($event)"
  >
    <ul ref="listRef" class="list">
      <li
        v-for="(item, index) in listsData"
        :key="`list-${index}`"
        :data-idx="item.idx"
        :id="item.id"
      >
        <slot :listItem="item"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // 列表数据
    listData: Array,
    //预估行高度
    estimatedItemH: Number,
    size: Object,
  },
  data() {
    return {
      // 容器高度
      containerH: 600,
      // 行高度
      rowH: 50,
      // 显示行数量
      rowCount: 0,
      // 列表初始索引
      startIdx: 0,
      // 列表末端索引
      endIdx: 1,
      positions: [],
    };
  },
  created() {
    this.getPosition();
  },
  mounted() {
    this.$nextTick(() => {
      // 计算容器高度
      this.containerH = this.$refs.containerRef?.clientHeight;
      // 计算容器内真实 DOM 数量 = Math.ceil(容器高度 / 条目高度)
      this.rowCount = Math.ceil(this.containerH / this.estimatedItemH);
      this.endIdx = this.startIdx + this.rowCount;
      console.log("mounted");
    });
  },
  updated() {
    // 获取真实列表项dom高度
    this.getItemRealH();
    // 更新列表总高度
    let listH = this.positions[this.positions.length - 1].bottom;
    this.$refs.containerRef.scrollTop = listH;
    console.log("updated");
  },
  computed: {
    listsData() {
      console.log(this.startIdx, this.endIdx);
      this.getPosition();
      return (
        this.listData.slice(this.startIdx, this.endIdx).map((item, index) => {
          item.idx = this.startIdx + index;
          return item;
        }) ?? []
      );
    },
  },
  methods: {
    // 列表项位置
    getPosition() {
      this.positions = this.listData.map((item, index) => {
        return {
          index,
          height: this.estimatedItemH,
          top: index * this.estimatedItemH,
          bottom: (index + 1) * this.estimatedItemH,
        };
      });
      console.log(this.positions);
    },

    scrollHandler(e) {
      // 设置缓冲区域的数据量
      const aboveCount = 5;
      const belowCount = 25;
      // 当前滚动高度
      const { scrollTop: curScrollTop } = e.target;
      //此时的开始索引
      this.startIdx =
        this.getStartOrEndIndex(curScrollTop) - aboveCount > 0
          ? this.getStartOrEndIndex(curScrollTop) - aboveCount
          : 0;
      //此时的结束索引
      this.endIdx =
        this.getStartOrEndIndex(curScrollTop + this.containerH) + belowCount >
        this.listData.length
          ? this.listData.length
          : this.getStartOrEndIndex(curScrollTop + this.containerH) +
            belowCount;
      this.setStartOffset();
    },

    setStartOffset() {
      let startOffset =
        this.startIdx >= 1 ? this.positions[this.startIdx - 1].bottom : 0;
      this.$refs.listRef?.style.setProperty("padding-top", `${startOffset}px`);
    },

    //获取列表起始或结束索引
    getStartOrEndIndex(scrollTop = 0) {
      //二分法查找
      return this.binarySearch(this.positions, scrollTop);
    },
    //二分法查找
    binarySearch(list, value) {
      let start = 0;
      let end = list.length - 1;
      let tempIndex = null;
      while (start <= end) {
        let midIndex = Math.floor((start + end) / 2);
        let midValue = list[midIndex].bottom;
        if (midValue === value) {
          // 说明当前滚动区域加上可视区域刚好是一个结点的边界，那么我们可以以其下一个结点作为末尾元素
          return midIndex + 1;
        } else if (midValue < value) {
          // 由于当前值与目标值还有一定的差距，所以我们需要增加start值以让下次中点的落点更靠后
          start = midIndex + 1;
        } else if (midValue > value) {
          // 因为我们的目的并不是找到第一个满足条件的值，而是要找到满足条件的最小索引值
          if (tempIndex === null || tempIndex > midIndex) {
            tempIndex = midIndex;
          }
          // 由于我们要继续找更小的索引，所以需要让end-1以缩小范围，让下次中点的落点更靠前
          end = end - 1;
        }
      }
      return tempIndex;
    },

    getItemRealH() {
      let nodes = this.$refs.listRef?.childNodes;
      nodes.forEach((node) => {
        if (node.nodeName === "LI") {
          let height = node.offsetHeight;
          let index = Number(node.id);
          let oldHeight = this.positions[index].height;
          let dValue = oldHeight - height;
          //存在差值
          if (dValue) {
            this.positions[index].bottom =
              this.positions[index].bottom - dValue;
            this.positions[index].height = height;
            for (let k = index + 1; k < this.positions.length; k++) {
              this.positions[k].top = this.positions[k - 1].bottom;
              this.positions[k].bottom = this.positions[k].bottom - dValue;
            }
          }
          console.log("height", height);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.list-container {
  border: 1px solid #000;
  // height: 847px;
  overflow-y: auto;
  // width: 100%;
  background-color: #000;
  // 滚动条样式设置
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #e5e5e5;
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  ul {
    margin: 0;
    padding: 0;
    & li {
      list-style-type: none;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #313131;
      padding: 0 20px;
    }
  }
}
</style>
