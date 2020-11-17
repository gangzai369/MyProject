<template>
  <div>
    <el-table :data="userList" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="管理员名称" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <div>
            <el-button
              type="primary"
              v-if="item.row.status == 1"
              size="small"
              plain
              disabled
              >启用</el-button
            >
            <el-button type="denger" size="small" v-else plain disabled
              >禁用</el-button
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" size="small" @click="edit(item.row.uid)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(item.row.uid)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination :page-size='userSize' background layout="prev, pager, next" :total="userCount" @current-change='currentChange'>
    </el-pagination>
  </div>
</template>

<script>
// 导入辅助性函数
import { mapGetters, mapActions } from "vuex";
//引入封装好的接口
import { getUserDelete,getUserInfo,getUserEdit} from "../../util/axios";

export default {
  data() {
    return {};
  },
  props:['bool'],
  methods: {
    ...mapActions({
      getUserList: "user/getUserListAction",
      getUserCount:'user/getCountAction',
      changePage:'user/changePageAction'
    }),
    //封装一个编辑传id事件
    edit(id) {
        // /显示弹框
        this.bool.isshow = true;
        this.bool.isadd=false;
      this.$emit("edit", id);
    },
    // 添加删除事件
    del(uid){
        this.$confirm("确定要删除这一条数据吗？？？！！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调取删除接口
          getUserDelete({ uid }).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新调取列表
              this.getUserCount();
              this.getUserList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //封装一个切换页码的事件
    currentChange(e){
      this.changePage(e)
    }
  },
  computed: {
    ...mapGetters({
      userList: "user/getUserList",
      userCount:'user/getUserCount',
      userSize:'user/getUserSize'
    }),
  },
  //   钩子函数
  mounted() {
    this.getUserList();
    //调取总条数
    this.getUserCount()
  },
};
</script>

<style lang='' scoped>
/* 分页样式 */
.el-pagination {
  float: right;
  margin: 20px 35px 0 0;
}
</style>