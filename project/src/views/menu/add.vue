<template>
  <div>
    <el-dialog
      :title="isshow ? '添加菜单' : '编辑菜单'"
      :visible.sync="bool"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDig">
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select
            v-model="form.pid"
            placeholder="请选择"
            @change="cha(form.pid)"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" v-if="menuShow">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
              <!-- 定义图标 -->
              <i :class="item"> {{ item }}</i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            >
            </el-option>
          </el-select>
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
        <el-button type="primary" @click="submit('formDig')" v-if="isshow">添 加</el-button>
        <el-button type="primary" @click="changeInfo('formDig')" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入封装好的接口
import { getMenuAdd,getMenuInfo,getMenuEdit} from "../../util/axios";
//引入辅助性函数
import { mapActions, mapGetters } from "vuex";
// 引入二级路由
import { indexRouters } from "../../router/index";

export default {
  data() {
    return {
      indexRouters, //二级路由
      iconList: [
        // 定义图标选项
        "el-icon-phone-outline",
        "el-icon-s-goods",
        "el-icon-upload",
        "el-icon-message-solid",
        "el-icon-s-tools",
 
      ],
      menuShow: true, //控制菜单是图标还是地址
      bool: false, //控制弹框弹出
      isshow: true, //控制添加和编辑按钮
      form: {
        title: "", //标题
        pid: 0, //上级分类编号 默认是0 是顶级
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "blur" }],
      },
    };
  },
  // 计算属性
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  methods: {
    // 封装修改数据的接口
    changeInfo(loginForm){
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          // 登录逻辑
          getMenuEdit(this.form)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg);
                //重新获取列表
                this.getMenuList();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              this.$message.error(err.data.msg);
            });
          // 判断必填项是否为空
          this.bool = false;
          this.reset();
        } else {
          // 输入内容为空时结束
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 封装一个获取一条数据事件
    look(id){
      // 通过id获取一条数据
      getMenuInfo({id}).then((res)=>{
        if(res.data.code == 200){
          this.form = res.data.list;
          this.form.id = id;
        }
      }).catch((err)=>{
        this.$massage.error('网络出错!!')
      })
    },
    // 定义取消事件
    cancel() {
      this.bool = false;
      // 调用重置事件
      this.reset();
    },
    // 封装一个重置事件
    reset() {
      this.form = {
        title: "", //标题
        pid: 0, //上级分类编号 默认是0 是顶级
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      };
      this.$refs['formDig'].resetFields();
    },
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),
    // 定义点击确定按钮进行操作
    submit(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          // 登录逻辑
          getMenuAdd(this.form)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg);
                //重新获取列表
                this.getMenuList();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              this.$message.error(err.data.msg);
            });
          // 判断必填项是否为空
          this.bool = false;
          this.reset();
        } else {
          // 输入内容为空时结束
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 监听下拉框的改变
    cha(id) {
      // 假如选择的是顶级菜单，
      // 选择目录框,联动菜单图标和地址
      if (id == 0) {
        this.form.type = 1;
        this.menuShow = true;
      } else {
        this.form.type = 2;
        this.menuShow = false;
      }
    },
  },
  mounted() {
    // 页面一加载触发自定义事件事件
  },
};
</script>

<style lang='' scoped>
</style>