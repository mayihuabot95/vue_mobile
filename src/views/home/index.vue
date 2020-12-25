<template>
  <div class="home_container">
    <!-- 头部导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        type="info"
        size="small"
        round
        class="search_bar"
      >
        <van-icon name="search" color="#fff" size="10" />
        搜索
      </van-button>
    </van-nav-bar>
    <!-- tab 标签页 频道列表 -->
    <van-tabs v-model="active" animated swipeable class="channel_tabs">
      <van-tab
        :title="item.name"
        :key="item.id"
        v-for="item in channels"
      >
        <!-- 文章列表子组件 -->
        <!-- 通过 channel_fromHomeIndex 属性将每个频道所对应的数据传给 ArticleList 子组件 -->
        <article-list
          :channel_fromHomeIndex="item"
        />
      </van-tab>
      <!-- 重点(样式布局)： -->
      <!-- nav-right 占位用的插槽，无实际意义，只是为了调整 因汉堡菜单图标的浮动而造成的 对其下标签页的遮挡，它和图标本身一样大 -->
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburgerListIcon">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
// 按需导入 获取用户频道列表数据 的方法
import { getUserChannels } from '@/api/user.js'
// 导入 文章列表ArticleList 组件
import ArticleList from './components/article-list'

export default {
  name: 'homeIndex',
  components: {
    // 注册 ArticleList 组件
    ArticleList
  },
  props: {},
  data () {
    return {
      active: 0,
      // 频道列表
      channels: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels() {
      try {
        const { data } = await getUserChannels()
        // console.log(data)
        this.channels = data.data.channels
      } catch (error) {
        this.$toast('获取频道内容数据失败！')
      }
    }
  }
}
</script>

<style scoped lang="less">
.home_container {
  padding-top: 174px;
  padding-bottom: 100px;
  .van-nav-bar__title {
    max-width: unset;
  }
  .search_bar {
    width: 450px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 25px;
  }
  /deep/ .channel_tabs {
      .van-tabs__wrap {
        position: fixed;
        top: 92px;
        left: 0;
        right: 0;
        z-index: 1;
        height: 82px;
      }
      .van-tab {
        min-width: 190px;
        border-right: 1px solid #edeff3;
        font-size: 30px;
        color: #777777;
      }
      .van-tab--active {
        color: #333333;
      }
      .van-tabs__nav {
        padding-bottom: 0;
      }
      .van-tabs__line {
        bottom: 8px;
        width: 41px !important;
        height: 6px;
        background-color: #3296fa;
      }
    .placeholder {
      // ******flex-shrink: 0 代表父级盒子使用了 flex 布局，且兄弟节点都设置了 flex-basis 属性，留给自己的空间不够分时，不压缩自己的大小
      // ***注意：flex-shrink 的值默认是1
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburgerListIcon {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &::before {
        position: absolute;
        left: 0;
        content: '';
        width: 2px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
