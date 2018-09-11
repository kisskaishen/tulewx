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
            // location.href = baseUrl + '/login/oauth?type=2&jump_url=' + currentHref
            location.href = baseUrl + '/member/Wxchat/get_snsapi_userinfo'
        } else {
            setCookie('member_id', urlSearch('member_id'))
        }
        console.log('这里是微信，调用微信自动登录的接口')
    // } else{
    //     console.log('这里是网页版登录，可以手机号登录')
    //     router.push('/404')
    }
}
// https://open.weixin.qq.com/connect/oauth2/authorize?
// // appid=wxbd86cc1c2f5326b0&
// // redirect_uri=http%3A%2F%2Fapi.jztule.com%2Fpublic%2Findex.php%2Fmember%2FWxchat%2Fget_snsapi_userinfo
// &response_type=code
// &scope=snsapi_userinfo
// &state=aHR0cHM6Ly93eC5qenR1bGUuY29tLw==
// &uin=MTU3MjExNjYxMA%3D%3D
// &key=60090eda14dca763bd4e26bc68e9f406cada0a7f54845d9db0ac2499715b0b3c245c2cc6b9b2fd52ba78f2dbb162e313
// &pass_ticket=gMbptVcCBSaIXEh1teA7ojDt1aJFVYW6xDSfwcsBog1lSdl2hhizfeCoMt25VFDU7nPhwtX+uEAUrW+oY0jl6w==
