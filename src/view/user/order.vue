<template>
    <div class="orderDiv">
        <mt-navbar v-model="selected" fixed>
            <mt-tab-item id="0">全部订单</mt-tab-item>
            <mt-tab-item id="20">已支付</mt-tab-item>
            <mt-tab-item id="10">未支付</mt-tab-item>
            <mt-tab-item id="3">已过期</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="0">
                <ul>
                    <li v-for="item,index in orderList">
                        <router-link :to="`/order/index?order_id=${item.order_id}`">
                            <div class="divFl">
                                <img :src="item.goods_image" :alt="item.goods_name">
                            </div>
                            <div class="divFr">
                                <p>订单号：{{item.order_sn}}</p>
                                <p>名称：{{item.goods_name}}</p>
                                <p>价格：{{item.order_amount}}</p>
                                <p>出行时间：{{item.leave_date}}</p>
                                <p>支付状态：{{item.order_state}}</p>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="20">
                <ul>
                    <li v-for="item,index in orderList">
                        <router-link :to="`/order/index?order_id=${item.order_id}`">
                            <div class="divFl">
                                <img :src="item.goods_image" :alt="item.goods_name">
                            </div>
                            <div class="divFr">
                                <p>订单号：{{item.order_sn}}</p>
                                <p>名称：{{item.goods_name}}</p>
                                <p>价格：{{item.order_amount}}</p>
                                <p>出行时间：{{item.leave_date}}</p>
                                <p>支付状态：{{item.order_state}}</p>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="10">
                <ul>
                    <li v-for="item,index in orderList">
                        <router-link :to="`/order/index?order_id=${item.order_id}`">
                            <div class="divFl">
                                <img :src="item.goods_image" :alt="item.goods_name">
                            </div>
                            <div class="divFr">
                                <p>订单号：{{item.order_sn}}</p>
                                <p>名称：{{item.goods_name}}</p>
                                <p>价格：{{item.order_amount}}</p>
                                <p>出行时间：{{item.leave_date}}</p>
                                <p>支付状态：{{item.order_state}}</p>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <ul>
                    <li v-for="item,index in orderList">
                        <router-link :to="`/order/index?order_id=${item.order_id}`">
                            <div class="divFl">
                                <img :src="item.goods_image" :alt="item.goods_name">
                            </div>
                            <div class="divFr">
                                <p>订单号：{{item.order_sn}}</p>
                                <p>名称：{{item.goods_name}}</p>
                                <p>价格：{{item.order_amount}}</p>
                                <p>出行时间：{{item.leave_date}}</p>
                                <p>支付状态：{{item.order_state}}</p>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </mt-tab-container-item>
        </mt-tab-container>
        <img src="../../imgs/icon-no-order.png" alt="" v-if="orderList==''">
    </div>
</template>

<script>
    export default {
        name: "order",
        data() {
            return {
                selected: this.$route.query.type || '0',
                orderList: [],           // 订单列表
            }
        },
        mounted() {
            this.getOrderList(1)
        },
        methods: {
            getOrderList(page) {
                this.$post('order/Order/order_list', {
                    member_id: this.$getCookie('member_id'),
                    order_state: this.selected,
                    page: page
                })
                    .then(res => {
                        if (res.code == '200') {
                            this.orderList = [...this.orderList, ...res.data]
                        }
                    })
            }
        },
        watch: {
            selected(val) {
                this.orderList = []
                this.getOrderList(1)
            }
        }
    }
</script>
<style lang="scss">
    .orderDiv {
        .mint-navbar {
            .mint-tab-item {
                padding: 26px 0;
                .mint-tab-item-label {
                    font-size: 28px !important;
                }
            }
            .is-selected {
                border-bottom: 6px solid #ff464e;
                font-weight: bold;
                color: #ff464e;
            }
        }
    }
</style>
<style scoped lang="scss">
    .orderDiv {
        > img {
            width: 414px;
            margin-top: 40px;
        }
        .mint-tab-container {
            margin-top: 100px;
            .mint-tab-container-item {
                ul {
                    li {
                        margin-bottom: 20px;
                        a {
                            padding: 10px 26px;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            background-color: #fff;
                            .divFl {
                                margin-right: 20px;
                                img {
                                    display: block;
                                    width: 200px;
                                    height: 180px;
                                    border: 1px solid #eee;
                                }
                            }
                            .divFr {
                                width: 100%;
                                p {
                                    width: 100%;
                                    height: 44px;
                                    line-height: 44px;
                                    text-align: left;
                                    overflow: hidden;
                                    -ms-text-overflow: ellipsis;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    font-size: 28px;
                                    color: #555;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
