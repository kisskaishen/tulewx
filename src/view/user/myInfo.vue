<template>
    <div class="myInfoDiv">
        <div class="isUser" v-if="isUser">
            <div class="userInfo">
                <p class="title ft30 c666"><b></b>本人信息</p>
                <ul>
                    <li>
                        <label>姓名</label>
                        <span>{{bindingInfo.member_truename}}</span>
                    </li>
                    <li>
                        <label>联系方式</label>
                        <span>{{bindingInfo.member_mobile}}</span>
                    </li>
                    <li>
                        <label>身份证号</label>
                        <span>{{bindingInfo.id_card_num}}</span>
                    </li>
                </ul>
            </div>
            <div class="userInfo">
                <p class="title ft30 c666"><b></b>紧急联系人信息</p>
                <ul>
                    <li>
                        <label>姓名</label>
                        <span>{{bindingInfo.contacts.name}}</span>
                    </li>
                    <li>
                        <label>联系方式</label>
                        <span>{{bindingInfo.contacts.phone}}</span>
                    </li>
                </ul>
            </div>
            <div class="btnDiv">
                <button class="brs8 ft28" @click="editUser">修改</button>
            </div>
        </div>
        <div class="noUser" v-else>
            <p class="ft26 c999">暂无信息绑定</p>
            <div class="btnDiv">
                <button class="brs8 ft28" @click="showBinding">点击绑定信息</button>
            </div>
        </div>
        <div class="showDialogDiv" v-if="isShowDialog">
            <div class="dialogDiv">
                <img src="../../imgs/icon-close.png" alt="" @click="closeDialog">
                <p class="ft36 c333">绑定游客信息</p>
                <div class="addDiv">
                    <p class="title ft30 c666"><b></b>本人信息</p>
                    <ul>
                        <li>
                            <label>姓名</label>
                            <input type="text" v-model="name" placeholder="本人姓名">
                        </li>
                        <li>
                            <label>联系方式</label>
                            <input type="tel" v-model="tel" placeholder="本人联系方式">
                        </li>
                        <li>
                            <label>身份证号</label>
                            <input type="text" v-model="identity" placeholder="本人身份证号">
                        </li>
                    </ul>
                </div>
                <div class="addDiv">
                    <p class="title ft30 c666"><b></b>紧急联系人</p>
                    <ul>
                        <li>
                            <label>姓名</label>
                            <input type="text" v-model="contactName" placeholder="紧急联系人姓名">
                        </li>
                        <li>
                            <label>联系方式</label>
                            <input type="tel" v-model="contactTel" placeholder="紧急联系人联系方式">
                        </li>
                    </ul>
                </div>
                <button class="ft28 cfff brs8" @click="sureBinding">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'

    export default {
        name: "myInfo",
        data() {
            return {
                isUser: false,
                isShowDialog: false,
                // 本人信息
                name: '',
                tel: '',
                identity: '',
                // 紧急联系人
                contactName: '',
                contactTel: '',

                isBanding: '0',
                bindingInfo: {},         // 绑定信息
            }
        },
        mounted() {
            this.isBinding()
        },
        methods: {
            // 判断是否绑定
            isBinding() {
                this.$post('member/member/member_index', {
                    member_id: this.$getCookie('member_id')
                })
                    .then(res => {
                        if (res.code == '200') {
                            this.isBanding = res.data.is_bind_info
                            if (res.data.is_bind_info == '1') {
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
                            this.isUser = true
                            this.bindingInfo = res.data
                        }
                    })
            },
            // 编辑
            editUser() {
                Toast('抱歉，暂不支持修改')
            },
            // 绑定
            showBinding() {
                this.isShowDialog = true
            },
            // 关闭
            closeDialog() {
                this.isShowDialog = false
            },
            // 确认绑定
            sureBinding() {
                this.$post('member/Member/bind_member_info', {
                    member_id: this.$getCookie('member_id'),
                    member_mobile: this.tel,
                    member_truename: this.name,
                    id_card_num: this.identity,
                    name: this.contactName,
                    phone: this.contactTel
                })
                    .then(res => {
                        if (res.code == '200') {
                            Toast(res.message)
                            this.isUser = true
                            this.isShowDialog = false
                        }
                    })
            }

        }
    }
</script>

<style scoped lang="scss">
    .myInfoDiv {
        .userInfo {
            padding: 26px;
            margin-bottom: 20px;
            background-color: #fff;
            ul {
                margin-top: 10px;
                li {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 20px;
                    label {
                        font-size: 26px;
                        color: #999;
                    }
                    span {
                        font-size: 28px;
                        color: #666;
                    }
                }
            }
        }
        .btnDiv {
            button {
                padding: 20px 60px;
                background: linear-gradient(to right, #ff8484, #ff464e);
            }
        }
        .noUser {
            padding-top: 200px;
            .btnDiv {
                margin-top: 60px;
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
                padding: 26px 20px;
                -webkit-border-radius: 40px;
                -moz-border-radius: 40px;
                border-radius: 40px;
                background-color: #fff;
                margin-left: 50%;
                margin-top: 40%;
                transform: translate(-50%);
                img {
                    position: absolute;
                    width: 60px;
                    height: 60px;
                    right: -40px;
                    top: -40px;
                }
                ul {
                    li {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        padding: 20px 0;
                        label {
                            width: 160px;
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
