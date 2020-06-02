<template>
    <div class="container">
        <HeaderTabs/>
        <div class="overlay-image">
            <div class="overlay-image-item">
                <img src="/photo.png">
                <div class="overlay-image-item-capture">
                    <span class="overlay-image-item-work">инвестор</span>
                    <span class="overlay-image-item-name">Анна Рохан</span>
                    <span class="overlay-image-item-location">Санк-Петирбург</span>
                </div>
            </div>
        </div>
        <div class="tabs-navigation">
            <MainTabs>
                <template #tab1>
                    <ProfileResourceCard :data="{
                        pic: 'problems/card.png',
                        title: 'Краткое название для проблемы менее 50и символов',
                        description: 'Текст'
                    }" />
                </template>
                <template #tab2>
                    <ProfileProblemCard :data="{
                        pic: 'problems/card.png',
                        title: 'Краткое название для проблемы менее 50и символов',
                        description: 'Текст'
                    }" />
                </template>
            </MainTabs>
        </div>
    </div>
</template>

<script>
    import HeaderTabs from "~/components/header/HeaderTabs";
    import MainTabs from "~/components/main-page/MainTabs"
    import ProfileResourceCard from "~/components/elements/ProfileResourceCard"
    import ProfileProblemCard from "~/components/elements/ProfileProblemCard"

    export default {
        computed: {
            user: {
                get() {
                    return this.$store.state.user.current;
                }
            }
        },

        data() {
            return {
                isResTab: true
            };
        },

        components: {
            HeaderTabs,
            MainTabs,
            ProfileResourceCard,
            ProfileProblemCard
        },
        mounted() {
            if (this.$route)
                console.log(this.$route);
        },
        methods: {
            setActiveTab(isRes) {
                this.isResTab = isRes;
            }
        }
    };
</script>
