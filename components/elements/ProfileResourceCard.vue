<template>
  <div class="resources-tab-card problems-card-outer" style="margin-top: 10px" :style="{'z-index': showEdit ? 4 : 3}">
    <div class="problems-card">
      <div class="problems-card-simple" v-show="!showEdit" @click="showEdits()">
        <div class="pic-area"><img :src="data.pic"></div>
        <div class="info-area"><span>{{ data.description }}</span></div>
      </div>
      <div class="problems-card-edit problems-card-edit--mine" v-show="showEdit">
        <a href="" class="tabs-navigation-button problems-tab-add" @click.prevent="showEditModal = true">
          <img src="/profile/request.svg">
          <span>Запросить ресурс</span>
        </a>
        <div class="card-filters resources-tab-card-filters">
          <span>фильтры</span>
          <span v-for="item in data.scopes" :key="item.id">{{ item.name }}</span>
        </div>
        <div class="about-problem-info resources-tab-card-info">
          <span class="about-problem-info-title">О ресурсе:</span>
          <span class="about-problem-info-text">{{ data.description }}</span>
        </div>
        <ProblemsCardSlider :slides="['', '']" />
      </div>
    </div>
    <div class="problems-card-minimize" v-show="showEdit" @click="showEdit = false">
    	<img src="/problems/minimize.png">
    </div>
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
  },

  methods: {
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

      if (this.resourceStep < this.resourceSteps - 1)
        this.resourceStep++;
      await this.$store.dispatch('resource/getResource', this.resourceStep);

    },

    async resourcePrevStep() {
      if (this.resourceStep > 0)
        this.resourceStep--;
      await this.$store.dispatch('resource/getResource', this.resourceStep);
    },

    modalLowerFinish() {
      if (!this.location.trim() || !this.resourceName.trim() || !this.resourceDescription.trim()) {
        this.showNotFilled = true;
        return;
      }

      this.showEditModal = false;
      this.$store.dispatch('resource/updateResource', {
        id: parseInt(this.data.id),
        name: this.resourceName,
        description: this.resourceDescription,
        city: this.location,
        scopeId: [1, ...this.data.scopes.map(v => v.id)],

        // files: this.files.slice()
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
      });
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
