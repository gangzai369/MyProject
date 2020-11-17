<template>
  <div>
    <el-table
      :data="menuList"
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="菜单编号" width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="pid" label="上级菜单"></el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="160px">
        <template slot-scope="item">
            <i :class="item.row.icon"> {{item.row.icon}}</i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
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
//引入辅助性函数
import { mapGetters, mapActions } from "vuex";
// 引入删除
import { getMenuDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  methods: {
    // 点击编辑按钮触发事件
    edit(id) {
      // 获取数据修改isshow和bool
      this.$parent.$children[3].bool = true;
      this.$parent.$children[3].isshow = false;
      // console.log(id);
      this.$emit("edit", id);
    },
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),
    // 删除单条数据
    del(id) {
      this.$confirm("确定要删除该数据吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 调用删除接口
          getMenuDelete({ id })
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success("删除成功！！！");
              }
              // 重新调用一下getMenuList接口
              this.getMenuList();
            })
            .catch((err) => {
              this.$message.success("状态错误");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    //组件一加载就触发调取列表
    this.getMenuList();
  },
};
</script>

<style lang='' scoped>
</style>