<template>
  <div>
    <el-container>
      <el-header>
        <h4>XXX大型后台管理项目</h4>
        <div class="right">
          <p>[{{ getUserInfo.username }}] 用户登录</p>
          <button @click="exit()">登出</button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 引入导航菜单 -->
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//引入nav导航组件
import vNav from "../components/nav";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  methods: {
    // 重新引入vuex中的函数
    ...mapActions(["getUserLoginAction"]),
    
    exit() {
      this.getUserLoginAction();
      //退出之后强制跳转登录页
      this.$router.push('/login')
    },
  },
  components: {
    vNav,
  },
};
</script>

<style lang="" scoped>
.el-header {
  background: #585840;
  font-size: 24px;
  color: #fff;
}
.right {
  float: right;
  font-size: 16px;
}
.right p {
  display: inline-block;
}
</style>
