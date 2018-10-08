<template>
    <div class="userDiv">
        <div class="userInfoDiv">
            <img :src="member_avatar" alt="头像">
            <p class="ft36 cfff">{{member_nickname}}</p>
            <p class="ft28 cfff" @click="goMyInfo" v-if="isBanding=='0'">（点击绑定信息）</p>
            <p class="ft28 cfff" v-else>{{bindingInfo.member_mobile}}</p>
        </div>
        <div class="menuDiv">
            <div class="ft28">
                <p>
                    <i></i>
                    <span>我的订单</span>
                </p>
                <router-link to="/user/order">查看全部订单<i></i></router-link>
            </div>
            <ul>
                <li v-for="item,index in menuList">
                    <router-link :to="`/user/order?type=${item.value}`">
                        <i></i>
                        <span>{{item.label}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="moreDiv">
            <ul>
                <li v-for="item,index in moreList">
                    <router-link :to="item.url">
                        <p>
                            <i class="icon-font"></i>
                            <span class="ft28 c666">{{item.label}}</span>
                        </p>
                        <i class="icon-right"></i>
                    </router-link>
                </li>
            </ul>
        </div>
        <p style="margin-top: 20px" class="ft24 c999">途乐商城v1.0</p>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import vFooter from '../../components/vfooter'

    export default {
        name: "userindex",
        data() {
            return {
                member_avatar:'',
                member_nickname:'',
                menuList: [
                    {label: '已支付', value: '20'},
                    {label: '未支付', value: '10'},
                    {label: '已过期', value: '3'}
                ],
                moreList: [
                    {label: '游客列表', url: '/user/travel'},
                    {label: '我的信息', url: '/user/myInfo'},
                    {label: '常见问题', url: '/user/question'},
                    {label: '关于途乐', url: '/user/about'},
                ],
                isBanding: '0',
                bindingInfo:{},         // 绑定信息
            }
        },
        components: {vFooter},
        mounted() {

            this.isBinding()
        },
        methods: {
            // 判断是否绑定
            isBinding() {
                let that = this
                this.$post('member/member/member_index', {
                    member_id: this.$getCookie('member_id')
                })
                    .then(res => {
                        if (res.code == '200') {
                            this.isBanding = res.data.is_bind_info
                            if (res.data.is_bind_info=='1') {
                                this.getUserInfo()
                            }
                        }
                    })
            },
            // 获取个人信息
            getUserInfo() {
                this.$post('member/member/member_info', {
                    member_id: this.$getCookie('member_id')
                })
                    .then(res => {
                        if (res.code == '200') {
                            this.bindingInfo = res.data
                            this.member_nickname = decodeURI(decodeURI(this.$getCookie('member_nickname')))
                            this.member_avatar = this.$getCookie('member_avatar')
                        }
                    })
            },
            // 点击绑定信息
            goMyInfo() {
                this.$router.push('/user/myInfo')
            },
        }

    }
</script>

<style scoped lang="scss">
    .userDiv {
        padding-bottom: 100px;
        .userInfoDiv {
            width: 100%;
            padding: 60px 0;
            background: linear-gradient(to right, #ff8484, #ff464e);
            img {
                width: 160px;
                height: 160px;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
            }
            p {
                margin-top: 20px;
            }

        }
        .menuDiv {
            padding: 0 26px;
            background-color: #fff;
            > div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 0;
                border-bottom: 1px solid #eee;
                p {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    i {
                        width: 36px;
                        margin-right: 10px;
                        background: url("../../imgs/icon-order.png") no-repeat center /100%;
                    }
                }
                a {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    i {
                        width: 30px;
                        background: url("../../imgs/icon-right.png") no-repeat center /100%;
                    }
                }
            }
            ul {
                display: flex;
                justify-content: center;
                align-items: center;
                li {
                    flex: 1;
                    a {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 16px 0;
                        i {
                            width: 60px;
                            height: 60px;
                        }
                        span {
                            margin-top: 8px;
                            font-size: 26px;
                            color: #666;
                        }
                    }
                    &:nth-child(1) {
                        i {
                            background: url("../../imgs/icon-is-pay.png") no-repeat center /100%;
                        }
                    }
                    &:nth-child(2) {
                        i {
                            background: url("../../imgs/icon-no-pay.png") no-repeat center /100%;
                        }
                    }
                    &:nth-child(3) {
                        i {
                            background: url("../../imgs/icon-overdue.png") no-repeat center /100%;
                        }
                    }
                }
            }
        }
        .moreDiv {
            padding: 0 26px;
            margin-top: 20px;
            background-color: #fff;
            ul {
                li {
                    a {
                        padding: 20px 0;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1px solid #eee;
                        p {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            .icon-font {
                                width: 50px;
                                height: 50px;
                            }
                            span {
                                margin-left: 20px;
                            }
                        }
                        .icon-right {
                            width: 30px;
                            background: url("../../imgs/icon-right.png") no-repeat center /100%;

                        }
                    }
                    &:nth-child(1) {
                        .icon-font {
                            background: url("../../imgs/icon-travel.png") no-repeat center /100%;
                        }
                    }
                    &:nth-child(2) {
                        .icon-font {
                            background: url("../../imgs/icon-mine.png") no-repeat center /100%;
                        }
                    }
                    &:nth-child(3) {
                        .icon-font {
                            background: url("../../imgs/icon-question.png") no-repeat center /100%;
                        }
                    }
                    &:nth-child(4) {
                        .icon-font {
                            background: url("../../imgs/icon-about.png") no-repeat center /100%;
                        }
                    }
                }
            }
        }
    }

</style>
