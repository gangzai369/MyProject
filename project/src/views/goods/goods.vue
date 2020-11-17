<template>
  <div>
    <!-- 引入面包屑 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" size="small" @click="xianshi" class="btn"
      >添加</el-button
    >
    <!-- 弹框组件 -->
    <v-add :bool="bool" ref="show"></v-add>
    <!-- 表格组件 -->
    <v-list :bool="bool"  @edit='edit'></v-list>
  </div>
</template>

<script>
// 导入子组件
import vAdd from "./add";
import vList from "./list";
export default {
  data() {
    return {
      bool: {
        isshow: false,
        isadd: true,
      },
    };
  },
  components: {
    vList,
    vAdd,
  },
  methods: {
    // 点击显示
    xianshi() {
      this.bool.isshow = true;
      this.bool.isadd = true;
    },
    //编辑事件
    edit(e){
      //获取弹框的函数
      // console.log(this.$refs.dialog)
      this.$refs.show.look(e);
    }
  },
};
</script>

<style lang='' scoped>
.btn{
  margin: 10px 0;
}
</style>