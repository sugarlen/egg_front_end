<template>
  <div class="select-demo">
    <el-button @click="drawer = true" type="primary" style="margin: 16px">
      点我打开
    </el-button>

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      size="50%"
    >
      <div style="padding: 20px">
        <span>eg</span>
        <div class="search-obj">
          <span>① 查询分析对象1</span>
          <div class="search-from">
            <el-form
              :model="searchFrom"
              ref="searchFrom"
              label-position="left"
              label-width="80px"
              size="mini "
              class="demo-ruleForm"
            >
              <el-form-item
                label="日志源"
                prop="log"
                :rules="[{ required: true, message: '日志源不能为空' }]"
              >
                <el-select
                  v-model="searchFrom.log"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="筛选条件"
                prop="age"
                :rules="[{ required: true, message: '年龄不能为空' }]"
              >

                <!-- <div v-for="(item, index) in dynamicFilter" :key="index">
                  <div v-if="item.andOr" class="addOrBtn">
                    <el-radio-group v-model="item.andOr" size="mini">
                      <el-radio-button label="AND"></el-radio-button>
                      <el-radio-button label="OR"></el-radio-button>
                    </el-radio-group>
                    <el-button
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
                      @click="addCondition(item.groupIndex)"
                      >添加条件</el-button
                    >
                  </div>
                  <div v-if="item.conditionGroup" style="padding-left: 20px">
                    <div
                      v-for="(field, index) in item.conditionGroup"
                      :key="index"
                      class="field-option"
                    >
                      <span class="line"></span>
                      
                      <div
                        v-if="field.fieldOption"
                        class="field-item"
                      >
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
                      
                      <span class="el-icon-remove-outline delete-icon" @click="deleteBtn(field.fieldIndex)"></span>
                      
                      <div v-if="field.andOr" class="addOrBtn">
                        <el-radio-group v-model="field.andOr" size="mini">
                          <el-radio-button label="AND"></el-radio-button>
                          <el-radio-button label="OR"></el-radio-button>
                        </el-radio-group>
                        <el-button
                          size="mini"
                          type="primary"
                          style="float: right; margin-right: 10px"
                          @click="addCondition(field.groupIndex)"
                          >添加条件</el-button
                        >
                      </div>
                      <div
                        v-if="field.conditionGroup"
                        style="padding-left: 20px"
                      >
                        <div
                          v-for="(fieldItem, index) in field.conditionGroup"
                          :key="index"
                          class="field-option"
                        >
                          <span class="line"></span>
                          <div
                            v-if="fieldItem.fieldOption"
                            style="width: 100%; display: flex; margin-bottom:15px"
                          >
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
                          <span class="el-icon-remove-outline delete-icon" @click="deleteBtn(fieldItem.fieldIndex)"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> -->
                
                <FieldNode :dynamicFilter="dynamicFilter" :searchFrom="searchFrom" :options="options" />

            
              </el-form-item>
              <el-form-item
                label="时间窗口"
                prop="time"
                :rules="[
                  { required: true, message: '时间窗口不能为空' },
                  { type: 'number', message: '时间窗口必须为数字值' },
                ]"
              >
                <el-input
                  type="age"
                  v-model.number="searchFrom.time"
                  style="width: 110px; margin-right: 10px"
                  autocomplete="off"
                ></el-input>
                分钟
              </el-form-item>

              <!-- <el-form-item>
                  <el-button type="primary" @click="submitForm('searchFrom')">提交</el-button>
                  <el-button @click="resetForm('searchFrom')">重置</el-button>
              </el-form-item> -->
            </el-form>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import FieldNode from "./components/field-node.vue"
export default {
  name: "select-demo",
  components: { FieldNode },
  data() {
    return {
      drawer: false,
      searchFrom: {
        age: "1",
        log: "",
        time: "",
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      dynamicFilter: [
        {
          root: true,
          andOr: "AND",
          condition: true,
          groupId: 0,
          conditionGroup: [
            {
              fieldOption: [],
              additionOption: [],
              value: "",
              fieldId: 0,
              isLeaf:true
            },
            {
              fieldOption: [],
              additionOption: [],
              value: "",
              fieldId: 1,
              isLeaf:true
            },
            {
              groups:true,
              andOr: "OR",
              condition: true,
              groupId: 2,
              conditionGroup: [
                {
                  fieldOption: [],
                  additionOption: [],
                  value: "",
                  fieldId: 2,
                  isLeaf:true
                },
                {
                  fieldOption: [],
                  additionOption: [],
                  value: "",
                  fieldId: 3,
                  isLeaf:true
                },
              ],
            },
          ],
        },
      ],
    };
  },
  created() {},
  methods: {
    //   添加条件
    addCondition(groupIndex) {
      console.log("index", groupIndex);
      this.deepSearch(this.dynamicFilter, groupIndex);
      console.log(this.dynamicFilter)
    },
    deleteBtn(index){
        console.log(index)
    },
    deepSearch(searchTree, groupIndex) {
      searchTree.forEach((el) => {
        if (el.groupIndex !== undefined && el.groupIndex == groupIndex) {
          let length = el.conditionGroup.length;
          el.conditionGroup.push({
            fieldOption: [],
            additionOption: [],
            value: "",
            fieldIndex: length,
          });
        } else if (el.conditionGroup && el.conditionGroup.length !== 0) {
            return this.deepSearch(el.conditionGroup, groupIndex);
        } else {
            console.log('error')
            return
        }
      });
    },
    // 添加条件组
    addConditionGroup(){
        let length = this.dynamicFilter[0].conditionGroup.length;
        this.dynamicFilter[0].conditionGroup.push({
          andOr: "AND",
          condition: true,
          groupIndex: length,
          conditionGroup: [
            {
              fieldOption: [],
              additionOption: [],
              value: "",
              fieldIndex: 0,
            },
            {
              fieldOption: [],
              additionOption: [],
              value: "",
              fieldIndex: 1,
            }],
        })
    },
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
.search-obj {
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 14px;
  background-color: #f2f2f2;
}
.search-from {
  padding: 10px 20px;
}
.delete-icon{
    color: #ff0000;
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 6px;
}
.field-item{
    width: 100%; 
    display: flex; 
    margin-bottom:15px;    
}
.field-option{
    position: relative;
}
.addOrBtn{
    z-index: 99;
    position: relative;
    margin-bottom: 10px;
}
.line{
    border-top: 1px solid #B1B1B1;
    position: absolute;
    width: 20px;
    height: 43px;
    left: -20px;
    top: 13px;
}
.line::before{
    border-left: 1px solid #B1B1B1;
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
</style>