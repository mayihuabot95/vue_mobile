<template>
  <div class="article-list">
    <!-- 文章列表组件 -->
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="2000"
    >
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="文章数据加载失败，点击重试"
      >
        <!-- van-cell——文章列表中的单个单元格，先用它模拟文章列表中的每个文章列表项，之后要把文章列表项单独封装成组件，便于复用 -->
        <!-- <van-cell v-for="item in list" :key="item.art_id" :title="item.title" /> -->
        <article-item
          v-for="item in list"
          :key="item.art_id"
          :article="item"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
// 导入 文章列表项 组件
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    // 父组件向子组件传值，通过 props 属性
    channel_fromHomeIndex: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // 用于存储 文章列表中内容的数据 的数组
      list: [],
      // 用于控制页面是否显示 加载中 的标志位( onload 下拉底部加载方法配置的属性)
      loading: false,
      // 用于控制页面是否显示 加载结束状态 的标志位( onload 下拉底部加载方法配置的属性)
      finished: false,
      // ******重点：timestamp 存储在 data 中，才可以通过 this 点出来，方便根据不同情况赋值
      // 请求获取 下一页数据 时在参数中携带的 时间戳
      timestamp: null,
      // 控制 列表加载失败提示 是否显示 的标志位
      error: false,
      // 控制 下拉顶部刷新的 loading状态 是否显示 的标志位
      // 下拉刷新时，isRefreshLoading 的值会自动变成 true
      isRefreshLoading: false,
      // 下拉刷新成功后的提示文字
      refreshSuccessText: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 初始化或滚动到底部(下拉加载)的时候会触发调用 onLoad 方法
    // 注意：只要 onload 事件被触发了，loading 的值会被自动设置为 true
    async onLoad() {
      // 在 van-list 中加载数据，onload 方法的使用步骤：
      try {
        // 1.请求获取数据
        const res = await getArticles({
          // 频道的id值
          channel_id: this.channel_fromHomeIndex.id,
          // 时间戳，请求最新的文章列表数据就传当前的时间戳，请求历史文章数据则传指定的时间戳
          // *** timestamp 时间戳可以理解为页码
          // ***注意：用于请求之后数据的时间戳会在当前请求的结果中返回给用户
          // ******重点：第一次请求文章列表数据时，时间戳为 null，则会传 Date.now() 来请求最新的文章列表数据
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // console.log(res)
        // console.log(res.data.data.results)
        // 2.把请求到的数据存储到 data 中
        const articleListRes = res.data.data.results
        // ***注意：
        // ***重点：请求到的结果中的 文章列表数据articleListRes 不能直接赋值给 list 数组，否则每次触发 onload 事件，所请求来的数据都会把之前的覆盖了
        // 而且因为 articleListRes 本身和 list 一样也是一个数组，同时 van-list 是滚动加载的，里面的数据是被一个个追加进去的
        this.list.push(...articleListRes)
        // 3.******注意：本次数据加载完成后，要把加载状态设置为 false
        // 只有 loading 关闭以后才能触发下一次的加载更多
        this.loading = false
        // 4.判断数据是否全部加载完成，否则会浪费性能
        if (articleListRes.length) {
          // ******重点：更新获取下一页数据的时间戳
          // 获取下一页数据的时间戳就在本次请求所响应的结果中
          this.timestamp = res.data.data.pre_timestamp
        } else {
          // 如果没有数据了，把 finished 设置为 true，之后不再触发 加载更多
          this.finished = true
        }
        // 测试代码，人为地抛出一个错误
        /* if (Math.random() > 0.5) {
          JSON.parse('sdcdceqeecw')
        } */
      } catch (error) {
        // console.log(error)
        // this.$toast('获取文章列表数据失败，请稍后重试')
        // 展示 错误提示
        this.error = true
      }
    },
    // 下拉刷新时触发 onRefresh 方法
    async onRefresh() {
      // 1. 发送请求获取数据
      try {
        const res = await getArticles({
          channel_id: this.channel_fromHomeIndex.id,
          // 注意：每次下拉刷新时，请求的都是最新的数据，所以传的是当前最新的时间戳
          timestamp: Date.now(),
          with_top: 1
        })
        const NewArticleListRes = res.data.data.results
        this.list.unshift(...NewArticleListRes)
        // 2. 将请求到的数据追加到列表的顶部
        // 3. 关闭下拉刷新的 loading 状态
        this.isRefreshLoading = false
        // 4. 显示下拉刷新成功的提示文字
        this.refreshSuccessText = `刷新成功，更新了${NewArticleListRes.length}条数据`
      } catch (error) {
        this.isRefreshLoading = false
        this.refreshSuccessText = '更新文章列表数据失败，请重试'
      }
    }
  }
}
</script>

<style scoped lang="less">
// ***拓展：如何 在滚动的页面中 找到到底是哪个元素在发生滚动
// 将下列代码粘贴到调试工具中运行一下，滚动页面的时候，真正滚动的元素会被打印出来
/* function findScroller(element) {
  element.onscroll = function() { console.log(element) }
  Array.from(element.children).forEach(findScroller)
}
findScroller(document.body) */
// ******重难点：记住每个频道下文章列表滚动的位置
// 当前页面发生滚动时，真正产生滚动的元素是 Body，我们应该让每个频道内容列表产生自己的滚动容器，在自己的列表范围内滚动，解决办法就是 给文章列表容器 设置一个固定的高度
.article-list {
  // ******重点：CSS-3 中的新单位 —— 视口单位(vm/vh)，计算元素的视口单位时不受其父元素影响
  // 视口：在PC端指的是浏览器的可视区域，而在移动端，它指的是 布局视口(Layout Viewport)
  // vh：相对于视口的高度，而不是父元素的(而CSS百分比是相对于包含它的最近的父元素的高度和宽度)。1vh等于1/100的视口高度。
  // ******重点：CSS-3 中的新函数 —— calc
  // calc() 函数用于动态计算长度值，可以使用 calc() 给元素的 border、margin、pading、font-size和width等属性动态赋值，它支持 "+", "-", "*", "/" 运算
  // height: 79vh;
  height: calc(100vh - 274px);
  overflow-y: auto;
}
</style>
