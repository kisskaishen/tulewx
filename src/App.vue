<template>
    <div id="app">
        <transition name="fade-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
    #app {
        font-family: 'Avenir', PingFang-SC-Bold, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        min-height: 100%;
        background-color: #fff;
    }
</style>
