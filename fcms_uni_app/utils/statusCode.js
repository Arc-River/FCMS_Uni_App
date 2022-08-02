import store from '../store/index.js'
module.exports = {
	httpStatusCode_(status, tip) {
		console.log("status==>", status);
		console.log("tip==>", tip);
		let errorOptions = {
			icon: "none",
		}
		var that = this;
		switch (status) {
			case 400:
				errorOptions.title = tip || '错误请求';
				break
			case 401:
				errorOptions.title = tip || '未授权，请重新登录';
				store.dispatch("user/Clear")
				// 跳转登录页
				// uni.navigateTo({url: "pages/login/login", animationType: 'slide-in-bottom', animationDuration: 500})
				break
			case 403:
				errorOptions.title = tip || '拒绝访问';
				break
			case 404:
				errorOptions.title = tip || '请求错误,未找到该资源';
				break
			case 405:
				errorOptions.title = tip || '请求方法未允许';
				break
			case 408:
				errorOptions.title = tip || '请求超时';
				break
			case 500:
				errorOptions.title = tip || '服务器端出错';
				break
			case 501:
				errorOptions.title = tip || '网络未实现';
				break
			case 502:
				errorOptions.title = tip || '网络错误';
				break
			case 503:
				errorOptions.title = tip || '服务不可用';
				break
			case 504:
				errorOptions.title = tip || '网络超时';
				break
			case 505:
				errorOptions.title = tip || 'http版本不支持该请求';
				break
			default:
				errorOptions.title = tip || '连接错误'+status;
		}
		uni.showToast(errorOptions);
	},
}
