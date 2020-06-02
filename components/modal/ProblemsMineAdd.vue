<template>
  <div class="modal-container" v-if="active">
    <div class="modal-container-close" @click="hideModal">
      <img src="/main-page/modal-close.png">
    </div>
    <div class="steps-number steps-number--problems">
      <div v-for="(item,index) in (3 + pickedOnesProjectList.length + pickedOnesResourcesList.length)" :class="['steps-number-item',stepActive >= index ? 'active-tab' : '']" :key="index">
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
    <div class="modal-container-title" style="margin-bottom: 30px;">
      <span>ШАГ {{2+ stepActive + stepActiveResources}}</span>
      <p v-show="showLink">Вы можете добавить ссылку на страницу вашего проекта в соц. сетях/ссылку на сайт вашего проекта.<br><br>Либо пропустить этот шаг нажав "Далее".</p>
      <p v-show="showProfitability">Укажите доход вашего проекта:</p>
    </div>
    <div class="modal-step" v-show="stepActive === 0">
      <PickOner :picks="formattedPicks" v-model="pickedOne1" type="circular" :returnId="true" />
    </div>
    <div class="modal-step" v-show="!showResources && stepActive != 0 && !showCheckboxes && !showLastStep && !showLink && !showProfitability">
      <PickOner :picks="stagesProblem.data" v-model="pickedOnesProjectList[stepActive-1]" type="list" />
    </div>
    <div class="modal-step" v-show="showCheckboxes" style="justify-content: flex-start;">
      <PickOner :picks="stagesProblem.data" v-model="pickedOneCheckboxes" type="checkboxes" />
    </div>
    <div v-show="showLink" class="problems-step3-input-wrapper">
      <input class="problems-step3-input" v-model="link">
    </div>
     <div v-show="showProfitability" class="problems-step5">
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
    </div>
    <div class="modal-step" v-show="showResources && stepActiveResources == 0">
      <PickOner :picks="formattedPicksResources" v-model="pickedOne1Resources" type="circular" :returnId="true" />
    </div>
    <div class="modal-step" v-show="showResources && stepActiveResources > 0 && !showCheckboxesResources && !showLastStep">
      <PickOner :picks="stages.data" v-model="pickedOnesResourcesList[stepActiveResources-1]" type="list" />
    </div>
    <div class="modal-step" v-show="showResources && showCheckboxesResources" style="justify-content: flex-start;">
      <PickOner :picks="stages.data" v-model="pickedOneCheckboxesResources" type="checkboxes" />
    </div>
    <div v-show="showLastStep">
      <ProblemsMineAddStep9 />
    </div>
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
    <div class="problems-card-edit-modal-remove-modal" v-show="showNotFilled">
      <span class="title">Обязательные поля не указаны</span>
      <button class="step5-modal-button cancel" style="margin: 0 auto" @click="showNotFilled = false"><span>Ок</span></button>
    </div>
  </div>
</template>

<script>
import ListTabs from "../elements/ListTabs";
import CheckBoxes from "../elements/CheckBoxes";
import PickOner from "../elements/PickOner";
import ProblemsMineAddStep9 from "./ProblemsMineAddStep9";

import RangeSlider from 'vue-range-slider'
// you probably need to import built-in style
import 'vue-range-slider/dist/vue-range-slider.css'

import { mapState } from 'vuex';

