<template>
  <div class="positive">
    <span>{{topSelected}}积极词汇评分:</span>
    <div id="positiveChart" class="chart-size"></div>
    <div class="select-top">
      <el-select v-model="topSelected" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
export default {
  name: "positive",
  data() {
    return {
      data: {
        positiveChart: null,
        positiveChartData: [],
      },
      options: [
        {
          value: "Top5",
          label: "Top5",
        },
        {
          value: "Top10",
          label: "Top10",
        },
        {
          value: "Top20",
          label: "Top20",
        },
        {
          value: "Top50",
          label: "Top50",
        },
      ],
      topSelected: "Top10",
    };
  },
  created() {
    this.positiveChartData = JSON.parse(
      localStorage.getItem("positiveChartData")
    );
  },
  mounted() {
    this.positiveChart = this.$echarts.init(
      document.getElementById("positiveChart")
    );
    //窗口大小变化时，实现自适应
    window.addEventListener("resize", () => {
      this.positiveChart.resize();
    });
    this.drawChart();
  },
  methods: {
    drawChart() {
      let positiveOption = {
        xAxis: {
          type: "category",
          data: this.positiveChartData.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.positiveChartData.yData,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };
      this.positiveChart.setOption(positiveOption);
    },
  },
};
</script>
<style scoped>
.positive {
  width: 100%;
  height: 100%;
  padding: 20px;
  text-align: left;
  line-height: 100%;
}
.positive>span:first-child{
  margin: 20px 0 0 20px;
  font-size: 24px;
  display: block;
}
.chart-size {
  height: 90%;
  width: 90%;
  float: left;
  margin-top: 40px;
}
.select-top{
  width: 10%;
  position: absolute;
  line-height: 100%;
  right: 50px;
}
</style>