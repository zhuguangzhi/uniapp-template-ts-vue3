<template>
	<view class="read-list">
		<block v-for="(item, index) in readlist" :key="index">
			<view class="item-book">
				<view class="read-book" @click="gotoRead(item.flow_id, item.book_id)">
					<view class="read-title">
						<image class="read-title_img" mode="widthFix" src="../../static/icons/cord_j.png"></image>
						<text class="title">{{ item.book_title }}</text>
					</view>
					<view class="read-author">
						<text>{{ item.pen_name }}:</text>
						<text>{{ item.content }}</text>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { BookApi } from '@/common/api';
import store from '@/store';
import { IsEmptyObject, RoutePush } from '@/common/tools';
import { ExtraProps, ReadListProps } from '@/type/index';

interface readListProps {
	extra: ExtraProps;
	data: ReadListProps;
}
const userId = store.getters.userId;
let readlist = ref(null);
const initData = async () => {
	const res = (await BookApi.ReadList({
		user_id: userId,
		page: 1,
		rows: 100
	})) as readListProps;
	if (IsEmptyObject(res.data)) return;
	readlist.value = res.data;
};
const gotoRead = (fId, bId) => {
	RoutePush(`/pages/read/read?totype=1&bid=${bId}`);
};

onMounted(() => {
	initData();
});
</script>

<style lang="less" scoped>
.read-list {
	width: 100%;
	.item-book {
		display: flex;
		align-items: center;
		margin: 0 30rpx;
		padding: 40rpx 0;
		border-bottom: 1rpx solid #e8e6e3;
		.read-book {
			display: flex;
			flex-direction: column;
			width: 100%;
			.read-title {
				display: flex;
				align-items: center;
				.read-title_img {
					width: 50rpx;
					margin-right: 10rpx;
				}
				.title {
					width: 600rpx;
					line-height: 58rpx;
					font-size: 36rpx;
					color: #333;
					font-weight: 600;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
			.read-author {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				text:nth-of-type(1) {
					margin-right: 8rpx;
				}
				text {
					line-height: 40rpx;
					color: #333;
					font-size: 30rpx;
				}
			}
			// .title{
			//   font-size: 34rpx;
			//   color: #333;
			// }
		}
	}
}
</style>
