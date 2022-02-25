<template>
  <div class="wordCloud">
    <div id="frequencyChart" class="chart-size"></div>
  </div>
</template>
<script>

export default {
  name: "wordCloud",
  data() {
    return {
      data: {
        frequencyChart: null,
        frequencyChartData: [],
      },
    };
  },
  created() {
    this.frequencyChartData = JSON.parse(localStorage.getItem('frequencyChartData'));
  },
  mounted() {
    this.frequencyChart = this.$echarts.init(
      document.getElementById("frequencyChart")
    );
    //窗口大小变化时，实现自适应
    window.addEventListener("resize", () => {
      this.frequencyChart.resize();
    });
    this.drawChart()
  },
  methods: {
   drawChart(){
      let frequencyOption = {
        series: [{
            type: 'wordCloud',
            sizeRange: [15, 80],
            rotationRange: [0, 0],
            rotationStep: 45,
            gridSize: 8,
            shape: 'pentagon',
            width: '100%',
            height: '100%',
            textStyle: {
                normal: {
                    color: function () {
                      return 'rgb(' + [
                          Math.round(Math.random() * 160),
                          Math.round(Math.random() * 160),
                          Math.round(Math.random() * 160)
                        ].join(',') + ')';
                    }
                }
            },
            data: this.frequencyChartData
        }]
      };
      this.frequencyChart.setOption(frequencyOption);
   }
  },
};
</script>
<style scoped>
.wordCloud{
  width: 100%;
  height: 100%;
  padding: 20px;
}
.chart-size{
  height: 100%;
  width: 100%;
}
</style>