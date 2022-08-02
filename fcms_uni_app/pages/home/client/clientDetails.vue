<template>
  <view class="bg-white nys_content">
    <u--form
        labelPosition="left"
        :model="form"
        ref="uForm"
    >

      <view class="form-block" style="border-color: #3C9CFF;">

        <u-form-item label="头像" :labelWidth="labelWidth" prop="avatarUrl" >
          <u-avatar :src="form.avatarUrl" @tap="previewImage(form.avatarUrl)" size="120"></u-avatar>
        </u-form-item>

        <view class="face-block" style="border-color: #D7DEEB;">
          <view class="group-header">
            <u--text prefixIcon="" text="面部信息:" align="center" color="#D7DEEB"></u--text>
          </view>

          <u-form-item label="特征码" :labelWidth="labelWidth" prop="faceCode" borderBottom>
            <u--text :text="form.faceCode" prefixIcon="fingerprint" align="right" :lines="1" :size="fontSize"></u--text>
          </u-form-item>

          <u-form-item label="活体检测" :labelWidth="labelWidth" prop="liveness" borderBottom>
            <u--text text="活体" v-if="form.liveness" align="right" :lines="1" :size="fontSize"></u--text>
            <u--text text="非活体" v-if="!form.liveness" align="right" :lines="1" :size="fontSize"></u--text>
          </u-form-item>
        </view>

        <u-form-item label="ID" :labelWidth="labelWidth" prop="clientId" borderBottom>
          <u--text :text="form.clientId" align="right" :lines="1" :size="fontSize"></u--text>
        </u-form-item>



        <u-form-item label="姓名" prop="clientName" borderBottom :labelWidth="labelWidth">
          <u--text :text="form.clientName" align="right" :lines="1" :size="fontSize"></u--text>
        </u-form-item>

        <u-form-item label="拼音" prop="clientPinyin" borderBottom :labelWidth="labelWidth">
          <u--text :text="form.clientPinyin" align="right" :lines="1" :size="fontSize"></u--text>
        </u-form-item>

        <u-form-item label="性别" prop="sex" borderBottom @click="showSex = true; hideKeyboard()" ref="item1">
          <u--text :text="actions[form.sex].name" align="right" :lines="1" :size="fontSize"></u--text>
        </u-form-item>

        <u-form-item label="年龄" prop="age" borderBottom :labelWidth="labelWidth">
          <u--text :text="form.age" align="right" :lines="1" :size="fontSize"></u--text>
        </u-form-item>

        <u-form-item label="邮箱" prop="email" borderBottom :labelWidth="labelWidth">
          <u--text :text="form.email" align="right" :lines="1" :size="fontSize"></u--text>
        </u-form-item>

        <u-form-item label="手机号" prop="phone" borderBottom :labelWidth="labelWidth">
          <u--text :text="form.phone" align="right" :lines="1" :call="true" mode="phone" type="primary" :size="fontSize"></u--text>
        </u-form-item>

        <u-form-item label="备用号码" prop="phoneStandby" borderBottom :labelWidth="labelWidth">
          <u--text :text="form.phoneStandby" align="right" :lines="1" :call="true" mode="phone" type="primary" :size="fontSize"></u--text>
        </u-form-item>

        <u-form-item label="所属项目" prop="projectName" borderBottom :labelWidth="labelWidth">
          <u--text :text="form.projectName" align="right" :lines="1" :size="fontSize"></u--text>
        </u-form-item>

        <u-form-item label="更新者" prop="updateBy" borderBottom :labelWidth="labelWidth">
          <u--text :text="form.updateBy" align="right" :lines="1" :size="fontSize"></u--text>
        </u-form-item>

        <u-form-item label="更新时间" prop="updateTime" borderBottom :labelWidth="labelWidth">
          <u--text :text="form.updateTime" align="right" :lines="1" :size="fontSize"></u--text>
        </u-form-item>

        <u-form-item label="创建者" prop="createBy" borderBottom :labelWidth="labelWidth">
          <u--text :text="form.createBy" align="right" :lines="1" :size="fontSize"></u--text>
        </u-form-item>

        <u-form-item label="创建时间" prop="createTime" borderBottom :labelWidth="labelWidth">
          <u--text :text="form.createTime" align="right" :lines="1" :size="fontSize"></u--text>
        </u-form-item>

        <u-form-item label="备注" prop="remark" borderBottom :labelWidth="labelWidth">
          <uni-easyinput disabled type="textarea" v-model="form.remark" placeholder="请输入备注内容"/>
        </u-form-item>

      </view>

    </u--form>

    <view class="footer-view">
      <u-button type="primary":plain="true"  @click="editDidTaped(form.clientId)">编 辑</u-button>
    </view>

  </view>
</template>

<script>

export default {
  data() {
    return {
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
      // 表单
      form: {
        pageNum: 1,
        pageSize: 10,
        clientId: null,
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
      radio: '',
      switchVal: false
    }
  },
  created() {
    uni.setNavigationBarTitle({
      title: '详情'
    });

    // 接受上个页面传递的参数 并兼容多端
    this.$AppReady.then(() => {
      console.log(this.$Route.query.params.clientId, '从路由获取参数')
      this.clientId = this.$Route.query.params.clientId
      this.$service.get(this.$api.getClient + this.clientId).then(res => {
        this.form = res.data
      })
    })

  },
  methods: {
    /** 编辑 */
    editDidTaped(id) {
      let params = {clientId: id}
      this.$Router.push({path: '/pages/home/client/clientEdit?item', query: {params}})
    },
    /** 图片预览 */
    previewImage(url) {
      this.$tools.lookImage(url)
    }
  },
}
</script>

<style lang="scss" scoped>

.footer-view {
  margin: 20px 0;
}

.group-header {
  margin-bottom: 10px;
  mini-height: 20px;
}

.face-block {
  padding: 10px;
  border: 1.0px dashed #303133;
  border-radius: 7px;
}

.form-block {
  padding: 15px;
  border: 2.0px dashed #303133;
  border-radius: 7px;
}

</style>
