<template>
  <view class="detail-content">
    <!-- 骨架屏 -->
    <u-skeleton rows="5" :loading="loading" :title="false"/>

    <rich-text :nodes="details.noticeContent" style="font-size: 15px;"></rich-text>
  </view>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      noticeId: null,
      details: {noticeContent:''},
    }
  },
  created() {
    // 接受上个页面传递的参数 并兼容多端
    this.$AppReady.then(() => {
      console.log(this.$Route.query.params.noticeId, '从路由获取参数')
      this.noticeId = this.$Route.query.params.noticeId
      this.$service.get(this.$api.getNotice+this.noticeId).then(res => {
        this.details = res.data
        this.loading = false
      })
    })

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">

.detail-content {
  padding: 24rpx;
}

</style>
