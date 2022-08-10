<template>
  <view class="agreement">
    <text>{{list}}</text>
  </view>
</template>

<script lang="ts" setup>
	import {ref,onMounted} from 'vue'
	import {PayApi} from '@/common/api'
	
	let list = ref(null)
	
	const getData = async ()=>{
		list.value  = await PayApi.Agreement()
	}
	onMounted(getData)

</script>

<style lang="less" scoped>
	.agreement {
		display: flex;
		flex-direction: column;
		padding: 0 30rpx;
		.title {
			font-weight: bold;
		}
		text{
			color: #333;
		}
	}
</style>