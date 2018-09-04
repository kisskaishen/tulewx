<template>
    <div class="addTravelDiv">
        <div class="dialogDiv">
            <img src="../imgs/icon-close.png" alt="" @click="closeDialog">
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
            <button class="ft28 cfff brs8" @click="sureAddTravel">确定</button>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'

    export default {
        name: "addTravel",
        data() {
            return {
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
        methods: {
            // 关闭弹框
            closeDialog() {
                this.$emit('listenDialog', false)
            },
            // 确定添加游客
            sureAddTravel() {
                this.$post('member/Visiter/visiter_add', {
                    member_id: this.$getCookie('member_id') || '4',
                    visit_name: this.name,
                    visit_phone: this.tel,
                    vist_idcard_num: this.identity,
                    is_child: this.stature
                })
                    .then(res => {
                        if (res.code == '200') {
                            Toast('添加成功~')
                            this.$emit('listenDialog', false)
                        }
                    })
            }
        }
    }
</script>
<style lang="scss">
    .addTravelDiv {
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
    }
</style>
<style scoped lang="scss">
    .addTravelDiv {
        .dialogDiv {
            position: relative;
            width: 640px;
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
</style>