export default {
  components: { CheckBoxes, ListTabs, 'range-slider': RangeSlider, ProblemsMineAddStep9, PickOner },
  async created() {
    await this.$store.dispatch('problem/getProblem', this.stepActive).then(() => {
      this.formattedPicks = this.picks.filter((v) => this.stagesProblem.some((i) => {
        if (v.name && i.name) {
          if (v.name.toLowerCase() === i.name.toLowerCase())
            Object.assign(v, { id: i.id })
          return v.name.toLowerCase() === i.name.toLowerCase()
        }
      }));
    });
    await this.$store.dispatch('resource/getResource', 0).then(()=> {
      this.formattedPicksResources = this.picksResources.filter((v) => this.stages.some((i) => {
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
    }
  },
  data() {
    return {
      stepActive: 0,
      rangeSliderValue: 0,
      rangeSliderMinValue: 0,
      rangeSliderMaxValue: 1000000000,
      formattedPicks: [],
      pickedOneCheckboxes: [],
      showNotFilled: false,
      link: '',

      formattedPicksResources: [],
      showResources: false,
      stepActiveResources: -1,
      showCheckboxesResources: false,
      pickedOnesResourcesList: [],
      pickedOneCheckboxesResources: [],
      pickedOne1Resources: -1,

      picks: [
        {
          name: 'Исследования',
          picPassive: 'dealership/research-passive.svg',
          picActive: 'dealership/research-active.svg',
        },
        {
          name: 'Производство',
          picPassive: 'dealership/production-passive.svg',
          picActive: 'dealership/production-active.svg',
        },
        {
          name: 'Обслуживание',
          picPassive: 'dealership/service-passive.svg',
          picActive: 'dealership/service-active.svg',
        },
        {
          name: 'Продажи',
          picPassive: 'dealership/cart-passive.svg',
          picActive: 'dealership/cart-active.svg',
        },
        {
          name: 'Образование',
          picPassive: 'dealership/edu-passive.svg',
          picActive: 'dealership/edu-active.svg',
        },
        {
          name: 'Медицина',
          picPassive: 'dealership/med-passive.svg',
          picActive: 'dealership/med-active.svg',
        },
        {
          name: 'Логистика',
          picPassive: 'dealership/passive.svg',
          picActive: 'dealership/active.svg',
        },
        {
          name: 'Консалтинг',
          picPassive: 'dealership/consulting-passive.svg',
          picActive: 'dealership/consulting-active.svg',
        },
        {
          name: 'Юриспруденция',
          picPassive: 'dealership/uri-passive.svg',
          picActive: 'dealership/uri-active.svg',
        },
        {
          name: 'Финансы',
          picPassive: 'dealership/finances-passive.svg',
          picActive: 'dealership/finances-active.svg',
        }
      ],
      picksResources: [
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
      pickedOnesProjectList: [],
      showCheckboxes: false,
      showLink: false,
      showProfitability: false,
      showLastStep: false
    }
  },
  mounted() {
    this.$bus.$on('hideStepModalPlease', () => { this.hideModal() });
    this.$bus.$on('problem-mine-add-done', lastStep => {
      console.log(lastStep.files);
      this.$store.dispatch('problem/addProblem',  {
        data: {
          name: lastStep.name,
          city: lastStep.city,
          description: lastStep.description,
          projectId: [this.pickedOne1,...this.pickedOnesProjectList],
          linkProject: this.link,
          income: [0, 50000, 100000, 500000, 10000000, 100000000, 999999999, 1000000000].reduce((prev, curr) => {
            return (Math.abs(curr - this.rangeSliderValue) < Math.abs(prev - this.rangeSliderValue) ? curr : prev);
          }),
          scopeId: [this.pickedOne1Resources,...this.pickedOnesResourcesList],
          stage: 'IDEA'
        },
        files: lastStep.files
      }).then(async ()=>{
            await this.$store.dispatch('auth/getProblems');
      });
    });
  },

  methods: {
    hideModal() {
      this.$emit('closemodal')
      this.pickedOnesProjectList = [];
      this.pickedOneCheckboxes = [];
      this.pickedOnesResourcesList = [];
      this.pickedOneCheckboxesResources = [];
      this.stepActive = 0;
      this.$bus.$emit('step9-cleanup');
      this.showCheckboxes = false;
      this.showLastStep = false;
      this.showCheckboxesResources = false;
      this.showResources = false;
      this.stepActiveResources = -1;
      this.link = '';
      this.rangeSliderValue = 0;
    },

    async prevStep() {
      if (!this.showResources) {
        console.log('PREV: 1');
        this.stepActive--
        if (this.stepActive == 0) {
          console.log('PREV: 2');
          this.showCheckboxes = false;
          this.showLink = false;
          this.showProfitability = false;
          await this.$store.dispatch('problem/getProblem', this.stepActive);
        } else {
          if (this.stepActive == 1) {
            console.log('PREV: 3');
            await this.$store.dispatch('problem/getProblem', this.pickedOne1);
          }
          else {
            console.log('PREV: 4');
            if (!this.showLink)
              await this.$store.dispatch('problem/getProblem', this.pickedOnesProjectList[this.stepActive-2]);
          }
          if (this.showLink) {
            console.log('PREV: 5');
            this.showLink = false;
            this.showProfitability = true;
          } else if (this.showProfitability) {
            console.log('PREV: 6');
            this.showProfitability = false;
            this.showCheckboxes = true;
          } else if (this.showCheckboxes) {
            console.log('PREV: 7');
            this.showCheckboxes = false;
          }
        }
      } else {
        console.log('PREV: 8');
        this.stepActiveResources--
        this.showCheckboxesResources = false;
        if (this.stepActiveResources == -1) {
          console.log('PREV: 9');
          this.showResources = false;
          this.showLink = true;
        } else if (this.stepActiveResources == 0) {
          console.log('PREV: 10');
          this.showLastStep = false;
          await this.$store.dispatch('resource/getResource', 0).then(()=> {
            this.formattedPicksResources = this.picksResources.filter((v) => this.stages.some((i) => {
              if(v.name === i.title)
                Object.assign(v,{id: i.id})
              return v.title === i.name
            }));
          })
        } else if (this.showLastStep) {
          console.log('PREV: 11');
          this.showLastStep = false;
          if (this.stages.length > 0)
            this.showCheckboxesResources = true;
          else
            await this.$store.dispatch('resource/getResource', this.pickedOnesResourcesList[this.stepActiveResources-2]);
        } else if (this.stepActiveResources == 1) {
          console.log('PREV: 12');
          if (this.pickedOne1Resources == 1912) {
            await this.$store.dispatch('resource/getResource', 1409);
            return;
          } else {
            await this.$store.dispatch('resource/getResource', this.pickedOne1Resources);
          }
        } else {
          console.log('PREV: 13');
          await this.$store.dispatch('resource/getResource', this.pickedOnesResourcesList[this.stepActiveResources-2]);
        }
      }
    },

    async nextStep() {
      if (!this.showResources) {
        if (this.stepActive == 0 && this.pickedOne1 == -1) {
          console.log('NEXT: 1')
          this.showNotFilled = true;
          return
        }
        if (this.stepActive > 1 && !this.showCheckboxes && !this.showLink && !this.showProfitability && !this.showLastStep && !this.pickedOnesProjectList[this.stepActive-1]) {
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
          this.showProfitability = true;
          this.showCheckboxes = false;
          this.stepActive++
          return;
        }
        if (this.showProfitability) {
          console.log('NEXT: 5')
          this.showProfitability = false;
          this.showLink = true;
          this.stepActive++
          return;
        }
        if (this.showLink) {
          console.log('NEXT: 6')
          this.showLink = false;
          this.showResources = true;
          this.stepActiveResources++
          return;
        }
      } else {
        if (this.stepActiveResources == 0 && this.pickedOne1Resources == -1) {
          console.log('NEXT: 7')
          this.showNotFilled = true;
          return;
        }
        if (this.stepActiveResources > 1 && !this.showCheckboxesResources && !this.showLastStep && !this.pickedOnesResourcesList[this.stepActiveResources-1]) {
          console.log('NEXT: 8')
          this.showNotFilled = true;
          return
        }
        if (this.showCheckboxesResources && this.pickedOneCheckboxesResources.length == 0) {
          console.log('NEXT: 9')
          this.showNotFilled = true;
          return
        }
        if (this.showCheckboxesResources) {
          console.log('NEXT: 10')
          this.showLastStep = true;
          this.showCheckboxesResources = false;
          this.stepActiveResources++;
          return;
        }
      }
      if (this.showLastStep) {
        console.log('NEXT: 11')
        return;
      }

      if (!this.showResources) {
        console.log('NEXT: 12');
        this.stepActive++;
        if (this.stepActive == 0) {
          console.log('NEXT: 13');
          await this.$store.dispatch('problem/getProblem', this.stepActive).then(() => {
            if (this.stagesProblem.length == 0) {
              this.showProfitability = true;
            }
          });
          this.showCheckboxes = !this.stagesProblem.hasNext;
        } else if (this.stepActive == 1) {
          console.log('NEXT: 14');
          await this.$store.dispatch('problem/getProblem', this.pickedOne1).then(() => {
            if (this.stagesProblem.length == 0) {
              this.showProfitability = true;
            } else {
              this.showCheckboxes = !this.stagesProblem.hasNext;
            }
          });
        } else {
          console.log('NEXT: 15');
          await this.$store.dispatch('problem/getProblem', this.pickedOnesProjectList[this.stepActive-2]);
          this.showCheckboxes = !this.stagesProblem.hasNext;
        }
      } else {
        console.log('NEXT: 16');
        this.stepActiveResources++;
        if (this.stepActiveResources == 0) {
          console.log('NEXT: 17');
          if (this.pickedOne1Resources == 1912) {
            await this.$store.dispatch('resource/getResource', 1409);
            return;
          } else  {
            await this.$store.dispatch('resource/getResource', this.stepActiveResources).then(() => {
              if (this.stages.length == 0) {
                this.showLastStep = true;
              }
            });
          }
          this.showCheckboxesResources = !this.stages.hasNext;
        } else if (this.stepActiveResources == 1) {
          console.log('NEXT: 18');
          if (this.pickedOne1Resources == 1912) {
            await this.$store.dispatch('resource/getResource', 1409);
            return;
          } else {
            await this.$store.dispatch('resource/getResource', this.pickedOne1Resources);
          }
          this.showCheckboxesResources = !this.stages.hasNext;
        } else {
          console.log('NEXT: 19');
          console.log(this.stepActiveResources);
          console.log(this.pickedOnesResourcesList);
          await this.$store.dispatch('resource/getResource', this.pickedOnesResourcesList[this.stepActiveResources-2]).then(() => {
            if (this.stages.length == 0)
              this.showLastStep = true;
            else
              this.showCheckboxesResources = !this.stages.hasNext;
          });
        }
      }
    },


    finish() {
      this.$bus.$emit('step9-mine-add-finish');
    },


    getFormattedNumber(n) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  },
  name: "ModalStep",
  computed: {
    ...mapState('problem', ['stagesProblem']),
    ...mapState('resource', ['stages'])
  }
}

</script>
