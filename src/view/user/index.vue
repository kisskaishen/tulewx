<template>
    <div class="userDiv">
        <div class="userInfoDiv">
            <img src="https://cdn2.pinquduo.cn/5b2324aa8ae6984510.jpg" alt="头像">
            <p class="ft36 cfff">0的离心率</p>
        </div>
        <div class="menuDiv">
            <div class="ft28">
                <p>
                    <i></i>
                    <span>我的订单</span>
                </p>
                <router-link to="">查看全部订单 <i></i></router-link>
            </div>
            <ul>
                <li v-for="item,index in menuList">
                    <router-link to="">
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
                menuList: [
                    {label: '已支付', value: '1'},
                    {label: '未支付', value: '2'},
                    {label: '已过期', value: '3'}
                ],
                moreList: [
                    {label: '游客列表', url: '/'},
                    {label: '我的信息', url: '/'},
                    {label: '常见问题', url: '/'},
                    {label: '关于途乐', url: '/'},

                ]
            }
        },
        components: {vFooter},
        mounted() {
        },
        methods: {}

    }
</script>

<style scoped lang="scss">
    .userDiv {
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
                margin-top: 40px;
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
                        padding: 26px 0;
                        i {
                            width: 80px;
                            height: 80px;
                        }
                        span {
                            margin-top: 20px;
                            font-size: 28px;
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
