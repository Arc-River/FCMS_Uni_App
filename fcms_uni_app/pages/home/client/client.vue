<template>
  <view class="nys_content bg-white">
    <u-sticky class="sticky-bg" bgColor="#fff">
      <u-search placeholder="请输入客户姓名" clearabled v-model="params.clientName" @custom="search" @search="search"></u-search>
    </u-sticky>

    <!-- 骨架屏 -->
    <u-skeleton rows="2" :loading="loading" avatar :title="false"/>

    <!-- 占位图 -->
    <u-empty v-if="noData" mode="search" text="查无数据"/>

    <u-list @scrolltolower="loadMore">
      <u-list-item
          v-for="(item, index) in dataList"
          :key="index"
      >
        <u-cell
            :isLink="true"
            :label="item.clientPinyin"
            @tap="cellDidTaped(item.clientId)"
        >
          <u-avatar slot="icon" size="55" :src="item.avatarUrl" default-url="/static/logo/profile_photo.png"></u-avatar>

          <view slot="title" class="content">
            <view class="text-orange">{{ item.clientName }}</view>
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
        pageSize: 10,
        clientName: null
      }
    }
  },
  onLoad() {
    this.getDataList()
  },
  methods: {
    /** 加载列表数据 */
    getDataList() {
      let params = {
        pageNum: this.params.pageNum,
        pageSize: this.params.pageSize,
        clientName: this.params.clientName
      }
      this.$service.get(this.$api.getClientList, {params}).then(res => {
        this.dataList = res.rows
        this.loading = false
        if (this.dataList.length == 0) {
          this.noData = true
        }
      })
    },
    /** 搜索 */
    search() {
      console.log("SDFsdfsdf")
      this.params.pageNum = 1
      this.loadMoreStatus = 'loadmore'
      this.getDataList()
    },
    /** 加载更多 */
    loadMore() {
      let params = {
        pageNum: ++this.params.pageNum,
        pageSize: this.params.pageSize,
        clientName: this.params.clientName
      }
      this.$service.get(this.$api.getClientList, {params}).then(res => {
        if (res.rows.length > 0) {
          for (let obj of res.rows) {
            this.dataList.push(obj)
          }
        } else {
          this.loadMoreStatus = 'nomore'
        }
      })
    },
    /** 点击跳转 */
    cellDidTaped(id) {
      let params = {clientId: id}
      this.$Router.push({path: '/pages/home/client/clientDetails?item', query: {params}})
    }
  }
}
</script>

<style lang="scss" scoped>

.sticky-bg {
  margin-bottom: 15px;
}

</style>
