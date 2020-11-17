<template>
  <div>
    <!-- 引入面包屑 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" size="small" @click="addinfo">添加</el-button>
    <!-- 添加表格组件 -->
    <v-table @edit="edit"></v-table>
    <!-- 添加弹出框 -->
    <v-dig ref="diglog"></v-dig>
  </div>
</template>

<script>
// 引入表格组件
import vTable from "../menu/table"
// 引入弹出框组件
import vDig from '../menu/add'
export default {
  data() {
    return {};
  },
  methods: {
    addinfo(){
      this.$children[3].bool = true;
      this.$children[3].isshow = true;
    },
    edit(e){
      // console.log();
      // 通过ref像子组件传值
      this.$refs.diglog.look(e);
    }
  },
  components: {
    vTable,vDig
  },
  mounted(){

  }
};
</script>

<style lang='stylus' scoped>
.el-button 
  margin-top: 15px
</style>