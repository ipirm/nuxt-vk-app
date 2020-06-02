<template>
  <div class="modal-container" v-show="active">
    <div class="modal-container-close" @click="hideModal">
      <img src="/main-page/modal-close.png">
    </div>
    <div class="steps-number">
      <div v-for="(item,index) in (3 + pickedOnesList.length)" :class="['steps-number-item',stepActive >= index ? 'active-tab' : '']" :key="index">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_i)">
            <circle cx="7.5" cy="7.5" r="7.5" fill="white" />
          </g>
          <defs>
            <filter id="filter0_i" x="0" y="0" width="15" height="16" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
    <div class="modal-container-title">
      <span>ШАГ {{ stepActive+1}}</span>
      <p v-show="stepActive === 0">Укажите сферу ресурса.</p>
      <p v-show="stepActive === 3">Укажите ресурс(ы)</p>
    </div>
    <div class="modal-step" v-show="stepActive === 0">
      <PickOner :picks="formattedPicks" v-model="pickedOne1" type="circular" :returnId="true" />
    </div>
    <div class="modal-step" v-show="stepActive != 0 && !showCheckboxes && !showLastStep" style="margin-top: 30px;">
      <PickOner :picks="stages.data" v-model="pickedOnesList[stepActive-1]" type="list" :returnId="true" />
    </div>
    <div class="modal-step" v-show="showCheckboxes" style="margin-top: 30px; justify-content: flex-start;">
      <PickOner :picks="stages.data" v-model="pickedOneCheckboxes" type="checkboxes" :returnId="true" :sort="sort" />
    </div>
    <AddResourceStep5 v-show="showLastStep" />
    <div class="overlay-steps-buttons">
      <a href="" @click.prevent="prevStep()" class="button-item" v-show="stepActive !== 0">
        <span>Назад</span>
      </a>
      <a href="" @click.prevent="nextStep()" class="button-item" v-show="!showLastStep">
        <span>Далее</span>
      </a>
      <a href="" class="button-item" @click.prevent="finish()" v-show="showLastStep">
        <span>Готово</span>
      </a>
    </div>
    <div class="step5-modal" v-body-scroll-lock="showModal" v-show="showModal">
      <p>{{ modalMsg }}</p>
      <button class="step5-modal-button" @click="showModal = false"><span>Ок</span></button>
    </div>
    <div class="problems-card-edit-modal-remove-modal" v-show="showNotFilled">
      <span class="title">Обязательные поля не указаны</span>
      <button class="step5-modal-button cancel" style="margin: 0 auto" @click="showNotFilled = false"><span>Ок</span></button>
    </div>
  </div>
</template>

<script>
import PickOner from '~/components/elements/PickOner';
import ListTabs from "../elements/ListTabs";
import CheckBoxes from "../elements/CheckBoxes";
import AddResourceStep5 from "./AddResourceStep5";
import { mapState, mapActions } from 'vuex'

