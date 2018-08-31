<template>
    <div class="detailDiv">
        <div class="bannerDiv">
            <mt-swipe :auto="4000" :showIndicators="false" @change="handleChange">
                <mt-swipe-item v-for="item,index in 4" :key="index">
                    <img src="https://cdn2.pinquduo.cn/5b2324aa8ae6984510.jpg" alt="商品图片">
                </mt-swipe-item>
            </mt-swipe>
            <div class="switchDiv">
                {{index}}/4
            </div>
        </div>
        <div class="detailDiv">
            <div class="divFl">
                <p class="name ft32 c666">商品名称商品名称商品名称商品名称商品名称</p>
                <p class="other">
                    <label class="ft28 c666">发车时间：</label>
                    <span class="ft30 c333">2018-10-01</span>
                </p>
                <p class="other">
                    <label class="ft28 c666">已报名：</label>
                    <span class="ft30 c333">10</span>
                <p class="other ft30 c666">
                    <label class="ft28 c666">剩余座位：</label>
                    <span class="ft30 c333">20</span>
                </p>
                <p class="other">
                    <label class="ft28 c666">儿童价：</label>
                    <b class="ft30 cff464e">￥20</b>
                </p>
            </div>
            <div class="divFr">
                <b class="ft48 cff464e">￥99</b>
            </div>
        </div>
        <div class="moreDetailDiv">
            <div class="moreDiv">
                <p class="title">
                    <b></b>
                    <span>注意事项</span>
                </p>
                <div class="content ft26 c999">这里是注意事项</div>
            </div>
            <div class="moreDiv">
                <p class="title">
                    <b></b>
                    <span>景点介绍</span>
                </p>
                <div class="content ft26 c999">这里是景点介绍这里是景点介绍这里是景点介绍这里是景点介绍这里是景点介绍</div>
            </div>
        </div>
        <div class="photoDiv">
            <p class="title">
                <b></b>
                <span>景区图片</span>
            </p>
            <div v-for="item,index in 6">
                <img src="https://cdn2.pinquduo.cn/5b2324aa8ae6984510.jpg" alt="">
            </div>
        </div>
        <div class="btnDiv">
            <div class="btn">
                <div class="goHome ft666" @click="goHome">回到首页</div>
                <div class="cantact">
                    <a href="tel:13798238693">联系客服</a>
                </div>
                <div class="goBtn">
                    <button class="ft32" @click="goPay">立即预定</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "detailindex",
        data() {
            return {
                index: 1
            }
        },
        methods: {
            handleChange(val) {
                this.index = val + 1
            },


            // 底部操作
            // 回到首页
            goHome() {
                this.$router.push('/')
            },
            // 立即预定
            goPay() {
                this.$router.push('/pay/index')
            }
        }
    }
</script>

<style scoped lang="scss">
    .detailDiv {
        padding-bottom: 100px;
        .bannerDiv {
            position: relative;
            .mint-swipe {
                height: 750px;
                .mint-swipe-items-wrap {
                    .mint-swipe-item {
                        img {
                            width: 100%;
                            height: 100%;
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
                }
                .cantact {
                    flex: 1;
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
