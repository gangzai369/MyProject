<template>
 <div>
   <!-- 引入面包屑 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" size="small" @click="isAdd" class="btn">添加</el-button>
    <!-- 弹框组件 -->
    <v-add :bool="bool" ref="show"></v-add>
    <!-- 表格组件 -->
    <v-list :bool="bool" @edit='edit'></v-list>
 </div>
</template>

<script>
// 导入子组件
import vAdd from './add'
import vList from './list'
export default {
  data () {
     return {
       bool:{
         isshow:false,
         isadd:true
       }
     };
  },
  components:{
    vList,vAdd
  },
  methods:{
    // 点击显示弹框
    isAdd(){
      this.bool.isshow = true;
      this.bool.isadd = true;
    },
    // 接收id并进行转发
    edit(id){
      this.$refs.show.look(id);
    }
  }
}
</script>

<style lang='' scoped>
.btn{
  margin-top: 10px;
}
</style>