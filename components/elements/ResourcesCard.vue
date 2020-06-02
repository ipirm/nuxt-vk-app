<template>
  <div class="resources-tab-card problems-card-outer" style="margin-top: 10px">
    <div class="problems-card">
      <div class="problems-card-simple" v-show="!showEdit" @click="showEdits()">
        <div class="pic-area"><img :src="card.pic"></div>
        <div class="info-area"><span>{{ data.name }}</span></div>
      </div>
      <div class="problems-card-edit problems-card-edit--mine" v-show="showEdit">
        <a href="" class="tabs-navigation-button problems-tab-add" @click.prevent="showEditModal = true">
          <img src="/main-page/modal-edit-white.png">
          <span>Редактировать</span>
        </a>
        <div class="card-filters resources-tab-card-filters">
          <span>фильтры</span>
          <span v-for="item in data.scopes" :key="item.id">{{ item.name }}</span>
        </div>
        <div class="about-problem-info resources-tab-card-info">
          <span class="about-problem-info-title">О ресурсе:</span>
          <span class="about-problem-info-text">{{ data.description}}</span>
        </div>
        <ProblemsCardSlider :slides="this.data.files" v-show="this.data.files" />
      </div>
    </div>
    <div class="problems-card-edit-modal" v-show="showEditModal" v-body-scroll-lock="showEditModal">
      <div class="problems-card-edit-modal-card">
        <div class="solutions-modal-close resources-close" @click="showEditModal = false">
          <img src="/main-page/modal-close.png">
        </div>
        <button class="problems-card-edit-modal-remove" @click="showEditRemoveModal = true">
          <img src="/problems/trash.svg">
          <span>Удалить ресурс</span>
        </button>
        <div class="card-filters resources-tab-card-filters resources-tab-card-filters--modal">
          <span>фильтры</span>
          <span v-for="item in data.scopes" :key="item.id">{{ item.name }}</span>
        </div>
        <div class="problems-card-edit-modal-remove-modal" v-show="showEditRemoveModal">
          <span class="title">Вы действительно хотите удалить этот ресурс?</span>
          <div class="buttons">
            <button class="step5-modal-button cancel" @click="showEditRemoveModal = false"><span>Отмена</span></button>
            <button class="step5-modal-button remove" @click="closeEverything(data.id)">Удалить</button>
          </div>
        </div>
        <div class="problems-card-edit-modal-content">
          <button class="step5-modal-button problems-card-edit-modal-button" @click="showEditModalSteps = true"><span>Редактировать фильтры ресурса</span></button>
          <div class="problems-card-edit-modal-section">
            <span class="problems-card-edit-modal-title">Выберете местоположение проблемы:</span>
            <CustomSelectInput :options="$store.state.russianRegions.regions" v-model="location" placeholder="" />
          </div>
          <div class="problems-card-edit-modal-section">
            <span class="problems-card-edit-modal-title">Добавьте название для ресурса (не более 50 символов):</span>
            <div class="step5-textarea problems-card-edit-modal-textarea">
              <textarea :maxlength="maxResourceNameLength" v-model="resourceName" placeholder="Краткое название для ресурса менее 50и символов"></textarea>
              <div class="count">{{ resourceName.length }}/{{ maxResourceNameLength }}</div>
            </div>
          </div>
          <div class="problems-card-edit-modal-section">
            <span class="problems-card-edit-modal-title">Расскажите о ресурсе:</span>
            <div class="step5-textarea problems-card-edit-modal-textarea">
              <textarea maxlength="1000" placeholder="текст" v-model="resourceDescription"></textarea>
            </div>
          </div>
          <div class="problems-card-edit-modal-section">
            <span class="problems-card-edit-modal-title">Вы можете прикрепить файлы:</span>
            <div class="solutions-add-file-items">
              <div class="step5-add-file-item" v-for="(file,i) in files" :key="i">
                <button @click="removeFile(i)">
                  <img src="~/static/main-page/modal-close.png">
                </button>
                <div class="step5-add-file-item-title">{{ file.name }}</div>
              </div>
              <button class="step5-add-file-button" @click="chooseFile()">
                <img src="~/static/step5/add-file.svg">
              </button>
            </div>
          </div>
          <button class="step5-modal-button problems-card-edit-modal-button" @click="modalLowerFinish()"><span>Готово</span></button>
        </div>
      </div>
    </div>
    <div class="problems-card-edit-modal-remove-modal" v-show="showNotFilled" style="z-index: 1000000" v-body-scroll-lock="showNotFilled">
      <span class="title">Обязательные поля не указаны</span>
      <button class="step5-modal-button cancel" style="margin: 0 auto" @click="showNotFilled = false"><span>Ок</span></button>
    </div>
    <div class="problems-card-edit-modal problems-card-edit-modal--higher" v-show="showEditModalSteps" v-body-scroll-lock="showEditModalSteps">
      <div class="problems-card-edit-modal-card">
        <div class="solutions-modal-close resources-close" @click="showEditModalSteps = false">
          <img src="/main-page/modal-close.png">
        </div>
        <div class="problems-card-edit-modal-card-stepper-wrapper">
          <div class="problems-card-edit-modal-card-stepper-steps">
            <div class="problems-card-edit-modal-card-stepper-item" v-for="i in resourceSteps" :key="i" :class="{ active: i < resourceStep+2 }">
              <img class="active" src="/problems/step-active.png">
              <img class="passive" src="/problems/step-passive.png">
            </div>
          </div>
          <span class="problems-card-edit-modal-card-stepper">Шаг {{ resourceStep+1 }}</span>
          <span class="problems-card-edit-modal-card-stepper-subtitle" v-show="resourceStep == 0">Укажите сферу ресурса.</span>
        </div>
        <div class="problems-card-edit-modal-card-content resources-tab-card-content" v-show="resourceStep == 0">
          <PickOner :picks="formattedPicks" v-model="pickedOne1" type="circular" />
        </div>
        <div class="problems-card-edit-modal-card-content resources-tab-card-content" v-show="resourceStep == 1">
          <PickOner :picks="stages.scopes" v-model="pickedOne2" type="list" />
        </div>
        <div class="problems-card-edit-modal-card-content resources-tab-card-content" v-show="resourceStep == 2">
          <PickOner :picks="stages.scopes" v-model="pickedOne3" type="list" />
        </div>
        <div class="problems-card-edit-modal-card-content resources-tab-card-content" v-show="resourceStep == 3">
          <PickOner :picks="picksStepFour" v-model="pickedOnes4" type="checkboxes" />
        </div>
        <div class="problems-card-edit-modal-card-buttons">
          <button class="step5-modal-button problems-card-edit-modal-button" @click="resourcePrevStep()" v-show="resourceStep != 0"><span>Назад</span></button>
          <button class="step5-modal-button problems-card-edit-modal-button" @click="resourceNextStep()" v-show="resourceStep != resourceSteps-1"><span>Далее</span></button>
          <button class="step5-modal-button problems-card-edit-modal-button" @click="resourceDoneStep()" v-show="resourceStep == resourceSteps-1"><span>Готово</span></button>
        </div>
      </div>
    </div>
    <div class="problems-card-minimize" v-show="showEdit" @click="showEdit = false">
      <img src="~/static/problems/minimize.png">
    </div>
    <input v-show="false" class="file-loader" type="file" ref="fileLoader">
  </div>
