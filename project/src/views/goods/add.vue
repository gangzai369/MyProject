<template>
  <div>
    <el-dialog
      :title="bool.isadd ? '添加商品' : '修改商品'"
      :visible.sync="bool.isshow"
      :before-close="cancel"
      center
      @opened="createEditor"
    >
    <!-- 一弹出弹框进行富文本加载 -->
      <el-form :model="form" :rules="rules" ref="digform">
        <el-form-item prop="first_cateid" label="一级分类:">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="cha(false)"
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
        <el-form-item prop="second_cateid" label="二级分类:">
          <el-select v-model="form.second_cateid" placeholder="请选择">
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
        <el-form-item prop="goodsname" label="商品名称:">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="price" label="商品价格:">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="market_price" label="市场价格:">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="img" label="商品图片:">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :auto-upload="false"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="onExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" class="imgbox">
            <img :src="dialogImageUrl" alt="" class="ownimg" />
          </el-dialog>
        </el-form-item>
        <el-form-item prop="specsid" label="商品规格:">
          <el-select
            v-model="form.specsid"
            placeholder="请选择"
            @change="chas(false)"
          >
            <el-option :value="0" label="请选择" disabled></el-option>
            <!-- 下拉框循环我的菜单列表 -->
            <el-option
              v-for="item in toGoods"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="specsattr" label="规格属性:">
          <el-select v-model="form.specsattr" multiple placeholder="请选择">
            <el-option :value="0" label="请选择" disabled></el-option>
            <!-- 下拉框循环我的菜单列表 -->
            <el-option
              v-for="item in myArrs"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="price" label="是否新品:">
          <el-radio v-model="form.isnew" :label="0">是</el-radio>
          <el-radio v-model="form.isnew" :label="1">否</el-radio>
        </el-form-item>
        <el-form-item prop="price" label="是否热卖:">
          <el-radio v-model="form.ishot" :label="0">是</el-radio>
          <el-radio v-model="form.ishot" :label="1">否</el-radio>
        </el-form-item>
        <el-form-item prop="description" label="商品描述:">
          <!-- <el-input v-model="form.description" autocomplete="off"></el-input> -->
          <!-- 这个标签中插入富文本编辑器 -->
          <div id="editor"></div>
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
        <el-button v-else @click="update('digform')" type="primary"
          >修 改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入富文本编辑器
import w from 'wangeditor'
// 引入辅助性函数
import { mapGetters, mapActions } from "vuex";
import { getGoodsAdd, getGoodsEdit, getGoodsInfo } from "../../util/axios";

export default {
  data() {
    return {
      editor:null,//定义一个编辑器变量
      form: {
        first_cateid: 0, //一级分类编号
        second_cateid: 0, //二级分类编号
        goodsname: "", //商品名称
        price: 0, //商品价格
        market_price: 0, //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: 0, //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 0, //是否新品状态0正常1禁用
        ishot: 0, //是否热卖推荐状态0正常1禁用
        status: 1, //状态1正常2禁用
      },
      //规则验证
      rules: {
        first_cateid: [
          { required: true, message: "请选择商品属性", trigger: "blur" },
          //   { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择商品规格", trigger: "blur" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入现价", trigger: "blur" }],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请输入规格属性", trigger: "blur" },
        ],
      },
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览图片的弹框
      imgUrl: "", //用来接收图片信息
      fileList: [], //文件上传列表
      myArr: [], //保存二级分类
      myArrs: [], //保存二级分类规格
    };
  },
  //   计算属性
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
      toGoods:"specs/getTogoods"
    }),
  },
  // 为啥必须执行这个函数才能获取到数据
  mounted() {
    this.getCateList();
    this.getSpecsTogoods();
  },
  props: ["bool"],
  methods: {
    // 加载富文本编辑器
    createEditor(){
      // 先实例化富文本
      this.editor = new w("#editor");
      // 调用富文本编辑器
      this.editor.create();
      // 设置内容，设置表单描述信息参数
      this.editor.txt.html(this.form.description);
    },
    // 定义改变事件
    cha(n) {
      let list = this.cateList;
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == this.form.first_cateid) {
          this.myArr = list[i].children;
        }
      }
      // 重置二级id目的
      //进行联动判空。如果你选择了别的一级，那么清空上一次二级的选择值
      if (!n) {
        //清空联动二级的双向数据绑定
        this.form.second_cateid = "";
      }
    },
    // 第二个改变事件
    chas(n) {
      let list = this.toGoods;
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == this.form.specsid) {
          this.myArrs = list[i].attrs;
        }
      }
      //进行联动判空。如果你选择了别的一级，那么清空上一次二级的选择值
      if (!n) {
        //清空联动二级的双向数据绑定
        this.form.specsattr = [];
      }
    },
    //onChange 当图片上传时触发的文件
    onChange(file) {
      this.imgUrl = file.raw;
    },
    //图片预览
    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //图片移除
    onRemove(file, fileList) {},
    //文件上传限制
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    ...mapActions({
      getCateList: "cate/getCateListAction",
      getGoodsList: "goods/getGoodsListAction",
      getGoodsCount: "goods/getCountAction",
      getSpecsTogoods:"specs/getSpecsTogoods"
    }),
    // 清除事件
    cancel() {
      this.bool.isshow = false;
      // 调用重置
      this.reset();
    },
    //封装重置事件
    reset() {
      this.form = {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品 1是 2否
        ishot: 1, //是否热卖推荐1是 2否
        status: 1, //状态1正常2禁用
      };
      //图片列表清空
      this.fileList = [];
      //二级分类
      this.myArr = [];
      //属性数组
      this.myArrs = [];
      //清空规则验证 当关闭弹框时，可以调取清空验证规则函数resetFields()
      //console.log( this.$refs.rules,' this.$refs.rules')
      this.$refs["digform"].resetFields();
    },
    // 添加事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //把普通表单改成FormData
          let data = this.form;
          // 修改提交的表单数据
          data.specsattr = data.specsattr ? data.specsattr.join(",") : "";
          //把编辑器中的内容设置给我的描述参数
          data.description = this.editor.txt.html();
          let file = new FormData();
          //必须通过append 去添加它的属性
          for (let i in data) {
            file.append(i, data[i]);
          }
          //添加img参数
          file.append("img", this.imgUrl);
          //直接打印FormData不好用，要用get去取值
          //console.log(file.get('catename'),'文件')
          //调取添加接口
          getGoodsAdd(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getGoodsList();
              //重新调取总条数
              this.getGoodsCount();
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
    //查看一条事件
    look(id) {
      //调取查看列表
      getGoodsInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.specsattr = this.form.specsattr
            ? this.form.specsattr.split(",")
            : "";
          //当前表单没有id 创建一个id，给确定提交用
          this.form.id = id;
          //把图片格式进行转化
          this.fileList = this.form.img
            ? [{ url: `${this.$imgUrl}${this.form.img}` }]
            : [];
          // 重新调取cha事件,用于清空二级选框
          this.cha(true);
          this.chas(true);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 修改事件
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //把数据修改成formData形式
          let data = this.form;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          //如果你新传了图片 this.imgUrl就有值。就赋值给this.imgUrl。如果没有新添加的图片就用上一次的图片
          this.imgUrl = this.imgUrl ? this.imgUrl : this.form.img;
          file.append("img", this.imgUrl);
          getGoodsEdit(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getGoodsList();
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

<style lang='' scoped>
</style>