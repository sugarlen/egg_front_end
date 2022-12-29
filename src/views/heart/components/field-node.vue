<template>
  <div class="field-node">
    <div
      v-for="(item, index) in dynamicFilter"
      :key="index"
      :class="{
        'group-bg': item.groups,
        'group-bg-line': item.groups && index !== dynamicFilter.length - 1,
      }"
    >
      <div v-if="item.andOr && item.condition" class="addOrBtn">
        <span
          v-if="!item.root"
          :class="{ line: true, 'group-line': item.groups }"
        ></span>
        <el-radio-group v-model="item.andOr" size="mini">
          <el-radio-button label="AND"></el-radio-button>
          <el-radio-button label="OR"></el-radio-button>
        </el-radio-group>
        <el-button
          v-if="item.root"
          size="mini"
          type="primary"
          style="float: right"
          @click="addConditionGroup()"
          >添加条件组</el-button
        >
        <el-button
          size="mini"
          type="primary"
          style="float: right; margin-right: 10px"
          @click="addCondition(item.groupId)"
          >添加条件</el-button
        >
        <!-- 删除按钮 -->
        <span
          :class="{
            'el-icon-remove-outline': true,
            'delete-icon': true,
            'group-delect-icon': item.groups,
          }"
          @click="deleteGroupBtn(item.groupId)"
        ></span>
      </div>
      <div v-if="item.conditionGroup" style="padding-left: 20px">
        <field-node
          :dynamicFilter="item.conditionGroup"
          :searchFrom="searchFrom"
          :options="options"
        />
      </div>
      <div v-if="item.isLeaf" class="field-option">
        <span class="line"></span>
        <!-- 条件 -->
        <div v-if="item.fieldOption" class="field-item">
          <el-select
            v-model="searchFrom.log"
            placeholder="请选择"
            style="flex: 1"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="searchFrom.log"
            placeholder="请选择"
            style="flex: 1"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input
            type="age"
            v-model.number="searchFrom.time"
            placeholder="请输入"
            autocomplete="off"
            style="flex: 1"
          ></el-input>
        </div>
        <!-- 删除按钮 -->
        <span
          :class="{
            'el-icon-remove-outline': true,
            'delete-icon': true,
            'group-delect-icon': item.groups,
          }"
          @click="deleteBtn(item.fieldId)"
        ></span>
      </div>
    </div>
  </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid';
export default {
  name: "field-node",
  props: {
    dynamicFilter: {
      type: Array,
    },
    searchFrom: {
      type: Object,
      default() {
        return {};
      },
    },
    options: Array,
  },
  data() {
    return {
    };
  },
  created() {},
  methods: {
    // 添加条件
    addCondition(groupId) {
      this.deepSearch(this.dynamicFilter, groupId,'add');
      console.log(this.dynamicFilter);
    },
    // 删除条件
    deleteBtn(id) {
      console.log(id);
      this.deepDelete(this.dynamicFilter,id);
    },
    // 删除条件组
    deleteGroupBtn(groupId){
        this.deepSearch(this.dynamicFilter, groupId,'delete');
    },
    // 根据groupId查找添加条件\删除条件组
    deepSearch(searchTree, groupId, operate) {
      searchTree.forEach((el,i) => {
        //   debugger
        if (el.groupId !== undefined && el.groupId === groupId) {
            if(operate == 'add'){
                // 添加条件
                el.conditionGroup.push({
                    fieldOption: [],
                    additionOption: [],
                    value: "",
                    fieldId: uuidv4(),
                    isLeaf: true,
                });
            } else {
                // 删除条件组
                searchTree.splice(i,1);
            }
          return
        } else if (el.conditionGroup && el.conditionGroup.length !== 0) {
          return this.deepSearch(el.conditionGroup, groupId, operate);
        } else {
          return;
        }
      });
    },
    deepDelete(groupData,id){
        console.log(groupData,id)
        groupData.forEach((el,i)=>{
            if(el.fieldId !== undefined && el.fieldId === id){
                groupData.splice(i,1);
                return
            } else if (el.conditionGroup && el.conditionGroup.length !== 0) {
                return this.deepSearch(el.conditionGroup, id);
            } else {
                return;
            }
        });
    },
    // 添加条件组
    addConditionGroup() {
      let groupId = uuidv4();
      this.dynamicFilter[0].conditionGroup.push({
        groups: true,
        andOr: "AND",
        condition: true,
        groupId: groupId,
        conditionGroup: [],
      });
      this.addCondition(groupId);
      this.addCondition(groupId);
    },
  },
};
</script>
<style scoped>
.delete-icon {
  color: #ff0000;
  cursor: pointer;
  position: absolute;
  right: -20px;
  top: 6px;
}
.field-item {
  width: 100%;
  display: flex;
  margin-bottom: 15px;
}
.field-option {
  position: relative;
}
.addOrBtn {
  z-index: 99;
  position: relative;
  margin-bottom: 10px;
}
.line {
  border-top: 1px solid #b1b1b1;
  position: absolute;
  width: 20px;
  height: 43px;
  left: -20px;
  top: 13px;
}
.line::before {
  border-left: 1px solid #b1b1b1;
  bottom: 0px;
  top: -43px;
  content: "";
  position: absolute;
  height: 100%;
  z-index: 9;
}
/* .line:after{
    border-top: 1px solid #B1B1B1;
    height: 20px;
    top: 14px;
    width: 10px;
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
} */
.group-bg {
  background-color: aliceblue;
  padding: 10px;
  position: relative;
  margin-bottom: 10px;
}
.group-bg-line::before {
  border-left: 1px solid #b1b1b1;
  bottom: 0px;
  height: 100%;
  top: 0px;
  left: -20px;
  width: 1px;
  content: "";
  position: absolute;
}
.group-line {
  width: 30px;
  height: 53px;
  left: -30px;
  top: 13px;
}
.group-line::before {
  top: -53px;
}
.group-delect-icon {
  right: -30px;
}
</style>