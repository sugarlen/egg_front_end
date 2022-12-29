<template>
  <div class="san-key">
    <div id="main" ref="myChart" style="width: 80%; height: 660px" class="map"></div>
  </div>
</template>

<script>
var name = ['GBP','CAD','DEM','FRF','ABC','DEF','GHK','UVW'];
function productData(nameO){
  let name = JSON.parse(JSON.stringify(nameO));
  let data = [];
  for(let i = 0; i<32; i++){
    name.push('用户'+ i);
  }
  data = name.map(item=>{
    let color = `rgb( ${parseInt(Math.random()*255)}, ${parseInt(Math.random()*255)}, ${parseInt(Math.random()*255)} )`
    return {
      name: item,
      itemStyle: {
        color: color,
        borderColor: color
      }
    }
  })
  return data
}
const data = productData(name);

function productLinks(nameO){
  let name = JSON.parse(JSON.stringify(nameO));
  let links = [];
  let name1 = []
  for(let i = 0; i<32; i++){
    name1.push('用户'+ i);
  }
  name1.forEach((el,index) => {
    let item = []
    if(index == 20){
      item = [{
        source: name[0],
        target: el,
        value: 1,
        lineStyle:{
          opacity: 0.6,
          // curveness:0.4
        }
      },{
        source: el,
        target: name[6],
        value: 1,
        lineStyle:{
          opacity: 0.6,
          // curveness:0.4
        }
      }]
    }
    else if(index<8){
      item = [{
        source: name[0],
        target: el,
        value: 1,
        lineStyle:{
          opacity: 0.6,
          // curveness:0.4
        }
      },{
        source: el,
        target: name[4],
        value: 1,
        lineStyle:{
          opacity: 0.6,
          // curveness:0.4
        }
      }]
    } else if(index<16){
      item = [{
        source: name[1],
        target: el,
        value: 1,
        lineStyle:{
          opacity: 0.6,
          // curveness:0.4
        }
      },{
        source: el,
        target: name[5],
        value: 1,
        lineStyle:{
          opacity: 0.6,
          // curveness:0.4
        }
      }]
    } else if(index<24){
      item = [{
        source: name[2],
        target: el,
        value: 1,
        lineStyle:{
          opacity: 0.6,
          // curveness:0.4
        }
      },{
        source: el,
        target: name[6],
        value: 1,
        lineStyle:{
          opacity: 0.6,
          // curveness:0.4
        }
      }]
    } else {
      item = [{
        source: name[3],
        target: el,
        value: 1,
        lineStyle:{
          opacity: 0.6,
          // curveness:0.4
        }
      },{
        source: el,
        target: name[7],
        value: 1,
        lineStyle:{
          opacity: 0.6,
          // curveness:0.4
        }
      }]
    }
    links = links.concat(item);
  });
  return links
}
const links = productLinks(name);

const dataCoords = []
links.forEach(el=>{
  dataCoords.push({
    coord:[el.source,el.target]
  })
})

export default {
  name: "san-key",
  data(){
    return {
      myChart:null,
      option:{},
      myData:data,
      myLinks:links,
      myDataCoords:dataCoords
    }
  },
  mounted(){
    console.log(this.isIsomorphic('manual setting'))
    this.$nextTick(()=>{
      this.myChart = this.$echarts.init(this.$refs.myChart);
      this.InitCharts()
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    });
  },
  methods: {
    InitCharts() {
      // 指定图表的配置项和数据
      this.option = {
        backgroundColor: "rgb(193 221 244 / 0%)",
        title: {
          // subtext: "Data From lisachristina1234 on GitHub",
          left: "center",
        },
        series: [
          {
            type: "sankey",
            left: 50.0,
            top: 20.0,
            right: 150.0,
            bottom: 25.0,
            // layoutIterations:0,
            nodeGap:20,
            nodeWidth:20,
            nodeAlign:'left',
            data: this.myData,
            links: this.myLinks,
            animationDelay: function (idx) {
                // 越往后的数据延迟越大
                console.log(idx)
                return idx * 10000;
            },
            lineStyle: {
              color: "source",
              curveness: 0.5,
            },
            itemStyle: {
              color: "#1f77b4",
              borderColor: "#1f77b4",
            },
            label: {
              color: "rgba(0,0,0,0.7)",
              fontFamily: "Arial",
              fontSize: 10,
            },
          }
        ],
        tooltip: {
          trigger: "item",
        },
      };

      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(this.option);
      this.myChart.resize();
    },
    toHump(str) {
      return str
        .replace(/\s+./g, function (word) {
          return word.substring(1, 2).toUpperCase();
        })
        .replace(/^./g, function (word) {
          return word.substring(0, 1).toLowerCase();
        });
    },
  },
};
</script>

<style scoped lang="less">
  .san-key{
    /* background: url(../../assets/images/backBg.png) no-repeat center; */
    /* background-position: top left; */
    background-size: cover;
    height: 100%;
  }
</style>