export default {
  components: { CheckBoxes, ListTabs, AddResourceStep5, PickOner },
  async created() {
    await this.$store.dispatch('resource/getResource', this.stepActive).then(()=> {
      this.formattedPicks = this.picks.filter((v) => this.stages.some((i) => {
        if(v.name === i.title)
          Object.assign(v,{id: i.id})
        return v.title === i.name
      }));
    })
  },
  props: {
    active: {
      default: false,
      type: Boolean
    },
    steps: {
      default: 0,
      type: Number
    },
  },
  data() {
    return {
      stepActive: 0,
      activeStepData: [],
      modalMsg: '',
      selected: '',
      showModal: false,
      showNotFilled: false,
      formattedPicks: [],
      selectedSecondStep: [],
      selectedThirdStep: [],
      selectedFourthStep: [],
      showCheckboxes: false,
      showLastStep: false,
      pickedOnesList: [],
      sort: false,
      picks: [
        {
          title: 'Люди',
          picPassive: 'dealership/people-passive.svg',
          picActive: 'dealership/people-active.svg',
        },
        {
          title: 'Сырье',
          picPassive: 'dealership/parque-passive.svg',
          picActive: 'dealership/parque-active.svg',
        },
        {
          title: 'Производство',
          picPassive: 'dealership/production-passive.svg',
          picActive: 'dealership/production-active.svg',
        },
        {
          title: 'Точки продаж',
          picPassive: 'dealership/market-passive.svg',
          picActive: 'dealership/market-active.svg',
        },
        {
          title: 'Оборудование',
          picPassive: 'dealership/devices-passive.svg',
          picActive: 'dealership/devices-active.svg',
        },
        {
          title: 'Недвижимость',
          picPassive: 'dealership/home-passive.svg',
          picActive: 'dealership/home-active.svg',
        },
        {
          title: 'Разработка',
          picPassive: 'dealership/drawing-passive.svg',
          picActive: 'dealership/drawing-active.svg',
        },
        {
          title: 'Сервисы',
          picPassive: 'dealership/cservice-passive.svg',
          picActive: 'dealership/cservice-active.svg',
        },
        {
          title: 'Полит. ресурсы',
          picPassive: 'dealership/politics-passive.svg',
          picActive: 'dealership/politics-active.svg',
        },
        {
          title: 'Финансы',
          picPassive: 'dealership/finances-passive.svg',
          picActive: 'dealership/finances-active.svg',
        }
      ],
      pickedOne1: -1,
      pickedOneCheckboxes: []
    }
  },
  mounted() {
    this.$bus.$on('hideStepModalplease', () => {
      this.hideModal()
    });
    this.$bus.$on('modal-step-done', step4Data => {
      this.$store.dispatch('resource/addResource', {
        data: {
          name: step4Data.name,
          city: step4Data.city,
          description: step4Data.description,
          scopeId: [this.pickedOne1,...this.pickedOnesList],
        },
        files: step4Data.files
      }).then(async ()=>{
        await this.$store.dispatch('auth/getUser');
      });
    });
  },
  methods: {
    hideModal() {
      this.$emit('closemodal')
      this.pickedOne1 = -1;
      this.pickedOnesList = [];
      this.pickedOneCheckboxes = [];
      this.stepActive = 0;
      this.$bus.$emit('step5-cleanup');
      this.showCheckboxes = false;
      this.showLastStep = false;
    },
    selectPerson() {
      this.selected = 1;
      this.$store.commit('resource/SET_MODAL_DATA', 1);
    },
    async prevStep() {
      this.stepActive--
      this.showLastStep = false;
      this.showCheckboxes = false;
      if (this.stepActive == 0) {
        console.log('PREV: 1')
        await this.$store.dispatch('resource/getResource', this.stepActive);
      } else if (this.stepActive == 1) {
        console.log('PREV: 2')
        if (this.pickedOne1 == 1912) {
          console.log('PREV: 3')
          await this.$store.dispatch('resource/getResource', 1409);
        } else
          await this.$store.dispatch('resource/getResource', this.pickedOne1);
      } else {
        console.log('PREV: 4')
        await this.$store.dispatch('resource/getResource', this.pickedOnesList[this.stepActive-2]);
        this.showCheckboxes = !this.stages.hasNext;
      }
    },
    async nextStep() {
      if (this.stepActive == 0 && this.pickedOne1 == -1) {
        console.log('NEXT: 1')
        this.showNotFilled = true;
        return
      }
      if (this.stepActive > 1 && !this.showCheckboxes && !this.pickedOnesList[this.stepActive-1]) {
        console.log('NEXT: 2')
        this.showNotFilled = true;
        return
      }
      if (this.showCheckboxes && this.pickedOneCheckboxes.length == 0) {
        console.log('NEXT: 3')
        this.showNotFilled = true;
        return
      }
      if (this.showCheckboxes) {
        console.log('NEXT: 4')
        this.showLastStep = true;
        this.showCheckboxes = false;
        this.stepActive++
        return;
      }
      if (this.showLastStep) {
        console.log('NEXT: 5')
        return;
      }

      this.stepActive++
      if (this.stepActive == 0) {
        console.log('NEXT: 6')
        await this.$store.dispatch('resource/getResource', this.stepActive);
        this.showCheckboxes = !this.stages.hasNext;
      } else if (this.stepActive == 1) {
        console.log('NEXT: 7')
        if (this.pickedOne1 == 1912) {
          console.log('NEXT: 8')
          await this.$store.dispatch('resource/getResource', 1409);
          return;
        }
        await this.$store.dispatch('resource/getResource', this.pickedOne1);
        this.showCheckboxes = !this.stages.hasNext;
        if (this.pickedOne1 == 2895) {
          console.log('NEXT: 9')
          this.sort = true;
        }
      } else {
        console.log('NEXT: 10')
        await this.$store.dispatch('resource/getResource', this.pickedOnesList[this.stepActive-2]).then(() => {
            if (this.stages.length == 0) {
              this.showLastStep = true;
            } else {
              this.showCheckboxes = !this.stages.hasNext;
            }
          });
      }

      if (this.pickedOne1 != 2895) {
        console.log('NEXT: 11');
        this.sort = false;
      }
    },
    finish() {
      this.$bus.$emit('step5-finish');
    }
  },
  computed: {
    ...mapState('resource', ['stages']),
    ...mapState('resource', ['modalData']),
  },
}
</script>
