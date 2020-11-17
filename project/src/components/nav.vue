<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#585858"
      text-color="#fff"
      active-text-color="#FF8000"
      unique-opened
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-grid"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu
        :index="item.id.toString()"
        v-for="item in getUserInfo.menus"
        :key="item.id"
      >
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item
          :index="list.url"
          v-for="list in item.children"
          :key="list.id"
        >
          <span slot="title">{{ list.title }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  mounted() {
    //组件一加载就会触发挂载
      // console.log(this.$route,'路由源信息')
      // this.defaultActive = this.$route.path
  },
};
</script>

<style  lang="stylus" scoped>
.el-menu {
  height: 90vh;
}
</style>
