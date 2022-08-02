module.exports = {
	is_iOS: function() {
		if (uni.getSystemInfoSync().platform == 'ios') {
			return true
		}
		return false
	},
	is_Android: function() {
		if (uni.getSystemInfoSync().platform == 'android') {
			return true
		}
		return false
	},
	is_PC: function() {
		if (uni.getSystemInfoSync().model == 'PC') {
			return true
		}
		return false
	},
	// 状态栏高度
	get_StatusHeight() {
		let systemInfo = uni.getSystemInfoSync()
		if (this.isMobile()) {
			return systemInfo.statusBarHeight
		} else {
			return 0
		}
	},
	// 状态栏+导航栏高度
	get_TopHeight() {
		let systemInfo = uni.getSystemInfoSync()
		let statusHeight = systemInfo.statusBarHeight
		if (this.is_Android()) {
			return  statusHeight + 44
		} else if (this.is_iOS()) {
			return statusHeight + 44
		} else {
			return  0
		}
	},
	//判断对象是否定义
	is_define: function(value, text) {
		if (value == null || value == "" || value == "undefined" || value == undefined || value == "null" ||
			value ==
			"(null)" || value == 'NULL' || typeof(value) == 'undefined') {
			if (text) {
				uni.showToast({
					title: text,
					icon: 'none',
					duration: 3000
				});
			}
			return false;
		} else {
			value = value + "";
			value = value.replace(/\s/g, "");
			if (value == "") {
				if (text) {
					uni.showToast({
						title: text,
						icon: 'none',
						duration: 3000
					});
				}
				return false;
			}
			return true;
		}
	},
	timestampToTime(timestamp, state) {
		var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1) + '-';
		var D = date.getDate() + ' ';
		var h = date.getHours() + ':';
		var m = date.getMinutes + ':';
		var s = date.getSeconds();
		return state ? Y + M + D + h + m + s : Y + M + D;
	},
	// 判断本周（0），昨日（1），今日（2）
	getDateText(time) {
		let flag = '0'
		let ptime = new Date(time).getTime()
		const twentyFourHours = 24 * 60 * 60 * 1000;
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const today = `${year}-${month}-${day}`;
		const todayTime = new Date(today).getTime();
		const yesterdayTime = new Date(todayTime - twentyFourHours).getTime()
		if (ptime >= todayTime) {
			flag = '2'
		} else if (ptime < todayTime && yesterdayTime <= ptime) {
			flag = '1'
		}
		return flag
	},
	//格式化时长
	format(num) {
		return '0'.repeat(2 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 -
			String(
				Math.floor(num % 60)).length) + Math.floor(num % 60)
	},
	//时间格式化返回00:00:00
	formatofSecond(seconds) {
		let hour = Math.floor(seconds / 3600) >= 10 ? Math.floor(seconds / 3600) : '0' + Math.floor(seconds / 3600);
		seconds -= 3600 * hour;
		let min = Math.floor(seconds / 60) >= 10 ? Math.floor(seconds / 60) : '0' + Math.floor(seconds / 60);
		seconds -= 60 * min;
		let sec = seconds >= 10 ? seconds : '0' + seconds;
		return hour + ':' + min + ':' + sec;
	},
	//32随机字符串生成
	randomString(len = 32) {
		let randomStr = ''
		const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
		const maxPos = chars.length
		for (let i = 0; i < len; i++) {
			randomStr += chars.charAt(Math.floor(Math.random() * maxPos))
		}
		return randomStr
	},
	/* 将秒时间格式化为：时分秒 */
	formatSeconds(value) {
		var theTime = parseInt(value) // 秒
		var middle = 0 // 分
		var hour = 0 // 小时
		if (theTime > 60) {
			middle = parseInt(theTime / 60)
			theTime = parseInt(theTime % 60)
			if (middle > 60) {
				hour = parseInt(middle / 60)
				middle = parseInt(middle % 60)
			}
		}
		var result = '' + parseInt(theTime) + '秒'
		if (middle > 0) {
			result = '' + parseInt(middle) + '分' + result
		}
		if (hour > 0) {
			result = '' + parseInt(hour) + '时' + result
		}
		return result
	},
	/* 将秒时间格式化为：00:00:00 */
	formatSecondsTime(seconds) {
		let min = Math.floor(seconds / 60) >= 10 ? Math.floor(seconds / 60) : '0' + Math.floor(seconds / 60);
		seconds -= 60 * min;
		let sec = seconds >= 10 ? seconds : '0' + seconds;
		return min + ':' + sec;
	},
	//地址是否为http和“/"开头
	judgeAddress(val) {
		/* 若url开头为http开头，则不拼接直接返回地址
		 * 若url开头非http开头，判断开头是否有“/”，没有则添加“/”,有则直接返回
		 */
		var that = this;
		var urlAddress = decodeURIComponent(val);
		var isHttpBegin = urlAddress.substr(0, 4) == "http"; //是否开头为“http”
		let isLineBegin = urlAddress.startsWith("/"); //是否开头有“/”
		if (isHttpBegin) {
			return urlAddress
		} else {
			if (isLineBegin) {
				return that.APIURL() + urlAddress
			} else {
				return that.APIURL() + "/" + urlAddress
			}
		}
	},
	// 查看大图
	lookImage(imgurl) {
		var avatarUrl = new Array()
		avatarUrl[0] = imgurl
		uni.previewImage({
			urls: avatarUrl,
		});
	},
	//计算单词数
	workSecond(value) {
		// 替换中文字符为空格
		if (value.length > 0) {
			value = value.replace(/[\u4e00-\u9fa5]+/g, " ");
			// 将换行符，前后空格不计算为单词数
			value = value.replace(/\n|\r|^\s+|\s+$/gi, "");
			// 多个空格替换成一个空格
			value = value.replace(/\s+/gi, " ");
			// 更新计数
			var length = 0;
			var match = value.match(/\s/g);
			if (match) {
				length = match.length + 1;
			} else if (value) {
				length = 1;
			}
			// ①换算秒数(单词数/3)+3=录音时长--不成立当单词数为10/3+3=6秒~时间不够
			// ②换算秒数(单词数/2)+3=录音时长--不成立当单词数为10/2+3=8秒
			console.log('计算的单词数=length=', length);
			let workCount = Math.round(length / 2) + 3
			console.log('计算结果时长=workCount=', workCount);
			if (workCount > 20) {
				return workCount = 20
			} else {
				return workCount
			}
		} else {
			return 4
		}
	},
	//去除特殊字符~!@#$^-&*()=|{}':;',\[].<>/?~！@#￥……&*（）——|{}【】'；：""'。，、？
	trimSpecial(string) {
		//替换字符串中的所有特殊字符（包含空格）
		if (string != "") {
			const pattern = /[`~!@#$^\-&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
			string = string.replace(pattern, "");
		}
		return string || ''
	},
	//是否为：标点符号开头/Markdown格式开头 ~!@#$^-&*()=|{}':;',\[].<>/?~！@#￥……&*（）——|{}【】'；：""'。，、？
	isSrimStart(string) {
		//替换字符串中的所有特殊字符（包含空格）
		let isHavSrim = false;
		if (string != "") {
			let stringVal = string.substr(0, 5)
			//标点符号正则--例外：数学公式`$`
			const pattern = /[`~!@#^\-&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
			let isHavSrimval = stringVal.search(pattern);
			if (stringVal.search(pattern) === 0) {
				isHavSrim = true
			} else {
				isHavSrim = false
			}
		}
		return isHavSrim
	},
	//h5端获取当前页面url中所携带的参数
	getRequestParams() {
		let url = location.href;
		let requestParams = {};
		if (url.indexOf("?") !== -1) {
			let str = url.substr(url.indexOf("?") + 1); //截取?后面的内容作为字符串
			let strs = str.split("&"); //将字符串内容以&分隔为一个数组
			for (let i = 0; i < strs.length; i++) {
				requestParams[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
				// 将数组元素中'='左边的内容作为对象的属性名，'='右边的内容作为对象对应属性的属性值
			}
		}
		return requestParams;
	},
	// 打开文件
	openPreviewFiles(filePath) {
		console.log('打开文件==》', filePath);
		let system = uni.getSystemInfoSync().platform;
		if (system == 'ios') {
			filePath = encodeURI(filePath);
		}
		uni.downloadFile({
			url: filePath,
			success: function(res) {
				var loaclfilePath = res.tempFilePath;
				uni.openDocument({
					showMenu: true,
					filePath: loaclfilePath,
					success: res => {
						console.log(res);
						console.log('打开文档成功');
						uni.showToast({
							title: '正在打开...',
							icon: 'none'
						});
					},
					fail: res1 => {
						uni.getImageInfo({
							src: loaclfilePath,
							success: imgInfo => {
								console.log('打开图片成功');
								uni.previewImage({
									current: loaclfilePath,
									urls: [loaclfilePath]
								});
							},
							fail: err => {
								console.log('不支持该格式');
								uni.showToast({
									title: '不支持该格式',
									icon: 'none'
								});
								return;
							}
						});
					}
				});
			}
		});
	},

	//生产四位随机数
	getRandom() {
		// 格式化后：注意换行分割
		return Math.floor(Math.random() * 10) * 1000 + Math.floor(Math.random() * 10) * 100 + Math.floor(Math
			.random() * 10) * 10 + Math.floor(Math.random() * 10);
	},
	//输出文件名：yyyyMMddHHmmssxxxx
	getFilesDateTime() {
		let that = this;
		var date = new Date();
		return date.getFullYear().toString() + that.pad2(date.getMonth() + 1) + that.pad2(date.getDate()) + that
			.pad2(date.getHours()) + that.pad2(date.getMinutes()) + that.pad2(date.getSeconds()) + that.getRandom();
	},
	pad2(n) {
		return n < 10 ? '0' + n : n
	},
	//判断呈现文件扩展属性
	fileExtIcon(extName) {
		switch (extName) {
			case 'doc':
			case 'docx':
			case 'rtf':
				return 'word';
				break;
			case 'ppt':
			case 'pptx':
				return 'ppt';
				break;
			case 'xls':
			case 'xlsx':
				return 'excel';
				break;
			case 'png':
			case 'jpg':
			case 'jpeg':
				return 'img';
				break;
			case 'mp3':
			case 'm4a':
			case 'aac':
			case 'wav':
				return 'audio';
				break;
			case 'gif':
				return 'gif';
				break;
			case 'pdf':
				return 'pdf';
				break;
			case 'txt':
				return 'txt';
				break;
			case 'rar':
			case 'zip':
				return 'zip';
				break;
			case 'avi':
			case 'mp4':
				return 'video';
				break;
			default:
				return 'unfolder'
		}
	},

	/**
	 * 判断是否为空
	 */
	is_empty(value) {
		switch (typeof value) {
			case 'undefined':
				return true;
			case 'string':
				if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
				break;
			case 'boolean':
				if (!value) return true;
				break;
			case 'number':
				if (0 === value || isNaN(value)) return true;
				break;
			case 'object':
				if (null === value || value.length === 0) return true;
				for (var i in value) {
					return false;
				}
				return true;
		}
		return false;
	},

	// 判断arr是否为一个数组，返回一个bool值
	isArray(arr) {
		return Object.prototype.toString.call(arr) === '[object Array]';
	},

	/**
	 * 验证电子邮箱格式
	 */
	email(value) {
		return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
	},

	/**
	 * 验证手机格式
	 */
	mobile(value) {
		return /^1[3-9]\d{9}$/.test(value)
	},

	in_array(value, arr) {
		for (let key in arr) {
			if (arr[key] == value) return true
		}
		return false
	},

	isMobile() {
		if ((navigator.userAgent.match(
				/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
			))) {
			return true // 手机端
		} else {
			return false // alert('PC端')
		}
	},
	// 深度克隆
	deepClone(obj) {
		// 对常见的“非”值，直接返回原来值
		if ([null, undefined, NaN, false].includes(obj)) return obj;
		if (typeof obj !== "object" && typeof obj !== 'function') {
			//原始类型直接返回
			return obj;
		}
		var o = isArray(obj) ? [] : {};
		for (let i in obj) {
			if (obj.hasOwnProperty(i)) {
				o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
			}
		}
		return o;
	},
	/**
	 * 对象转url参数
	 * @param {*} data,对象
	 * @param {*} isPrefix,是否自动加上"?"
	 */
	queryParams(data = {}, isPrefix = true, arrayFormat = 'brackets') {
		let prefix = isPrefix ? '?' : ''
		let _result = []
		if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';
		for (let key in data) {
			let value = data[key]
			// 去掉为空的参数
			if (['', undefined, null].indexOf(value) >= 0) {
				continue;
			}
			// 如果值为数组，另行处理
			if (value.constructor === Array) {
				// e.g. {ids: [1, 2, 3]}
				switch (arrayFormat) {
					case 'indices':
						// 结果: ids[0]=1&ids[1]=2&ids[2]=3
						for (let i = 0; i < value.length; i++) {
							_result.push(key + '[' + i + ']=' + value[i])
						}
						break;
					case 'brackets':
						// 结果: ids[]=1&ids[]=2&ids[]=3
						value.forEach(_value => {
							_result.push(key + '[]=' + _value)
						})
						break;
					case 'repeat':
						// 结果: ids=1&ids=2&ids=3
						value.forEach(_value => {
							_result.push(key + '=' + _value)
						})
						break;
					case 'comma':
						// 结果: ids=1,2,3
						let commaStr = "";
						value.forEach(_value => {
							commaStr += (commaStr ? "," : "") + _value;
						})
						_result.push(key + '=' + commaStr)
						break;
					default:
						value.forEach(_value => {
							_result.push(key + '[]=' + _value)
						})
				}
			} else {
				_result.push(key + '=' + value)
			}
		}
		return _result.length ? prefix + _result.join('&') : ''
	},


	/**
	 * 只能输入字母
	 */
	letter(value) {
		return /^[a-zA-Z]*$/.test(value);
	},

	/**
	 * 只能是字母或者数字
	 */
	enOrNum(value) {
		//英文或者数字
		let reg = /^[0-9a-zA-Z]*$/g;
		return reg.test(value);
	},
	//点击事件叫 fuZhi  直接调用现成的API
	copyVlaue(content) {
		uni.setClipboardData({
			data: content,
			success: res => {
				uni.showToast({
					title: '复制成功',
					icon: 'none',
					duration: 2000 //时间
				});
			}
		});
	},
}
