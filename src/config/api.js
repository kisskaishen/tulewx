import vue from 'vue'
import axios from 'axios'
import qs from 'qs'


import {Indicator} from 'mint-ui';
import {Toast} from 'mint-ui';
import {getCookie} from "./util";

axios.defaults.timeout = 15000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; 		// 请求头


axios.defaults.baseURL = 'https://api.jztule.com/public/index.php/'			// 开发公共接口


// 请求拦截器
axios.interceptors.request.use((config) => {
        return config
    }, (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
axios.interceptors.response.use((response) => {
        return response
    }, (error) => {
        return Promise.reject(error)
    }
)

// 封装axios
export let baseUrl = axios.defaults.baseURL

// get
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: params})
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                Indicator.close();
                reject(error)
            })
    })
}

// post
export function post(url, data) {

    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(data))
            .then((response) => {
                if (response.data.code == '200') {
                    resolve(response.data)
                }
            })
            .catch((error) => {
                reject(error)
            })
    })
}

// upload
export function upload(url, data) {
    return new Promise((resolve, reject) => {
        Indicator.open({
            text: '上传中...',
            spinnerType: 'snake'
        });
        axios.post(url, data)
            .then((response) => {
                Indicator.close();
                if (response.data.code == '200') {
                    resolve(response.data.data.result)
                } else {
                    if (url != 'login/getTokenInfo') {
                        let instance = Toast(response.data.msg);
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    }
                }

            })
            .catch((error) => {
                Indicator.close();
                Toast({
                    message: '请求失败，请重试',
                })
                reject(error)
            })
    })
}
