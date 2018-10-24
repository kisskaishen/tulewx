<template>
    <div class="detailDiv">
        <div class="bannerDiv">
            <mt-swipe :auto="4000" :showIndicators="false" @change="handleChange">
                <mt-swipe-item>
                    <img :src="ticketInfo.ticket_img" alt="商品图片">
                </mt-swipe-item>
            </mt-swipe>
            <div class="switchDiv">
                {{index}}/1
            </div>
        </div>
        <div class="detailDiv">
            <div class="divFl">
                <p class="name ft32 c666">{{ticketInfo.ticket_name}}</p>
                <p class="other">
                    <label class="ft28 c666">发车时间：</label>
                    <span class="ft30 c333">{{ticketInfo.leave_date}}</span>
                </p>
                <p class="other">
                    <label class="ft28 c666">已报名：</label>
                    <span class="ft30 c333">{{ticketInfo.enrolled}}</span>
                <p class="other ft30 c666">
                    <label class="ft28 c666">剩余座位：</label>
                    <span class="ft30 c333">{{ticketInfo.real_num}}</span>
                </p>
                <p class="other">
                    <label class="ft28 c666">儿童价：</label>
                    <b class="ft30 cff464e">￥{{ticketInfo.child_price}}</b>
                </p>
            </div>
            <div class="divFr">
                <b class="ft48 cff464e">￥{{ticketInfo.sale_price}}</b>
            </div>
        </div>
        <div class="moreDetailDiv">
            <div class="moreDiv">
                <p class="title">
                    <b></b>
                    <span>行程安排</span>
                </p>
                <div class="content ft26 c999">{{ticketInfo.scheduling}}</div>
            </div>
            <div class="moreDiv">
                <p class="title">
                    <b></b>
                    <span>注意事项</span>
                </p>
                <div class="content ft26 c999">{{ticketInfo.attention}}</div>
            </div>
            <div class="moreDiv">
                <p class="title">
                    <b></b>
                    <span>景点介绍</span>
                </p>
                <div class="content ft26 c999">{{ticketInfo.introduce}}</div>
            </div>
        </div>
        <div class="photoDiv">
            <p class="title">
                <b></b>
                <span>景区图片</span>
            </p>
            <div v-for="item,index in ticketInfo.images">
                <img v-lazy="item.image" alt="">
            </div>
        </div>
        <div class="btnDiv">
            <div class="btn">
                <div class="goHome ft666" @click="goHome"><i></i><span>首页</span></div>
                <div class="cantact" @click="showTel">
                    <div>
                        <i></i>
                        <span>联系客服</span>
                    </div>
                </div>
                <div class="goBtn">
                    <button class="ft32" @click="goPay">立即预定</button>
                </div>
            </div>
        </div>
        <div class="contactDiv">
            <mt-actionsheet
                :actions="actions"
                v-model="sheetVisible">
            </mt-actionsheet>
        </div>
    </div>
</template>

<script>
    // import { Actionsheet } from 'mint-ui';
    export default {
        name: "detailindex",
        data() {
            return {
                index: 1,
                ticketInfo: {},
                actions:[
                    {
                        name:'途乐陈',
                        method:this.telChen
                    },
                    {
                        name:'途乐夏夏',
                        method:this.telXia
                    }
                ],
                sheetVisible:false
            }
        },
        mounted() {
            this.getDetail()
        },
        methods: {
            // 获取详情信息
            getDetail() {
                this.$post('ticket/expert/ticket_detail', {
                    ticket_id: this.$route.query.ticket_id
                })
                    .then(res => {
                        if (res.code == '200') {
                            this.ticketInfo = res.data
                        }
                    })
            },
            handleChange(val) {
                this.index = val + 1
            },


            // 底部操作
            // 联系客服
            showTel() {
                this.sheetVisible = true
            },
            telChen() {
                window.location.href = 'tel://13939107958'
            },
            telXia() {
                window.location.href = 'tel://13523356978'
            },
            // 回到首页
            goHome() {
                this.$router.push('/')
            },
            // 立即预定
            goPay() {
                this.$router.push(`/pay/index?ticket_id=${this.$route.query.ticket_id}`)
            }
        }
    }
</script>

<style lang="scss">
    .detailDiv {
        .mint-actionsheet {
            .mint-actionsheet-listitem,.mint-actionsheet-button {
                height: 80px !important;
                line-height: 80px !important;
                font-size: 32px;
            }
        }
    }
    </style>
<style scoped lang="scss">
    .detailDiv {
        padding-bottom: 100px;
        background-color: white;
        .bannerDiv {
            position: relative;
            height: auto;
            .mint-swipe {
                height: 464px;
                .mint-swipe-items-wrap {
                    .mint-swipe-item {
                        position: relative;
                        height: 464px;
                        background: rgba(0,0,0,.8);
                        img {
                            position: relative;
                            width: 100%;
                            top: 50%;
                            transform: translateY(-50%);
                            /*height: 100%;*/
                        }
                    }
                }
                .mint-swipe-indicators {
                    .mint-swipe-indicator {
                        width: 18px;
                        height: 18px;
                        margin: 0 10px;
                    }
                    .is-active {
                        background-color: red;
                    }
                }
            }
            .switchDiv {
                position: absolute;
                right: 30px;
                bottom: 40px;
                padding: 10px 20px;
                background-color: #fff;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                color: #000;
                opacity: .8;
            }
        }
        .detailDiv {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 26px;
            border-bottom: 2px solid #eaeaea;
            .divFl {
                flex: 4;
                p {
                    width: 100%;
                    text-align: left;
                    line-height: 40px;
                    padding: 2px 0;
                }
                .other {
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                }
            }
            .divFr {
                flex: 1;
                b {
                    display: block;
                    width: 100%;
                    text-align: right;
                }
            }
        }
        .moreDetailDiv {
            padding: 20px 26px;
            border-bottom: 2px solid #eaeaea;
            .moreDiv {
                text-align: left;
                margin-bottom: 16px;
                .content {
                    padding: 4px 20px;
                }
            }
        }
        .photoDiv {
            .title {
                padding: 20px 26px;
            }
            > div {
                width: 100%;
                img {
                    display: block;
                    width: 100%;
                }
            }
        }
        .btnDiv {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 100px;
            background-color: #fff;
            .btn {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .goHome {
                    flex: 1;
                    border-right: 1px solid #eee;
                    i {
                        margin: 0 auto;
                        width: 48px;
                        height: 48px;
                        background: url("../../imgs/icon-go-home.png") no-repeat center /100%;
                    }
                }
                .cantact {
                    flex: 1;
                    > div {
                        i {
                            margin: 0 auto;
                            width: 48px;
                            height: 48px;
                            background: url("../../imgs/icon-tel.png") no-repeat center /100%;
                        }
                    }
                }
                .goBtn {
                    flex: 4;
                    button {
                        width: 100%;
                        line-height: 100px;
                        background: linear-gradient(to right, #ff8484, #ff464e);
                    }
                }
            }
        }
    }
</style>
