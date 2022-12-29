<template>
  <div class="graph" ref="graph" style="width: 90%; height: 660px"></div>
</template>

<script>
export default {
  name: "graph",
  data() {
    return {
      myChart: null,
      option: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs);
      this.myChart = this.$echarts.init(this.$refs.graph);
      this.drawCharts();
      // window.addEventListener("resize", () => {
      //   this.myChart.resize();
      // });
    });
  },
  methods: {
    drawCharts() {
      const targetCoord = [100, 140];
      const curveness = 0.2;
      const linesData = [];
      const categories = [
        {
          name: "流入中",
          itemStyle: {
            normal: {
              color: this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#01acca",
                },
                {
                  offset: 1,
                  color: "#5adbe7",
                },
              ]),
            },
          },
          label: {
            normal: {
              fontSize: "14",
            },
          },
        },
        {
          name: "暂无流入",
          itemStyle: {
            normal: {
              color: this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#ffb402",
                },
                {
                  offset: 1,
                  color: "#ffdc84",
                },
              ]),
            },
          },
          label: {
            normal: {
              fontSize: "14",
            },
          },
        },
      ];

      const item = {
        name: "数据中心",
        value: targetCoord,
        symbol:'rect',
        symbolSize: [20, 6],
        symbolOffset:['60%', 0],
        itemStyle: {
          normal: {
            color: this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: "#157eff",
              },
              {
                offset: 1,
                color: "#35c2ff",
              },
            ]),
          },
        },
        label: {
          normal: {
            fontSize: "14",
          },
        },
      };

      const items = [
        {
          name: "子平台0",
          category: 0,
          active: true,
          value: [0, 140],
          symbol:'rect',
          symbolSize: [20, 6],
          symbolOffset:['-360%', 0]
        },
        {
          name: "子平台1",
          category: 0,
          active: true,
          // speed: "50kb/s",
          value: [50, 0],
          symbol:'rect',
          symbolSize: [20, 6]
        },
        {
          name: "子平台2",
          category: 0,
          active: true,
          // speed: "50kb/s",
          value: [50, 100],
          symbol:'rect',
          symbolSize: [20, 6]
        },
        {
          name: "子平台3",
          category: 1,
          value: [50, 200],
          symbol:'rect',
          symbolSize: [20, 6]
        },
        {
          name: "子平台4",
          category: 1,
          value: [50, 300],
          symbol:'rect',
          symbolSize: [20, 6]
        },
      ];

      const data = items.concat([item]);

      items.forEach(function (el) {
        if (el.active && el.name !== '子平台0') {
          linesData.push([
            {
              coord: el.value,
            },
            {
              coord: targetCoord,
            },
          ]);
        } 
        if(el.name == '子平台0'){
          linesData.push([
            {
              coord: el.value,
            },
            {
              coord: items[1].value,
            }
          ],[{
              coord: el.value,
            },
            {
              coord: items[2].value,
            }],[{
              coord: el.value,
            },
            {
              coord: items[3].value,
            }],
            [{
              coord: el.value,
            },
            {
              coord: items[4].value,
            }]);
        }
      });
      console.log(linesData)

      const links = items.map((el) => {
        return {
          source: el.name,
          target: item.name,
          // speed: el.speed,
          lineStyle: {
            normal: {
              color: el.speed ? "#12b5d0" : "#ff0000",
              curveness: curveness,
            },
          },
        };
      });
      links.splice(0,1);
      links.push({
        source: '子平台1',
        target: '数据中心',
        // speed: el.speed,
        lineStyle: {
          normal: {
            color:  "#12b5d0",
            curveness: curveness,
          },
        },
      })

      this.option = {
        xAxis: {
          show: false,
          type: "value",
        },
        yAxis: {
          show: false,
          type: "value",
        },
        series: [
          {
            type: "graph",
            layout: "none",
            coordinateSystem: "cartesian2d",
            symbolSize: 60,
            z: 3,
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 14,
                },
                formatter: function (params) {
                  let txt = "";
                  if (params.data.speed !== undefined) {
                    txt = params.data.speed;
                  }
                  return txt;
                },
              },
            },
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#5e5e5e",
              },
            },
            itemStyle: {
              normal: {
                shadowColor: "none",
              },
              emphasis: {},
            },
            lineStyle: {
              normal: {
                width: 2,
                shadowColor: "none",
              },
            },
            data: data,
            links: links,
            categories: categories,
          },
          {
            name: "A",
            type: "lines",
            coordinateSystem: "cartesian2d",
            z: 1,
            effect: {
              show: true,
              // smooth: false,
              // trailLength: 0,
              // symbol: "arrow",
              // color: "rgba(55,155,255,0.5)",
              // symbolSize: 12,
              smooth: true,
              period: 6,
              symbolSize: 4,
              color:'#fff'
            },
            lineStyle: {
              normal: {
                curveness: curveness,
              },
            },
            data: linesData,
          },
        ],
      };
      this.myChart.setOption(this.option);
      this.myChart.resize();
    },
  },
};
</script>

<style lang="less" scoped>
  .graph{
    background-color: #080826;
  }
</style>