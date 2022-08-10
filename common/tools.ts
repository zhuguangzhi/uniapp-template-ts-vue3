import store from "@/store/index"
import { Login } from "./util"
//  本地缓存
export const setStorage = (key: string, value: unknown) => {
	uni.setStorageSync(key, JSON.stringify(value))
}
// 获取缓存
export const getStorage = (key: string) => {
	const res = uni.getStorageSync(key)
	return JSON.parse(res) || null
}
// 删除指定缓存
export const removeStorage = (key: string) => {
	uni.removeStorageSync(key)
}
// 清空缓存
export const clearStorage = () => uni.clearStorageSync()

// 判断对象是否为空
export const IsEmptyObject = (obj: object) => {
	
	if (obj == null){
		uni.hideLoading()
		return true
	}
	if (Object.keys(obj).length === 0) {
		return true
	} else {
		uni.hideLoading()
		return false
	}
}
// 路由跳转
type typeProps = 'navigateTo'|'redirectTo'|'reLaunch'|'switchTab'
export const RoutePush = (url: string, type:typeProps = "navigateTo") => {
	const userInfo = store.getters.userInfo
	if (IsEmptyObject(userInfo)) Login()
	switch (type){
		case 'navigateTo':
			uni.navigateTo({url});
			break;
		case 'redirectTo':
			uni.redirectTo({url});
			break;
		case 'reLaunch':
			uni.reLaunch({url});
			break;
		case 'switchTab':
			uni.switchTab({url});
			break;
	}	
}
// 消息提示
export const Message = (msg:string = '加载中', time:number = 2000, mask:boolean = false)=> {
	uni.showToast({
		title: msg,
		icon: 'none',
		duration: time,
		mask: mask
	})
}
// 加载
export const showLoading = (title:string='加载中',mask:boolean=true)=>{
	uni.showLoading({
		title:title,
		mask:mask,
	})
}
// 获取当前路由参数
export const GetCurrentRouteOptions = ()=>{
	const currentRoute = getCurrentPages()
	const option = (currentRoute[currentRoute.length - 1] as any).options
	return option
}