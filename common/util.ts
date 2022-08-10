import { User } from "./api"
import store from "../store/index"
import { requireSuccess,RequireProps,userInfoProps } from "../type"
import { IsEmptyObject } from "./tools"

// 登录
export const Login = (call?:Function)=>{
	uni.login({
		// provider:e.provider[0],
		success: async (res) => {
			console.log('res',res)
			const LoginRes = await User.UserLogin({code:res.code}) as RequireProps<userInfoProps>
			if(IsEmptyObject(LoginRes.data)) return;
			store.commit('login',LoginRes.data)
			call && call()
		}
	})
}
// 更新用户信息
export const UpdataUserInfo =async ()=>{
	const user_id = store.getters.userId
	const userInfoRes  = await User.UserInfo({user_id}) as RequireProps<userInfoProps>
	if (IsEmptyObject(userInfoRes.data)) return;
	store.commit('login',userInfoRes.data)
	return userInfoRes.data
}
