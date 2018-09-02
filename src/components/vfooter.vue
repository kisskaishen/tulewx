<template>
    <div class="footerDiv">
        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="1" class="index">
                <img slot="icon" src="../imgs/icon-index-active.png" v-if="selected == '1'">
                <img slot="icon" src="../imgs/icon-index.png" v-else>
                首页
            </mt-tab-item>
            <mt-tab-item id="2">
                <img slot="icon" src="../imgs/icon-cart-active.png" v-if="selected == '2'">
                <img slot="icon" src="../imgs/icon-cart.png" v-else>
                惠民卡
            </mt-tab-item>
            <mt-tab-item id="3" class="user">
                <img slot="icon" src="../imgs/icon-user-active.png" v-if="selected == '3'">
                <img slot="icon" src="../imgs/icon-user.png" v-else>
                个人中心
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
    export default {
        name: "vfooter",
        data() {
            return {
                selected: '1'
            }
        },
        mounted() {
            this.getSelected(this.$route.path)
        },
        methods: {
            getSelected(url) {
                switch (url) {
                    case '/' :
                        this.selected = '1'
                        break;
                    case '/index':
                        this.selected = '1'
                        break;
                    case '/cart/index':
                        this.selected = '2'
                        break;
                    case '/user/index':
                        this.selected = '3'
                        break;
                }
            }
        },
        watch:{
            selected(val) {
                switch (val) {
                    case '1' :
                        this.$router.push('/index')
                        break;
                    case '2':
                        this.$router.push('/cart/index')
                        break;
                    case '3':
                        this.$router.push('/user/index')
                        break;
                }
            }
        }
    }
</script>

<style lang="scss">
    .footerDiv {
        .mint-tabbar {
            height: 100px;
            .mint-tab-item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                align-content: center;
                color: #888;
                .mint-tab-item-icon {
                    width: 60px;
                    height: 60px;
                }
                .mint-tab-item-label {
                    font-size: 24px;
                }
            }

            .user {
                .mint-tab-item-icon {
                    width: 54px;
                    height: 54px;
                }
            }
            .is-selected {
                color: #ff464e !important;
                background-color: transparent;
            }
        }
    }
</style>


