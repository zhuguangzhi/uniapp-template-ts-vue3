<template>
	<view class="user-info">
		<view class="user-bg"></view>
		<view class="user-main">
			<view class="user-head">
				<text v-if="state.userInfo.is_user_vip === 'Y'" class="icon-crown icon-fudon"></text>
				<image v-if="state.userInfo.user_image" :src="state.userInfo.user_image"></image>
				<image v-else src="@/static/icons/default-head.png"></image>
				<view class="have-login">
					<view>
						<text class="text-crown">{{state.userInfo.nick_name||state.userInfo.name}}</text>
						<text v-if="state.userInfo.is_user_vip === 'Y'" class="icon-crown"></text>
					</view>
				</view>
			</view>
			<view class="user-recharge">
				<text class="vip-time" v-if="state.userInfo.is_user_vip === 'Y'">会员到期：{{state.userInfo.end_time}}</text>
				<text class="vip-time" v-else>开通VIP会员</text>
				<text class='recharge-btn' v-if="state.userInfo.is_user_vip === 'Y'" @click="RoutePush('/pages/recharge/recharge?type=0')">立即续费</text>
				<text class='recharge-btn' v-else  @click="RoutePush('/pages/recharge/recharge?type=0')">立即开通</text>
			</view>
			<view class="box-xf" @click="RoutePush('/pages/recharge/PayRecord?tab=chongzhi')">
				<view>
					<image src="@/static/icons/user-cz.png"></image>
					<text>充值记录</text>
				</view>
				<text class="iconfont">&#xe70c;</text>
			</view>
			<view class="box-xf" @click="RoutePush('/pages/read/readList')">
				<view>
					<image src="@/static/icons/user-sc.png"></image>
					<text>最近阅读</text>
				</view>
				<text class="iconfont">&#xe70c;</text>
			</view>

		</view>
	</view>
</template>

<script lang="ts">
	import {
		defineComponent,
		reactive,onMounted
	} from 'vue'
	import {
		userInfoProps
	} from '@/type/index'
	import {RoutePush,IsEmptyObject} from '@/common/tools'
	import store from '@/store/index'

	interface stateProps {
		time: string,
			flag: number,
			userInfo: userInfoProps | {}

	}
	
	export default defineComponent({
		setup() {
			const state = reactive < stateProps > ({
				time: '',
				flag: 1,
				userInfo: {}
			})
			// 剪切板
			const copyService = (data: string) => {
				uni.setClipboardData({
					data,
					success: () => {
						uni.showToast({
							icon: 'success',
							title: '复制成功'
						})
					}
				})
			}
			return {
				state,
				copyService,
				RoutePush
			}
		},
		onShow(){
			this.state.userInfo = store.getters.userInfo
			console.log('this.state.userInfo',this.state.userInfo)
		}
	})
</script>

<style lang="less">
	@import '../../common/less/const.less';

	.user-info {
		width: 100%;

		.user-bg {
			width: 100%;
			height: 292rpx;
			background: url('~@/static/user-bg.jpg') no-repeat center;
			background-size: cover;
		}

		.user-main {
			// flex: 1;
			// flex-direction: column;
			// width: 100%;
			margin: 0 30rpx;
			margin-top: -270rpx;
			padding-bottom: 50rpx;
			position: relative;

			.user-head {
				display: flex;
				align-items: center;
				width: 100%;
				height: 251rpx;
				padding-bottom: 50rpx;
				background: url('~@/static/user-box.png') no-repeat center;
				background-size: cover;
				border-radius: 10px;

				>image {
					width: 138rpx;
					height: 138rpx;
					margin-left: 45rpx;
					border-radius: 50%;
				}

				.icon-fudon {
					position: absolute;
					top: 160rpx;
					left: 74rpx;
					display: inline-block;
					width: 84rpx;
					height: 40rpx;
					background: url('~@/static/icons/vip_re.png') no-repeat center;
					background-size: cover;
				}

				.not-login {
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;

					text {
						font-size: 24rpx;
					}

					.login-btn {
						font-size: 34rpx;
						font-weight: bold;
						color: #333;
					}
				}

				.have-login {
					display: flex;
					align-items: center;
					// flex-direction: column;
					margin-left: 20rpx;
					height: 100rpx;

					// justify-content:space-between;
					/* margin-top: 30rpx; */
					text {
						// font-size: 30rpx;
						color: #333;
					}

					.vip-time {
						margin-top: 10rpx;
						font-size: 24rpx;
					}

					.vip-time1 {
						font-size: 32rpx;
					}

					.text-crown {
						font-size: 36rpx;
					}

					.icon-crown {
						display: inline-block;
						width: 42rpx;
						height: 36rpx;
						margin-left: 10rpx;
						background: url('~@/static/icons/r-hg.png') no-repeat center;
						background-size: cover;
					}

					.bind-phone {
						/* display: none; */
						width: 200rpx;
						height: 50rpx;
						line-height: 50rpx;
						margin-top: 20rpx;
						text-align: center;
						background-color: @color-background;
						color: #fff;
						border-radius: 30rpx;
						font-size: 30rpx;
					}
				}
			}

			.user-recharge {
				display: flex;
				justify-content: space-between;
				align-items: center;
				// width: 100%;
				height: 88rpx;
				padding: 0 30rpx;
				margin-top: -50rpx;
				background: linear-gradient(to right, #FF6749, #FF4042);
				border-radius: 50rpx;

				text {
					color: #fff;
				}

				.recharge-btn {
					width: 147rpx;
					height: 55rpx;
					line-height: 55rpx;
					text-align: center;
					border: 1rpx solid #fff;
					border-radius: 30rpx;
				}
			}

			.user-money {
				display: flex;
				justify-content: space-around;
				align-items: center;
				width: 80%;
				margin: 0 auto;
				padding: 30rpx 0;

				.money-line {
					width: 2rpx;
					height: 50rpx;
					background-color: #999;
				}

				>view {
					display: flex;
					flex-direction: column;
					align-items: center;

					text {
						color: #333;
						font-size: 32rpx;
					}

					.money-num {
						font-size: 42rpx;
						font-weight: bold;
					}
				}
			}

			.box-xf {
				display: flex;
				justify-content: space-between;
				align-items: center;
				// width: 100%;
				height: 80rpx;
				padding: 0 10rpx;
				margin-top: 30rpx;
				border: 1rpx solid #E9E6E3;
				border-radius: 10rpx;

				>view {
					display: flex;
					align-items: center;
				}

				image {
					width: 65rpx;
					height: 65rpx;
					margin-right: 10rpx;
				}

				text {
					color: #333;
				}

				.qq-number {
					font-size: 24rpx;
					color: #999;
				}
			}

			.box-xf:active {
				background-color: #f1f1f1;
			}

			/* .box-bottom{
				margin-top: 30rpx;
				flex-direction: column;
				.box-xf{
					margin-top: 0;
				}
			} */
			.login-out {
				display: flex;
				justify-content: center;
				width: 100%;
				padding-bottom: 30rpx;
				margin-top: 70rpx;

				text {
					color: @color-background;
				}
			}
		}
	}
</style>
