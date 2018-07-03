import Vue from 'vue'
import Router from 'vue-router'

const IndexIndex = r => require.ensure([], () => r(require('@/view/index/index')), 'IndexIndex')

const EquipIndex = r => require.ensure([], () => r(require('@/view/equip/index')), 'EquipIndex')

const UserIndex = r => require.ensure([], () => r(require('@/view/user/index')), 'UserIndex')

const DetailIndex = r => require.ensure([], () => r(require('@/view/detail/index')), 'DetailIndex')


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: IndexIndex,
            children: [
                {
                    path: '/index',
                    component: IndexIndex,
                    children: [
                        {
                            path: '/index/index',
                            component: IndexIndex,
                            meta: {
                                title: '首页',
                                login: false
                            }
                        }
                    ],
                    meta: {
                        title: '首页',
                        login: false
                    }
                }
            ],
            meta: {
                title: '首页',
                login: false
            }
        },
        {
            path: '/equip',
            component: EquipIndex,
            children: [
                {
                    path: '/equip/index',
                    component: EquipIndex,
                    meta: {
                        title: '装备专区',
                        login: false
                    }
                }
            ],
            meta: {
                title: '装备专区',
                login: false
            }
        },
        {
            path: '/user',
            component: UserIndex,
            children: [
                {
                    path: '/user/index',
                    component: UserIndex,
                    meta: {
                        title: '个人中心',
                        login: true
                    }
                }
            ],
            meta: {
                title: '个人中心',
                login: true
            }
        },
        {
            path: '/detail',
            component: DetailIndex,
            children: [
                {
                    path: '/detail/index',
                    component: DetailIndex,
                    meta: {
                        title: '商品详情',
                        login: false
                    }
                }
            ],
            meta: {
                title: '商品详情',
                login: false
            }
        },
    ]
})
