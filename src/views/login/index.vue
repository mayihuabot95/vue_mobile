<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <!-- 导航栏左侧的返回图标，用于返回上一页 -->
      <van-icon
        slot="left"
        name="arrow-left"
        color="#fff"
        @click="$router.back()"
      />
    </van-nav-bar>
    <!-- 登录表单 -->
    <!--
      表单验证：
        1、给 van-field 组件配置 rules 验证规则
        2、当表单提交的时候会自动触发表单验证
           如果验证通过，会触发 submit 事件
           如果验证失败，不会触发 submit
     -->
    <van-form ref="loginFormRef" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号码"
        :rules="loginFormRules.mobile"
        type="number"
        maxlength="11"
      >
      <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="loginFormRules.code"
        maxlength="6"
      >
      <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
      <template #button>
        <van-count-down
          v-if="isCountDownShow"
          :time="1000 * 60"
          format="ss 秒后重新发送"
          @finish="isCountDownShow = false"
        />
        <!-- time 属性值是倒计时的时长 -->
        <!-- ***注意：在表单中，除了提交按钮外，可能还有一些其他的功能性按钮，如发送验证码按钮。在使用时，
        要注意将native-type设置为button，否则会触发表单提交 -->
        <van-button
          v-else
          class="send-sms-btn"
          round size="small"
          type="default"
          native-type="button"
          @click="sendSms"
        >发送验证码</van-button>
      </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button
          class="login-btn"
          block type="info"
          native-type="submit"
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 按需导入 用户相关 请求模块 的方法
import { login, sendSms } from '../../api/user.js'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      // 登录表单中的用户信息对象
      user: {
        mobile: '',
        code: ''
      },
      // 登录表单的验证规则对象
      loginFormRules: {
        mobile: [
          {
            required: true, message: '提示：手机号码不能为空！'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '提示：手机号格式错误！'
          }
        ],
        code: [
          {
            required: true, message: '提示：验证码不能为空！'
          },
          {
            pattern: /^\d{6}$/,
            message: '提示：请输入合法的验证码！'
          }
        ]
      },
      // 控制 倒计时 是否显示的标志位
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 表单提交事件
    async onSubmit(values) {
      // console.log('表单提交事件：', values)
      // 1. 获取表单数据
      const user = this.user
      // 2. 表单验证，通过在 data 中定义验证规则进行
      // 加载 验证表单的 提示
      // 注意：在组件中必须通过 this.$toast 方法来调用 toast 组件
      this.$toast.loading({
        message: '登录中...',
        // 在 加载提示 显示的过程中，禁止用户点击背景内容
        forbidClick: true,
        // 持续时间，默认是 2000 毫秒，如果值为 0，则持续展示，直到下一个 toast 把它顶掉为止
        duration: 0
      })
      // 3. 提交表单，请求登录
      // ******重点：try-catch 代码块在js中可以捕获任何异常
      // ***注意：但是 try-catch 只能捕获主线程中，同步任务中的异常，异步的捕获不到
      try {
        // 登录成功，返回的对象中包含成功的状态码，同时对象的 data 属性里 还有一个 data 属性，里面有 token
        // const res = await login(user)
        // console.log('登录成功', res)
        const { data } = await login(user)
        // data.data 中包括身份令牌 token 和 刷新令牌 refresh_token，都要存储起来
        this.$toast.success('登录成功！')
        // 登录成功后，跳转到 我的 页面
        this.$router.push('/my')
        // 登录成功后，将 data.data 存入 Vuex 中
        this.$store.commit('setUser', data.data)
      } catch (err) {
        // 登录失败，err 值包含失败的状态码
        // 失败的状态码
        // console.log(err.response.status)
        if (err.response.status === 400) {
          // console.log('手机号码或验证码有误，请重新输入！', err)
          this.$toast.fail('手机号码或验证码有误，请重新输入！')
        } else {
          // 未知的错误
          // console.log('登录失败，请稍后重试！', err)
          this.$toast.fail('登录失败，请稍后重试！！')
        }
      }
      // 4. 根据请求相应的结果处理后续的操作
    },
    // 登录按钮的点击事件，即发送短信的事件
    async sendSms() {
      // 1.表单预校验，校验手机号
      try {
        await this.$refs.loginFormRef.validate('mobile')
        console.log('手机号验证成功')
      } catch (error) {
        return console.log('手机号验证失败', error)
      }
      // 2.发送 发验证码 的请求
      try {
        // const res = await sendSms(this.user.mobile)
        // console.log('验证码已发送！', res)
        await sendSms(this.user.mobile)
        this.$toast('验证码发送成功！')
      } catch (err) {
        if (err.response.status === 429) {
          return this.$toast('验证码发送过于频繁！')
        } else {
          return this.$toast('验证码发送失败，请稍后再试！')
        }
      }
      // 3.手机号验证成功，并且验证码发送成功后，开启倒计时
      this.isCountDownShow = true
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 185px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
