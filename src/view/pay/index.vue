<template>
    <div class="payIndex">
        <div class="detailDiv">
            <div class="divFl">
                <img src="https://cdn2.pinquduo.cn/5b2324aa8ae6984510.jpg" alt="">
            </div>
            <div class="divFr">
                <p class="name ft30 ft666">商品名称</p>
                <p class="price ft32 cff464e">成人价：￥99</p>
                <p class="price ft30 cff464e">儿童价：￥99</p>
                <p class="other ft26 c999">注意事项</p>
            </div>
        </div>
        <div class="bindingDiv">
            <p>您当前账户手机号为：13798238693</p>
        </div>
        <div class="travalDiv">
            <ul>
                <li>
                    <p>姓名1</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "payIndex"
    }
</script>

<style scoped lang="scss">
    .payIndex {
        .detailDiv {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            background-color: #fff;
            padding: 20px 26px;
            .divFl {
                img {
                    width: 200px;
                    height: 200px;
                }
            }
            .divFr {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                width: 100%;
                padding-left: 20px;
                p {
                    width: 100%;
                    text-align: left;
                }
                .other {
                    text-align: right;
                }
            }
        }
    }
</style>
