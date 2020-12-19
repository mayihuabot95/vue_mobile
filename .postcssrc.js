// 配置要使用的 PostCSS 插件
module.exports = {
  plugins: {
    // 配置使用 autoprefixer 插件
    // 作用：生成浏览器 CSS 样式规则前缀
    // autoprefixer 插件的配置
    /* 'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    }, */
    // 问题：VueCLI 内部已经配置了 autoprefixer 插件
    // 所以又配置了一次，所以产生冲突了
    'postcss-pxtorem': {
      // rootValue 表示根元素 html 的 fontSize 值
      rootValue: ({ file }) => {
        // ******注意：vantUI 的根字体默认大小是37.5px，和我们默认设置的75px不一样，所以当设计图原稿是750的时候，组件就会看起来是原来一半的大小
        // 解决办法：分别过滤出 以 vant 开头的样式 和 非 vant 开头的样式，给它们设置不同的根字体大小
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // propList 设置 px 转换成 rem 的属性值，* 表示所有属性的 px 都转换为 rem
      propList: ['*']
    }
  }
}
