<template>
    <div class="payIndex">
        <div class="detailDiv">
            <div class="divFl">
                <img :src="payInfo.ticket.ticket_img" :alt="payInfo.ticket.ticket_name">
            </div>
            <div class="divFr">
                <p class="name ft30 ft666">{{payInfo.ticket.ticket_name}}</p>
                <p class="price ft32 cff464e">成人价：￥{{payInfo.ticket.price}}</p>
                <p class="price ft30 cff464e">儿童价：￥{{payInfo.ticket.child_price}}</p>
                <p class="other ft26 c999">注意事项</p>
            </div>
        </div>
        <div class="bindingDiv">
            <p v-if="payInfo.is_bind_mobile!=''">您当前账户手机号为：{{payInfo.is_bind_mobile}}</p>
            <p v-else>
                <router-link to="/user/myInfo">点击绑定个人信息</router-link>
            </p>
        </div>
        <div class="travalDiv">
            <p>请点击选择游客：</p>
            <ul>
                <li v-for="item,index in userList" :class="[{active:userList[index].state},'brs8']"
                    @click="checkUser(item,index)">
                    <p class="ft30">{{item.visit_name}}</p>
                </li>
                <li class="addBtn" @click="goAddTravel">
                    <p>+</p>
                </li>
            </ul>
        </div>
        <div class="travalInfoDiv">
            <ul>
                <li v-for="item,index in checkArr" v-if="item!=false">
                    <div class="title"><b></b><span>{{item.visit_name}}的信息</span></div>
                    <div class="traval">
                        <p><label>姓名</label><span>{{item.visit_name}}</span></p>
                        <p><label>手机号</label><span>{{item.visit_phone}}</span></p>
                        <p><label>身份证</label><span>{{item.vist_idcard_num}}</span></p>
                    </div>
                </li>
            </ul>
            <div class="tips ft28 c999">请选择出行的游客</div>
        </div>
        <div class="btnDiv">
            <div class="btn">
                <div class="money">
                    共支付
                    <b class="ft28 cff464e">￥</b>
                    <b class="ft40 cff464e">{{totalMoney}}</b>
                </div>
                <div class="goBtn">
                    <button class="ft32" @click="goPay">立即支付</button>
                </div>
            </div>
        </div>
        <div class="showDialogDiv" v-if="isShowDialog">
            <add-travel @listenDialog="showDialog"></add-travel>
        </div>
    </div>
</template>

