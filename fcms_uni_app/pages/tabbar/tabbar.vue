<template>
	<view>
<!--    <u-alert title="更新提醒"  type = "warning" closable="true" :description="xx"></u-alert>-->

		<index v-show="PageCur == 'index'"></index>
		<user v-show="PageCur == 'user'"></user>
		<!-- 用字体图标呈现 -->
		 <view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="index">
				<view class="" :class="PageCur == 'index' ? 'cuIcon-homefill text-blue' : 'cuIcon-home text-black'"></view>
				<view :class="PageCur == 'index' ? 'text-blue' : 'text-black'">{{ $t('tabbar.index') }}</view>
			</view>
			<view class="action" @click="NavChange" data-cur="user">
				<view class="" :class="PageCur == 'user' ? 'cuIcon-myfill text-blue' : 'cuIcon-my text-black'"></view>
				<view :class="PageCur == 'user' ? 'text-blue' : 'text-black'">{{ $t('tabbar.user') }}</view>
			</view>
		</view>
		<!-- 用图片icon呈现 -->
<!--    <view class="cu-bar tabbar bg-white shadow foot">
      <view class="action" @click="NavChange" data-cur="index">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/home' + [PageCur == 'index' ? '-active' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'index' ? 'text-blue' : 'text-gray'">{{ $t('tabbar.index') }}</view>
			</view>
			<view class="action" @click="NavChange" data-cur="user">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/center' + [PageCur == 'user' ? '-active' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'user' ? 'text-blue' : 'text-gray'">{{ $t('tabbar.user') }}</view>
			</view>
		</view>-->
  </view>
</template>

<script>
export default {
	data() {
		return {
      updateInfo: {},
			PageCur: 'index'
		}
	},
  created() {
	  // 检查更新
    this.$service.get(this.$api.checkUpdate + 'android').then(res => {
      this.updateInfo = res.data
    })
  },
  onLoad(options) {
		console.log('options=', options);
		console.log('this.$Route.query=', this.$Route.query);
		this.PageCur = options.query || 'index';
	},
	methods: {
		NavChange: function(e) {
			console.log('NavChange==', e);
			this.PageCur = e.currentTarget.dataset.cur;
		}
	}
};
</script>

<style></style>
