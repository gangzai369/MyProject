<template>
  <div>
    <el-table :data="roleList" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180"> </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <div>
            <el-button type="primary" v-if="item.row.status==1" size="small" plain disabled>启用</el-button>
            <el-button type="denger" size="small" v-else plain disabled>禁用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" size="small" @click="edit(item.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(item.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 导入计算属性
import { mapGetters, mapActions } from "vuex";
// 调用接口
import {getRoleDelete,getRoleInfo} from '../../util/axios'

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      roleList: "role/getRoleList",
    }),
  },
  props:['bool'],
  methods: {
    // 添加编辑事件
    edit(id) {
      // 修改弹框数据
      this.bool.isadd = false;
      this.bool.isshow = true;
      // 向父级传送id
      this.$emit('edit',id);
      
    },
    // 添加删除事件
    del(id) {
      this.$confirm('确定要删除这一条数据吗？？？！！！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //调取删除接口
          getRoleDelete({id})
          .then(res=>{
            if(res.data.code==200){
              this.$message.success(res.data.msg)
              //重新调取列表
              this.getRoleList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 通过辅助函数添加获取数据方法
    ...mapActions({
      getRoleList: "role/getRoleListAction",
    }),
  },
  mounted() {
    // 页面一加载遍历列表
    this.getRoleList();
  },
};
</script>

<style lang='' scoped>
</style>