<template>
  <div>
    <el-dialog
      title="编辑会员信息"
      :visible.sync="bool.isshow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item prop="phone" label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="nickname"
          label="昵称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <!-- 可以使用active-color属性与inactive-color属性来设置开关的背景色。 -->
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
        <el-button @click="update('formDialog')" type="primary"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入封装好的接口
import { getMemberInfo, getMemberEdit, getMemberList } from "../../util/axios";
//引入辅助性函数
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        uid: "", //上级分类编号 默认是0 是顶级
        nickname: "", //商品分类名称
        phone: "", //手机号
        password: "", //密码
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
      rules: {
        phone: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          {
            min: 6,
            max: 11,
            message: "长度在 6 到 11 个字符",
            trigger: "blur",
          },
        ],
        nickname: [
          { required: true, message: "请选择上级分类", trigger: "blur" },
          {
            min: 2,
            max: 12,
            message: "长度在 2 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    //获取菜单列表的值
    ...mapGetters({
      memberList: "member/getMemberList",
    }),
  },
  props: ["bool"],
  methods: {
    //封装一个重置事件
    reset() {
      this.form = {
        uid: "", //上级分类编号 默认是0 是顶级
        nickname: "", //商品分类名称
        phone: "", //手机号
        password: "", //密码
        status: 1, //状态1正常2禁用
      };
      this.$refs['formDialog'].resetFields();
    },
    ...mapActions({
      getMemberList: "member/getMemberListAction",
    }),
    //取消事件，关闭弹框，修改父组件数据
    cancel() {
      this.bool.isshow = false;
      this.$emit("cancel", false);
      //调用重置函数
      this.reset();
    },
    //查看一条事件
    look(uid) {
      //调取查看列表
      getMemberInfo({ uid }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //确定修改事件
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //修改逻辑
          //调取修改接口
          getMemberEdit(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getMemberList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
</style>
