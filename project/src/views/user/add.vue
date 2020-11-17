<template>
  <div>
    <el-dialog
      :title="bool.isadd ? '添加管理员' : '编辑管理员'"
      :visible.sync="bool.isshow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDig">
        <el-form-item prop="roleid" label="所属角色">
          <el-select v-model="form.roleid" placeholder="请选择">
            <!-- 下拉框循环我的菜单列表 -->
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员名称" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态">
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
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submit('formDig')" v-if="bool.isadd"
          >添 加</el-button
        >
        <el-button type="primary" @click="changeInfo('formDig')" v-else
          >修 改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 调用接口
import { getUserAdd, getUserInfo, getUserEdit } from "../../util/axios";
// 调用辅助性函数
import { mapGetters, mapActions } from "vuex";
export default {
  // 计算属性
  computed: {
    ...mapGetters({
      roleList: "role/getRoleList",
    }),
  },
  data() {
    return {
      form: {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1, //状态1正常2禁用
      },
      rules: {
        username: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        roleid: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
      },
    };
  },
  //引入父组件中的值
  props: ["bool"],
  //   钩子函数
  mounted() {
    this.getRoleList();
  },
  methods: {
    //   通过辅助函数获取数据
    ...mapActions({
      getRoleList: "role/getRoleListAction",
      getUserList: "user/getUserListAction",
      getCountAction: "user/getCountAction",
    }),
    //封装一个查看一条数据的方法
    look(uid) {
      //调取查看接口
      getUserInfo({ uid }).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.uid = uid;
        }
      });
    },
    //   取消事件
    cancel() {
      // 关闭弹框
      this.bool.isshow = false;
    //   调用重置
    this.reset()
    },
    // 重置事件
    reset() {
      this.form = {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1, //状态1正常2禁用
      };
      this.$refs['formDig'].resetFields();
    },
    // 提交事件
    submit(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          // 调用添加接口
          getUserAdd(this.form)
            .then((res) => {
              // 重新调用接口
              this.getUserList();
              //重新调取总条数
              this.getCountAction();
              //关闭弹框
              this.cancel();
            })
            .catch((err) => {
              this.$message.error(err)
            });
          // 判断必填项是否为空
          this.reset();
        } else {
          // 输入内容为空时结束
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 修改事件
    changeInfo() {
        //调取添加接口
      getUserEdit(this.form).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //重新调取接口
          this.getUserList();
          //重新调取总条数
          this.getCountAction()
          //关闭弹框
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang='' scoped>
</style>