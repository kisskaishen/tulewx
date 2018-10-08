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
    // let currentHref = encodeURI(location.href)         // 获取当前url
    let currentHref = location.href         // 获取当前url
    if (auto.isWeiXin()) {
        if (location.search.indexOf('member_id') == '-1') {
            // location.href = baseUrl + '/login/oauth?type=2&jump_url=' + currentHref
            location.href = baseUrl + 'member/Wxchat/get_snsapi_userinfo?next=' + currentHref
        } else {
            setCookie('member_id', urlSearch('member_id'))
            setCookie('member_nickname', urlSearch('member_nickname'))
            setCookie('member_avatar', urlSearch('member_avatar'))
            if (urlSearch('member_id')) {
                location.href = location.href.split('member_id')[0]
            }
        }
        console.log('这里是微信，调用微信自动登录的接口')
        // } else{
        //     console.log('这里是网页版登录，可以手机号登录')
        //     router.push('/404')
    }
}
