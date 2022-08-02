<template>
  <view class="bg-white nys_full_content">
    <u--form
        labelPosition="left"
        :model="form"
        :rules="rules"
        ref="uForm"
    >

      <u-form-item label="头像" :labelWidth="labelWidth" prop="id" >
        <u-upload
            :fileList="fileListFace"
            @afterRead="afterRead"
            @delete="deletePic"
            name="Face"
            accept="image"
            multiple
            :maxCount="1"
        >
          <u-avatar :src="icon" mode="aspectFill" default-url="/static/logo/profile_photo.png" size="90" shape="circle"></u-avatar>
        </u-upload>
      </u-form-item>

      <u-form-item label="ID" :labelWidth="labelWidth" prop="userId" >
        <u--text :text="form.userId || '-'" align="right" :lines="1" :size="fontSize"></u--text>
      </u-form-item>

      <u-form-item label="部门" prop="deptName" :labelWidth="labelWidth">
        <u--text :text="form.dept.deptName || '未知'" align="right" :lines="1" :size="fontSize"></u--text>
      </u-form-item>

      <u-form-item label="用户" :labelWidth="labelWidth" prop="userName" >
        <u--text :text="form.userName" align="right" :lines="1" :size="fontSize"></u--text>
      </u-form-item>

      <u-form-item label="昵称" prop="nickName" :labelWidth="labelWidth" >
        <u--input type="text" v-model="form.nickName " inputAlign="right" clearable placeholder="请输入昵称" border="bottom"></u--input>
      </u-form-item>

      <u-form-item label="性别" prop="sex" @click="showSex = true; hideKeyboard()" ref="item1" :labelWidth="labelWidth" >
        <u--input v-model="actions[form.sex].name" inputAlign="right" disabled disabledColor="#ffffff"
                  placeholder="请选择性别" border="bottom"></u--input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>

      <u-form-item label="邮箱" prop="email" :labelWidth="labelWidth" >
        <u--input type="text" v-model="form.email" inputAlign="right" clearable placeholder="请输入邮箱" border="bottom"></u--input>
      </u-form-item>

      <u-form-item label="手机号" prop="phonenumber" :labelWidth="labelWidth" >
        <u--input type="number" v-model="form.phonenumber" inputAlign="right" clearable placeholder="请输入手机号" border="bottom"></u--input>
      </u-form-item>

      <u-form-item label="相似度" prop="minSimilar" :labelWidth="labelWidth" >
        <u--input type="digit" v-model="form.minSimilar" inputAlign="right" clearable placeholder="请输入相似度" border="bottom"></u--input>
      </u-form-item>

      <u-form-item label="备注" prop="remark" :labelWidth="labelWidth" >
        <uni-easyinput type="textarea" align="right" v-model="form.remark" placeholder="请输入备注内容" :clearable="false" border="bottom"/>
      </u-form-item>

    </u--form>

    <u-action-sheet :show="showSex" :actions="actions" title="请选择性别" description="上传头像后会自动给出估计年龄" @close="showSex = false" @select="sexSelect">
    </u-action-sheet>

    <view class="footer-view">
      <u-button :plain="false" type="primary" shape="circle" @click="submit">更 新</u-button>
    </view>

  </view>
</template>

<script>

export default {
  data() {
    return {
      icon: null,
      showSex: false,
      actions: [{
        name: '男',
        value: 0
      },
        {
          name: '女',
          value: 1
        },
        {
          name: '未知',
          value: 2
        },
      ],
      // 头像文件
      fileListFace: [],
      // 表单
      form: {
        avatar: null,
        dept: {
          deptName: ''
        },
        userId: null,
        userName: null,
        sex: 2,
        nickName: '',
        phonenumber:'',
        minSimilar: 1
      },
      fontSize: 15,
      labelWidth: 90,
      rules: {
        nickName: {
          type: 'string',
          required: true,
          message: '请输入客户姓名',
          trigger: ['blur', 'change']
        },
        phonenumber: [
          {
            required: true,
            message: '请输入手机号',
            trigger: ['change','blur'],
          },
          {
            validator: (rule, value, callback) => {
              return uni.$u.test.mobile(value);
            },
            message: '手机号码不正确',
            // 触发器可以同时用blur和change
            trigger: ['change', 'blur'],
          }
        ]
      },
      radio: '',
      switchVal: false
    }
  },
  created() {
    this.icon = uni.getStorageSync('nys_userinfo').user.avatar
    this.$service.get(this.$api.getInfo).then(res => {
      this.form = res.user
    })
  },
  methods: {
    // 删除图片
    deletePic(event) {
      this.clearForm()
      this[`fileList${event.name}`].splice(event.index, 1)
    },
    // 清除表单
    clearForm() {
      this.avatar = ''
    },
    // 新增图片
    async afterRead(event) {
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file)
      let fileListLen = this[`fileList${event.name}`].length
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })
      for (let i = 0; i < lists.length; i++) {
        let result = await this.uploadFilePromise(lists[i].url)
        let item = this[`fileList${event.name}`][fileListLen]
        if (result.code == 200) {
          this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
            status: 'success',
            message: '',
            url: result.url
          }))
          fileListLen++
        } else {
          this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
            status: 'failed',
            message: '',
            url: null
          }))
        }
      }
    },
    /** 上传人脸 */
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let token = this.$store.getters['user/get_Token']
        uni.uploadFile({
          url: this.$api.BaseURL + this.$api.uploadFile,
          filePath: url,
          name: 'file',
          header: {
            Authorization: "Bearer " + token,
          },
          success: (res) => {
            const obj = JSON.parse(res.data)
            console.log(obj)
            if (obj.code == 200) {
              this.form.avatar = obj.fileName
            } else {
              this.clearForm()
            }
            resolve(obj)
          }
        });
      })
    },
    /** 退出编辑 */
    hideKeyboard() {
      uni.hideKeyboard();
    },
    /** 性别选择 */
    sexSelect(e) {
      this.form.sex = e.value
    },
    /** 提交 */
    submit() {
      this.$refs.uForm.validate().then(res => {
        this.$service.put(this.$api.updateInfo, this.form).then(res => {
          uni.showToast({
            title: '修改成功',
            icon: 'success'
          })
          // 刷新缓存
          this.$service.get(this.$api.getInfo).then(res => {
            this.$store.dispatch("user/UserInfo", res)
            setTimeout(function () {
              uni.navigateBack({ delta: 1 })
            }, 1000)
          })
        })
      }).catch(errors => {
        uni.$u.toast(errors[0].message)
      })
    }

  },
}
</script>

<style lang="scss" scoped>

.footer-view {
  margin: 20px 0;
}

.btn-f {

}

.form-block {
  padding: 15px;
  border: 2.0px dashed #303133;
  border-radius: 7px;
}

</style>
