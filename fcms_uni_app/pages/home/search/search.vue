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
        <u-cell>
          <u-avatar slot="icon" size="55" :src="'data:image/gif;base64,'+item.faceBase"
                    @tap="previewImage(item)"></u-avatar>

          <view slot="title" class="content">
            <view class="text-orange">{{ item.clientName || '未知客户' }}</view>
            <u--text :text="item.phone" align="left" :call="true" mode="phone" type="primary" size="15"></u--text>
            <view class="text-gray text-sm">
              <view>{{ item.createTime }}</view>
            </view>
          </view>

          <view slot="value" class="action text-xs">
            <u-tag v-if="item.similar == 0" type="error" text="无匹配客户" plain></u-tag>
            <u-tag v-if="item.similar != 0" type="success" :text="'相似度'+item.similar * 100+'%'" plain></u-tag>
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
      pageSize: this.params.pageSize
    }
    this.$service.get(this.$api.getRecoLogList, {params}).then(res => {
      this.dataList = res.rows
      this.loading = false
      if (this.dataList.length == 0) {
        this.noData = true
      }
    })
  },
  methods: {
    previewImage(item) {
      let url = 'data:image/gif;base64,' + item.faceBase
      this.$tools.lookImage(url)
    },
    /** 加载更多 */
    loadMore() {
      let params = {
        pageNum: ++this.params.pageNum,
        pageSize: this.params.pageSize
      }
      this.$service.get(this.$api.getRecoLogList, {params}).then(res => {
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
