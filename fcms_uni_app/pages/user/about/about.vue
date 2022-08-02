<template>
	<view>
		<view class="content" style="min-height:calc(72vh - 0upx)">
			<view class="enl-logo-box"><image class="enl-logo" src="/static/app_icon/app_logo.svg" /></view>
			<view class="flex flex-column">
				<text class="title">人脸客户宝</text>
				<text class="tip">当前版本：{{ version }}{{ versionTypeName }}</text>
			</view>
			<view class="minorContent"><button class="enl-login-btn" type="primary" @tap="getAppInfo(1)">检查更新</button></view>
		</view>
		<view class="footer-box">
			<view class="footer-blue">
        <uni-link class="flex" :href="agreement.service" text="服务条款" color="#0f58ff"></uni-link>
				<view class="linecenter">|</view>
        <uni-link class="flex" :href="agreement.privacy" text="服务条款" color="#0f58ff"></uni-link>
			</view>
			<view class="footer">{{ copyrightInfor() }}</view>
		</view>
	</view>
</template>

<script>
import { checkUpdate } from "@/uni_modules/yzhua006-update/js/app-update-check.js";
export default {
	data() {
		return {
			version: '1.0.0',
			isDone: false,
			versionTypeName: '(正式版)', //版本类型
			companyName: 'NYS Studio All Rights Reserved',
      agreement: {
			  privacy: this.$api.AdminWeb + '/agreement/privacyPolicy',
			  service: this.$api.AdminWeb + '/agreement/userService',
      }
		};
	},
	onLoad() {
    plus.runtime.getProperty(plus.runtime.appid, async (inf) => {
      this.version = inf.version
    })

  },
	mounted() {

	},
	methods: {
		copyrightInfor() {
			var d = new Date();
			let curryYaer = d.getFullYear();
			return `©${curryYaer} ${this.companyName}`;
		},
    /** 获取线上APP版本信息 */
    getAppInfo(type) {
      const system_info = uni.getSystemInfoSync();
      let params = {
        os: system_info.platform
      }
      // 如果不是安卓或ios 返回false
      if (params.os != 'ios' && params.os != 'android') false;

      // 请求获取最新版本
      // this.$service.get(this.$api.checkUpdate + params.os).then(res => {
      this.$service.get(this.$api.checkUpdate + 'android').then(res => {
        console.log(res)
        let update_info = res.data
        checkUpdate(update_info, type).then(res => {
          if (res.msg) {
            plus.nativeUI.toast(res.msg);
          }
        });
      }).catch(error => {

      })
    }
	}
};
</script>

<style lang="scss" scoped>

.content {
	text-align: center;
}

.flex-column {
	display: flex;
	flex-direction: column;
}

.minorContent {
	padding: 0 50upx;
	margin-top: 30rpx;
}

.enl-logo-box {
	margin: 240rpx 0 20rpx 0;
}

.enl-logo {
	border-radius: 40rpx;
	width: 200rpx;
	height: 200rpx;
}

.title {
	font-size: 36upx;
	color: #373737;
	font-weight: bold;
	margin-bottom: 10rpx;
}

.tip {
	font-size: 28upx;
	color: #7e7e83;
	vertical-align: text-top;
	line-height: 40rpx;
}

.footer-box {
	position: relative;
	width: 100%;
	justify-content: center;
	align-items: center;
	bottom: 0rpx;
}

.footer-blue {
	color: #0f58ff;
	font-size: 24rpx;
	display: flex;
	width: 100%;
	justify-content: center;
	text-decoration: underline;

	.linecenter {
		margin: 0 20rpx;
		margin-top: 5rpx;
	}
}

.footer {
	color: #adafb4;
	font-size: 20rpx;
	position: relative;
	display: flex;
	width: 100%;
	justify-content: center;
	height: 50rpx;
	line-height: 50rpx;
}
</style>
