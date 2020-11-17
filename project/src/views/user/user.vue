<template>
  <div>
    <!-- 引入面包屑 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" size="small" class="btn" @click="add">添加</el-button>
    <!-- 引用列表组件 -->
    <v-list @edit="edit" :bool="bool"></v-list>
    <!-- 应用弹框组件 -->
    <v-add :bool="bool" ref="dialog"></v-add>
  </div>
</template>

<script>
// 引入弹框和表格组件
import vAdd from './add'
import vList from './list'
export default {
  data() {
    return {
      // 控制弹框及其状态
      bool: {
        isshow: false,
        isadd: true,
      },
    };
  },
  components:{
    vAdd,vList
  },
  methods: {
    // 点击显示弹框
    add(){
      this.bool.isshow = true;
    },
    //触发编辑事件
    edit(e){
      //打开弹框
      this.bool.isAdd =false
      this.bool.isShow = true
      this.$refs.dialog.look(e)
    }
  },
};
</script>

<style lang='' scoped>
.btn{
  margin-top: 10px;
}
</style>