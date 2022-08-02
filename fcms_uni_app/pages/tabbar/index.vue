<template>
  <view>
    <u-navbar id="homeNav" :left-icon="null" title="首页"></u-navbar>

    <scroll-view :scroll-y="modalName == null" class="page" :style="'padding-top: '+this.$tools.get_TopHeight()+'px'"
                 scroll-y="true"
                 scroll-anchoring="true"
                 refresher-enabled="true"
                 :refresher-triggered="triggered"
                 :refresher-threshold="100"
                 refresher-background="white"
                 @refresherrefresh="onRefresh"
                 @refresherrestore="onRestore"
    >

      <!-- 轮播图 -->
      <swiper class="screen-swiper" :class="dotStyle ? 'square-dot' : 'round-dot'" :indicator-dots="true"
              :circular="true" :autoplay="true" interval="5000" duration="500">
        <swiper-item v-for="(item, index) in swiperList" :key="index">
          <image :src="item.url" mode="aspectFit" v-if="item.type == 'image'"></image>
          <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover"
                 v-if="item.type == 'video'"></video>
        </swiper-item>
      </swiper>

      <!-- 公告 -->
      <view class="margin-top">
        <u-notice-bar v-if="notices.length > 1" direction="column" :text="notices"></u-notice-bar>
        <u-notice-bar v-if="notices.length == 1" :text="notices[0]"></u-notice-bar>
      </view>

      <view class="cu-bar bg-white solid-bottom margin-top">
        <view class="action">
          <text class="cuIcon-title text-orange "></text>
          功能菜单
        </view>
      </view>
      <view class="cu-list grid" :class="['col-' + gridCol]">
        <view class="cu-item" v-for="(item, index) in cuIconList" :key="index" v-if="index < gridCol * 3">
          <view :class="['cuIcon-' + item.cuIcon, 'text-' + item.color]" @tap="tapItem(index)">
            <view class="cu-tag badge" v-if="item.badge != 0">
              <block v-if="item.badge != 1">{{ item.badge > 99 ? '99+' : item.badge }}</block>
            </view>
          </view>
          <text>{{ item.name }}</text>
        </view>
      </view>

      <view class="cu-bar bg-white solid-bottom margin-top">
        <view class="action">
          <text class="cuIcon-title text-orange "></text>
          最新通知
        </view>
      </view>
      <view class="cu-list menu-avatar">
        <view
            class="cu-item"
            :class="modalName == 'move-box-' + index ? 'move-cur' : ''"
            v-for="(item, index) in noticeList"
            :key="index"
            @touchstart="ListTouchStart"
            @touchmove="ListTouchMove"
            @touchend="ListTouchEnd"
            :data-target="'move-box-' + index"
        >
          <view class="cuIcon-discover cu-avatar round lg bg-gradual-green"></view>
          <view class="content" @tap="cellDidTaped(item.noticeId)">
            <view class="text-grey">{{ item.noticeTitle }}</view>
            <view class="text-gray text-sm">
              <view>{{ item.createTime }}</view>
            </view>
          </view>
          <view class="action text-xs">
            <view class="cu-tag round bg-blue sm">{{ item.praise }}</view>
          </view>
          <view class="move">
            <view class="cuIcon-appreciatefill bg-blue" @tap="appreciate(item.noticeId)">点赞</view>
          </view>
        </view>
        <!-- 占位图 -->
        <u-empty
            mode="data"
            v-if="noticeList.length == 0"
        >
        </u-empty>
      </view>
      <view class="cu-tabbar-height"></view>
    </scroll-view>

    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
