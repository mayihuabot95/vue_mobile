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
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
