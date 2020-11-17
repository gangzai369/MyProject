<template>
  <div>
    <!-- 引入面包屑 -->
    <el-bread></el-bread>
    <!-- 添加点击按钮 -->
    <el-button type="primary" size="small" class="btn" @click="add()">添加</el-button>
    <!-- 添加表格 -->
    <v-add :bool="bool" ref="vadd"></v-add>
    <!-- 添加弹框标签 -->
    <v-list :bool="bool" @edit="edit"></v-list>
  </div>
</template>

<script>
// 引入子组件
import vAdd from "./add"
import vList from "./list"
export default {
  data() {
    return {
      bool: {
        isshow: false,
        isadd: true,
      },
    };
  },
  components:{
    vList,vAdd
  },
  methods: {
    edit(e){
      // e为list组件中传来的id值
      this.$refs.vadd.look(e);
    },
    // 添加事件
    add(){
      // 点击添加显示弹框
      this.bool.isshow = true;
    }
  },
};
</script>

<style lang='' scoped>
.btn{
  margin-top: 10px;
}
</style>