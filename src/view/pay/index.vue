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
            <p>您当前账户手机号为：{{payInfo.is_bind_mobile}}</p>
        </div>
        <div class="travalDiv">
            <ul>
                <li v-for="item,index in userList" :class="[{active:userList[index].state},'brs8']"
                    @click="checkUser(item,index)">
                    <p>{{item.visit_name}}</p>
                </li>
                <li class="addBtn" @click="goAddUser">
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
                    <b class="ft40 cff464e">￥99</b>
                </div>
                <div class="goBtn">
                    <button class="ft32" @click="goPay">立即支付</button>
                </div>
            </div>
        </div>
        <div class="showDialogDiv" v-if="isShowDialog">
            <div class="dialogDiv">
                <img src="../../imgs/icon-close.png" alt="" @click="closeDialog">
                <p class="ft36 c333">新增游客信息</p>
                <ul>
                    <li>
                        <label>姓名：</label>
                        <input type="text" v-model="name" placeholder="您的真实姓名">
                    </li>
                    <li>
                        <label>联系方式：</label>
                        <input type="tel" v-model='tel' placeholder="您的联系方式">
                    </li>
                    <li>
                        <label>身份证号：</label>
                        <input type="text" v-model="identity" placeholder="用于购买保险">
                    </li>
                    <li>
                        <mt-radio
                            title="身高："
                            v-model="stature"
                            :options="statures">
                        </mt-radio>
                    </li>
                </ul>
                <button class="ft28 cfff brs8" @click="sureAddUser">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        name: "payIndex",
        data() {
            return {
                payInfo: {ticket: {}},            // 支付页信息
                userList: [],
                checkArr: [],

                isShowDialog: false,
                name: '',            // 姓名
                tel: '',            // 手机号
                identity: '',            // 身份证号
                stature: '0',            // 身高
                statures: [
                    {value: '0', label: '高于1.2米(含)'},
                    {value: '1', label: '低于1.2米'}
                ]
            }
        },
        mounted() {
            this.getDetail()
            this.getTravel()
        },
        methods: {
            // 获取支付页情况
            getDetail() {
                this.$post('order/buy/cashier_desk', {
                    ticket_id: this.$route.query.ticket_id,
                    member_id: this.$getCookie('member_id') || '4'
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
                    member_id: this.$getCookie('member_id') || '4'
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
                        } else {
                            this.userList[i].state = false
                            for (let j = 0; j < this.checkArr.length; j++) {
                                if (this.userList[i].state == this.checkArr[j].state) {
                                    this.checkArr.splice(j, 1)
                                }
                            }
                        }
                    }
                }
            },

            // 去添加顾客信息
            goAddUser() {
                this.isShowDialog = true
            },
            // 提交订单并支付
            goPay() {
            },


            // 关闭弹框
            closeDialog() {
                this.isShowDialog = false
            },
            // 确定添加游客
            sureAddUser() {
                this.$post('member/Visiter/visiter_add',{
                    member_id: this.$getCookie('member_id') || '4',
                    visit_name:this.name,
                    visit_phone:this.tel,
                    vist_idcard_num:this.identity,
                    is_child:this.stature
                })
                    .then(res=>{
                        if (res.code == '200') {
                            Toast('添加成功~')
                            this.getTravel()
                            this.isShowDialog = false
                        }
                    })
            }
        }
    }
</script>
<style lang="scss">
    .dialogDiv {
        .mint-radiolist {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .mint-radiolist-title {
                width: 132px;
                font-size: 26px;
                color: #999;
                margin: 0;
            }
            .mint-cell {
                flex: 1;
                .mint-cell-wrapper {
                    padding: 0;
                    .mint-radiolist-label {
                        padding: 0;
                        .mint-radio-label {
                            font-size: 28px;
                            color: #999;
                        }
                        .mint-radio-core {
                            width: 30px;
                            height: 30px;
                        }
                    }
                }
                .mint-radio-core::after {
                    width: 16px;
                    height: 16px;
                }
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
            .dialogDiv {
                position: relative;
                width: 600px;
                height: 600px;
                padding: 26px 20px;
                -webkit-border-radius: 40px;
                -moz-border-radius: 40px;
                border-radius: 40px;
                background-color: #fff;
                margin-left: 50%;
                margin-top: 50%;
                transform: translate(-50%);
                img {
                    position: absolute;
                    width: 60px;
                    height: 60px;
                    right: -40px;
                    top: -40px;
                }
                > p {
                    margin-bottom: 26px;
                }
                ul {
                    li {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        padding: 20px 0;
                        label {
                            width: 132px;
                            font-size: 26px;
                            color: #999;
                            text-align: right;
                        }
                        input {
                            font-size: 28px;
                            border: none;
                            border-bottom: 2px solid #ccc;
                            -webkit-border-radius: 0;
                            -moz-border-radius: 0;
                            border-radius: 0;
                        }

                    }
                }
                > button {
                    margin-top: 30px;
                    width: 200px;
                    height: 80px;
                    line-height: 80px;
                    background-color: #ff464e;
                }
            }
        }
    }
</style>
