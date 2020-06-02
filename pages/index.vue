<template>
  <div class="container">
    <div class="overlay-image">
      <div class="overlay-image-left">
        <nuxt-link to="/">
          <div class="tabs-link">
            <img src="/header/vk.png">
          </div>
        </nuxt-link>
      </div>
      <div class="overlay-image-item">
        <img :src="user && user.photo ? user.photo : '/photo.png'">
      </div>
      <div class="overlay-image-left">
        <a href="#" @click.prevent="togleSettings">
          <div class="tabs-link">
            <img src="/main-page/add.png">
          </div>
        </a>
      </div>
    </div>
    <div class="overlay-image-item-capture">
      <span class="overlay-image-item-work">{{ getRole}}</span>
      <span class="overlay-image-item-name">{{ user.firstName}} {{ user.lastName}}</span>
      <span class="overlay-image-item-location">{{ user.city}}</span>
    </div>
    <div class="tabs-navigation">
      <MainTabs>
        <template #tab1>
          <a href="" class="tabs-navigation-button" @click.prevent="toggleModal">
            <img src="/main-page/add-card.png">
            <span>добавить</span>
          </a>
          <ResourcesCard :data="item" v-for="item in user.resources" :key="item.id" :card="resourcesCard" />
        </template>
        <template #tab2>
          <div class="problems-tabbers">
            <div class="problems-tabbers-item" @click="problemsTabActive = 1" :class="{ active: problemsTabActive == 1 }">
              <span>Мои проблемы</span>
              <img class="active" src="/problems/mine-active.svg">
              <img class="passive" src="/problems/mine-passive.svg">
            </div>
            <div class="problems-tabbers-item" @click="problemsTabActive = 2" :class="{ active: problemsTabActive == 2 }">
              <img class="active" src="/problems/others-active.svg">
              <img class="passive" src="/problems/others-passive.svg">
              <span>Чужие проблемы</span>
            </div>
          </div>
          <div class="problems-tab" v-show="problemsTabActive == 1">
            <a href="" class="tabs-navigation-button problems-tab-add" @click.prevent="toggleProblemsModal">
              <img src="/main-page/add-card.png">
              <span>добавить</span>
            </a>
            <ProblemsCard :data="item" v-for="item in user.problems" :key="item.id"/>
          </div>
          <div class="problems-tab" v-show="problemsTabActive == 2">
            <div class="problems-others-folders">
              <div class="problems-others-folders-item" :class="{ active: problemsOthersTabActive == 1 }">
                <div class="pic-area" @click="problemsOthersTabActive = 1">
                  <img class="active" src="/problems/others-new-active.svg">
                  <img class="passive" src="/problems/others-new-passive.svg">
                </div>
                <span>Новые приглашения</span>
              </div>
              <div class="problems-others-folders-item" :class="{ active: problemsOthersTabActive == 2 }">
                <div class="pic-area" @click="problemsOthersTabActive = 2">
                  <img class="active" src="/problems/others-work-active.svg">
                  <img class="passive" src="/problems/others-work-passive.svg">
                </div>
                <span>В работе</span>
              </div>
              <div class="problems-others-folders-item" :class="{ active: problemsOthersTabActive == 3 }">
                <div class="pic-area" @click="problemsOthersTabActive = 3">
                  <img class="active" src="/problems/others-mine-active.svg">
                  <img class="passive" src="/problems/others-mine-passive.svg">
                </div>
                <span>Мои предложения</span>
              </div>
            </div>
            <div class="problems-others-new" v-show="problemsOthersTabActive == 1">
              <ProblemsCardPartner />
            </div>
            <div class="problems-others-work" v-show="problemsOthersTabActive == 2">
              <ProblemsCardWork />
            </div>
            <div class="problems-others-mine" v-show="problemsOthersTabActive == 3">
              <ProblemsCardMine />
            </div>
          </div>
        </template>
      </MainTabs>
    </div>
    <BottomNavigation />
    <AddResource :steps="5" :active="activeModal" @closemodal="toggleModal" />
    <ModalSettings :steps="1" :active="activeSettings" @closemodal="togleSettings" />
    <ProblemsMineAdd :steps="9" :active="activeProblemsAddModal" @closemodal="toggleProblemsModal" />
  </div>
</template>

<script>
import HeaderTabs from "~/components/header/HeaderTabs";
import MainTabs from "~/components/main-page/MainTabs"
import BottomNavigation from "../components/footer/BottomNavigation";
import AddResource from "../components/modal/AddResource";
import ProblemsMineAdd from "../components/modal/ProblemsMineAdd";
import ProblemsCard from "../components/elements/ProblemsCard";
import ProblemsCardPartner from "../components/elements/ProblemsCardPartner";
import ProblemsCardWork from "../components/elements/ProblemsCardWork";
import ModalSettings from "~/components/elements/ModalSettings";
import ProblemsCardMine from "../components/elements/ProblemsCardMine";
import ResourcesCard from "../components/elements/ResourcesCard";

import { mapState } from 'vuex';
import apiRequest from "../utils/apiRequest";
import { works } from "../mockData/data";

export default {
  computed: {
    ...mapState('auth', ['user']),
    getRole() {
      const role = works.find(v => v.label === this.user.economicRole)
      return role.title
    }
  },
  async fetch({ store }) {
    await store.dispatch('auth/getUser');
    await store.dispatch('auth/getProblems');
    await store.dispatch('russianRegions/getRegions');
  },
  data() {
    return {
      isResTab: true,
      activeModal: false,
      resource: [],
      posts: [],
      activeProblemsAddModal: false,
      problemsTabActive: 1,
      problemsOthersTabActive: 1,
      activeSettings: false,

      resourcesCard: {
        pic: 'problems/card.png',
        title: 'Краткое название для ресурса менее 50и символов'
      }
    };
  },

  components: {
    AddResource,
    BottomNavigation,
    HeaderTabs,
    MainTabs,
    ProblemsCard,
    ProblemsMineAdd,
    ProblemsCardPartner,
    ProblemsCardWork,
    ProblemsCardMine,
    ResourcesCard,
    ModalSettings
  },

  mounted() {
    this.$bus.$on('closePleaseTheDamnModal', () => {
      this.activeModal = false
    })
  },
  methods: {
    toggleModal() {
      this.activeModal = !this.activeModal
    },
    togleSettings() {
      this.activeSettings = !this.activeSettings
    },
    toggleProblemsModal() {
      this.activeProblemsAddModal = !this.activeProblemsAddModal
    },
    setActiveTab(isRes) {
      this.isResTab = isRes;
    }
  },
};

</script>
<style>
.main_layout {
  flex: 0 !important;
}

</style>
