import { BASE_URL } from "./config"
import Store from '@/store/index'
import { requireSuccess } from "../type";
import {Message} from '@/common/tools'
const HEADER = {
    'content-type': 'application/x-www-form-urlencoded'
}; //头部

class Request {
    // get请求
    public async get(url, data={}) {
        return this.request({
            method: 'GET',
            url,
            data
        });
    }

    // post请求
    public async post(url, data={},header = null) {
        return this.request({
            method: 'POST',
            url,
            data
        });
    }
    

    private async request(options) {
        let headerObj = options.header || HEADER;
        const token = Store.getters.userInfo.api_token;
        if (token) {
            headerObj = {
                token: token,
                ...headerObj
            };
        }
        return new Promise((resolve, reject) => {
            uni.request({
                url: BASE_URL + options.url,
                method: options.method || 'GET',
                header: headerObj,
                data: options.data || {},
                dataType: 'json',
                success: (res:requireSuccess) => {
                    if (res.data.code && res.data.code !== 200) {
						Message(res.data.msg)
						uni.hideLoading()
						return null
                    }
                    return resolve(res.data);
                },
                fail: err => {
                    reject(err);
					return null
                }
            });
        });
    }
}

export default new Request();
