<template>
    <div class="listDiv">
        <ul>
            <li v-for="item,index in list">
                <router-link :to="`/detail/index?ticket_id=${item.ticket_id}`">
                    <div class="image">
                        <div class="floatDiv cfff brs8">
                            剩余：{{item.real_num}}
                        </div>
                    </div>
                    <img class="brs8"
                         :src="item.ticket_img"
                         alt="">
                    <p class="name ft30 c666 overflow2">{{item.ticket_name}}</p>
                    <p class="time ft28 c999">出发时间：{{item.leave_date}}</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "list",
        data() {
            return {
                list:[]
            }
        },
        mounted() {
            this.getList()
        },
        methods:{
            // 票务专区列表
            getList() {
                this.$post('ticket/Expert/Expert_index',{
                    is_driving:'1'
                })
                    .then(res=>{
                        this.list = res.data
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    .listDiv {
        ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            li {
                width: 48%;
                padding: 30px 20px;
                border-bottom: 1px solid #eee;
                background-color: #fff;

                a {
                    display: block;
                    position: relative;
                    .image {
                        position: relative;
                        img {
                            width: 100%;
                            height: 330px;
                        }
                        .floatDiv {
                            position: absolute;
                            left: -10px;
                            top: 20px;
                            padding: 10px 20px;
                            background: linear-gradient(to right, #ff8484, #ff464e);
                        }
                    }
                    img {
                        width: 100%;
                    }
                    p {
                        line-height: 40px;
                        text-align: left;
                    }
                    .name {
                        margin-top: 10px;
                        max-height: 80px;
                    }

                }
            }
        }
    }


</style>
