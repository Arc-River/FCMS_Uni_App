<template>
  <view>
    <u-navbar id="homeNav" :left-icon="null" title="我的"></u-navbar>

    <scroll-view scroll-y class="scrollPage" :style="'padding-top: '+this.$tools.get_TopHeight()+'px'">

      <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
        <view class="cu-item arrow user-header" style="height: 80px">
          <button class="cu-btn content" @click="$Router.push({ name: 'userinfo' })">
            <u-avatar :src="userInfo.user.avatar" shape="circle" default-url="/static/logo/profile_photo.png" size="60"
                      mode="aspectFill"></u-avatar>
            <text class="text-grey margin-left-sm">{{ userInfo.user.nickName }}</text>
            <u-icon class="margin-left-xl" name="grid" color="#969799" size="28"></u-icon>
          </button>
        </view>
      </view>

      <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
        <view class="cu-item arrow">
          <button class="cu-btn content" @click="$Router.push({ name: 'updateUserinfo' })">
            <text class="cuIcon-formfill text-green"></text>
            <text class="text-grey">个人信息</text>
          </button>
        </view>
        <view class="cu-item arrow">
          <button class="cu-btn content" @click="$Router.push({ name: 'about' })">
            <text class="cuIcon-infofill text-yellow"></text>
            <text class="text-grey">关于我们</text>
          </button>
        </view>
        <view class="cu-item arrow">
          <button class="cu-btn content" open-type="feedback">
            <text class="cuIcon-writefill text-blue"></text>
            <text class="text-grey">意见反馈</text>
          </button>
        </view>
        <view class="cu-item arrow">
          <button class="cu-btn content" @click="appShare">
            <text class="cuIcon-share text-mauve"></text>
            <text class="text-grey">分享</text>
          </button>
        </view>
        <view class="cu-item arrow">
          <button class="cu-btn content" @click="$Router.push({ name: 'setting' })">
            <text class="cuIcon-settingsfill text-red"></text>
            <text class="text-grey">设置</text>
          </button>
        </view>
      </view>

      <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius" v-if="hasLogin">
        <view class="cu-item">
          <button class="cu-btn content align-center" @click="show = true">
            <text class="text-red">退出登录</text>
          </button>
        </view>
      </view>

      <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius" v-if="!hasLogin">
        <view class="cu-item">
          <button class="cu-btn content align-center" @click="selectClick">
            <text class="text-blue">登录</text>
          </button>
        </view>
      </view>

      <view class="cu-tabbar-height"></view>
    </scroll-view>
    <u-action-sheet :actions="list" @select="selectClick" @close="show = false" :title="title" :show="show"
                    cancel-text="取消"></u-action-sheet>
  </view>
</template>

<script>
import {mapState} from 'vuex'
import UniShare from '@/uni_modules/uni-share/js_sdk/uni-share.js';

const uniShare = new UniShare();

export default {
  computed: {
    ...mapState('user', ['userInfo', 'hasLogin']),
    lang() {
      return this.$i18n.locale == 'en' ? 'en' : 'zh';
    }
  },
  data() {
    return {
      title: '确定要退出登录吗？',
      list: [
        {
          name: '确定',
          color: '#ffaa7f',
        }
      ],
      show: false
    };
  },
  created() {},
  methods: {
    /** APP分享 */
    appShare() {
      let downHref = uni.getStorageSync('app_download_url')
      uniShare.show({
        content: {
          type: 0,
          href: downHref,
          title: 'App下载',
          summary: '人脸客户宝',
          imageUrl: 'https://s1.328888.xyz/2022/06/06/zGPWT.png'
        },
        menus: [
          {
            "img": "/static/sharemenu/copyurl.png",
            "text": "复制",
            "share": "copyurl"
          },
          {
            "img": "/static/sharemenu/more.png",
            "text": "更多",
            "share": "shareSystem"
          }
        ],
        cancelText: "取消分享",
      }, e => { //callback
        console.log(e);
      })
    },
    /** 退出登录 */
    selectClick(index) {
      this.$store.dispatch("user/Logout")
    },
    /** 跳转 */
    routerTo(name) {
      console.log('this.$Router.push==', this.$Router.push);
      this.$Router.push({name: name});
    },
    /** 切换语言 */
    switchLang() {
      this.$i18n.locale = this.$i18n.locale == 'en' ? 'zh-Hans' : 'en';
      console.log('this.$i18n.locale==', this.$i18n.locale);
      if (this.$u.os() == 'android') {
        uni.showModal({
          content: this.$t('tabbar.component'),
          success: res => {
            if (res.confirm) {
              uni.setLocale(this.$i18n.locale);
            }
          }
        });
      } else {
        uni.setLocale(this.$i18n.locale);
      }
      uni.setNavigationBarTitle({
        title: this.$t('tabbar.component')
      });
    }
  }
};
</script>

<style lang="scss">

.user-header {
  height: 150 rpx;
}

map,
.mapBox {
  left: 0;
  z-index: 99;
  mix-blend-mode: screen;
  height: 100 rpx;
}

map,
.mapBox {
  width: 750 rpx;
  height: 300 rpx;
}
</style>
