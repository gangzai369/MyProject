<template>
  <div>
    <el-table :data="goodsList" border>
      <el-table-column prop="id" label="规格编号"> </el-table-column>
      <el-table-column prop="goodsname" label="规格名称"> </el-table-column>
      <el-table-column prop="price" label="价格"> </el-table-column>
      <el-table-column prop="market_price" label="市场价格"> </el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="item">
          <div>
            <img class="img" :src="$imgUrl+item.row.img" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否是新品">
        <template slot-scope="item">
          <div>
            <el-button v-if="item.row.isnew==0" type="success" disabled>是</el-button>
            <el-button v-else type="warning" disabled>否</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖">
        <template slot-scope="item">
          <div>
            <el-button v-if="item.row.ishot==0" type="success" disabled>是</el-button>
            <el-button v-else type="warning" disabled>否</el-button>
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
      <el-table-column label="操作" width="200px">
        <template slot-scope="item">
          <div>
            <el-button type="info" @click="edit(item.row.id)" size="small"
              >编辑</el-button
            >
            <el-button @click="del(item.row.id)" type="danger" size="small"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="goodsSize"
      background
      layout="prev, pager, next"
      :total="goodsCount"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
// 引入辅助性函数
import { mapGetters, mapActions } from "vuex";
import { getGoodsDelete } from '../../util/axios';
export default {
  data() {
    return {};
  },
  props:['bool'],
  //   计算属性
  computed: {
    ...mapGetters({
      goodsList: "goods/getGoodsList",
      goodsCount:"goods/getGoodsCount",
      goodsSize:"goods/getGoodsSize"
    }),
  },
  methods: {
    //   goods独数函数
    ...mapActions({
      getGoodsList: "goods/getGoodsListAction",
      getGoodsCount:"goods/getCountAction",
      changePage:"goods/changePageAction"
    }),
    //   编辑事件
    edit(id) {
      this.bool.isshow = true;
      this.bool.isadd = false;
      //把id给父组件menu,之后供弹框使用
      this.$emit('edit',id)
    },
    // 删除事件
    del(id) {
      this.$confirm("确定要删除这条数据吗?！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调取删除接口
          getGoodsDelete({ id }).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新触发调取列表
              this.getGoodsList();
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
    currentChange(e) {
      this.changePage(e);
    },
  },
  mounted() {
    this.getGoodsList();
    //调取总条数
    this.getGoodsCount();
  },
};
</script>

<style lang='' scoped>
.el-table-column{
  width: 100px;
}
.el-pagination {
  float: right;
  margin-right: 10px;
}
.img{
  width: 60px;
  height: 60px;
}
</style>