<template>
  <div class="my_container">
    <!-- 页面在登录后所显示的 header 头部 -->
    <div class="header after_login" v-if="user">
      <div class="baseUserInfo">
        <div class="left">
          <!-- <van-image :src="userInfo.photo" round fit="cover" class="avatar" /> -->
          <van-image :src="require('../../assets/avatar.jpg')" round fit="cover" class="avatar" />
          <span class="nickname">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round> 编辑资料 </van-button>
        </div>
      </div>
      <div class="data">
        <div class="data_item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
         <div class="data_item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
         <div class="data_item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
         <div class="data_item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 页面在未登录时所显示的 header 头部 -->
    <div class="header before_login" v-if="!user">
      <!-- 点击后切换到登录页面的按钮 -->
      <div class="login_btn" @click="$router.push('/login')">
        <img class="mobile_img" src="~@/assets/mobile.png">
        <span class="text" @click="logInAndReg">登录/注册</span>
      </div>
    </div>
    <!-- 宫格导航 -->
    <van-grid class="grid-nav mb-9" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 消息通知栏 -->
    <van-cell title="消息通知" is-link icon="chat-o" />
    <van-cell class="mb-9" title="小智同学" is-link icon="contact" />
    <van-cell
      v-if="user"
      class="logout_btn"
      clickable
      title="退出登录"
      @click="logOut"
    />
  </div>
</template>

<script>
// ******重点：
// 因为用户登录后会在 vuex 的 state 中存储一个数据 user
// 所以可以通过判断 vuex 中的 user 是否有值来判断用户是否登录
import { mapState } from 'vuex'
import { getUserInfo } from '../../api/user'
// import { getUserInfo } from '@/api/user.js'

export default {
  name: 'myIndex',
  components: {},
  props: {},
  data () {
    return {
      // 用来存储 当前用户信息 的对象
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    // 根据能否通过 mapState 得到 user 的值，判断用户是否已登录，调用 loadUserInfo 方法加载用户信息
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted () {},
  methods: {
    // 退出登录按钮的点击事件
    logOut() {
      // 弹出提示框询问用户是否确认退出
      // ***注意：在组件中需要使用 this.$dialog 来调用弹框组件
      this.$dialog.confirm({
        title: '是否确认退出？'
      }).then(() => {
        // 确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
        this.$store.commit('setUser', null)
        // removeItem('toutiao_user')
        // 自动刷新页面
        // location.reload()
        this.$toast('您已退出登录')
      }).catch(() => {
        this.$toast('您已取消退出')
      })
    },
    // 登录/注册 按钮的点击事件
    logInAndReg() {
      this.$router.push('/login')
    },
    // 加载当前已登录用户的信息
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo()
        // console.log(data)
        this.userInfo = data.data
      } catch (error) {
        this.$toast('获取用户信息失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.my_container {
  .header {
    height: 361px;
    background: url(~@/assets/banner.png);
    background-size: cover;
  }

  .before_login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login_btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile_img {
        width: 132px;
        height: 132px;
        margin-bottom: 16px;
      }
      span.text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .after_login {
    .baseUserInfo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 5px solid #fff;
        }
        .nickname {
          color: #fff;
          font-size: 30px;
        }
      }
    }
    .data {
      display: flex;
      height: 130px;
      .data_item {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100%;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }

  // 宫格导航样式
  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
        color: #000;
        margin-top: 8px;
      }
    }
  }

  .logout_btn {
    text-align: center;
    color: #d86262;
  }

  // 底部外边距 9px
  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
