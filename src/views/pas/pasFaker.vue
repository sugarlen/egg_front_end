<template>
  <div class="pas-faker">
    <el-button @click="onClick()">123</el-button>
  </div>
</template>

<script>

export default {
  name: "pas-faker",
  data() {
    return {
      arr: [3, 6, 7, 1, 2, 9, 9, 6, 8],
    };
  },
  created() {
  },
  methods: {
    onClick() {
      console.log(this.QuickSort(this.arr))
      console.log(this.multiply(2,3))
    },
    // 快速排序
    Partition(arr, lowF, highF) {
      const pivotkey = arr[lowF];
      let low = lowF;
      let high = highF;
      while (low !== high ) {
        while (arr[high] >= pivotkey && low < high) high--;
        arr[low] = arr[high];
        while (arr[low] <= pivotkey && low < high) low++;
        arr[high] = arr[low];
      }
      arr[low] = pivotkey;
      return low;
    },
    QSort(arr, low, high) {
      if (low < high) {
        const pivotLoc = this.Partition(arr, low, high);
        this.QSort(arr, low, pivotLoc - 1);
        this.QSort(arr, pivotLoc + 1, high);
      }
    },
    QuickSort(arr) {
      this.QSort(arr, 0, arr.length - 1);
      return arr
    },
    // 递归实现两个整数的乘积，不使用*号
    multiply(a,b){ 
      let result = 0;
      if(a == 0 || b == 0){
        return result;
      } else{
        return this.add(a,b,result);
      }
    },
    add(a,b,result){
      // debugger
      if(b>0){
        result= result+a;b--;
        this.add(a,b,result);
      } else{
        let c = result;
        return c;
      }
    }

  },
};
</script>

<style scoped>
</style>