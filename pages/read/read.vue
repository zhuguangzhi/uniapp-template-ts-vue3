<template>
	<scroll-view 
		class="book" 
		:scroll-y="true" 
		:scroll-with-animation="true" 
		@scroll="onPageScroll" 
		:scroll-top="state.scrollTop_tion"
	>
		<view class="read-content">
			<block v-for="(item, index) in state.book" :key="index">
				<view class="erview">{{ item }}</view>
			</block>
		</view>
		<view class="read-content" id="sllo_w" v-if="state.showVipButton">
			<view class="Genuine">支持正版阅读，激励作者创作</view>
			<view class="purchase" @click="()=>{
				RoutePush(`/pages/recharge/recharge?type=1&bid=${state.bookId}`)
			}">立即购买</view>
		</view>
	</scroll-view>
</template>

<script lang="ts">
import { reactive, onMounted, defineComponent } from 'vue';
import { showLoading, GetCurrentRouteOptions, IsEmptyObject,RoutePush } from '@/common/tools';
import { BookApi } from '@/common/api';
import store from '@/store/index';
import { RequireProps, ReadContentProps } from '@/type/index';

export default defineComponent({
	setup() {
		const state = reactive({
			book: [],
			bookId: null,
			userId: null,
			flowId: null,
			to_type: null,
			scrollTop_tion:0,//阅读的位置
			showVipButton:false,//展示是否购买vip的按钮
		});

		state.userId = store.getters.userId;

		const initData = async () => {
			console.log("出现了")
			showLoading('加载中...');
			const BookRes = (await BookApi.Chapter({
				user_id: state.userId,
				book_id: state.bookId
			})) as RequireProps<ReadContentProps>;
			if (IsEmptyObject(BookRes.data)) return;
			const BookInfo = BookRes.data
			console.log('BookInfo',BookInfo)
			state.scrollTop_tion = BookInfo.line
			
			// 用户是否是vip
			// 该书是否收费
			if(BookInfo.is_user_vip === "Y" || BookInfo.is_vip === 'N'){
				// vip用户 || 免费书籍
				state.book = BookInfo.content;
				uni.hideLoading()
				return;
			}
			
			// 该书免费阅读部分
			state.book = BookInfo.content.splice(0,BookInfo.vip_line-1)
			state.showVipButton = true
			uni.hideLoading()
		};

		onMounted(async () => {
			const options = await GetCurrentRouteOptions();
			state.flowId = options.id;
			state.to_type = options.totype;
			state.bookId = options.bid || 0;
			initData();
		});
		// 记录当前阅读的位置和书
		const saveReadRecord = async()=>{
			await BookApi.AddReadRecord({
				user_id: state.userId,
				book_id: state.bookId,
				line: state.scrollTop_tion
			})
		}
		const onPageScroll  = (e)=>{
			state.scrollTop_tion = e.detail.scrollTop
		}
		
		return {
			state,
			saveReadRecord,
			onPageScroll,
			RoutePush,
			initData
		};
	},
	onHide(){
		this.saveReadRecord()
	},
	onUnload(){
		this.saveReadRecord()
	}
});
</script>

<style lang="less" scoped>
.book {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: #f5eee9;
	::-webkit-scrollbar {
	  /*滚动条整体样式*/
	  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
	  height: 10px;
	}
	
}
.read-content {
	padding: 0 30rpx 80rpx 30rpx;

	.erview {
		color: #333;
		line-height: 1.5;
		text-indent: 2em;
		font-size: 36rpx;
		padding: 5rpx 0;
	}

	.Genuine {
		text-align: center;
		color: #999;
		font-size: 30rpx;
		margin: 40rpx auto;
	}

	.purchase {
		width: 420rpx;
		font-size: 34rpx;
		text-align: center;
		line-height: 90rpx;
		background: coral;
		border-radius: 50rpx;
		margin: 40rpx auto;
		color: #fff;
	}
}
</style>
