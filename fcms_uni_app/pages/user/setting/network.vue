<template>
	<view>
		<view class="bg-white content">
      <u-no-network
          @disconnected="disconnected"
          @connected="connected"
          @retry="retry"
      ></u-no-network>
      <view class="u-content">
        <view class="u-content__circle">
          <u-icon
              name="checkbox-mark"
              color="#fff"
              size="30"
          ></u-icon>
        </view>
        <text class="u-content__normal">网络正常</text>
      </view>
		</view>
	</view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    disconnected() {
      console.log('disconnected');
    },
    connected() {
      console.log('connected');
    },
    retry() {
      console.log('retry');
    }
  },
}
</script>

<style lang="scss" scoped>

.content {
  width: 100vw;
  height: 100vh;
}

.u-content {
  padding: 150px 60px 0;
  @include flex(column);
  align-items: center;
  justify-content: center;

  &__circle {
    background-color: $u-success;
    @include flex;
    border-radius: 100px;
    width: 60px;
    height: 60px;
    align-items: center;
    justify-content: center;
  }

  &__normal {
    font-size: 15px;
    color: $u-success;
    margin-top: 15px;
  }
}
</style>
