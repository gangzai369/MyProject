<template>
  <div>
    <el-table :data="memberList" style="width: 100%"
      >>
      <el-table-column prop="id" label="会员编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180">
      </el-table-column>
      <el-table-column label="状态">
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
            <el-button type="primary" size="small" @click="edit(item.row.uid)"
              >编辑</el-button
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
export default {
  data() {
    return {};
  },
  props: ["bool"],
  computed: {
    ...mapGetters({
      memberList: "member/getMemberList",
    }),
  },
  mounted() {
    //组件一加载就触发调取列表
    this.getMemberList();
  },
  methods: {
    ...mapActions({
      getMemberList: "member/getMemberListAction",
    }),
    //点击编辑获取id
    edit(uid) {
      this.bool.isshow = true;
      //把id给父组件menu,之后供弹框使用
      this.$emit("edit", uid);
    },
  },
};
</script>

<style lang="" scoped>
.img {
  width: 80px;
}
</style>
