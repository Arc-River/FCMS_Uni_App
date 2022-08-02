<template>
  <view class="bg-white content">

    <view class="form" :style="'padding-top: '+this.$tools.get_TopHeight()+'px'">

      <u--form :model="form" :rules="rules" ref="pwdForm" labelWidth="70">

        <u-form-item prop="oldPassword" label="旧密码">
          <u--input class="input" type="password" v-model="form.oldPassword" placeholder="请输入旧密码"/>
        </u-form-item>

        <u-form-item prop="newPassword" label="新密码">
          <u--input class="input" type="password" v-model="form.newPassword" placeholder="请输入新密码"/>
        </u-form-item>

        <u-form-item prop="confirmPassword" label="新密码">
          <u--input class="input" type="password" v-model="form.confirmPassword" placeholder="请再次输入新密码"/>
        </u-form-item>
      </u--form>

      <view class="loginBtn nys_theme_bg-gradual" @click="submit">
        <text class="btnValue">确认修改</text>
      </view>
    </view>
  </view>
</template>


<script>
import Qs from 'qs'
export default {
  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: {
          required: true,
          type: 'string',
          message: '请输入旧密码',
          trigger: ['blur', 'change']
        },
        newPassword: [
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
        ],
        confirmPassword: {
          required: true,
          type: 'string',
          message: '请再次输入新密码',
          trigger: ['blur', 'change']
        }
      }
    }
  },
  onLoad() {

  },
  methods: {
    submit() {
      if (this.form.newPassword != this.form.confirmPassword) {
        uni.showToast({
          title: '两次输入的新密码不一致',
          icon: 'error'
        })
        return
      }

      this.$refs.pwdForm.validate().then(res => {
        const oldPassword = this.form.oldPassword
        const newPassword = this.form.newPassword
        let params = { oldPassword, newPassword }
        let stringify = Qs.stringify(this.form);
        console.log(stringify)
        this.$service.put(this.$api.updatePwd+"?"+stringify ).then(res => {
          uni.showToast({
            title: '修改成功',
            icon: 'success'
          })
          setTimeout(function () {
            uni.navigateBack({ delta: 1 })
          }, 1000)
        })
      }).catch(errors => {
        uni.$u.toast(errors[0].message)
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

.input {
  flex: 1;
  font-size: 14px;
  color: #666;
  border: 1px #e5e5e5 solid;
  border-radius: 50px;
  padding: 10px;
}
</style>
