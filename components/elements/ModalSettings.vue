<template>
    <div>
        <div class="modal-container" v-if="active">
            <div class="modal-container-close" @click="hideModal">
                <img src="/main-page/modal-close.png">
            </div>
            <div class="modal-center" @click="chooseImg">
                <img class="modal-center-placeholder" src="/avatar.png">
                <div class="modal-center-frame" style="display: none">
                    <img class="frame" src="/borders/border.svg">
                    <img class="pic" :src="file == null ? '' : fileName">
                    <input v-show="false" type="file" accept="image" name="image" @change="uploadImage" ref="imageLoader">
                </div>
            </div>
            <div class="modal-settings-container">
                <div class="modal-settings-inputs">
                    <div class="modal-settings-input">
                        <p>Имя:</p>
                        <input type="text" v-model="body.firstName">
                    </div>
                    <div class="modal-settings-input">
                        <p>Фамилия:</p>
                        <input type="text" v-model="body.lastName">
                    </div>
                    <div class="modal-settings-input">
                        <p>Город:</p>
                        <input type="text" v-model="body.city">
                    </div>
                </div>
                <div class="modal-settings-economy">
                    <p>Экономическая роль:</p>
                    <PickOner :picks="mockData.works" v-model="body.economicRole" type="checkboxes-radio"/>
                    <p>Кто видит список моих проблем: </p>
                    <PickOner :picks="mockData.see" v-model="body.visibility" type="checkboxes-radio"/>
                    <p style="margin-top: 40px">
                        Выберете этап(ы) развития проектов,<br>
                        в которые вас могут приглашать<br>
                        для решения проблем:
                    </p>
                    <PickOner :picks="mockData.devolops" v-model="body.stage" type="checkboxes" uncheckAllWhen="не указывать  " />
                    <p style="margin-top: 40px">
                        Выберете доход проектов<br>
                        в которые вас могут приглашать<br>
                        для решения проблем:
                    </p>
                    <h3 class="problems-range-slider-title">до {{ getFormattedNumber(rangeSliderValue) }}р</h3>
                    <div class="problems-range-slider">
                        <client-only>
                            <range-slider
                                    class="slider"
                                    :min="rangeSliderMinValue"
                                    :max="rangeSliderMaxValue"
                                    :step="50000"
                                    v-model="rangeSliderValue">
                            </range-slider>
                        </client-only>
                    </div>
                    <div class="problems-range-slider-bottom">
                        <span>убыточная компания</span>
                        <span>Доход более 1000 000 000 р</span>
                    </div>
                    <PickOner :picks="mockData.difrerence" v-model="xz" type="checkboxes" chooseOneByDefault="Доход проекта не имеет значения " />
                </div>
                <div class="modal-settings-btn">
                    <a href="" class="button-item" @click.prevent="finish()">
                        <span>Сохранить</span>
                    </a>
                </div>
                <div class="problems-card-edit-modal-remove-modal" v-show="showNotFilled">
                    <span class="title">Обязательные поля не указаны</span>
                    <button class="step5-modal-button cancel" style="margin: 0 auto" @click="showNotFilled = false"><span>Ок</span></button>
                </div>
            </div>
        </div>
        <div class="modal-bg" v-if="active" @click="hideModal"></div>
    </div>
</template>

