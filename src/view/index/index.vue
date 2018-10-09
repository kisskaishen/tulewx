<template>
    <div class="indexDiv">
        <div class="bannerDiv">
            <swiper :options="swiperOptionTap" ref="mySwiperTap">
                <swiper-slide v-for="item,index in bannerList" :key="index">
                    <img :src="item.url" alt="图片">
                </swiper-slide>
            </swiper>
        </div>
        <div class="menuDiv">
            <ul>
                <li v-for="item,index in menuList">
                    <router-link :to="item.path">
                        <img :src="item.url">
                        <span>{{item.name}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="titleDiv">
            <hr>
            <span class="ft30 ftbold cff464e">精品推荐</span>
            <hr>
        </div>
        <div class="goodsDiv">
            <ul>
                <li v-for="item,index in goodList" class="brs8">
                    <router-link :to="`/detail/index?ticket_id=${item.ticket_id}`">
                        <div class="image">
                            <img :src="item.ticket_img" alt="途乐图片" class="brs8">
                            <div class="floatDiv cfff brs8">
                                剩余：{{item.real_num}}
                            </div>
                        </div>
                        <div class="info">
                            <p class="name ft30 c666 overflow2">{{item.ticket_name}}</p>
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
                swiperOptionTap: {
                    notNextTick: false,
                    freeMode: false,
                    autoplay: 3000,
                    speed: 600,
                    centeredSlides: true,
                    loop: true,
                    slidesPerView: 'auto',
                    loopedSlides: 10,
                    preventClicks: true,
                    observer: true,
                },
                bannerList: [],            // banner列表
                menuList: [
                    {
                        url: 'https://cdn2.pinquduo.cn/15311005835b42bda77a6d18dcd353bd427e3c45af634152af9e990.jpg',
                        name: '票务专区',
                        path: '/list/index'
                    },
                    {
                        url: 'https://cdn2.pinquduo.cn/15308713165b3f3e146fd9ae085c1433d6e5f99a96c952c973b67d6.jpg',
                        name: '活动专区',
                        path: '/list/activity'
                    },
                    {
                        url: 'https://cdn2.pinquduo.cn/15311012365b42c034c3d853c4d256606d4b008da43072080c5aecf.jpg',
                        name: '装备专区',
                        path: '/equip/index'
                    },
                    {
                        url: 'https://cdn2.pinquduo.cn/15311012475b42c03f5657d3368cc1995b115b09c1c71c1a70bfb2e.jpg',
                        name: '优惠卡专区',
                        path: '/cart/index'
                    },
                    // {
                    //     url: 'https://cdn2.pinquduo.cn/15311012855b42c0657984ec0da79a639dfdafc1aa6ecb05e4de435.jpg',
                    //     name: '果蔬专区',
                    //     path: '/fruit/index'
                    // },
                ],            // menu猎列表
                goodList: [],            // 商品列表
            }
        },
        components: {vFooter},
        mounted() {
            this.getBanner()
            this.getList()
        },
        methods: {
            getBanner() {
                this.$post('home/Banner/banner_list')
                    .then(res => {
                        if (res.code == '200') {
                            this.bannerList = res.data
                        }
                    })
            },
            getList() {
                this.$post('Home/Home/home_list')
                    .then(res => {
                        if (res.code == '200') {
                            this.goodList = res.data
                        }
                    })
            }
        }
    }
</script>
<style lang="scss">
    .bannerDiv {
        width: 100%;
        height: 330px;
        margin: 10px 0 20px;
        .swiper-container {
            width: 100%;
            .swiper-slide {
                width: 690px;
                margin: 6px 8px;
                img {
                    display: block;
                    width: 100%;
                    height: 330px;
                    border-radius: 20px;
                }
            }
            .swiper-slide-prev,.swiper-slide-next {
                img {
                    height: 280px;
                    margin-top: 25px;
                }
            }
        }


    }
</style>
<style scoped lang="scss">
    .indexDiv {
        padding-bottom: 120px;
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
        .titleDiv {
            padding: 20px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            hr {
                width: 160px;
                height: 4px;
                border: 2px solid #ff464e;
            }
            span {
                margin: 0 40px;
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
                                height: 330px;
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
                                margin-top: 10px;
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