</template>

<script>
import ProblemsCardSlider from '~/components/elements/ProblemsCardSlider';
import CustomSelectInput from '~/components/elements/CustomSelectInput';
import PickOner from '~/components/elements/PickOner';
import { mapState } from 'vuex'
export default {
  props: ['card', 'data'],

  components: {
    ProblemsCardSlider,
    CustomSelectInput,
    PickOner
  },
  async created() {
    await this.$store.dispatch('resource/getResource', this.resourceStep).then(() => {
      this.formattedPicks = this.picks.filter((v) => this.stages.some((i) => {
        if (v.name === i.title)
          Object.assign(v, { id: i.id })
        return v.title === i.name
      }));
    })
  },
  data() {
    return {
      showEdit: false,
      showEditModal: false,
      showEditRemoveModal: false,
      showEditModalSteps: false,
      showNotFilled: false,

      location: '',

      maxResourceNameLength: 50,
      resourceName: '',
      resourceDescription: '',
      formattedPicks: [],
      resourceSteps: 4,
      resourceStep: 0,
      picks: [{
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
      pickedOne2: -1,
      pickedOne3: -1,
      pickedOnes4: [],
      picksStepFour: [{
          title: 'управляющий',
          picPassive: 'dealership/research-passive.svg',
          picActive: 'dealership/service-active.svg',
        },
        {
          title: 'администратор',
          picPassive: 'dealership/research-passive.svg',
          picActive: 'dealership/service-active.svg',
        },
        {
          title: 'завхоз',
          picPassive: 'dealership/research-passive.svg',
          picActive: 'dealership/service-active.svg',
        },
        {
          title: 'снабженец',
          picPassive: 'dealership/research-passive.svg',
          picActive: 'dealership/service-active.svg',
        },
        {
          title: 'клининг',
          picPassive: 'dealership/research-passive.svg',
          picActive: 'dealership/service-active.svg',
        },
        {
          title: 'технический специалист',
          picPassive: 'dealership/research-passive.svg',
          picActive: 'dealership/service-active.svg',
        }
      ],
      files: []
    }
  },
  mounted() {
    this.$bus.$on('resources-card-edit-hide', () => {
      this.showEdit = false;
    });

    // autofilling data
    this.location = this.data.city;
    this.resourceDescription = this.data.description;
    this.resourceName = this.data.name;

    if (this.data && this.data.files) {
      for (let i = 0; i < this.data.files.length; i++) {
        this.files.push({
          file: this.data.files[i],
          name: this.data.files[i].split('.').pop()
        });
      }
    }

    let fileLoader = this.$el.querySelector('.file-loader');
    fileLoader.onchange = () => {
      this.files.push({
        file: fileLoader.files[0],
        name: fileLoader.files[0].name.split('.').pop()
      })
    }
  },

  methods: {
    chooseFile() {
      this.$refs.fileLoader.click();
    },

    removeFile(i) {
      this.files.splice(i,1);
    },

    closeEverything(id) {
      this.showEdit = false;
      this.showEditModal = false;
      this.showEditRemoveModal = false;
      this.showEditModalSteps = false;
      this.$store.dispatch('resource/deleteResource', id).then(async () => {
        await this.$store.dispatch('auth/getUser');
      })
    },

    async resourceNextStep() {
      if (this.resourceStep == 0 && this.pickedOne1 == -1) {
        this.showNotFilled = true;
        return
      }
      if (this.resourceStep == 1 && this.pickedOne2 == -1) {
        this.showNotFilled = true;
        return
      }
      if (this.resourceStep == 2 && this.pickedOne3 == -1) {
        this.showNotFilled = true;
        return
      }
      if (this.resourceStep == 3 && this.pickedOnes4.length == 0) {
        this.showNotFilled = true;
        return
      }

      if (this.resourceStep < this.resourceSteps - 1) {
        this.resourceStep++;
        if (this.resourceStep == 0) {
          await this.$store.dispatch('resource/getResource', this.resourceStep);
        } else if (this.resourceStep == 1) {
          await this.$store.dispatch('resource/getResource', this.formattedPicks[this.pickedOne1 - 1].id);
        } else if (this.resourceStep == 2) {
          await this.$store.dispatch('resource/getResource', this.pickedOne2);
        } else if (this.resourceStep == 3) {
          await this.$store.dispatch('resource/getResource', this.pickedOne3);
        }
      }
    },

    async resourcePrevStep() {
      if (this.resourceStep > 0) {
        this.resourceStep--;
        if (this.resourceStep == 0) {
          await this.$store.dispatch('resource/getResource', this.resourceStep);
        } else if (this.resourceStep == 1) {
          await this.$store.dispatch('resource/getResource', this.formattedPicks[this.pickedOne1 - 1].id);
        } else if (this.resourceStep == 2) {
          await this.$store.dispatch('resource/getResource', this.pickedOne2);
        } else if (this.resourceStep == 3) {
          await this.$store.dispatch('resource/getResource', this.pickedOne3);
        }
      }
    },

    modalLowerFinish() {
      if (!this.location.trim() || !this.resourceName.trim() || !this.resourceDescription.trim()) {
        this.showNotFilled = true;
        return;
      }

      this.showEditModal = false;
      this.$store.dispatch('resource/updateResource', {
        data: {
	        id: this.data.id,
	        name: this.resourceName,
	        description: this.resourceDescription,
	        city: this.location,
	        scopeId: [...this.data.scopes.map(v => v.id)],
        },
        files: this.files
      });
    },

    resourceDoneStep() {
      if (this.resourceStep == 3 && this.pickedOnes4.length == 0) {
        this.showNotFilled = true;
        return;
      }
      this.showEditModalSteps = false;

      this.$store.dispatch('resource/setEditResourcesCardFilters', {
        scopeId: [this.pickedOne1, this.pickedOne2, this.pickedOne3],
        // checkboxes
        step3: this.pickedOnes4.filter(v => v != '').slice()
      }).then(async () => {
        await this.$store.dispatch('auth/getUser');
      });

      this.created();
    },

    showEdits() {
      this.$bus.$emit('resources-card-edit-hide');
      this.showEdit = true
    }
  },
  computed: {
    ...mapState('resource', ['stages']),
  }
}

</script>
