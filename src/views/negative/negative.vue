<template>
  <div class="negative">
    <span>Top10消极词汇评分:</span>
    <div id="negativeChart" class="chart-size"></div>
  </div>
</template>
<script>

export default {
  name: "negative",
  data() {
    return {
      data: {
        negativeChart: null,
        negativeChartData: [],
      },
    };
  },
  created() {
    this.negativeChartData = JSON.parse(localStorage.getItem('negativeChartData'));
  },
  mounted() {
    this.negativeChart = this.$echarts.init(
      document.getElementById("negativeChart")
    );
    //窗口大小变化时，实现自适应
    window.addEventListener("resize", () => {
      this.negativeChart.resize();
    });
    this.drawChart()
  },
  methods: {
   drawChart(){
      let negativeOption = {
        xAxis: {
          type: "category",
          data: this.negativeChartData.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.negativeChartData.yData,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };
      this.negativeChart.setOption(negativeOption);
   }
  },
};
</script>
<style scoped>
.negative{
  width: 100%;
  height: 100%;
  padding: 20px;
}
.negative>span:first-child{
  margin: 20px 0 0 20px;
  font-size: 24px;
  display: block;
}
.chart-size{
  height: 90%;
  width: 90%;
}
</style>