export default {
  data() {
    return {
      triggered: false,
      documentUrl: '',
      homeData: null,
      notices: ['新版本上线了，快来更新体验吧！'],
      noticeList: [],
      swiperList: [
        {
          id: 0,
          type: 'image',
          url: '/static/banner/banner_0.svg'
        },
        {
          id: 1,
          type: 'image',
          url: '/static/banner/banner_1.svg'
        },
        {
          id: 2,
          type: 'image',
          url: '/static/banner/banner_2.svg'
        },
        {
          id: 3,
          type: 'image',
          url: '/static/banner/banner_3.svg'
        },
        {
          id: 4,
          type: 'image',
          url: '/static/banner/banner_4.svg'
        }
      ],
      dotStyle: true,
      cuIconList: [
        {
          cuIcon: 'friendfill',
          color: 'cyan',
          badge: 0,
          name: '客户列表'
        },
        {
          cuIcon: 'cameraaddfill',
          color: 'blue',
          badge: 0,
          name: '客户查找'
        },
        {
          cuIcon: 'friendaddfill',
          color: 'red',
          badge: 0,
          name: '客户添加'
        },
        {
          cuIcon: 'noticefill',
          color: 'olive',
          badge: 0,
          name: '通知列表'
        },
        {
          cuIcon: 'explorefill',
          color: 'mauve',
          badge: 0,
          name: '查找记录'
        },
        {
          cuIcon: 'rankfill',
          color: 'purple',
          badge: 0,
          name: '统计数据'
        }
      ],
      modalName: null,
      gridCol: 3,
      listTouchStart: 0,
      listTouchDirection: null
    }
  },
  created() {
    this._freshing = false;
    setTimeout(() => {
      this.triggered = true;
    }, 500)
  },
  methods: {
    /** 首页数据 */
    getHomeData() {
      // 刷新用户信息
      this.$service.get(this.$api.getInfo).then(res => {
        this.$store.dispatch("user/UserInfo", res)

        // App信息
        this.$service.get(this.$api.getHomeData).then(res => {
          this.homeData = res
          this.documentUrl = this.homeData.documentUrl
          this.cuIconList[3].badge = this.homeData.noticeList.length
          this.notices = []
          for (let billboard of this.homeData.billboardList) {
            this.notices.push(billboard.noticeContent)
          }

          // 缓存APP下载地址
          if (this.$tools.is_Android()) {
            uni.setStorageSync('app_download_url', res.androidDownloadUrl);
          } else if (this.$tools.is_iOS()) {
            uni.setStorageSync('app_download_url', res.iosDownloadUrl);
          }

          // 获取公共通知
          this.$service.get(this.$api.getPublicNoticeList).then(res => {
            this.noticeList = res.rows

            this.triggered = false;
            this._freshing = false;
          })

        })
      }).catch(errors => {

        this.triggered = false;
        this._freshing = false;
      })
    },
    /** 公共通知 */
    getPublicNoticeData() {
      this.$service.get(this.$api.getPublicNoticeList).then(res => {
        this.noticeList = res.rows

        this.triggered = false;
        this._freshing = false;
      });
    },
    /** 点赞 */
    appreciate(id) {
      this.$service.get(this.$api.appreciate + id).then(res => {
        uni.showToast({
          title: res.msg,
          icon: "success",
          duration: 2000
        })
        this.getPublicNoticeData()
      })
    },
    /** 功能菜单 */
    tapItem(index) {
      switch (index) {
        case 0:
          uni.navigateTo({url: "pages/home/client/client"})
          break

        case 1: {
          let _that = this
          let token = this.$store.getters['user/get_Token']
          let url = this.$api.BaseURL + this.$api.searchClient
          uni.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['camera', 'album'],
            success: function (res) {
              _that.$refs.uToast.show({
                type: 'loading',
                message: "正在检索",
                duration: 60000,
                iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/loading.png'
              })
              // 上传
              uni.uploadFile({
                url: url,
                filePath: res.tempFilePaths[0],
                name: 'file',
                header: {
                  Authorization: "Bearer " + token,
                },
                success: (uploadFileRes) => {
                  _that.$refs.uToast.hide()
                  let obj = JSON.parse(uploadFileRes.data)
                  if (obj.code == 200) {
                    _that.toDetails(obj.data.clientId)
                  } else {
                    _that.$refs.uToast.show({
                      type: 'error',
                      message: obj.msg || '未知错误',
                      position: 'bottom'
                    })
                  }
                }
              })
            }
          })
        }
          break

        case 2:
          uni.navigateTo({url: "pages/home/client/clientAdd"})
          break

        case 3:
          uni.navigateTo({url: "pages/home/notice/notice"})
          break

        case 4:
          uni.navigateTo({url: "pages/home/search/search"})
          break

        case 5:
          uni.navigateTo({url: "pages/home/statistics/statistics"})
          break

        default:
          break
      }
    },
    /** 客户详情 */
    toDetails(id) {
      let params = {clientId: id}
      this.$Router.push({path: '/pages/home/client/clientDetails?item', query: {params}})
    },
    /** 通知详情 */
    cellDidTaped(id) {
      let params = {noticeId: id}
      this.$Router.push({path: '/pages/home/notice/noticeDetails?item', query: {params}})
    },
    /** 触发刷新 */
    onRefresh() {
      if (this._freshing) return;
      this._freshing = true;
      // 加载数据
      this.getHomeData()
    },
    onRestore() {
      this.triggered = 'restore'; // 需要重置
      console.log("onRestore");
    },

    // ListTouch触摸开始
    ListTouchStart(e) {
      this.listTouchStart = e.touches[0].pageX
    },
    // ListTouch计算方向
    ListTouchMove(e) {
      this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
    },
    // ListTouch计算滚动
    ListTouchEnd(e) {
      if (this.listTouchDirection == 'left') {
        this.modalName = e.currentTarget.dataset.target;
      } else {
        this.modalName = null
      }
      this.listTouchDirection = null
    },

  }
};
</script>

<style lang="scss" scoped>

.scroll-list {
  @include flex(column);

  &__goods-item {
    margin-right: 20px;

    &__image {
      width: 60px;
      height: 60px;
      border-radius: 4px;
    }

    &__text {
      color: #f56c6c;
      text-align: center;
      font-size: 12px;
      margin-top: 5px;
    }
  }
}

.page {
  height: 100vh;
  width: 100vw;
}

.u-demo-block__title {
  padding: 10px 0 2px 15px;
}

.swipe-action {
  &__content {
    padding: 25px 0;

    &__text {
      font-size: 15px;
      color: $u-main-color;
      padding-left: 30px;
    }

  }
}

</style>
