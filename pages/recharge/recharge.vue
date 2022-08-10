<template>
	<view class="recharge">
		<view class="recharge-bg"></view>
		<view class="container">
			<view class="pay-main">
				<block v-for="(item, index) in state.list" :key="index">
					<view class="pay-item">
						<view class="item-left">
							<view :class="['price',`price${index}`]"></view>
							<view class="item-price">
								<view class="price-top">
									<view>
										<text>￥</text>
										<text style="font-size:48rpx;">{{item.money}}</text>
									</view>
								</view>
								<view class="price-baonian">
									<view class="icons-hg"></view>
									<text>{{item.title}}</text>
								</view>
							</view>
						</view>
						<view class="item-right" @click="weaerback(item.money)">
							<text>充值</text>
						</view>
						<view v-if="item.is_hot == 'Y'" class="item-recommend"></view>
					</view>
				</block>

			</view>
			<view class="rule">
				<text>＊开通前请阅读</text>
				<navigator class="color-red" url="/pages/recharge/serviceAgreement">《会员服务协议》</navigator>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		defineComponent,
		reactive,
		onMounted
	} from 'vue'
	import store from '@/store/index'
	import {
		PayApi,
		User
	} from '../../common/api'
	import {
		IsEmptyObject,
		Message,
		GetCurrentRouteOptions
	} from '@/common/tools'
	import {
		RequireProps,createPayProps,vipTypeListProps,userInfoProps
	} from '@/type/index'
	import {UpdataUserInfo} from '@/common/util'

	export default defineComponent({
		setup() {
			const state = reactive({
				urltype: 0,
				bookId: '',
				list: [],
			})
			const userId = store.getters.userId
			// 充值
			const weaerback = async (money) => {
				
				//#ifdef MP-KUAISHOU
				let param = {
					user_id: userId,
					// money: money,
					money: 0.01,
					fromtype: state.urltype,
					bid: state.bookId
				}
				let createPayRes = await PayApi.CreateOrder(param) as RequireProps<createPayProps>
				if (IsEmptyObject(createPayRes.data)) return;
				ks.pay({
					serviceId: '1',
					orderInfo: {
						order_no: createPayRes.data.order_no,
						order_info_token: createPayRes.data.order_info_token,
					},
					success: async (e) => {
						const userInfo = await UpdataUserInfo() as userInfoProps
						if (IsEmptyObject(userInfo)) return false
						let pages = getCurrentPages(); //获取所有页面栈实例列表   //当前页页面实例
						let prevPage = pages[pages.length - 2]; //上一页页面实例
						if (userInfo.is_user_vip != 'Y') {
							Message("充值异常")
							setTimeout(function() {
								uni.hideLoading()
								uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
									delta: 1
								});
							}, 2000);
							return;
						}
						Message("充值成功")
									
						setTimeout(function() {
							// 如果上一页是阅读页则调用上一页的初始化方法
							if(state.urltype == 1){
								// 阅读页
								const page = getCurrentPages()
								const prePage = page[page.length - 2]
								prePage.$vm.initData()
							}
							uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
								delta: 1
							});
						}, 2000);
					}
				})
			
				//#endif
			}
			const initData = async () => {
				let data= await User.RechargeConfig({}) as RequireProps<vipTypeListProps[]> 
				state.list  = data.data || []
			}
			onMounted(async ()=>{
				initData()
				const option = await GetCurrentRouteOptions()
				state.urltype = option.type
				state.bookId = option.bid == 'null' ? 0 : option.bid
			})
			
			return {
				state,
				weaerback
			}
		},
	})
</script>

<style lang="less">
	@import '@/common/less/const.less';

	.recharge {
		width: 100%;

		.recharge-bg {
			width: 100%;
			height: 366rpx;
			background: url('~@/static/icons/recharge-bg.png') no-repeat center;
		}

		.container {
			// width: 100%;
			padding: 0 60rpx;
			margin-top: -330rpx;

			.pay-title {
				font-size: 36rpx;
				color: #fff;
			}

			.pay-tab {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;

				text {
					width: 50%;
					padding: 25rpx 0;
					text-align: center;
					color: #fff;
					font-size: 34rpx;
				}

				.active-tab {
					border-bottom: 4rpx solid #fff;
				}
			}

			.pay-main {
				width: 100%;
				margin-top: 100rpx;
				background-color: #fff;
				border: 1rpx solid #DFE6F3;

				.pay-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					// width: 100%;
					height: 166rpx;
					padding: 0 35rpx;
					border-bottom: 1rpx solid #F1F1EF;
					position: relative;

					.item-left {
						display: flex;

						.item-price {
							margin-left: 20rpx;

							.price-top {
								display: flex;
								align-items: center;

								text {
									font-size: 26rpx;
									color: #333;
								}

								.price-yuanjia {
									margin-left: 10rpx;
									text-decoration: line-through;
								}
							}

							.price-bottom {
								color: #999;
								font-size: 32rpx;
							}

							.price-baonian {
								display: flex;

								.icons-hg {
									width: 42rpx;
									height: 36rpx;
									margin-right: 5rpx;
									background: url('~@/static/icons/r-hg.png') no-repeat center;
									background-size: cover;
								}

								text {
									color: #999;
									font-size: 32rpx;
								}
							}
						}

						.price {
							width: 91rpx;
							height: 91rpx;
							background-repeat: no-repeat;
							background-position: center;
							background-size: cover;
						}

						.price0 {
							background-image: url('~@/static/icons/r-price0.png');
						}

						.price1 {
							background-image: url('~@/static/icons/r-price1.png');
						}

						.price2 {
							background-image: url('~@/static/icons/r-price2.png');
						}

						.price3 {
							background-image: url('~@/static/icons/r-price3.png');
						}

						.price4 {
							background-image: url('~@/static/icons/r-price4.png');
						}
					}

					.item-right {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 173rpx;
						height: 80rpx;
						background: linear-gradient(#FF4042, #FF8B5D);
						border-radius: 50rpx;

						text {
							font-size: 34rpx;
							color: #fff;
						}
					}

					.item-right:active {
						opacity: 0.8;
					}

					.item-recommend {
						width: 92rpx;
						height: 35rpx;
						background: url('~@/static/icons/r-tj.png') no-repeat center;
						background-size: cover;
						position: absolute;
						top: 0;
						left: 0;
					}
				}
			}

			.rule {
				margin-top: 30rpx;
				font-size: 25rpx;
				display: flex;

				.color-red {
					color: @color-background;
				}
			}
		}
	}
</style>
