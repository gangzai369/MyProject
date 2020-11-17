<template>
  <div>
    <el-dialog
      :title="bool.isadd ? '添加活动' : '编辑活动'"
      :visible.sync="bool.isshow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDig">
        <el-form-item prop="title" label="活动名称">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限">
          <el-date-picker
            v-model="timer"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          >
          </el-date-picker>
          <!-- <el-input v-model="form.begintime" autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="一级分类">
          <el-select
            @change="cha(false)"
            v-model="form.first_cateid"
            placeholder="请选择"
          >
            <el-option label="请选择" :value="0" disabled></el-option>
            <!-- 下拉框循环我的菜单列表 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select
            v-model="form.second_cateid"
            placeholder="请选择"
            @change="chas(false)"
          >
            <el-option label="请选择" :value="0" disabled></el-option>
            <!-- 下拉框循环我的菜单列表 -->
            <el-option
              v-for="item in myArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model="form.goodsid" placeholder="请选择">
            <!-- 下拉框循环我的菜单列表 -->
            <el-option
              v-for="item in myArrs"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
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
import {
  getGoodsList,
  getSeckAdd,
  getSeckEdit,
  getSeckInfo,
  getSpecsAdd,
  getSpecsEdit,
} from "../../util/axios";
// 调用辅助性函数
import { mapGetters, mapActions } from "vuex";
export default {
  // 计算属性
  computed: {
    ...mapGetters({
      roleList: "role/getRoleList",
      cateList: "cate/getCateList",
    }),
  },
  data() {
    return {
      form: {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: 0, //商品一级分类编号
        second_cateid: 0, //商品二级分类编号
        goodsid: 0, //商品编号
        status: 1, //状态1正常2禁用
      },
      //保存时间
      timer: [],
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
      },
      myArr: [], //保存二级分类
      myArrs: [], //保存二级分类规格
    };
  },
  //引入父组件中的值
  props: ["bool"],
  //   钩子函数
  mounted() {
    this.getSeckList();
    this.getCateList();
  },
  methods: {
    // 定义改变事件
    cha(n) {
      let list = this.cateList;
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == this.form.first_cateid) {
          this.myArr = list[i].children;
        }
      }
      //清空二级双向数据绑定还要清空三级
      if (!n) {
        this.form.second_cateid = "";
        this.form.goodsid = "";
      }
    },
    // 第二个改变事件
    chas(n) {
      // 重新调用获取商品接口，根据fid和sid 进行获取
      getGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      })
        .then((res) => {
          if (res.data.code == 200) {
            this.myArrs = res.data.list;
            //清空二级双向数据绑定还要清空三级
            if (!n) {
              this.form.goodsid = "";
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //   通过辅助函数获取数据
    ...mapActions({
      getSeckList: "seck/getSeckListAction",
      getCateList: "cate/getCateListAction",
    }),
    //封装一个查看一条数据的方法
    look(id) {
      //调取查看接口
      getSeckInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          // 重置时间
          this.timer = [
            new Date(parseFloat(this.form.begintime)),
            new Date(parseFloat(this.form.endtime)),
          ];
          // 重新进行下级菜单的选择
          this.cha(true);
          this.chas(true);
        }
      });
    },
    //   取消事件
    cancel() {
      // 关闭弹框
      this.bool.isshow = false;
      //   调用重置
      this.reset();
    },
    // 重置事件
    reset() {
      this.form = {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1, //状态1正常2禁用
      };
      this.timer = '';
      this.$refs["formDig"].resetFields();
    },
    // 提交事件
    submit(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          //给开始时间和结束事件赋值
          this.form.begintime = new Date(this.timer[0]).getTime().toString();
          this.form.endtime = new Date(this.timer[1]).getTime().toString();
          console.log(this.form);
          // 调用添加接口
          getSeckAdd(this.form)
            .then((res) => {
              // console.log(res);
              // 重新调用接口
              this.getSeckList();
              //关闭弹框
              this.cancel();
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
    // 修改事件
    changeInfo() {
      //调取添加接口
      getSpecsEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //重新调取接口
          this.getSeckList();
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