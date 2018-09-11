<template>
    <div class="cartDiv">
        <div class="cartImg">
            <img src="../../imgs/img-cart.png" alt="">
            <button class="brs8">
                点击购买
            </button>
        </div>

        <v-footer></v-footer>
    </div>
</template>

<script>
    import vFooter from '../../components/vfooter'

    export default {
        name: "cartIndex",
        data() {
            return {}
        },
        components: {vFooter},

    }
</script>

<style scoped lang="scss">
    .cartDiv {
        .cartImg {
            padding: 26px;
            img {
                display: block;
                width: 600px;
                margin: 0 auto;
                border: none;
                -webkit-border-radius: 20px;
                -moz-border-radius: 20px;
                border-radius: 20px;
            }
            button {
                margin-top: 40px;
                padding: 20px 80px;
                background: linear-gradient(to right, #ff8484, #ff464e);
            }
        }
    }
</style>
