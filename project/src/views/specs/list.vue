<template>
  <div>
    <el-table :data="specsList" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column label="规格属性" width="180">
        <template slot-scope="item">
          <div>
            <el-tag
              v-for="attrName in item.row.attrs"
              :key="attrName"
              type="info"
              >{{ attrName }}</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="info" plain @click="edit(item.row.id)"
              >编辑</el-button
            >
            <el-button @click="del(item.row.id)" type="danger" plain
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="specsSize"
      background
      layout="prev, pager, next"
      :total="specsCount"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
// 引入辅助性函数
import { mapGetters, mapActions } from "vuex";
// 调用接口
import { getSpecsDelete, getSpecsEdit } from "../../util/axios";
export default {
  data() {
    return {
      // 用来接收当前的页码
      pages: 0,
    };
  },
  props: ["bool"],
  computed: {
    ...mapGetters({
      specsList: "specs/getSpecsList",
      specsCount: "specs/getSpecsCount",
      specsSize: "specs/getSpecsSize",
    }),
  },
  methods: {
    ...mapActions({
      getSpecsList: "specs/getSpecsListAction",
      getSpecsCount: "specs/getCountAction",
      changePage: "specs/changePageAction",
    }),
    // 删除事件
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 调用删除接口
          getSpecsDelete({ id })
            .then((res) => {
              if (res.data.code == 200) {
                // 判断页码并判断数据是否为1
                // if (this.pages != 1 && res.data.list == []) {
                //   this.pages = this.pages - 1;
                //   this.getSpecsList(this.specsCount,this.pages);
                // }
                this.$message.success(res.data.msg);
                // 重新调用获取列表接口
                this.getSpecsList();

                this.getSpecsCount();
              }
            })
            .catch((err) => {
              this.$message.error(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 修改事件
    edit(id) {
      // id传送
      this.$emit("edit", id);
      this.bool.isshow = true;
      this.bool.isadd = false;
    },
    //封装一个切换页码的事件
    currentChange(e) {
      this.changePage(e);
      this.pages = e;
    },
  },
  // 页面加载执行getSpecsList
  mounted() {
    this.getSpecsList();
    //调取总条数
    this.getSpecsCount();
  },
};
</script>

<style lang='' scoped>
.el-pagination {
  float: right;
  margin-right: 10px;
}
</style>