<script>
    import AddTravel from '../../components/addTravel'
    import {Toast,MessageBox} from 'mint-ui'

    export default {
        name: "payIndex",
        data() {
            return {
                isBanding:'',           // 是否绑定信息
                payInfo: {ticket: {}},            // 支付页信息
                userList: [],
                checkArr: [],
                checkArrId: [],                  // 游客id

                isShowDialog: false,
                totalMoney: 0,                  // 应付金额
            }
        },
        mounted() {
            this.isBinding()
            this.getDetail()
            this.getTravel()
        },

        components: {AddTravel},

        methods: {
            // 判断是否绑定
            isBinding() {
                this.$post('member/member/member_index', {
                    member_id: this.$getCookie('member_id')
                })
                    .then(res => {
                        if (res.code == '200') {
                            this.isBanding = res.data.is_bind_info
                            if (this.isBanding == '1') {

                            } else {
                                this.$session.set('payPath',this.$route.fullPath)

                                MessageBox({
                                    title: '提示',
                                    message: '您当前还没有绑定个人信息，点击前往绑定个人信息?',
                                    showCancelButton: true,
                                    confirmButtonText: '前去绑定',
                                    cancelButtonText: '暂不绑定',
                                    closeOnClickModal:false
                                }).then(res => {
                                    if (res=='confirm') {
                                    this.$router.push('/user/myInfo?from=pay')
                                } else {
                                    this.isBinding()
                                }
                            })
                            }

                    }
                })
            },
            // 获取支付页情况
            getDetail() {
                this.$post('order/buy/cashier_desk', {
                    ticket_id: this.$route.query.ticket_id,
                    member_id: this.$getCookie('member_id')
                })
                    .then(res => {
                        if (res.code == '200') {
                            this.payInfo = res.data
                        }
                    })
            },
            // 获取游客列表
            getTravel() {
                this.$post('member/Visiter/visiter_list', {
                    member_id: this.$getCookie('member_id')
                })
                    .then(res => {
                        if (res.code == '200') {
                            this.userList = res.data
                        }
                    })
            },
            // 勾选情况
            checkUser(val, index) {
                for (let i = 0; i < this.userList.length; i++) {
                    if (i == index) {
                        if (this.userList[i].state == false) {
                            this.userList[i].state = true
                            this.checkArr.push(this.userList[i])
                            this.checkArrId.push(this.userList[i].visit_id)
                        } else {
                            this.userList[i].state = false
                            for (let j = 0; j < this.checkArr.length; j++) {
                                if (this.userList[i].state == this.checkArr[j].state) {
                                    this.checkArr.splice(j, 1)
                                    this.checkArrId.splice(j, 1)
                                }
                            }
                        }
                    }
                }
                console.log(this.checkArr)
                let childArr = []
                let adultArr = []
                for (let i = 0; i < this.checkArr.length; i++) {
                    if (this.checkArr[i].is_child == '1') {
                        childArr.push(this.checkArr[i])
                    } else {
                        adultArr.push(this.checkArr[i])
                    }
                }
                this.totalMoney = childArr.length * this.payInfo.ticket.child_price + adultArr.length * this.payInfo.ticket.price
            },

            // 去添加顾客信息
            goAddTravel() {
                this.isShowDialog = true
            },
            // 提交订单并支付
            goPay() {
                this.$post('order/buy/submit_order', {
                    cart_id: `${this.$route.query.ticket_id}|${this.checkArr.length}`,
                    member_id: this.$getCookie('member_id'),
                    visit_id_arr: JSON.stringify(this.checkArrId),
                    union_type: '1'
                })
                    .then(res => {
                        location.href = 'https://api.jztule.com/public/wx/weixin_pubilc_pay/example/jsapi.php?pay_sn=' + res.data.pay_sn
                    })
            },

            // 监听弹框
            showDialog(val) {
                this.getTravel()
                this.isShowDialog = false
            }

        }
    }
</script>
<style lang="scss">
    .mint-msgbox {
        width: 64%;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        .mint-msgbox-title {
            font-size: 42px;
        }
        .mint-msgbox-content {
            min-height: 80px;
            .mint-msgbox-message {
                line-height: 40px;
            }
        }
        .mint-msgbox-btns {
            height: 80px;
            .mint-msgbox-cancel {
                color: #ccc;
            }
            .mint-msgbox-confirm {
                font-size: 32px;
                color: #ff464e;
            }
        }
    }
</style>
<style scoped lang="scss">
    .payIndex {
        position: relative;
        padding-bottom: 100px;
        .detailDiv {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            background-color: #fff;
            padding: 20px 26px;
            .divFl {
                img {
                    width: 200px;
                    height: 200px;
                }
            }
            .divFr {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                width: 100%;
                padding-left: 20px;
                p {
                    width: 100%;
                    text-align: left;
                }
                .other {
                    text-align: right;
                }
            }
        }
        .bindingDiv {
            padding: 20px 0;
        }
        .travalDiv {
            padding: 20px 26px;
            background-color: #fff;
            > p {
                text-align: left;
                line-height: 60px;
            }
            ul {
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                align-items: center;
                li {
                    margin-right: 20px;
                    margin-bottom: 20px;
                    padding: 12px;
                    border: 2px solid #666;
                }
                .addBtn {
                    padding: 6px 20px;
                    font-size: 36px;
                }
                .active {
                    color: #fff;
                    border: 2px solid #ff464e;
                    background-color: #ff464e;
                }
            }
        }
        .travalInfoDiv {
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
            .tips {
                margin-top: 20px;
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
                .money {
                    flex: 3;
                }
                .goBtn {
                    flex: 2;
                    button {
                        width: 100%;
                        line-height: 100px;
                        background: linear-gradient(to right, #ff8484, #ff464e);
                    }
                }
            }
        }
        .showDialogDiv {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 99;
            background: rgba(0, 0, 0, .6);
        }
    }
</style>
