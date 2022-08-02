export default {
	// 可以以页面为单位来写，比如首页的内容，写在index字段，个人中心写在center，共同部分写在common部分
	//tabbat.vue
	tabbar: {
		index: '首页',
		tool: '工具',
		user: '我的',
	},
	// user.vue
	ucenter: {
		userinfor: '个人信息',
		testlist: '功能列表',
		about: '关于',
		log: '日志',
		setting: '设置',
	},
	//setting
	set: {
		lang: '切换语言',
		logout: '退出登录',
		debug: '功能开发'
	},
	changelang: '切换英文',
	testlist: {
		colorui: 'ColorUI使用',
		testUview: 'uView使用',
		router: 'Router路由使用',
		repuest: 'axios请求',
		iconfont: 'iconfont字体图标',
		i18nlang: 'i18n语言切换',
		vuexstore: '本地缓存Vuex',
	},

	//暂时无用到
	common: {
		intro: '多平台快速开发的UI框架',
		title: 'uView UI',
		desc: '众多的贴心小工具，是你开发过程中召之即来的利器，让你飞镖在手，百步穿杨'
	},

	js: {
		control: '工具',
		desc: '这里是工具描述',
	},
	component: {
		desc: '组件'
	},
	template: {
		desc: '模板'
	},

}
