import Vue from 'vue'
import { createStore } from 'vuex'
import { getStorage, IsEmptyObject, removeStorage, setStorage } from '../common/tools'
import { userInfoProps } from '../type/index'
import Constant from '../common/constant'

interface StateType {
	userId?: string,
	token?: string,
	userInfo: userInfoProps | {}
}

export default createStore({
	state: {
		userId: null,
		token: null,
		userInfo: {}
	} as StateType,
	getters: {
		userId: state => {
			return state.userId || (getStorage(Constant.storageUserKey) as userInfoProps || null)?.user_id
		},
		userInfo: state => {
			return state.userInfo
		}
	},
	mutations: {
		login(state, payload: userInfoProps) {
			state.userId = payload.user_id
			state.userInfo = payload
			state.token = payload.api_token
			setStorage(Constant.storageUserKey, payload)
		},
		deleteUserInfo(state) {
			state.userId = ''
			state.token = ''
			state.userInfo = {}
			removeStorage(Constant.storageUserKey)
		}
	}
})
