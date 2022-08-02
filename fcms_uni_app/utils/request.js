import axios from 'axios'
import api from '../api/api.js'
import store from '../store/index.js' //状态管理
import appCode from './statusCode.js' //https状态码表判断

// create an axios instance
const service = axios.create({
	baseURL: api.BaseURL,
	//withCredentials: true, // send cookies when cross-domain requests 注意：withCredentials和后端配置的cross跨域不可同时使用
	timeout: 10000,
	crossDomain: true
})

// request拦截器,在请求之前做一些处理
service.interceptors.request.use(
	config => {
		// 添加请求头
		if (store.getters['user/get_Token']) {
			config.headers.Authorization = 'Bearer ' + store.getters['user/get_Token'];
		}
		//判断，执行全局loading
		// if (store.getters.showLoading) {
/*		uni.showLoading({
			title: '加载中'
		})*/
		// }
		console.log('----------------请求拦截成功----------------')
		return config;
	},
	error => {
		// console.log("");
		console.log("--request--error", error);
		// console.log("");
		return Promise.reject(error);
	}
);

//配置成功后的拦截器
service.interceptors.response.use(
	response => {
		const res = response.data;
		uni.hideLoading()
		console.log('配置成功后的拦截器：请求响应 -->', response);
		// if the custom code is not 200, it is judged as an error.
		if (res.code == 200) {
			return res;
		} else {
			uni.hideLoading()
			let errorMsg = res.msg || res.error.details || '网络连接失败 0x00003'
			uni.showToast({
				title: errorMsg,
				icon: "none",
				duration: 2000
			})
			// 错误代码处理
			appCode.httpStatusCode_(res.code, errorMsg)

			return Promise.reject(new Error(errorMsg))
		}
	},
	error => {
		// console.log("http请求失败==res.status != 200");
		// console.log("--response--error");
		uni.hideLoading()
		// 错误的请求结果处理，这里的代码根据后台的状态码来决定错误的输出信息
		if (error && error.response) {
			let errMessage = error.response.data.error.details ? error.response.data.error.details : error.response
				.data.error.message
			console.log("errMessage==>", errMessage);
			appCode.httpStatusCode_(error.response.code, errMessage)
		} else {
			uni.showToast({
				title: '连接到服务器失败',
				icon: 'fail'
			});
		}
		return Promise.reject(error)
	}
)

// 在main.js中放入这段自定义适配器的代码，就可以实现uniapp的app和小程序开发中能使用axios进行跨域网络请求，并支持携带cookie
axios.defaults.adapter = function (config) {
	return new Promise((resolve, reject) => {
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				// console.log("执行完成：", response)
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};
				settle(resolve, reject, response);
			}
		})
	})
}

export default service
