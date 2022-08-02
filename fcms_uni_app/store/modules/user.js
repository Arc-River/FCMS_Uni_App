import api from '@/api/api.js'

const UsrIF = {
    user: {
        nickName: '昵称',
        avatar: ''
    }
}

export default {
    namespaced: true, //命名空间必须写
    state: {
        // 是否已经登录
        hasLogin: Boolean(Object.keys(uni.getStorageSync('nys_token')).length),
        // 验签令牌
        infoToken: uni.getStorageSync('nys_token') || '',
        // 用户信息
        userInfo: uni.getStorageSync('nys_userinfo') || UsrIF
    },
    getters: {
        userInfo(state) {
            return state.userInfo;
        },
        get_Token(state) {
            return state.infoToken;
        },
        hasLogin(state) {
            return state.hasLogin;
        }
    },
    // commit 唯一修改state值的方法
    mutations: {
        login(state, data) { //登录成功后的操作
            console.log("mutations==login==state==>", state)

            // 存储最新的用户token到本地持久化存储
            if (data.token) {
                state.infoToken = data.token
                uni.setStorage({
                    key: 'nys_token',
                    data: data.token
                });
            }
            // 设置为已经登录
            state.hasLogin = true
            // 跳转首页
            uni.reLaunch({url: "pages/tabbar/tabbar"})
        },
        userInfo(state, userInfo) {
            console.log("mutations==setUserInfo==userInfo==>", userInfo)
            let avatar = api.BaseURL + userInfo.user.avatar;
            let _userInfo = userInfo;
            _userInfo.user.avatar = avatar
            // 存储最新的用户数据到本地持久化存储
            state.userInfo = _userInfo;
            if (userInfo) {
                uni.setStorageSync('nys_userinfo', _userInfo);
            }
        },
        logout(state) {
            console.log("mutations==logout(state)==>", state);
            state.infoToken = ''
            state.hasLogin = false
            state.userInfo = UsrIF
            // 移除掉所有本地缓存
            try {
                uni.clearStorageSync();
            } catch (e) {
                // error
            }
            // 跳转首页
            uni.navigateTo({url: "pages/login/login", animationType: 'slide-in-bottom', animationDuration: 500})
        },
        clear(state) {
            console.log("mutations==clear(state)==>", state);
            state.infoToken = ''
            state.hasLogin = false
            state.userInfo = UsrIF
            // 移除掉所有本地缓存
            try {
                uni.clearStorageSync();
            } catch (e) {
                // error
            }
        },

    },
    // dispatch 异步的操作
    actions: {
        Login({commit}, data) {
            commit('login', data)
        },
        UserInfo({commit}, data) {
            commit('userInfo', data)
        },
        RefreshUserInfo({commit}) {
            this.$service.get(this.$api.getInfo).then(res => {
                commit('userInfo', res)
            })
        },
        Logout({commit}) {
            uni.showLoading({
                mask: true
            })
            commit('logout')
        },
        Clear({commit}) {
            commit('clear')
        },
    }
}
