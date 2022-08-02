<template>
  <view class="nys_content bg-white">

    <!-- 骨架屏 -->
    <u-skeleton rows="2" :loading="loading" avatar :title="false"/>

    <!-- 占位图 -->
    <u-empty v-if="noData" mode="search" text="查无数据"/>

    <u-list
        @scrolltolower="loadMore"
    >
      <u-list-item
          v-for="(item, index) in dataList"
          :key="index"
      >
        <u-cell @tap="cellDidTaped(item.noticeId)">
          <view
              slot="icon"
              class="cuIcon-noticefill cu-avatar round lg bg-gradual-green"
          ></view>

          <view slot="title" class="content">
            <view class="text-orange">{{ item.noticeTitle }}</view>
            <view class="text-gray">{{ item.createTime }}</view>
          </view>

          <view slot="value" class="action text-xs">
            <view class="cu-tag round bg-red sm" v-if="item.hits == 0">未读</view>
            <view class="cu-tag round bg-green sm" v-if="item.hits > 0">已读</view>
          </view>

        </u-cell>
      </u-list-item>

      <!-- 加载更多 -->
      <u-loadmore v-if="dataList.length > 0" :status="loadMoreStatus" @loadmore="loadMore"/>

    </u-list>


  </view>
</template>

<script>

export default {
  data() {
    return {
      loading: true,
      noData: false,
      loadMoreStatus: 'loadmore',
      dataList: [],
      params: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created() {
    let params = {
      pageNum: this.params.pageNum,
      pageSize: this.params.pageSize,
      userId: this.$store.getters['user/userInfo'].user.userId
    }
    this.$service.get(this.$api.getNoticeList, {params}).then(res => {
      this.dataList = res.rows
      this.loading = false
      if (this.dataList.length == 0) {
        this.noData = true
      }
    })
  },
  methods: {
    cellDidTaped(id) {
      let params = {noticeId: id}
      this.$Router.push({path: '/pages/home/notice/noticeDetails?item', query: {params}})
    },
    /** 加载更多 */
    loadMore() {
      let params = {
        pageNum: ++this.params.pageNum,
        pageSize: this.params.pageSize
      }
      this.$service.get(this.$api.getNoticeList, {params}).then(res => {
        if (res.rows.length > 0) {
          for (let obj of res.rows) {
            this.dataList.push(obj)
          }
        } else {
          this.loadMoreStatus = 'nomore'
        }
      })
    }
  }
}

</script>

<style scoped>
.content {
  margin: 0 20px;
}
</style>
