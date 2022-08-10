<template>
	<view class="record">
		<view class="record-container">
			<!-- 充值记录 -->
			<view class="cz-record" v-show="state.tabName === 'chongzhi'">
				<block v-for="(item, index) in state.czList" :key="index">
					<view class="cz-item">
						<view class="cz-left">
							<text>充值成功{{ item.number }}元</text>
							<text class="left-time">{{ item.create_date }}</text>
						</view>
						<view class="cz-right">
							<!-- <text class="cz-price">+ {{item.result_number}}</text> -->
							<text class="cz-price">
								{{ item.type == 'day' ? '天卡' : item.type == 'week' ? '周卡' : item.type == 'month' ? '月卡' : item.type == 'quarter' ? '季卡' : '年卡' }}
							</text>
						</view>
					</view>
				</block>
				<view class="load-more">
					<text v-show="state.czLoad">加载更多</text>
					<text v-show="!state.czLoad">没有更多了~</text>
				</view>
			</view>
			<!-- 消费记录 -->
			<view class="xf-record" v-show="state.tabName === 'xiaofei'">
				<block v-for="(item, index) in state.xfList" :key="index">
					<view class="xf-item">
						<view class="xf-left">
							<text>{{ item.book_title }}</text>
							<text class="left-title">{{ item.chapter_name }}</text>
							<text class="left-time">{{ item.create_date }} {{ item.create_time }}</text>
						</view>
						<text>- {{ item.pay_price }}阅币</text>
					</view>
				</block>
				<view class="load-more">
					<text v-show="state.xfLoad">加载更多</text>
					<text v-show="!state.xfLoad">没有更多了~</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { reactive, onMounted, defineComponent } from 'vue';
import { GetCurrentRouteOptions, IsEmptyObject } from '@/common/tools';
import store from '@/store/index';
import { PayApi } from '@/common/api';
import { ExtraProps, PayRecordProps } from '@/type/index';

interface RecordProps {
	extra: ExtraProps;
	data: PayRecordProps;
}

export default defineComponent({
	setup() {
		const state = reactive({
			tabName: 'xiaofei',
			czList: [],
			czTotal: null,
			czPage: 1,
			czLoad: false,
			xfList: [],
			xfTotal: null,
			xfPage: 1,
			xfLoad: false
		});

		const userId = store.getters.userId;

		const initData = async (type: 'XF' | 'CZ') => {
			let total, page, load, list, url;
			type === 'CZ'
				? [(total = 'czTotal'), (list = 'czList'), (page = 'czPage'), (load = 'czLoad'), (url = 'RechargeRecord')]
				: [(total = 'xfTotal'), (list = 'xfList'), (page = 'xfPage'), (load = 'xfLoad'), (url = 'BuyRecord')];

			let para = {
				user_id: userId,
				page: state[page],
				rows: 12
			};

			let record = ((await PayApi[url](para)) as RecordProps) || null;
			if (IsEmptyObject(record.data)) {
				state[load] = false;
				return;
			}
			if (record.extra.count < record.extra.rows) state[load] = false;
			state[total] = record.extra.count;
			record.data.forEach(item => state[list].push(item));

			console.log('state[list]', state[list]);
		};

		const MoreList = (type: 'XF' | 'CZ') => {
			let total, page, load, list, url;
			type === 'CZ'
				? [(total = 'czTotal'), (list = 'czList'), (page = 'czPage'), (load = 'czLoad'), (url = 'RechargeRecord')]
				: [(total = 'xfTotal'), (list = 'xfList'), (page = 'xfPage'), (load = 'xfLoad'), (url = 'BuyRecord')];
			let length = state[list].length;
			if (length >= state[total]) {
				state[load] = false;
				return;
			} else {
				state[page]++;
				initData(type);
			}
		};
		const handleTabNav = tab => {
			state.tabName = tab;
			handleBarTitle();
		};
		const handleBarTitle = () => {
			let title = state.tabName === 'xiaofei' ? '消费记录' : '充值记录';
			uni.setNavigationBarTitle({
				title
			});
		};

		onMounted(() => {
			const options = GetCurrentRouteOptions();
			state.tabName = options.tab;
			initData(state.tabName === 'xiaofei' ? 'XF' : 'CZ');
		});
		return {
			state,
			MoreList
		};
	},
	onReachBottom() {
		if (this.state.tabName === 'xiaofei') {
			this.MoreList('XF');
		} else {
			this.MoreList('CZ');
		}
	}
});
</script>

<style lang="less" scoped>
@import '../../common/less/const.less';

.record {
	width: 100%;
	.record-tabs {
		display: flex;
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		// padding: 0 30rpx;
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		.tab-nav {
			flex: 1;
			display: flex;
			justify-content: center;
			text {
				width: 190rpx;
				height: 84rpx;
				text-align: center;
				color: #333;
				font-size: 34rpx;
				border-bottom: 4rpx solid transparent;
			}
			.active-tab {
				border-bottom-color: @color-background-c;
			}
		}
	}
	.record-container {
		width: 100%;
		// padding-top: 45rpx;
		.cz-record,
		.xf-record {
			padding: 0 30rpx !important;
			text {
				color: #333;
			}
			.cz-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				height: 140rpx;
				border-bottom: 1rpx solid #d3d0cb;
				.cz-left {
					display: flex;
					flex-direction: column;
				}
				.cz-price {
					color: @color-background;
				}
			}
			.xf-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				height: 177rpx;
				border-bottom: 1rpx solid #d3d0cb;
				.xf-left {
					display: flex;
					flex-direction: column;
				}
			}
			.left-time {
				font-size: 24rpx;
				color: #999;
			}
			.left-title {
				font-size: 28rpx;
				color: #999;
			}
			.load-more {
				display: flex;
				justify-content: center;
				width: 100%;
				padding: 30rpx 0;
				> text {
					font-size: 24rpx;
				}
			}
		}
	}
}
</style>
