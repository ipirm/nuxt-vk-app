<template>
    <div class="resources-tab-card problems-card-outer">
        <div class="problems-card">
            <div class="problems-card-simple" v-show="!showEdit" @click="showEdit = true">
                <div class="pic-area"><img :src="card.pic"></div>
                <div class="info-area"><span>{{ card.name }}</span></div>
                <div class="solutions-modal-close resources-close" @click.prevent="showRemoveModal = true" v-if="removable">
                    <img src="/main-page/modal-close.png">
                </div>
            </div>
            <div class="problems-card-edit problems-card-edit--mine" v-show="showEdit">
                <div class="tabs-navigation-button problems-tab-add" @click="showRemoveModal = true" v-if="removable">
                    <img src="/problems/trash.svg">
                    <span>Удалить ресурс</span>
                </div>
                <div class="problems-card-edit-modal-remove-modal" v-show="showRemoveModal">
                    <span class="title">Вы действительно хотите удалить этот ресурс?</span>
                    <div class="buttons">
                        <button class="step5-modal-button cancel" @click="showRemoveModal = false"><span>Отмена</span>
                        </button>
                        <button class="step5-modal-button remove" @click="remove()">Удалить</button>
                    </div>
                </div>
                <div class="problems-added-card-owner">
                    <div class="text">Владелец ресурса:</div>
                    <div class="name">{{ card.name }}</div>
                </div>
                <div class="card-filters resources-tab-card-filters problems-added-card-filters">
                    <span>фильтры</span>
                    <span v-for="(filter,i) in card.scopes" :key="i">{{ filter.name }}</span>
                </div>
                <div class="about-problem-info resources-tab-card-info problems-added-card-info">
                    <span class="about-problem-info-title">О ресурсе:</span>
                    <span class="about-problem-info-text">{{ card.description }}</span>
                </div>
                <ProblemsCardSlider :slides="card.files" v-show="card.files" />
            </div>
        </div>
        <div class="problems-card-minimize" v-show="showEdit" @click="showEdit = false">
            <img src="~/static/problems/minimize.png">
        </div>
    </div>
</template>

<script>
    import ProblemsCardSlider from '~/components/elements/ProblemsCardSlider';

    export default {
        props: ['card', 'id', 'removable', 'type'],

        components: {
            ProblemsCardSlider
        },

        data() {
            return {
                showEdit: false,
                showRemoveModal: false
            }
        },

        methods: {
             remove() {
                this.showEdit = false;
                this.showRemoveModal = false;
                let body = {
                    problemId: this.id,
                    resourceId: this.card.id
                }
                if (this.type == 'request')
                    this.$store.dispatch('problemResources/deleteRequestResources',body).then(async () => {
                        await this.$store.dispatch('problemResources/getRequestResources')
                    })
                else if (this.type == 'add')
                    this.$store.dispatch('problemResources/deleteAcceptedResources',body).then(async () => {
                        await this.$store.dispatch('problemResources/getAddResources')
                    })
            }
        }
    }
</script>
