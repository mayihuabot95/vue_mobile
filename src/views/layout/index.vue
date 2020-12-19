<template>
  <div class="layout_container">
    <!-- 这个是父路由组件，是 个人中心页面中 每个子路由界面所共有的 带有底部标签导航栏的 layout布局 -->
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- 底部标签导航栏 -->
    <van-tabbar class="layout_tabbar" route>
      <!-- route 属性开启路由模式 -->
      <!-- ***注意：开启路由模式后 v-model="active" 将失效，哪个标签被激活是由路径所决定的 -->
      <van-tabbar-item to="/">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <!-- 登录状态下显示 我的，未登录时显示 未登录 -->
        <span class="text">{{ $store.state.user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layoutIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.layout_tabbar {
  i.toutiao {
    font-size: 40px;
  }
  span.text {
    font-size: 20px;
  }
}
</style>
