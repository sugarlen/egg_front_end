<template>
  <el-select
    v-model="mulSelected"
    multiple
    :collapse-tags="true"
    style="margin-left: 20px;"
    placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    name:'mul-select',
    model:{
      prop:'value',
      event:'change'
    },
    props:{
      value: {
        type: String,
        default: ''
      },
    },
    watch:{
      mulSelected:{
        handler(val){
          this.$emit('change',val.join(','))
          console.log('mulSelected',val.join(','))
        },
        deep:true,
        immediate:true
      }
    },
    data(){
      return {
        mulSelected:[],
        options:[{
          value:0,
          label:'选项1'
        },{
          value:1,
          label:'选项2'
        },{
          value:2,
          label:'选项3'
        },{
          value:3,
          label:'选项4'
        }]
        }
    }
  }
</script>

<style lang="less" scoped>

</style>