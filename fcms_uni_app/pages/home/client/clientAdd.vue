<template>
  <view class="bg-white nys_content">
    <u--form
        labelPosition="left"
        :model="form"
        :rules="rules"
        ref="uForm"
    >

      <view class="form-block" style="border-color: #67C23A;">

        <u-form-item label="头像" :labelWidth="labelWidth" prop="id" borderBottom>
          <u-upload
              :fileList="fileListFace"
              @afterRead="afterRead"
              @delete="deletePic"
              name="Face"
              accept="image"
              multiple
              :maxCount="1"
          >
            <image src="@/static/logo/profile_photo.png" mode="widthFix" style="width: 120px; height: 120px; border-radius: 50%;"></image>
          </u-upload>
        </u-form-item>

        <!-- 人脸检测结果 -->
        <view v-if="faceErrorMsg.length > 0">
          <u-alert :title="faceErrorMsg" type="error" show-icon></u-alert>
        </view>

        <u-form-item label="特征码" :labelWidth="labelWidth" prop="faceCode" borderBottom>
          <u--text :text="form.faceCode" prefixIcon="fingerprint" align="right" :lines="1" :size="fontSize"></u--text>
        </u-form-item>

        <u-form-item label="姓名" prop="clientName" borderBottom :labelWidth="labelWidth">
          <u--input type="text" v-model="form.clientName" inputAlign="right" placeholder="请输入姓名"></u--input>
        </u-form-item>

        <u-form-item label="性别" prop="sex" borderBottom @click="showSex = true; hideKeyboard()" ref="item1">
          <u--input v-model="actions[form.sex].name" inputAlign="right" disabled disabledColor="#ffffff" placeholder="请选择性别" border="none"></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>

        <u-form-item label="年龄" prop="age" borderBottom :labelWidth="labelWidth">
          <u--input type="number" v-model="form.age" inputAlign="right" placeholder="请输入年龄"></u--input>
        </u-form-item>

        <u-form-item label="邮箱" prop="email" borderBottom :labelWidth="labelWidth">
          <u--input type="text" v-model="form.email" inputAlign="right" placeholder="请输入邮箱"></u--input>
        </u-form-item>

        <u-form-item label="手机号" prop="phone" borderBottom :labelWidth="labelWidth">
          <u--input type="number" v-model="form.phone" inputAlign="right" placeholder="请输入手机号"></u--input>
        </u-form-item>

        <u-form-item label="备用号码" prop="phoneStandby" borderBottom :labelWidth="labelWidth">
          <u--input type="number" v-model="form.phoneStandby" inputAlign="right" placeholder="请输入备用号码"></u--input>
        </u-form-item>

        <u-form-item label="所属项目" prop="projectName" borderBottom :labelWidth="labelWidth">
          <u--input type="text" v-model="form.projectName" inputAlign="right" placeholder="请输入项目名"></u--input>
        </u-form-item>

        <u-form-item label="备注" prop="remark" borderBottom :labelWidth="labelWidth">
<!--          <u&#45;&#45;textarea height="120" v-model="form.remark" placeholder="请输入备注内容" :count="false"/>-->
          <uni-easyinput type="textarea" align="right" v-model="form.remark" placeholder="请输入备注内容"/>
        </u-form-item>

      </view>

    </u--form>

    <u-action-sheet :show="showSex" :actions="actions" title="请选择性别" description="上传头像后会自动给出估计年龄" @close="showSex = false" @select="sexSelect">
    </u-action-sheet>

    <view class="footer-view">
      <u-button :plain="true" type="success" @click="submit">提 交</u-button>
    </view>

  </view>
</template>

<script>

export default {
  data() {
    return {
      faceErrorMsg: '',
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
        pageNum: 1,
        pageSize: 10,
        userId: null,
        fileId: null,
        clientName: '',
        clientPinyin: null,
        remarkName: null,
        projectName: null,
        email: null,
        phone: null,
        phoneStandby: null,
        faceCode: null,
        liveness: null,
        age: null,
        sex: 2,
        avatar: null,
        avatarUrl: null,
        avatarBase: null,
        remark: null
      },
      fontSize: 15,
      labelWidth: 90,
      clientId: null,
      rules: {
        clientName: {
          type: 'string',
          required: true,
          message: '请输入客户姓名',
          trigger: ['blur', 'change']
        },
        phone: [
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
    uni.setNavigationBarTitle({
      title: '添加'
    });
  },
  methods: {
    // 删除图片
    deletePic(event) {
      this.clearForm()
      this[`fileList${event.name}`].splice(event.index, 1)
    },
    // 清除表单
    clearForm() {
      this.form.faceCode = null
      this.form.liveness = null
      this.form.age = null
      this.form.sex = 2
      this.form.avatar = null
      this.form.avatarUrl = null
      this.faceErrorMsg = ''
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
          url: this.$api.BaseURL + this.$api.featureFaces,
          filePath: url,
          name: 'files',
          header: {
            Authorization: "Bearer " + token,
          },
          success: (res) => {
            const obj = JSON.parse(res.data)
            if (obj.code == 200) {
              let face = obj.faceList[0]
              this.form.faceCode = face.faceCode
              this.form.liveness = face.liveness
              this.form.age = face.age
              this.form.sex = face.sex
              let file = obj.fileList[0]
              this.form.avatar = file.uri
              this.form.avatarUrl = file.url
              this.form.userId = file.userId
              this.form.fileId = file.fileId
              this.faceErrorMsg = ''
            } else {
              this.clearForm()
              this.faceErrorMsg = obj.msg
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
        this.$service.post(this.$api.addClient, this.form).then(res => {
          uni.showToast({
            title: '添加成功',
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
