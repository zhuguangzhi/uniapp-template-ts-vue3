import axios from './http'
export const User = {
	UserLogin:p=>axios.post(`/mini_login/kuaishouLogin`, p),
	UserInfo:p=>axios.post(`/user/userInfo`, p),
	RechargeConfig:p=>axios.post(`/recharge/rechargeConfig`, p)
}

// 支付相关
export const PayApi = {
	// 快手小程序支付
	CreateOrder:(p)=>axios.post(`/alipay/createOrder`,p),
	Agreement:()=>axios.post(`/xieyi/index`,{}),
	// 充值记录
	RechargeRecord:(p)=>axios.post(`/user/rechargeRecord`,p),
	// 消费记录
	BuyRecord:(p)=>axios.post(`/user/buyRecord`,p),
}
// 书籍相关
export const BookApi = {
	Flows:(p)=>axios.post(`/index/flows`, p),
	Chapter:p=>axios.post(`/chapter/read`, p),
	// 阅读记录
	AddReadRecord:p=>axios.post(`/chapter/addReadRecord`, p),
	// 最近阅读
	ReadList:p=> axios.post(`/user/readBookList`, p)
}