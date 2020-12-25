<template>
  <!-- 文章列表项组件(公共组件) -->
  <van-cell
    class="article-item"
  >
  <!-- 第一部分：文章标题 -->
  <!-- cell单元格中的 title 插槽，用于自定义标题 -->
  <!-- 注意：class="van-multi-ellipsis--l2" 是 VantUI 中的内置样式，用于控制文字最多显示两行 -->
  <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
  <!-- 第二部分：文章下方的 作者名，评论数，发布日期 -->
  <!-- cell单元格中的 label 插槽，用于自定义单元格下方所显示的内容 -->
  <div slot="label">
    <!-- 第三部分：文章封面图片有三张时 -->
    <div v-if="article.cover.type === 3" class="cover-container">
      <div
        :key="item.art_id"
        v-for="item in article.cover.images"
        class="cover-item"
      >
        <van-image
          :src="item"
          fit="cover"
          class="cover-item-img"
        />
      </div>
    </div>
    <div class="label-info-container">
      <span>发布者 {{ article.aut_name }}</span>
      <span>{{ article.comm_count }} 评论</span>
      <span>{{ article.pubdate | relativeTime }}</span>
    </div>
  </div>
  <!-- 第三部分：文章封面图片有一张时 -->
  <!-- cell单元格中的 default 插槽，用于自定义单元格右侧所显示的内容 -->
  <van-image
    v-if="article.cover.type === 1"
    slot="default"
    :src="article.cover.images[0]"
    class="right-cover"
    fit="cover"
  />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
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
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    // 去除在右侧所显示的图片的 flex 值，让它的大小适应 左侧标题 的长度而变化
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info-container span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-container {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      // & 符号代表选择的是 .cover-item 它自己的元素，不加 & 符号代表选择的是它里面的子元素
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
