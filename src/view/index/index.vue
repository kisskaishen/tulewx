<template>
    <div class="indexDiv">
        <div class="bannerDiv">
            <mt-swipe :auto="4000">
                <mt-swipe-item>
                    <img src="https://cdn2.pinquduo.cn/5b2324aa8ae6984510.jpg" alt="">
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="https://cdn2.pinquduo.cn/5b2324aa8ae6984510.jpg" alt="">
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="https://cdn2.pinquduo.cn/5b2324aa8ae6984510.jpg" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="menuDiv">
            <ul>
                <li v-for="item,index in 4">
                    <router-link to="">
                        <img src="https://cdn2.pinquduo.cn/5b2324aa8ae6984510.jpg">
                        <span>name{{index+1}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="goodsDiv">
            <ul>
                <li v-for="item,index  in goodList" class="brs8">
                    <router-link to="/detail/index">
                        <div class="image">
                            <img :src="item.ticket_img" alt="途乐图片" class="brs8">
                            <div class="floatDiv cfff">
                                剩余：{{item.real_num}}
                            </div>
                        </div>
                        <div class="info">
                            <p class="name ft30 c666">{{item.ticket_name}}</p>
                            <p class="other">
                                <span class="ft28 c999">出发时间：{{item.leave_date}}</span>
                                <button class="brs8 ft28">预定</button>
                            </p>
                            <!--<p class="ft28 c999">出发时间：{{item.leave_date}}</p>-->
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import vFooter from '../../components/vfooter'

    export default {
        name: "index",
        data() {
            return {
                goodList:[],            // 商品列表
            }
        },
        components: {vFooter},
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                this.$post('Home/Home/home_list')
                    .then(res=>{
                        if (res.code == '200') {
                            this.goodList = res.data
                        }
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    .indexDiv {
        padding-bottom: 120px;
        .bannerDiv {
            height: 302px;
            .mint-swipe {
                height: 302px;
                .mint-swipe-item {
                    img {
                        display: block;
                        width: 100%;
                    }
                }
            }
        }
        .menuDiv {
            width: 100%;
            padding: 16px 0;
            background-color: #fff;
            ul {
                display: flex;
                flex-deraction: row;
                flex-wrap: wrap;
                align-items: center;
                li {
                    width: 25%;
                    height: 160px;
                    a {
                        display: block;
                        padding: 20px;
                        text-align: center;
                        img {
                            display: block;
                            margin: 0 auto;
                            width: 80px;
                            height: 80px;
                        }
                        span {
                            display: block;
                            color: #666;
                            margin-top: 10px;
                        }
                    }
                }
            }
        }
        .goodsDiv {
            ul {
                li {
                    padding: 0 26px;
                    background-color: #fff;
                    a {
                        display: block;
                        padding: 20px 0;
                        border-bottom: 2px solid #eee;
                        .image {
                            position: relative;
                            img {
                                width: 100%;
                            }
                            .floatDiv {
                                position: absolute;
                                left: -14px;
                                top: 20px;
                                padding: 10px 20px;
                                background: linear-gradient(to right, #ff8484, #ff464e);
                            }
                        }
                        .info {
                            p {
                                line-height: 40px;
                                text-align: left;
                            }
                            .name {
                                max-height: 80px;
                            }
                            .other {
                                display: flex;
                                justify-content: space-between;
                                align-items: flex-end;
                                span {

                                }
                                button {
                                    width: 140px;
                                    height: 56px;
                                    line-height: 56px;
                                    background: linear-gradient(to right, #ff8484, #ff464e);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
