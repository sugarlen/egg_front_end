<template>
    <div>
        <title>SUDER</title> 
        <canvas id="myCanvas" width="300" height="150" style="border:1px solid #d3d3d3;">
            Your browser does not support the HTML5 canvas tag.
        </canvas>
        <div
            class="drag-demo"
            @dragstart="dragstart($event)"
            @dragenter="dragenter($event)"
            @dragend="dragend($event)"
            @dragover="dragover($event)">
        </div>
    </div>
</template>
<script>
export default {
    name:'suder',
    data(){
        return {
            myCanvas: null,
        }
    },
    created(){
        // this.myCanvas = document.getElementById("myCanvas");
        // this.drawChart();
    },
    methods:{
        // drawChart(){
        //     var ctx = this.myCanvas.getContext("2d");
        //     ctx.strokeStyle="#0000ff";
        //     ctx.strokeRect(20,20,150,100);
        // },
        dragstart(e){
            console.log(e)
        },
        dragenter(e){
            console.log(e)
        },
        dragend(e){
            console.log(e)
        },
        dragover(e){
            console.log(e)
        }
    }
}
</script>
<style>
.drag-demo{
    width: 30px;
    height: 30px;
    background-color: antiquewhite;
    border: 1px solid rgb(221, 158, 158);
}
</style>