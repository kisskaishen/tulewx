<template>
    <div class="orderDiv">
        <div class="orderInfo">
            <div class="divFl">
                <img :src="orderInfo.goods_image" :alt="orderInfo.goods_name">
            </div>
            <div class="divFr">
                <p>订单号：{{orderInfo.order_sn}}</p>
                <p>名称：{{orderInfo.goods_name}}</p>
                <p class="c333">总金额：{{orderInfo.order_amount}}</p>
                <p>支付单号：{{orderInfo.pay_sn}}</p>
                <p>支付状态：{{orderInfo.order_state}}</p>
            </div>
        </div>
        <div class="orderTravel">
            <ul>
                <li v-for="item,index in orderInfo.visiter_arr">
                    <div class="title"><b></b><span>{{item.visit_name}}的信息</span></div>
                    <div class="traval">
                        <p><label>姓名</label><span>{{item.visit_name}}</span></p>
                        <p><label>手机号</label><span>{{item.visit_phone}}</span></p>
                        <p><label>身份证</label><span>{{item.vist_idcard_num}}</span></p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="btnDiv">
            <button class="goBuyBtn">继续购买</button>
            <button class="goHomeBtn">回到首页</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "orderIndex",
        data() {
            return {
                orderInfo:{}
            }
        },
        mounted() {
            this.getOrderInfo()
        },
        methods: {
            getOrderInfo() {
                this.$post('order/Order/order_detail', {
                    order_id: this.$route.query.order_id
                })
                    .then(res => {
                        if (res.code == '200') {
                            this.orderInfo = res.data
                        }
                    })
            }
        },
    }
</script>

<style scoped lang="scss">
    .orderDiv {
        .orderInfo {
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
        .orderTravel {
            margin-top: 20px;
            ul {
                li {
                    margin-bottom: 10px;
                    background-color: #fff;
                    padding: 20px 26px;
                    .traval {
                        padding: 10px 20px;
                        p {
                            padding: 12px 0;
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 26px;
                            border-bottom: 2px solid #eee;
                            label {
                                color: #666;
                            }
                        }
                    }
                }
            }
        }
        .btnDiv {
            display: flex;
            justify-content: space-around;
            align-items: center;
            button {
                width: 240px;
                height: 80px;
                font-size: 32px;
                -webkit-border-radius: 20px;
                -moz-border-radius: 20px;
                border-radius: 20px;
            }
            .goBuyBtn {
                background: linear-gradient(to right, #ff8484, #ff464e);
            }
            .goHomeBtn {
                color: #ff464e;
                border: 2px solid #ff464e;
                background-color: transparent;
            }

        }
    }
</style>
