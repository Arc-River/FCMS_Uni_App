<template>
  <view class="nys_content bg-white">
    <u-grid
        :col="3"
        :border="true"
        @click="click"
    >
      <u-grid-item
          v-for="(item, index) in statisticArr"
          :key="index"
      >
        <u-icon
            :customStyle="{paddingTop:20+'rpx'}"
            :name="item.name"
            :size="22"
        ></u-icon>
        <text class="grid-text">{{ item.title }}:{{ item.value }}</text>
      </u-grid-item>
    </u-grid>
    <u-toast ref="uToast" />
  </view>
</template>

<script>

export default {
  data() {
    return {
      statisticArr: []
    }
  },
  created() {
    this.$service.get(this.$api.getStatisticData).then(res => {
      this.statisticArr = [
        {
          name: 'star',
          title: '客户统计',
          value: res.clientCount || 0
        },
        {
          name: 'star',
          title: '查找统计',
          value: res.recognitionLogCount || 0
        },
        {
          name: 'star',
          title: '邀请统计',
          value: res.inviteCount || 0
        }
      ]
    });
  },
  methods: {
    click(name) {
      this.$refs.uToast.success(`点击了第${name}个`)
    }
  }
}
</script>

<style lang="scss">
.grid-text {
  font-size: 14px;
  color: #909399;
  padding: 10rpx 0 20rpx 0rpx;
  /* #ifndef APP-PLUS */
  box-sizing: border-box;
  /* #endif */
}
</style>
