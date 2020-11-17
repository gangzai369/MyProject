<template>
  <div>
    <el-dialog
      :title="bool.isadd ? '添加角色' : '编辑菜单'"
      :visible.sync="bool.isshow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDig">
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-tree
            ref="tree"
            :data="menuList"
            show-checkbox
            check-strictly
            node-key="id"
            default-expand-all
            :props="{
              children: 'children',
              label: 'title',
            }"
          >
          </el-tree>
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
        <el-button type="primary" @click="changeInfo('formDig')" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入辅助函数
import { mapGetters, mapActions } from "vuex";
// 引入接口
import { getRoleAdd, getRoleInfo,getRoleEdit} from "../../util/axios";
export default {
  data() {
    return {
      form: {
        rolename: "", //角色名称
        menus: "", //角色权限
        status: 1, //状态1正常2禁用
      },
      rules: {
        rolename: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: ["bool"],
  // 计算属性
  computed: {
    // 调用menu中的数据
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  mounted() {
    if (this.menuList.length == 0) {
      this.getMenuList();
    }
  },
  methods: {
    // 随便定义一个事件用来接收传送的id以便获取一条数据
    look(id) {
      // 根据传送来的id获取一条数据
      getRoleInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          //setCheckedKeys 	通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性
          this.form.menus = this.$refs.tree.setCheckedKeys(
            this.form.menus.split(",")
          );
          this.form.id = id;
        }
      });
    },
    // 定义重置函数
    reset() {
      this.form = {
        rolename: "", //角色名称
        status: 1, //状态1正常2禁用
      };
      // 清空tree解构框
      this.$refs.tree.setCheckedKeys([]);
      this.$refs['formDig'].resetFields();
    },
    // 添加事件
    submit(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          //转化menu的数据类型
          this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
          // 调用添加接口
          getRoleAdd(this.form)
            .then((res) => {
              if (res.data.code == 200) {
                // 重新调用getRoleList接口
                this.$message.success(res.data.msg);
                this.getRoleList();
                this.cancel();
                // 调用重置
                this.reset();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              this.$message.error(err);
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
    // 添加修改事件
    changeInfo(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          //转化menu的数据类型
          this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
          // 调用添加接口
          getRoleEdit(this.form)
            .then((res) => {
              if (res.data.code == 200) {
                // 重新调用getRoleList接口
                this.$message.success(res.data.msg);
                this.getRoleList();
                this.cancel();
                // 调用重置
                this.reset();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              this.$message.error(err);
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
    // 添加取消事件
    cancel() {
      this.bool.isshow = false;
      this.bool.isadd = true;
      // 调用重置
      this.reset();
    },
    // 导入menu里的函数
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
      getRoleList: "role/getRoleListAction",
    }),
  },
};
</script>

<style lang='' scoped>
</style>