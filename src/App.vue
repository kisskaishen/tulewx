<template>
    <div id="app">
        <!--<transition name="fade">-->
        <router-view/>
        <!--</transition>-->
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {}
        },
        mounted() {
            // this.getInfo()
        },
        methods: {
            getInfo() {
                this.$post('member/Wxchat/get_snsapi_userinfo', {})
                    .then(res => {
                        console.log(res)
                    })
            }
        }
    }
</script>

<style lang="scss">
    @import 'style/base.css';

    #app {
        font-family: '黑体', 'Avenir', PingFang-SC-Bold, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        width: 100%;
    }

    .title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        b {
            width: 6px;
            height: 28px;
            margin-right: 16px;
            background-color: #ff464e;
        }
        span {
            font-size: 30px;
            color: #333;
        }
    }

    .ftbold {
        font-weight: bold;
    }

    .red {
        color: red;
    }

    .ft24 {
        font-size: 24px;
    }

    .ft26 {
        font-size: 26px;
    }

    .ft28 {
        font-size: 28px;
    }

    .ft30 {
        font-size: 30px;
    }

    .ft32 {
        font-size: 32px;
    }

    .ft36 {
        font-size: 36px;
    }

    .ft40 {
        font-size: 40px;
    }

    .ft48 {
        font-size: 48px;
    }

    .c999 {
        color: #999;
    }

    .c666 {
        color: #666;
    }

    .c333 {
        color: #333;
    }

    .c000 {
        color: #000;
    }

    .cfff {
        color: #fff;
    }

    .cff464e {
        color: #ff464e;
    }

    .brs8 {
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
    }

    .overflow1 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .overflow2 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: box;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>
