<template>
	<!-- 个人信息 -->
	<view>
		<view class="cu-list menu shadow-lg sm-border">
<!--			<view class="cu-item arrow minheight" hover-class="contentHover" hover-stay-time="50">
        <view class="content">
          <text class="text-black icon-title">二维码:</text>
        </view>
				<u-avatar icon="grid" fontSize="30" @tap="this.$tools.lookImage(userInfo.user.avatar)" :src="userInfo.user.avatar"></u-avatar>
			</view>-->

			<view
				class="cu-item"
				hover-class="contentHover"
				hover-stay-time="50"
			>
				<view class="content"><text class="text-black icon-title">IUD:</text></view>
				<view class="action">
					<text class="text-grey text-sm">{{ userInfo.user.inviteUserId || '' }}</text>
				</view>
			</view>

      <view
          class="cu-item arrow"
          hover-class="contentHover"
          hover-stay-time="50"
          @tap="copyInviteCode"
      >
        <view class="content"><text class="text-black icon-title">邀请码:</text></view>
        <view class="action">
          <text class="text-blue text-sm">{{ userInfo.user.inviteCode || '' }}</text>
        </view>
      </view>

      <view
          class="cu-item"
          hover-class="contentHover"
          hover-stay-time="50"
      >
        <view class="content"><text class="text-black icon-title">VIP状态:</text></view>
        <view class="action">
          <text class="text-orange text-sm" v-if="userInfo.user.vipFlag == 1">有效</text>
          <text class="text-red text-sm" v-if="userInfo.user.vipFlag == 0">失效</text>
        </view>
      </view>

      <view
          class="cu-item"
          hover-class="contentHover"
          hover-stay-time="50"
      >
        <view class="content"><text class="text-black icon-title">VIP过期时间:</text></view>
        <view class="action">
          <text class="text-red text-sm">{{ userInfo.user.vipExpiresTime || '----:--:--' }}</text>
        </view>
      </view>

      <view
          class="cu-item"
          hover-class="contentHover"
          hover-stay-time="50"
      >
        <view class="content nav"><text class="text-black icon-title">客户数量限制:</text></view>
        <view class="action text-cut">
          <text class="text-red text-sm">{{ userInfo.user.toplimit || '' }}</text>
        </view>
      </view>

		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
      userInfo: null
		}
	},
	onLoad() {
    this.userInfo = this.$store.getters['user/userInfo']
  },
	methods: {
		hideKeyboard() {
			uni.hideKeyboard();
		},
    copyInviteCode() {
		  this.$tools.copyVlaue(this.userInfo.user.inviteCode)
    }
	}
};
</script>

<style lang="scss" scoped>

.minheight {
	min-height: 130rpx !important;
}

.cu-list .cu-item {
	transition: all 0.1s ease-in-out 0s;
	transform: translateX(0rpx);
}

.cu-list.menu > .cu-item.arrow {
	padding-right: 70rpx;
}

</style>
