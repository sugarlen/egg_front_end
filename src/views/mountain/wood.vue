<template>
  <div>
    <div id="wood" class="wood" v-for="(item, index) in data" :key="index">
      <span v-if="item">{{ item.title }}{{ item.content }}</span>
    </div>
    <div class="none">123</div>
    <el-popover
      placement="top-start"
      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <span slot="reference">hover 激活</span>
      <el-button size="mini">超小按钮</el-button>
    </el-popover>

    <input id="pasInput" />

    <div id="dtime">{{timeData}}</div>
  </div>
</template>
<script>
import * as info from "../../api/info";

export default {
  name: "wood",
  data() {
    return {
      data: {
        timeData:60,
        timer:null
      },
    };
  },
  created() {
    this.getInfo();
  },
  mounted() {
    let wood = document.getElementById("wood");
    wood.onclick = () => {
      console.log("fds");
    };
    const dInput = document.getElementById("pasInput");
    // 获取光标位置
    dInput.addEventListener("keyup", function () {
      var pos = 0; // IE Support
      if (dInput.selection) {
        var Sel = dInput.selection.createRange();
        Sel.moveStart("character", -dInput.value.length);
        pos = Sel.text.length;
      }
      // Firefox support
      else if (dInput.selectionStart || dInput.selectionStart == "0")
        console.log(dInput.selectionStart, dInput.selectionEnd);
      pos = dInput.selectionStart;
      return pos;
    });

  dtime(this.timeData);
  function dtime(timeData){
    if(timeData>0){
      this.timer = setTimeout(()=>{
        this.timeData--;
        dtime();
      },1000)
    }
  }

  

  },
  methods: {
    getInfo() {
      info
        .getInfo()
        .then((res) => {
          console.log(res);
          this.data = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
.wood {
  width: 0px;
  height: 0px;
  border-left: transparent;
  border-right: transparent;
  border-bottom: 10px solid pink;
}
.none {
  width: 10px;
  height: 10px;
  background-color: pink;
  display: none;
}
</style>