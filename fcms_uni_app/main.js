import App from './App'

// 引入store，把vuex定义成全局组件
import store from './store/index.js'
Vue.prototype.$store = store

// 引入axios网络请求
import api from './api/api.js'
Vue.prototype.$api = api

import service from './utils/request.js'
Vue.prototype.$service = service

// 引入全局tools
import tools from './utils/tools.js'
Vue.prototype.$tools = tools

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView)

//自定义tabbar
import index from './pages/tabbar/index.vue'
Vue.component('index', index)
import user from './pages/tabbar/user.vue'
Vue.component('user', user)

// i18n部分的配置
// 引入并使用vue-i18n
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
// 引入语言包，注意路径
import ChineseHans from '@/locales/zh-Hans.js';
import English from '@/locales/en.js';

// 构造i18n对象
const i18n = new VueI18n({
	// 默认语言，这里的local属性，对应message中的zh-Hans、en属性
	locale: 'zh-Hans',
	// 引入语言文件
	messages: {
		// 这里的属性名是任意的，您也可以把zh设置为zh-Hans等，只是后续切换语言时
		// 要标识这里的语言属性，如：this.$i18n.locale = zh|en|zh-Hans|xxx
		'zh-Hans': ChineseHans,
		'en': English,
	}
})

//引入linq.js使用用法参考：https://blog.csdn.net/Jo_liver/article/details/114404372
import Enumerable from 'utils/linq.min.js';
Vue.prototype.$Enumerable = Enumerable //赋值到vue里面

//引入router路由
import {
	router,
	RouterMount
} from './router.js' //路径换成自己的
Vue.use(router)

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	i18n,
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
