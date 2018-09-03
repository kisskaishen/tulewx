<template>
    <div class="travelDiv">
        <ul>
            <li>
                <mt-cell-swipe
                    :right="[{
                          content: '删除',
                          style: { background: '#ff7900', color: '#fff' },
                          handler: () => this.$messagebox('delete')
                        }]">
                    <div class="swiper">
                        <div class="divFl">
                            <img src="" alt="">
                        </div>
                        <div class="divFr">
                            <p>姓名：</p>
                            <p>联系方式：</p>
                            <p>身份证号：</p>
                        </div>
                    </div>
                </mt-cell-swipe>
            </li>
        </ul>
    </div>
</template>

<script>
    import {CellSwipe} from 'mint-ui';

    export default {
        name: "travel",
        data() {
            return {}
        },
        mounted() {

        },
        methods: {}
    }
</script>
<style lang="scss">
    .travelDiv {
        ul {
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
            }
        }
    }
</style>
<style scoped lang="scss">

</style>
