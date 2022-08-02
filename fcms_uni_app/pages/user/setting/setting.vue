<template>
	<view>
		<view class="bg-white">
			<u-cell-group>
        <u-cell title="网络检查" @click="$Router.push({ name: 'network' })" isLink></u-cell>
        <u-cell title="修改登录密码" @click="$Router.push({ name: 'resetPassword' })" isLink></u-cell>
        <!--				<u-cell title="忘记登录密码" @click="$Router.push({ name: 'authentication' })" isLink></u-cell>-->
			</u-cell-group>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
  methods: {

  }
};
</script>

<style lang="scss" scoped>

.u-cell__body {
	height: 88rpx;
}

</style>
