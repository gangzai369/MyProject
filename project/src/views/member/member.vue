<template>
 <div>
   <!-- 引入面包屑 -->
    <el-bread></el-bread>
    <!-- 导入子组件 -->
    <v-list :bool="isBool" @edit="edit"></v-list>
    <!-- 用于编辑 -->
    <v-add :bool="isBool" ref="vadd"></v-add>
 </div>
</template>

<script>
// 引入子组件
import vList from './list'
import vAdd from './add'
export default {
  components: { vList,vAdd },
  data () {
     return {
       isBool:{
         isshow:false
       }
     };
  },
  methods:{
    edit(uid){
      this.$refs.vadd.look(uid)
    }
  }
}
</script>

<style lang='' scoped>
</style>