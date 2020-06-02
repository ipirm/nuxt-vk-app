<template>
    <div class="main-tabs container">
        <div class="main-tabs__top">
            <button :class="{ active: active == 1 }" @click="active = 1">
                <img v-if="active === 1" src="/main-page/fill-diamond.png">
                <img v-else src="/main-page/empty-diamon.png">
                <span v-if="active === 1">Мои ресурсы</span>
            </button>
            <button :class="{ active: active == 2 }" @click="active = 2">
                <img v-if="active === 2" src="/main-page/fill-mozg.png">
                <img v-else src="/main-page/emtty-mozg.png">
                <span v-if="active === 2">Проблемы</span>
            </button>
        </div>
        <div class="main-tabs__top__bg-shadow"></div>
        <div class="main-tabs__content" v-if="active == 1"><slot name="tab1"></slot></div>
        <div class="main-tabs__content" v-if="active == 2"><slot name="tab2"></slot></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 1
            }
        }
    }
</script>
