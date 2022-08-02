<template>
  <view class="bg-white content">
    <u-navbar id="homeNav" :autoBack="true" title="登录"></u-navbar>

    <view class="avatorWrapper" :style="'margin-top: '+this.$tools.get_TopHeight()+'px'">
      <view class="avator">
        <image class="img" src="@/static/logo/welcome.png" mode="widthFix"></image>
      </view>
    </view>
    <view class="form">
      <u--form ref="uform" :model="formData" :rules="rules">

        <u-form-item label="" prop="username">
          <u--input class="input" type="text" value="" v-model="formData.username" placeholder="请输入账号"></u--input>
        </u-form-item>

        <u-form-item label="" prop="password">
          <u--input class="input" type="password" value="" v-model="formData.password" placeholder="请输入密码"></u--input>
        </u-form-item>

        <u-form-item label="" prop="code">
          <u--input class="input" value="" type="number" v-model="formData.code" placeholder="请输入验证码"></u--input>
          <img :src="imgUrl" @click="getCode" class="login-code-img"/>
        </u-form-item>

      </u--form>

      <view class="loginBtn nys_theme_bg-gradual shadow" @tap="submit">
        <text class="btnValue">登录</text>
      </view>
    </view>

    <view class="forgotBtn">
      <navigator url="../register/register">
        <text>- 注册 -</text>
      </navigator>
    </view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: '',
      formData: {
        username: '',
        password: '',
        code: '',
        uuid: null
      },
      rules: {
        username: [
          {
            type: 'string',
            required: true,
            message: '请输入账号',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            type: 'string',
            min: 6,
            max: 15,
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: ['blur', 'change']
          }
        ]
      },
    }
  },
  onLoad() {
    this.getCode()
  },
  methods: {
    getCode() {
      this.$service.get(this.$api.getCodeImg).then(res => {
        this.formData.uuid = res.uuid
        this.imgUrl = "data:image/gif;base64," + res.img
      }).catch(error => {

      })
    },
    submit() {
      this.$refs.uform.validate().then(res => {
        this.$service.post(this.$api.login, this.formData).then(res => {
          // 缓存+跳转处理
          this.$store.dispatch("user/Login", res)

        }).catch(error => {
          // this.getCode()
        })
      }).catch(err => {
        uni.$u.toast('校验失败')
      })
    }

  }
}
</script>

<style lang="scss" scoped>

.content {
  width: 100vw;
  height: 100vh;
}

.avatorWrapper {
  height: 30vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.avator {
  width: 400upx;
  height: 400upx;
  overflow: hidden;
}

.avator .img {
  width: 100%
}

.form {
  padding: 0 80upx;
  margin-top: 10px;
}

.input {
  flex: 1;
  font-size: 14px;
  color: #666;
  border: 1px #e5e5e5 solid;
  border-radius: 50px;
  padding: 10px;
}

.login-code-img {
  height: 38px;
  margin-left: 10px;
}

.loginBtn {
  width: 100%;
  height: 80upx;
  border-radius: 50px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginBtn .btnValue {
  color: white;
}

.forgotBtn {
  text-align: center;
  color: #8d8d8d;
  font-size: 15px;
  margin-top: 20px;
}
</style>
