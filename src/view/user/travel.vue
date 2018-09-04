<template>
    <div class="travelDiv">
        <ul>
            <li v-for="item,index in travelList">
                <mt-cell-swipe
                    :right="[{
                          content: '删除',
                          style: { background: '#ff7900', color: '#fff' },
                          handler: () => deleteTravel(item)
                        }]">
                    <div class="swiper">
                        <div class="divFl">
                            <img src="" alt="">
                        </div>
                        <div class="divFr">
                            <p>姓名：{{item.visit_name}}</p>
                            <p>联系方式：{{item.visit_phone}}</p>
                            <p>身份证号：{{item.vist_idcard_num}}</p>
                        </div>
                    </div>
                </mt-cell-swipe>
            </li>
        </ul>
        <button class="ft28" @click="goAddTravel">新增游客</button>
        <div class="showDialogDiv" v-if="isShowDialog">
            <add-travel @listenDialog="showDialog"></add-travel>
        </div>
    </div>
</template>

<script>
    import {CellSwipe, Toast} from 'mint-ui';
    import AddTravel from '../../components/addTravel'

    export default {
        name: "travel",
        data() {
            return {
                travelList: [],
                isShowDialog: false
            }
        },
        mounted() {
            this.getTravelList()
        },
        components: {AddTravel},

        methods: {
            getTravelList() {
                this.$post('member/Visiter/visiter_list', {
                    member_id: this.$getCookie('member_id') || '4'
                })
                    .then(res => {
                        if (res.code == '200') {
                            this.travelList = res.data
                        }
                    })
            },
            // 删除
            deleteTravel(val) {
                this.$post('member/Visiter/visiter_del', {
                    visit_id: val.visit_id
                })
                    .then(res => {
                        if (res.code == '200') {
                            Toast('删除成功')
                            this.getTravelList()
                        }
                    })
            },
            // 去添加顾客信息
            goAddTravel() {
                this.isShowDialog = true
            },

            //
            showDialog() {
                this.isShowDialog = false
                this.getTravelList()
            }
        }
    }
</script>
<style lang="scss">
    .travelDiv {
        > ul {
            li {
                .mint-cell-wrapper {
                    .mint-cell-value {
                        width: 100%;
                        .swiper {
                            width: 100%;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            padding: 20px 0;
                            .divFl {
                                margin-right: 26px;
                                img {
                                    display: block;
                                    width: 100px;
                                    height: 100px;
                                    border: 2px solid red;
                                    -webkit-border-radius: 50%;
                                    -moz-border-radius: 50%;
                                    border-radius: 50%;
                                }
                            }
                            .divFr {
                                width: 100%;
                                p {
                                    width: 100%;
                                    height: 40px;
                                    line-height: 40px;
                                    text-align: left;
                                    font-size: 28px;
                                    color: #666;
                                }
                            }
                        }

                    }
                }
                .mint-cell-swipe-buttongroup {
                    a {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 28px;
                        padding: 0 40px;
                    }
                }
            }
        }
    }
</style>
<style scoped lang="scss">
    .travelDiv {
        padding-bottom: 100px;
        ul {
            li {
                margin-bottom: 20px;
            }
        }
        button {
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100px;
            line-height: 100px;
            background: linear-gradient(to right, #ff8484, #ff464e);
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