<script>
    import ListTabs from "../elements/ListTabs";
    import PickOner from "../elements/PickOner";
    import RangeSlider from 'vue-range-slider'
    import 'vue-range-slider/dist/vue-range-slider.css'

    import {mapState} from 'vuex';

    export default {
        components: {ListTabs, 'range-slider': RangeSlider, PickOner},
        created() {
        },
        props: {
            active: {
                default: false,
                type: Boolean
            },
            steps: {
                default: 0,
                type: Number
            }
        },
        data() {
            return {
                stepActive: 1,
                rangeSliderValue: 0,
                rangeSliderMinValue: 0,
                rangeSliderMaxValue: 1000000000,
                body: {
                        firstName: "",
                        lastName: "",
                        city: "",
                        economicRole: "",
                        visibility: "",
                        stage: []
                },
                xz: [],
                file: null,
                fileName: null,
                showNotFilled: false,
                mockData: {
                    works: [
                        {
                            title: 'наемный работник',
                            label: 'EMPLOYEE'
                        },
                        {
                            title: 'частник',
                            label:'PRIVATE_TRADER'
                        },
                        {
                            title: 'бизнесмен',
                            label: 'BUSINESSMAN'
                        },
                        {
                            title: 'инвестор  ',
                            label: 'INVESTOR'
                        }
                    ],
                    see: [
                        {
                            title: 'все пользователи ',
                            label: 'ALL'
                        },
                        {
                            title: 'только приглашенные пользователи ',
                            label: 'INVITED'
                        },
                    ],
                    devolops: [
                        {
                            title: 'нет идеи ',
                            label: 'NO_IDEA'
                        },
                        {
                            title: 'идея',
                            label: 'IDEA'
                        },
                        {
                            title: 'прототип',
                            label: 'PROTOTYPE'
                        },
                        {
                            title: 'Брендбук',
                            label: 'BRAND_BOOK'
                        }, {
                            title: 'продукт',
                            label: 'PRODUCT'
                        },
                        {
                            title: 'доход',
                            label: 'INCOME'
                        },
                        {
                            title: 'рентабельность ',
                            label: 'PROFITABILITY'
                        },
                        {
                            title: ' сеть ',
                            label: 'CHAIN'
                        },
                        {
                            title: 'корпорация ',
                            label: 'CORPORATION'
                        },
                        {
                            title: 'не указывать  ',
                            label: 'NOT_INDICATE'
                        },
                    ],
                    difrerence: [
                        {
                            title: 'Доход проекта не имеет значения '
                        }
                    ]
                },
            }
        },
        mounted() {
            this.$bus.$on('hideStepModal', () => {
                this.hideModal()
            });

            // autofill name/surname/city from back
            this.body.firstName = this.user.firstName;
            this.body.lastName = this.user.lastName;
            this.body.city = this.user.city;
            this.body.economicRole = this.mockData.works.map(v => v.label).indexOf(this.user.economicRole) + 1;
            this.body.visibility = this.mockData.see.map(v => v.label).indexOf(this.user.visibility) + 1;
            this.rangeSliderValue = this.user.income;
            let index, title;
            this.body.stage = new Array(this.mockData.devolops.length).fill('');
            for (let i = 0; i < this.user.stage.length; i++) {
                index = this.mockData.devolops.map(v => v.label).indexOf(this.user.stage[i]);
                title = this.mockData.devolops[index].title;
                this.body.stage[index] = title;
            }
        },

        computed: {
            ...mapState('auth', ['user'])
        },

        methods: {
            chooseImg() {
                this.$refs.imageLoader.click();
            },

            uploadImage() {
                if (this.$refs.imageLoader) {
                    this.file = this.$refs.imageLoader.files[0];
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.fileName = e.target.result;
                        document.querySelector('.modal-center-placeholder').style.display = 'none';
                        document.querySelector('.modal-center-frame').style.display = 'block';
                    }
                    reader.readAsDataURL(this.$refs.imageLoader.files[0]);
                } else console.error('Cannot find image loader');
            },
            hideModal() {
                this.$emit('closemodal')
            },
            finish() {
                if (!this.body.firstName.trim() || !this.body.lastName.trim() || !this.body.city.trim() || !this.body.economicRole || !this.body.visibility || !this.body.stage.find(v => v != '') || !this.mockData.see[this.body.visibility-1]) {
                    this.showNotFilled = true;
                    return
                }
                this.body = {
                    firstName: this.body.firstName,
                    lastName: this.body.lastName,
                    city: this.body.city,
                    economicRole: this.mockData.works[this.body.economicRole-1].label,
                    visibility: this.mockData.see[this.body.visibility-1].label,
                    stage: this.mockData.devolops.filter(v => {
                        return this.body.stage.some(a => v.title == a)
                    }).map(v => v.label),
                    income: [0, 50000, 100000, 500000, 10000000, 100000000, 999999999, 1000000000].reduce((prev, curr) => {
                      return (Math.abs(curr - this.rangeSliderValue) < Math.abs(prev - this.rangeSliderValue) ? curr : prev);
                    })
                }
                let data = {
                    data: this.body,
                    file: this.file
                }
                this.hideModal();
                this.$store.dispatch('auth/updateUser', data)
            },
            getFormattedNumber(n) {
                return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        },
        name: "ModalSettings"
    }
</script>
