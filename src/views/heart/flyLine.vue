<template>
  <div class="fly-line">
    <canvas id="myCanvas" width="800" height="500"></canvas>
  </div>
</template>

<script>
  export default {
    name:'fly-line',
    data(){
      return {
        myCanvasDom:null,
      }
    },
    mounted(){
      this.canvasDraw();
    },
    methods:{
      canvasDraw(){
        let Q01 = {
          x:256,y:163
        };
        let B1 = {
          x:458,y:286
        };
        let P0 = {
          x:60,y:336
        }
        let P2 = {
          x:200,y:200
        };
        this.myCanvasDom=document.getElementById("myCanvas");
        let ctx = this.myCanvasDom.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(P0.x,P0.y);
        ctx.quadraticCurveTo(Q01.x,Q01.y,B1.x,B1.y);
        ctx.lineCap = 'round';
        ctx.lineWidth =2;
        ctx.strokeStyle = this.createGradient(ctx,P0,P2);
        ctx.shadowColor = 'rgba(255,0,255,1)';
        ctx.shadowBlur = 5;
        ctx.stroke();
      },
      createGradient(ctx,p0,p1){
           var grd = ctx.createLinearGradient(p0.x,p0.y,p1.x,p1.y);
           grd.addColorStop(0,'rgba(255,0,255,0)');
           grd.addColorStop(1,'rgba(255,0,255,1)');
           return grd;
      }
    }
  }
</script>

<style lang="less" scoped>
</style>