<script>
export default {
	onLaunch: function() {
		// #ifdef MP-WEIXIN
		//微信小程序线上版本更新
		const updateManager = uni.getUpdateManager();
		updateManager.onCheckForUpdate(function(res) {
			// 请求完新版本信息的回调
		});
		updateManager.onUpdateReady(function(res) {
			uni.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				success(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate();
					}
				}
			});
		});
		// #endif
	},
	onShow: function() {},
	onHide: function() {}
};
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-ui/index.scss';
@import 'common/custom.scss';
@import 'common/common.scss';
// #ifndef APP-PLUS-NVUE
@import 'colorui/main.css';
@import 'colorui/icon.css';
// #endif
/*每个页面公共css */
/*page {
  background: transparent;
}*/
</style>
