<template>
  <div>
    <el-dialog
      :title="bool.isadd ? '添加规格' : '修改规格'"
      :visible.sync="bool.isshow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules" ref="digform">
        <el-form-item prop="specsname" label="规格名称:">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in arrAttr"
          :key="index"
          label="规格属性:"
        >
          <el-input
            class="inputW"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button v-if="index == 0" @click="addAttr" type="primary"
            >新增规格属性</el-button
          >
          <el-button v-else @click="delAttr(index)" type="danger"
            >删除</el-button
          >
        </el-form-item>
        <el-form-item label="状态:">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="bool.isadd" @click="add('digform')" type="primary"
          >添 加</el-button
        >
        <el-button v-else @click="update('digform')" type="primary">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 调用添加接口
import { getSpecsAdd, getSpecsCount,getSpecsEdit,getSpecsInfo} from "../../util/axios";
// 调用辅助性函数
import { mapActions } from "vuex";
export default {
  data() {
    return {
      //表单对象
      form: {
        specsname: "", // 规格名称
        attrs: "", //规格属性
        status: 1, //状态1正常2禁用
      },
      //规则验证
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "blur" },
        ],
      },
      //定义一个规格属性数组
      arrAttr: [
        {
          value: "",
        },
      ],
    };
  },
  props: ["bool"],
  methods: {
    // 打撒数据
    ...mapActions({
      getSpecsList: "specs/getSpecsListAction",
      getSpecsCount: "specs/getCountAction",
    }),
    // 添加一条数据接收事件
    look(id){
      // 调用接口
      getSpecsInfo({id})
      .then(res=>{
        this.form = res.data.list[0];
        this.form.attrs.forEach((item,idx) => {
          if(idx==0){
            this.arrAttr[0].value = item;
          }else{
            this.arrAttr.push({value:`${item}`});
          }
        });
        // this.form.attrs = this.arrAttr.map((item) => item.value).join(",");
      })
      .catch(err=>{
        console.log(err);
      })
    },
    //添加动态表单事件
    addAttr() {
      //最多让用户添加6个
      if (this.arrAttr.length <= 6) {
        //往数组中添加数据
        this.arrAttr.push({
          value: "",
        });
      } else {
        this.$message.warning("最多只能添加6项！！！");
      }
    },
    // 根据id点击删除事件
    delAttr(id) {
      this.arrAttr.splice(id, 1);
    },
    // 重置事件
    reset() {
      this.form = {
        specsname: "", // 规格名称
        // attrs: "", //规格属性
        status: 1, //状态1正常2禁用
      };
      this.arrAttr = [
        {
          value: "",
        },
      ];
      this.$refs['digform'].resetFields();
    },
    // 添加事件
    add(loginForm) {
      // 把数据添加到form中
      this.form.attrs = this.arrAttr.map((item) => item.value).join(",");
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          getSpecsAdd(this.form)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg);
                // 重新调用接口进行数据渲染
                this.getSpecsList();
                //重新调取总条数
                this.getSpecsCount();
                // 弹出框关闭
                this.cancel();
              }else{
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              this.$message.error(err);
            });
          this.reset();
        } else {
          // 输入内容为空时结束
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 取消事件
    cancel() {
      this.bool.isshow = false;
      this.reset();
    },
    // 更新事件
    update(loginForm) {
      // 把数据添加到form中
      this.form.attrs = this.arrAttr.map((item) => item.value).join(",");
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          getSpecsEdit(this.form)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg);
                // 重新调用接口进行数据渲染
                this.getSpecsList();
                //重新调取总条数
                this.getSpecsCount();
                // 弹出框关闭
                this.cancel();
              }else{
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              this.$message.error(err);
            });
          this.reset();
        } else {
          // 输入内容为空时结束
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang='' scoped>
</style>