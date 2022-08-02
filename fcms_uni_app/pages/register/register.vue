// An highlighted block
<template>
  <view class="bg-white content">
    <u-navbar id="homeNav" :autoBack="true" title="注册"></u-navbar>

    <view class="form" :style="'padding-top: '+this.$tools.get_TopHeight()+'px'">
      <h1 class="title">欢迎您</h1>
      <u--form ref="regForm" :model="formData" :rules="rules">

        <u-form-item prop="inviteCode">
          <u--input class="input" type="text" v-model="formData.inviteCode" placeholder="请输入邀请码"/>
        </u-form-item>

        <u-form-item prop="username">
          <u--input class="input" type="text" v-model="formData.username" placeholder="请输入用户名"/>
        </u-form-item>

        <u-form-item prop="password">
          <u--input class="input" type="password" v-model="formData.password" placeholder="请输入密码"/>
        </u-form-item>
      </u--form>

      <u-form-item label="" prop="code">
        <u--input class="input" value="" type="number" v-model="formData.code" placeholder="请输入验证码"></u--input>
        <img :src="imgUrl" @click="getCode" class="login-code-img"/>
      </u-form-item>

      <view class="loginBtn nys_theme_bg-gradual" @click="submit">
        <text class="btnValue">注册</text>
      </view>
    </view>
  </view>
</template>


<script>
export default {
  data() {
    return {
      imgUrl: '',
      formData: {
        code: '',
        inviteCode: '6fb62679-fbbb-ac89-1668-ec8aee4d178d',
        userName: '',
        password: '',
      },
      rules: {
        code: {
          type: 'string',
          required: true,
          message: '请输入验证码',
          trigger: ['blur', 'change']
        },
        inviteCode: {
          type: 'string',
          required: true,
          message: '请输入邀请码',
          trigger: ['blur', 'change']
        },
        username: {
          type: 'string',
          required: true,
          message: '请输入用户名',
          trigger: ['blur', 'change']
        },
        password: [
          {
            required: true,
            message: '此为必填字段',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^[0-9a-zA-Z]*$/g,
            transform(value) {
              return String(value)
            },
            message: '只能包含字母或数字'
          },
          {
            min: 6,
            max: 20,
            message: '长度在6-20个字符之间'
          }
        ]
      }
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
    /** 注册 */
    submit() {
      this.$refs.regForm.validate().then(res => {
        this.$service.post(this.$api.register, this.formData).then(res => {
          uni.showToast({
            title: '注册成功',
            icon: 'success'
          })
          setTimeout(function () {
            uni.navigateBack({delta: 1})
          }, 2000)
        })
      }).catch(errors => {

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

.title {
  margin-left: 0rpx;
  margin-top: 40rpx;
  margin-bottom: 40rpx;
  color: #333333;
}

.form {
  padding: 0 80upx;
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

.login-code-img {
  height: 38px;
  margin-left: 10px;
}

.input {
  flex: 1;
  font-size: 14px;
  color: #666;
  border: 1px #e5e5e5 solid;
  border-radius: 50px;
  padding: 10px;
}
</style>
