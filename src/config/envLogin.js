import {baseUrl} from "./api";
import {setCookie} from "./util";
import urlSearch from "./urlSearch";
import router from '../router'

export default () => {
    let auto = {
        isWeiXin() {
            let ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                setCookie('isWeixin', true)
                return true;
            } else {
                return false;
            }
        },
        isQQ() {
            let ua = navigator.userAgent.toLowerCase();
            if (ua.match(/qq/i) == 'qq') {
                setCookie('isQQ', true)
                return true;
            } else {
                return false;
            }
        }
    }
    let currentHref = location.href         // 获取当前url
    if (auto.isWeiXin()) {
        if (location.search.indexOf('token') == '-1') {
            location.href = baseUrl + '/login/oauth?type=2&jump_url=' + currentHref
        } else {
            setCookie('token', urlSearch('token'))
        }
        console.log('这里是微信，调用微信自动登录的接口')
    } else if (auto.isQQ()) {
        if (location.search.indexOf('token') == '-1') {
            location.href = baseUrl + '/login/oauth?type=3&jump_url=' + currentHref
        } else {
            setCookie('token', urlSearch('token'))
        }
        console.log('这里是qq，调用qq自动登录的接口')
    } else {
        console.log('这里是网页版登录，可以手机号登录')
        setCookie('loginType', '网页版')
        router.push('/login')
    }
}
