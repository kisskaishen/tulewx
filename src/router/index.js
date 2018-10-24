import Vue from 'vue'
import Router from 'vue-router'
import envLogin from '../config/envLogin'
import {getCookie} from "../config/util";

const IndexIndex = r => require.ensure([], () => r(require('@/view/index/index')), 'IndexIndex')

const ListIndex = r => require.ensure([], () => r(require('@/view/list/index')), 'ListIndex')
const ListActivity = r => require.ensure([], () => r(require('@/view/list/activity')), 'ListActivity')
const FruitIndex = r => require.ensure([], () => r(require('@/view/fruit/index')), 'FruitIndex')

const CartIndex = r => require.ensure([], () => r(require('@/view/cart/index')), 'CartIndex')

const EquipIndex = r => require.ensure([], () => r(require('@/view/equip/index')), 'EquipIndex')

const UserIndex = r => require.ensure([], () => r(require('@/view/user/index')), 'UserIndex')
const UserOrder = r => require.ensure([], () => r(require('@/view/user/order')), 'UserOrder')
const UserTravel = r => require.ensure([], () => r(require('@/view/user/travel')), 'UserTravel')
const UserMyInfo = r => require.ensure([], () => r(require('@/view/user/myInfo')), 'UserMyInfo')
const UserQuestion = r => require.ensure([], () => r(require('@/view/user/question')), 'UserQuestion')
const UserAbout = r => require.ensure([], () => r(require('@/view/user/about')), 'UserAbout')

const DetailIndex = r => require.ensure([], () => r(require('@/view/detail/index')), 'DetailIndex')

const PayIndex = r => require.ensure([], () => r(require('@/view/pay/index')), 'PayIndex')
const OrderIndex = r => require.ensure([], () => r(require('@/view/order/index')), 'OrderIndex')


Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/index',
            component: IndexIndex,
            children: [
                {
                    path: '/index',
                    component: IndexIndex,
                    meta: {
                        title: '途乐户外商城',
                        login: true
                    }
                }
            ],
            meta: {
                title: '途乐户外商城',
                login: true
            }
        },
        {

            path: '/list/index',
            component: ListIndex,
            meta: {
                title: '票务专区',
                login: false
            }
        },
        {

            path: '/list/activity',
            component: ListActivity,
            meta: {
                title: '活动专区',
                login: false
            }
        },
        {

            path: '/fruit/index',
            component: FruitIndex,
            meta: {
                title: '果蔬专区',
                login: false
            }
        },
        {

            path: '/cart/index',
            component: CartIndex,
            meta: {
                title: '惠民卡',
                login: false
            }
        },
        {
            path: '/equip/index',
            component: EquipIndex,
            meta: {
                title: '装备专区',
                login: false
            }
        },
        {
            path: '/user/index',
            component: UserIndex,
            meta: {
                title: '个人中心',
                login: true
            }
        },
        {
            path: '/user/order',
            component: UserOrder,
            meta: {
                title: '订单列表',
                login: true
            }
        },
        {
            path: '/order/index',
            component: OrderIndex,
            meta: {
                title: '订单详情',
                login: true
            }
        },
        {
            path: '/user/travel',
            component: UserTravel,
            meta: {
                title: '游客列表',
                login: true
            }
        },
        {
            path: '/user/myInfo',
            component: UserMyInfo,
            meta: {
                title: '我的信息',
                login: true
            }
        },
        {
            path: '/user/question',
            component: UserQuestion,
            meta: {
                title: '常见问题',
                login: true
            }
        },
        {
            path: '/user/about',
            component: UserAbout,
            meta: {
                title: '关于途乐',
                login: true
            }
        },
        {
            path: '/detail/index',
            component: DetailIndex,
            meta: {
                title: '商品详情',
                login: true
            }
        },
        {
            path: '/pay/index',
            component: PayIndex,

            meta: {
                title: '提交订单',
                login: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((item) => item.meta.login)) {
        let member_id = getCookie('member_id')
        if (member_id) {
            next();
        } else {
            envLogin()
        }
    }
    next()

    window.document.title = to.meta.title
})
router.afterEach((to, from, next) => {
    if (to.fullPath!='/index') {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        window.pageYOffset = 0
    }
})


export default router;
