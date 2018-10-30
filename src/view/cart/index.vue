<template>
    <div class="cartDiv">
        <div class="cartImg">
            <img src="../../imgs/img-cart.png" :class="isBuy?'buyHover':''" alt="惠民旅游卡">
            <button class="brs8 ft32" @click="goBuy">点击购买</button>
        </div>

        <v-footer></v-footer>
    </div>
</template>

<script>
    import vFooter from '../../components/vfooter'
    import {Toast} from 'mint-ui'

    export default {
        name: "cartIndex",
        data() {
            return {
                isBuy: false
            }
        },
        components: {vFooter},
        methods: {
            goBuy() {
                this.isBuy = !this.isBuy
                this.$post('order/buy/submit_order', {
                    cart_id:'21|1',
                    member_id: this.$getCookie('member_id'),
                    union_type: '3'
                })
                    .then(res => {
                        location.href = 'https://api.jztule.com/public/wx/weixin_pubilc_pay/example/jsapi.php?pay_sn=' + res.data.pay_sn
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    .cartDiv {
        .cartImg {
            padding: 26px;
            img {
                display: block;
                width: 400px;
                margin: 0 auto;
                border: none;
                -webkit-border-radius: 20px;
                -moz-border-radius: 20px;
                border-radius: 20px;
                transition: All 1s ease-in-out;
            }
            .buyHover {
                transform: rotateY(360deg);
            }
            button {
                margin-top: 40px;
                padding: 20px 80px;
                background: linear-gradient(to right, #ff8484, #ff464e);
            }
        }
    }
</style>
