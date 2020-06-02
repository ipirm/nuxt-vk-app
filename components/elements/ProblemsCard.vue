<template>
  <div class="problems-card-outer">
    <div class="problems-card">
      <div class="problems-card-simple" v-show="!showEdit" @click="handleShow(data)">
        <div class="pic-area"><img v-if="data && data.files" :src="data.files[0]"></div>
        <div class="info-area" v-if="data"><span>{{ data.name }} </span></div>
      </div>
      <div class="problems-card-edit " v-show="showEdit">
        <div class="problems-card-tabs">
          <div class="problems-card-tabs-item" @click="editTabShown = 1" :class="{ active: editTabShown == 1 }">
            <img class="active" src="~/static/problems/others-card-problem-active.svg">
            <img class="passive" src="~/static/problems/others-card-problem-passive.svg">
            <span>О проблеме</span>
          </div>
          <div class="problems-card-tabs-item" @click="editTabShown = 2" :class="{ active: editTabShown == 2 }">
            <img class="active" src="~/static/problems/others-card-solutions-active.svg">
            <img class="passive" src="~/static/problems/others-card-solutions-passive.svg">
            <span>Решения</span>
          </div>
          <div class="problems-card-tabs-item" @click="showProblemResource" :class="{ active: editTabShown == 3 }">
            <img class="active" src="~/static/problems/filled-diamond.svg">
            <img class="passive" src="~/static/problems/empty-diamond.svg">
            <span>Ресурсы</span>
          </div>
          <div class="problems-card-tabs-item" @click="editTabShown = 4" :class="{ active: editTabShown == 4 }">
            <img class="active" src="~/static/problems/filled-person.svg">
            <img class="passive" src="~/static/problems/empty-person.svg">
            <span>Люди</span>
          </div>
        </div>
        <div class="problems-card-tab resources" v-show="editTabShown == 1">
          <a href="" class="tabs-navigation-button problems-tab-add" @click.prevent="showEditModal = true">
            <img src="/main-page/modal-edit-white.png">
            <span>Редактировать</span>
          </a>
          <div class="about-problem-infos">
            <div class="about-problem-info">
              <span class="about-problem-info-title">Сфера проекта:</span>
              <span class="about-problem-info-text" v-if="data && data.projects && data.projects[0]">{{ data.projects[0].name }}</span>
            </div>
            <div class="about-problem-info">
              <span class="about-problem-info-title">Этап развития проекта:</span>
              <span class="about-problem-info-text" v-if="data">{{ data.stage }}</span>
            </div>
            <div class="about-problem-info">
              <span class="about-problem-info-title">Доход проекта:</span>
              <span class="about-problem-info-text" v-if="data">{{ data.income }}</span>
            </div>
            <div class="about-problem-info">
              <span class="about-problem-info-title">Сфера проблемы:</span>
              <span class="about-problem-info-text" v-if="data && data.scopes && data.scopes[0]">{{ data.scopes[0].name }}</span>
            </div>
            <div class="about-problem-info">
              <span class="about-problem-info-title">Тип проблемы:</span>
              <span class="about-problem-info-text" v-if="data && data.scopes && data.scopes[data.scopes.length-1]">{{ data.scopes[data.scopes.length-1].name }}</span>
            </div>
            <div class="about-problem-info">
              <span class="about-problem-info-title">Местоположение:</span>
              <span class="about-problem-info-text" v-if="data">{{ data.city }}</span>
            </div>
            <div class="about-problem-info">
              <span class="about-problem-info-title">О проблеме:</span>
              <span class="about-problem-info-text" v-if="data">{{ data.description }}</span>
            </div>
          </div>
          <ProblemsCardSlider :slides="this.data.files" v-show="this.data.files" />
        </div>
        <div class="problems-card-tab" v-show="editTabShown == 2">
          <div class="problems-others-folders">
            <div class="problems-others-folders-item" :class="{ active: problemsOthersTabActive == 1 }">
              <div class="pic-area" @click="problemsOthersTabActive = 1">
                <img class="active" src="~/static/problems/from-invited-active.png">
                <img class="passive" src="~/static/problems/from-invited-passive.png">
              </div>
              <span>От приглашенных пользователей</span>
            </div>
            <div class="problems-others-folders-item" :class="{ active: problemsOthersTabActive == 2 }">
              <div class="pic-area" @click="problemsOthersTabActive = 2">
                <img class="active" src="~/static/problems/from-all-active.png">
                <img class="passive" src="~/static/problems/from-all-passive.png">
              </div>
              <span>От всех пользователей</span>
            </div>
          </div>
          <div class="solutions-block problems-card-from-tab" v-show="problemsOthersTabActive == 1">
            <div v-for="item in solutions" :key="item.id" style="position: relative;margin-top: 20px">
              <div class="solutions-date">{{ item.createdAt | moment("DD.MM.YYYY. h:mm:ss") }}</div>
              <div class="solutions-name">Дима Кот</div>
              <div class="solutions-text">{{ item.description}}</div>
              <ProblemsCardSlider :slides="['', '']" />
              <div class="solutions-modal-close solutions-block-close" @click="removeSolution(item)">
                <img src="~/static/main-page/modal-close-gray.png">
              </div>
              <div class="solutions-modal-close solutions-block-edit">
                <img src="~/static/main-page/modal-edit.png">
              </div>
            </div>
          </div>
          <div class="solutions-block problems-card-from-tab" v-show="problemsOthersTabActive == 2">
            <div v-for="item in allSolutions" :key="item.id" style="position: relative;margin-top: 20px">
              <div class="solutions-date">{{ item.createdAt | moment("DD.MM.YYYY. h:mm:ss") }}</div>
              <div class="solutions-name">Карина Ковальчук</div>
              <div class="solutions-text">{{ item.description}}</div>
              <ProblemsCardSlider :slides="['', '']" />
              <div class="solutions-modal-close solutions-block-close" @click="removeSolution(item)">
                <img src="~/static/main-page/modal-close-gray.png">
              </div>
              <div class="solutions-modal-close solutions-block-edit">
                <img src="~/static/main-page/modal-edit.png">
              </div>
            </div>
          </div>
        </div>
        <div class="problems-card-tab" v-show="editTabShown == 3">
          <div class="problems-others-folders">
            <div class="problems-others-folders-item" :class="{ active: problemsResourcesTabActive == 1 }">
              <div class="pic-area" @click="addedResource()">
                <img class="active" src="~/static/problems/filled-diamond.png">
                <img class="passive" src="~/static/problems/empty-diamond.png">
              </div>
              <span>Ресурсы добавлено</span>
            </div>
            <div class="problems-others-folders-item" :class="{ active: problemsResourcesTabActive == 2 }">
              <div class="pic-area" @click="problemsResourcesTabActive = 2">
                <img class="active" src="~/static/problems/filled-search.png">
                <img class="passive" src="~/static/problems/empty-search.png">
              </div>
              <span>Ресурсы поиск</span>
            </div>
            <div class="problems-others-folders-item" :class="{ active: problemsResourcesTabActive == 3 }">
              <div class="pic-area" @click="requestResourcesActive">
                <img class="active" src="~/static/problems/filled-pickaxe.png" style="padding-top: 20px">
                <img class="passive" src="~/static/problems/empty-pickaxe.png" style="padding-top: 20px">
              </div>
              <span>Ресурсы запрошено</span>
            </div>
          </div>
          <div class="problems-card-from-tab resources-card" v-show="problemsResourcesTabActive == 1">
            <ProblemsAddedCard :id="data.id" v-for="item in resources" :key="item.id" :card="item" type="add" :removable="true" />
          </div>
          <div class="problems-card-from-tab" v-show="problemsResourcesTabActive == 2" style="padding-bottom: 100px">
            <button class="step5-modal-button resources-button filter-setup" @click="showFilterSetup"><span>Настроить фильтры</span>
            </button>
            <ProblemsAddedCard :id="data.id" v-for="item in searchResults" :key="item.id" :card="item" :removable="false" />
          </div>
          <div class="problems-card-from-tab" v-show="problemsResourcesTabActive == 3">
            <ProblemsAddedCard :id="data.id" v-for="item in requestResources" :key="item.id" :card="item" type="request" :removable="true" />
          </div>
        </div>
        <div class="problems-card-tab" v-show="editTabShown == 4">
          <div class="problems-others-folders">
            <div class="problems-others-folders-item" :class="{ active: problemsPeopleTabActive == 1 }">
              <div class="pic-area" @click="problemsPeopleTabActive = 1">
                <img class="active" src="~/static/problems/written-doc-active.png">
                <img class="passive" src="~/static/problems/written-doc-passive.png">
              </div>
              <span>Откликнулись</span>
            </div>
            <div class="problems-others-folders-item" :class="{ active: problemsPeopleTabActive == 2 }">
              <div class="pic-area" @click="problemsPeopleTabActive = 2">
                <img class="active" src="~/static/problems/empty-doc-active.png">
                <img class="passive" src="~/static/problems/empty-doc-passive.png">
              </div>
              <span>Приглашенные</span>
            </div>
          </div>
          <div class="problems-card-from-tab" v-show="problemsPeopleTabActive == 1">
            <div class="problems-card people-card" v-for="(card, i) in responded" :key="i">
              <div class="problems-card-simple">
                <div class="people-card-pic-area">
                  <nuxt-link to="/profile">
                    <img :src="card.photo ? card.photo : '~/static/problems/pic.png'">
                  </nuxt-link>
                </div>
                <div class="people-card-info-area">
                  <span class="name">{{ card.firstName }} {{ card.lastName }}</span>
                  <button class="step5-modal-button people-card-button" @click="showSolutionsModal = false"><span>Написать</span></button>
                </div>
                <div class="solutions-modal-close resources-close" @click="removePeople('responded')">
                  <img src="~/static/main-page/modal-close.png">
                </div>
              </div>
            </div>
          </div>
          <div class="problems-card-from-tab" v-show="problemsPeopleTabActive == 2">
            <div class="problems-card people-card" v-for="(card, i) in invited" :key="i">
              <div class="problems-card-simple">
                <div class="people-card-pic-area">
                  <nuxt-link to="/profile">
                    <img :src="card.photo ? card.photo : '~/static/problems/pic.png'">
                  </nuxt-link>
                </div>
                <div class="people-card-info-area">
                  <span class="name">{{ card.firstName }} {{ card.lastName }}</span>
                  <button class="step5-modal-button people-card-button" @click="showSolutionsModal = false"><span>Написать</span></button>
                </div>
                <div class="solutions-modal-close resources-close" @click="removePeople('invited')">
                  <img src="~/static/main-page/modal-close.png">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="problems-card-minimize" v-show="showEdit" @click="showEdit = false">
      <img src="~/static/problems/minimize.png">
    </div>

    <div class="problems-card-edit-modal" v-show="showEditModal" v-body-scroll-lock="showEditModal">
      <div class="problems-card-edit-modal-card">
        <div class="solutions-modal-close resources-close" @click="showEditModal = false">
          <img src="~/static/main-page/modal-close.png">
        </div>
        <button class="problems-card-edit-modal-remove" @click="showEditRemoveModal = true">
          <img src="~/static/problems/trash.svg">
          <span>Удалить проблему</span>
        </button>
        <div class="problems-card-edit-modal-remove-modal" v-show="showEditRemoveModal">
          <span class="title">Вы действительно хотите удалить этот ресурс?</span>
          <div class="buttons">
            <button class="step5-modal-button cancel" @click="showEditRemoveModal = false">
              <span>Отмена</span></button>
            <button class="step5-modal-button remove" @click="remove()">Удалить</button>
          </div>
        </div>
        <div class="problems-card-edit-modal-content">
          <button class="step5-modal-button problems-card-edit-modal-button" @click="showModalProjectEdit()"><span>Редактировать сферу проекта</span></button>
          <div class="problems-card-edit-modal-section">
            <span class="problems-card-edit-modal-title">Вы можете добавить ссылку на страницу вашего проекта в соц. сетях/ссылку на сайт вашего проекта.</span>
            <input type="text" name="link" class="problems-card-edit-modal-input" v-model="link">
          </div>
          <button class="step5-modal-button problems-card-edit-modal-button" @click="showModalProblemEdit()"><span>Редактировать сферу проблемы</span></button>
          <div class="problems-card-edit-modal-section">
            <span class="problems-card-edit-modal-title">Выберете местоположение проблемы:</span>
            <CustomSelectInput :options="$store.state.russianRegions.regions" v-model="location" placeholder="" />
          </div>
          <div class="problems-card-edit-modal-section">
            <span class="problems-card-edit-modal-title">Расскажите о проблеме:</span>
            <div class="step5-textarea problems-card-edit-modal-textarea">
              <textarea maxlength="1000" placeholder="текст" v-model="description"></textarea>
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
          <button class="step5-modal-button problems-card-edit-modal-button" @click="editProblem()"><span>Готово</span>
          </button>
        </div>
      </div>
    </div>

    <div class="problems-card-edit-modal problems-card-edit-modal--higher" v-show="showEditModalProject" v-body-scroll-lock="showEditModalProject">
      <div class="problems-card-edit-modal-card">
        <div class="solutions-modal-close resources-close" @click="showEditModalProject = false">
          <img src="~/static/main-page/modal-close.png">
        </div>
        <div class="problems-card-edit-modal-card-stepper-wrapper">
          <div class="problems-card-edit-modal-card-stepper-steps">
            <div class="problems-card-edit-modal-card-stepper-item" v-for="i in (2 + pickedOnesProjectLists.length)" :key="i" :class="{ active: i < projectStep+2 }">
              <img class="active" src="~/static/problems/step-active.png">
              <img class="passive" src="~/static/problems/step-passive.png">
            </div>
          </div>
          <span class="problems-card-edit-modal-card-stepper">Шаг {{ projectStep+1 }}</span>
          <span class="problems-card-edit-modal-card-stepper-title"><span>Проект</span></span>
          <span class="problems-card-edit-modal-card-stepper-subtitle" v-show="projectStep == 0">Укажите сферу деятельности вашего проекта:</span>
        </div>
        <div class="problems-card-edit-modal-card-content" v-show="projectStep == 0">
          <PickOner :picks="formattedPicks" v-model="pickedOneProject" type="circular" />
        </div>
        <div class="problems-card-edit-modal-card-content" v-show="projectStep > 0">
          <PickOner :picks="stagesProblem.data" v-model="pickedOnesProjectLists[projectStep-1]" type="list" />
        </div>
        <div class="problems-card-edit-modal-card-buttons">
          <button class="step5-modal-button problems-card-edit-modal-button" @click="projectPrevStep()" v-show="projectStep != 0"><span>Назад</span></button>
          <button class="step5-modal-button problems-card-edit-modal-button" @click="projectNextStep()" v-show="!stagesProblem.data || stagesProblem.data && stagesProblem.data.hasNext"><span>Далее</span></button>
          <button class="step5-modal-button problems-card-edit-modal-button" @click="projectDoneStep()" v-show="stagesProblem.data && !stagesProblem.data.hasNext"><span>Готово</span></button>
        </div>
      </div>
    </div>

    <div class="problems-card-edit-modal problems-card-edit-modal--higher" v-show="showEditModalProblem" v-body-scroll-lock="showEditModalProblem">
      <div class="problems-card-edit-modal-card">
        <div class="solutions-modal-close resources-close" @click="showEditModalProblem = false">
          <img src="~/static/main-page/modal-close.png">
        </div>
        <div class="problems-card-edit-modal-card-stepper-wrapper">
          <div class="problems-card-edit-modal-card-stepper-steps">
            <div class="problems-card-edit-modal-card-stepper-item" v-for="i in (2 + pickedOnesProblemLists.length)" :key="i" :class="{ active: i < problemStep+2 }">
              <img class="active" src="~/static/problems/step-active.png">
              <img class="passive" src="~/static/problems/step-passive.png">
            </div>
          </div>
          <span class="problems-card-edit-modal-card-stepper">Шаг {{ problemStep+1 }}</span>
          <span class="problems-card-edit-modal-card-stepper-title"><span>Проблема</span></span>
          <span class="problems-card-edit-modal-card-stepper-subtitle" v-show="problemStep == 0">Укажите сферу проблемы:</span>
        </div>
        <div class="problems-card-edit-modal-card-content" v-show="problemStep == 0">
          <PickOner :picks="formattedPicks" v-model="pickedOneProblem" type="circular" />
        </div>
        <div class="problems-card-edit-modal-card-content" v-show="problemStep > 0">
          <PickOner :picks="stages.data" v-model="pickedOnesProblemLists[problemStep-1]" type="list" />
        </div>
        <div class="problems-card-edit-modal-card-buttons">
          <button class="step5-modal-button problems-card-edit-modal-button" @click="problemPrevStep()" v-show="problemStep != 0"><span>Назад</span></button>
          <button class="step5-modal-button problems-card-edit-modal-button" @click="problemNextStep()" v-show="!stages.data || stages.data && stages.data.hasNext"><span>Далее</span></button>
          <button class="step5-modal-button problems-card-edit-modal-button" @click="problemDoneStep()" v-show="stages.data && !stages.data.hasNext"><span>Готово</span></button>
        </div>
      </div>
    </div>

    <div class="problems-card-edit-modal problems-card-edit-modal--higher" v-show="showFilterSetupModal" v-body-scroll-lock="showFilterSetupModal">
      <div class="problems-card-edit-modal-remove-modal" v-show="showNotFilled">
        <span class="title">Обязательные поля не указаны</span>
        <button class="step5-modal-button cancel" style="margin: 0 auto" @click="showNotFilled = false">
          <span>Ок</span></button>
      </div>
      <div class="problems-card-edit-modal-card">
        <div class="solutions-modal-close resources-close" @click="showFilterSetupModal = false">
          <img src="~/static/main-page/modal-close.png">
        </div>
        <div class="problems-card-edit-modal-card-stepper-wrapper">
          <div class="problems-card-edit-modal-card-stepper-steps">
            <div class="problems-card-edit-modal-card-stepper-item" v-for="i in (2 + pickedOnesFilterLists.length + (showFilterCheckboxes || showFilterLastStep ? 1 : 0))" :key="i" :class="{ active: i < filterStep+2 }">
              <img class="active" src="~/static/problems/step-active.png">
              <img class="passive" src="~/static/problems/step-passive.png">
            </div>
          </div>
          <span class="problems-card-edit-modal-card-stepper">Шаг {{ filterStep+1 }}</span>
          <span class="problems-card-edit-modal-card-stepper-subtitle filter-step5-subtitle" v-show="showFilterLastStep">Выберете местоположение ресурса:</span>
        </div>
        <div class="problems-card-edit-modal-card-content" v-show="filterStep == 0">
          <PickOner :picks="formattedPicks" v-model="pickedOneFilter" type="circular" />
        </div>
        <div class="problems-card-edit-modal-card-content" v-show="filterStep > 0 && !showFilterCheckboxes && !showFilterLastStep">
          <PickOner :picks="stages.data" v-model="pickedOnesFilterLists[filterStep-1]" type="list" />
        </div>
        <div class="problems-card-edit-modal-card-content" v-show="showFilterCheckboxes">
          <PickOner :picks="stages.data" v-model="pickedOnesFilterCheckboxes" type="checkboxes" />
        </div>
        <div class="problems-card-edit-modal-card-content" v-show="showFilterLastStep">
          <CustomSelectInput class="filter-step5-select" :options="$store.state.russianRegions.regions" placeholder="Город_" v-model="locationFilter" />
          <PickOner :picks="picksFilter" v-model="locationDoesntMatter" type="checkboxes" />
        </div>
        <div class="problems-card-edit-modal-card-buttons">
          <button class="step5-modal-button problems-card-edit-modal-button" @click="filterPrevStep()" v-show="filterStep != 0"><span>Назад</span></button>
          <button class="step5-modal-button problems-card-edit-modal-button" @click="filterNextStep()" v-show="!showFilterLastStep"><span>Далее</span></button>
        </div>
        <button class="step5-modal-button problems-card-edit-modal-button" @click="filterDoneStep()"><span>Поиск</span></button>
      </div>
    </div>

    <input v-show="false" class="problems-card-file-loader" type="file" ref="fileLoader">
  </div>
</template>
<script>
import ProblemsCardSlider from '~/components/elements/ProblemsCardSlider';
import CustomSelectInput from '~/components/elements/CustomSelectInput';
import PickOner from '~/components/elements/PickOner';
import ProblemsAddedCard from '~/components/elements/ProblemsAddedCard';
import { mapActions, mapState } from 'vuex'

export default {
  props: ['data'],

  components: {
    ProblemsCardSlider,
    CustomSelectInput,
    PickOner,
    ProblemsAddedCard
  },

  computed: {
    ...mapState('solution', ['solutions', 'allSolutions']),
    ...mapState('problemResources', ['resources', 'requestResources', 'searchResults']),
    ...mapState('resource', ['stages']),
    ...mapState('people', ['responded', 'invited']),
    ...mapState('problem', ['stagesProblem'])
  },

  created() {
    this.$store.dispatch('people/getResponded', {
      problemId: this.data.id
    });
    this.$store.dispatch('people/getInvited', {
      problemId: this.data.id
    });
  },

  data() {
    return {
      solutionsTabDataConfirmed: null,
      solutionsTabDataNotConfirmed: null,
      showEdit: false,
      editTabShown: 1,
      showEditModal: false,
      problemsOthersTabActive: 1,
      problemsResourcesTabActive: 1,
      problemsPeopleTabActive: 1,
      showEditRemoveModal: false,
      showEditModalProject: false,
      showEditModalProblem: false,
      showFilterSetupModal: false,
      location: '',
      showNotFilled: false,
      description: '',
      link: '',
      files: [],

      // inner edit project
      innerPickedOne1Project: -1,
      innerPickedOnesListProject: [],
      // inner edit problem
      innerPickedOne1Problem: -1,
      innerPickedOnesListProblem: [],

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
      picksFilter: [{
        title: 'Местоположение ресурса не имеет значения'
      }],
      picksProject: [
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

      pickedOne1: -1,

      filterStep: 0,
      pickedOneFilter: -1,
      pickedOnesFilterLists: [],
      pickedOnesFilterCheckboxes: [],
      locationDoesntMatter: -1,
      locationFilter: '',
      showFilterCheckboxes: false,
      showFilterLastStep: false,
      formattedPicks: [],

      problemStep: 0,
      pickedOneProblem: -1,
      pickedOnesProblemLists: [],

      projectStep: 0,
      pickedOneProject: -1,
      pickedOnesProjectLists: [],
    }
  },

  mounted() {
    this.location = this.data ? this.data.city : '';
    this.link = this.data ? this.data.linkProject : '';
    this.description = this.data ? this.data.description : '';
    this.files = [];
    if (this.data && this.data.files) {
      for (let i = 0; i < this.data.files.length; i++) {
        this.files.push({
          file: this.data.files[i],
          name: this.data.files[i].split('.').pop()
        });
      }
    }

    let fileLoader = this.$el.querySelector('.problems-card-file-loader');
    fileLoader.onchange = () => {
      this.files.push({
        file: fileLoader.files[0],
        name: fileLoader.files[0].name.split('.').pop()
      })
    }
  },

  methods: {
    ...mapActions('solution', ['getSolutions', 'getAllSolutions', 'removeSolutions']),
    ...mapActions('problemResources', ['getAddResources', 'getRequestResources']),

    addedResource(){
  	  this.problemsResourcesTabActive = 1;
  	  this.getAddResources(this.data.id);
  	},

    removePeople(type) {

    },

    async showModalProjectEdit() {
      await this.$store.dispatch('problem/getProblem', 0).then(() => {
        this.formattedPicks = this.picksProject.filter((v) => this.stagesProblem.some((i) => {
          if (v.name && i.name) {
            if (v.name.toLowerCase() === i.name.toLowerCase())
              Object.assign(v, { id: i.id })
            return v.name.toLowerCase() === i.name.toLowerCase()
          }
        }));
        this.showEditModalProject = true;
      });
    },
    async projectPrevStep() {
      this.projectStep--
      if (this.projectStep == 0) {
        console.log('PREV: 1')
        await this.$store.dispatch('problem/getProblem', this.projectStep);
      } else if (this.projectStep == 1) {
        console.log('PREV: 2')
        if (this.pickedOneFilter == 1912) {
          console.log('PREV: 3')
          await this.$store.dispatch('problem/getProblem', 1409);
        } else
          await this.$store.dispatch('problem/getProblem', this.innerPickedOne1Project);
      } else {
        console.log('PREV: 4')
        await this.$store.dispatch('problem/getProblem', this.pickedOnesProjectLists[this.projectStep-2]);
      }
    },
    async projectNextStep() {
      if (this.projectStep == 0 && this.pickedOneProject == -1) {
        console.log('NEXT: 1')
        this.showNotFilled = true;
        return
      }
      if (this.projectStep > 1 && !this.pickedOnesProjectLists[this.projectStep-1]) {
        console.log('NEXT: 2')
        this.showNotFilled = true;
        return
      }

      this.projectStep++
      if (this.projectStep == 0) {
        console.log('NEXT: 6')
        await this.$store.dispatch('problem/getProblem', this.projectStep);
        this.pickedOnesProblemLists = [];
      } else if (this.projectStep == 1) {
        console.log('NEXT: 7')
        if (this.pickedOneProblem == 1912) {
          console.log('NEXT: 8')
          await this.$store.dispatch('problem/getProblem', 1409);
          return;
        }
        await this.$store.dispatch('problem/getProblem', this.pickedOneProject);
        if (this.pickedOneProject == 2895) {
          console.log('NEXT: 9')
          this.sort = true;
        }
      } else {
        console.log('NEXT: 10')
        await this.$store.dispatch('problem/getProblem', this.pickedOnesProjectLists[this.projectStep-2])
      }
      if (this.pickedOneProject != 2895) {
        console.log('NEXT: 11');
        this.sort = false;
      }
    },
    projectDoneStep() {
      this.$store.dispatch('problem/editProblem', {
        data: {
          id: this.data.id,
          name: this.data.name,
          city: this.data.city,
          description: this.data.description,
          projectId: [this.pickedOneProject, ...this.pickedOnesProjectLists],
          income: parseInt(this.data.income),
          stage: this.data.stage,
          scopeId: [...this.data.scopes.map(v => v.id)],
          linkProject: this.data.linkProject
        },
        files: this.files
      }).then(() => {
        this.showEditModalProject = false;
        this.projectStep = 0;
        this.pickedOneProject = -1;
        this.pickedOnesProjectLists = [];
      });
    },

    async showModalProblemEdit() {
      await this.$store.dispatch('resource/getResource', 0).then(()=> {
        this.formattedPicks = this.picks.filter((v) => this.stages.some((i) => {
          if(v.name === i.title)
            Object.assign(v,{id: i.id})
          return v.title === i.name
        }));
        this.showEditModalProblem = true;
      });
    },
    async problemPrevStep() {
      this.problemStep--
      if (this.problemStep == 0) {
        console.log('PREV: 1')
        await this.$store.dispatch('resource/getResource', this.problemStep);
      } else if (this.problemStep == 1) {
        console.log('PREV: 2')
        if (this.pickedOneFilter == 1912) {
          console.log('PREV: 3')
          await this.$store.dispatch('resource/getResource', 1409);
        } else
          await this.$store.dispatch('resource/getResource', this.pickedOneProblem);
      } else {
        console.log('PREV: 4')
        await this.$store.dispatch('resource/getResource', this.pickedOnesProblemLists[this.problemStep-2]);
      }
    },
    async problemNextStep() {
      if (this.problemStep == 0 && this.pickedOneProblem == -1) {
        console.log('NEXT: 1')
        this.showNotFilled = true;
        return
      }
      if (this.problemStep > 1 && !this.pickedOnesProblemLists[this.problemStep-1]) {
        console.log('NEXT: 2')
        this.showNotFilled = true;
        return
      }

      this.problemStep++
      if (this.problemStep == 0) {
        console.log('NEXT: 6')
        await this.$store.dispatch('resource/getResource', this.problemStep);
        this.pickedOnesProblemLists = [];
      } else if (this.problemStep == 1) {
        console.log('NEXT: 7')
        if (this.pickedOneProblem == 1912) {
          console.log('NEXT: 8')
          await this.$store.dispatch('resource/getResource', 1409);
          return;
        }
        await this.$store.dispatch('resource/getResource', this.pickedOneProblem);
        if (this.pickedOneProblem == 2895) {
          console.log('NEXT: 9')
          this.sort = true;
        }
      } else {
        console.log('NEXT: 10')
        await this.$store.dispatch('resource/getResource', this.pickedOnesProblemLists[this.problemStep-2])
      }
      if (this.pickedOneProblem != 2895) {
        console.log('NEXT: 11');
        this.sort = false;
      }
    },
    problemDoneStep() {
      this.$store.dispatch('problem/editProblem', {
        data: {
          id: this.data.id,
          name: this.data.name,
          city: this.data.city,
          description: this.data.description,
          projectId: [...this.data.projects.map(v => v.id)],
          income: parseInt(this.data.income),
          stage: this.data.stage,
          scopeId: [this.pickedOneProblem, ...this.pickedOnesProblemLists],
          linkProject: this.data.linkProject
        },
        files: this.files
      }).then(() => {
        this.showEditModalProblem = false;
        this.problemStep = 0;
        this.pickedOneProblem = -1;
        this.pickedOnesProblemLists = [];
      });
    },

    async showFilterSetup() {
      await this.$store.dispatch('resource/getResource', this.filterStep).then(()=> {
        this.formattedPicks = this.picks.filter((v) => this.stages.some((i) => {
          if(v.name === i.title)
            Object.assign(v,{id: i.id})
          return v.title === i.name
        }));
        this.showFilterSetupModal = true;
      });
    },
    async filterPrevStep() {
      this.filterStep--
      this.showFilterLastStep = false;
      this.showFilterCheckboxes = false;
      if (this.filterStep == 0) {
        console.log('PREV: 1')
        this.showFilterSetup();
      } else if (this.filterStep == 1) {
        console.log('PREV: 2')
        if (this.pickedOneFilter == 1912) {
          console.log('PREV: 3')
          await this.$store.dispatch('resource/getResource', 1409);
        } else
          await this.$store.dispatch('resource/getResource', this.pickedOneFilter);
      } else {
        console.log('PREV: 4')
        await this.$store.dispatch('resource/getResource', this.pickedOnesFilterLists[this.filterStep-2]);
        this.showFilterCheckboxes = !this.stages.hasNext;
      }
    },
    async filterNextStep() {
      if (this.filterStep == 0 && this.pickedOneFilter == -1) {
        console.log('NEXT: 1')
        this.showNotFilled = true;
        return
      }
      if (this.filterStep > 1 && !this.showFilterCheckboxes && !this.pickedOnesFilterLists[this.filterStep-1]) {
        console.log('NEXT: 2')
        this.showNotFilled = true;
        return
      }
      if (this.showFilterCheckboxes && this.pickedOnesFilterCheckboxes.length == 0) {
        console.log('NEXT: 3')
        this.showNotFilled = true;
        return
      }
      if (this.showFilterCheckboxes) {
        console.log('NEXT: 4')
        this.showFilterLastStep = true;
        this.showFilterCheckboxes = false;
        this.filterStep++
        return;
      }
      if (this.showFilterLastStep) {
        console.log('NEXT: 5')
        return;
      }
      this.filterStep++
      if (this.filterStep == 0) {
        console.log('NEXT: 6')
        await this.$store.dispatch('resource/getResource', this.filterStep);
        this.pickedOnesFilterLists = [];
        this.pickedOnesFilterCheckboxes = [];
        this.showFilterCheckboxes = !this.stages.hasNext;
      } else if (this.filterStep == 1) {
        console.log('NEXT: 7')
        if (this.pickedOneFilter == 1912) {
          console.log('NEXT: 8')
          await this.$store.dispatch('resource/getResource', 1409);
          return;
        }
        await this.$store.dispatch('resource/getResource', this.pickedOneFilter);
        this.showFilterCheckboxes = !this.stages.hasNext;
        if (this.pickedOneFilter == 2895) {
          console.log('NEXT: 9')
          this.sort = true;
        }
      } else {
        console.log('NEXT: 10')
        await this.$store.dispatch('resource/getResource', this.pickedOnesFilterLists[this.filterStep-2]).then(() => {
            if (this.stages.length == 0) {
              this.showFilterLastStep = true;
            } else {
              this.showFilterCheckboxes = !this.stages.hasNext;
            }
          });
      }
      if (this.pickedOneFilter != 2895) {
        console.log('NEXT: 11');
        this.sort = false;
      }
    },
    filterDoneStep() {
      if (this.pickedOneFilter == -1) {
        this.showNotFilled = true;
        return;
      }

      this.$store.dispatch('problemResources/search', {
        id: this.pickedOnesFilterLists && this.pickedOnesFilterLists.length > 0 ? this.pickedOnesFilterLists[this.pickedOnesFilterLists.length-1] : this.pickedOneFilter,
        city: this.locationFilter
      }).then(() => {
        this.showFilterSetupModal = false;
        this.showFilterLastStep = false;
        this.locationFilter = '';
        this.filterStep = 0;
        this.pickedOneFilter = -1;
        this.pickedOnesFilterLists = [];
        this.pickedOnesFilterCheckboxes = [];
      });
    },

    requestResourcesActive() {
      this.problemsResourcesTabActive = 3,
        this.getRequestResources(this.data.id)
    },
    showProblemResource() {
      this.editTabShown = 3
      this.getAddResources(this.data.id)
    },
    removeSolution(item) {
      this.removeSolutions(item).then(() => {
        let body = {
          id: this.data.id,
          type: 'ALL'
        }
        this.getSolutions(body)
        this.getAllSolutions(body)
      })
    },
    handleShow() {
      let body = {
        id: this.data.id,
        type: 'ALL'
      }
      this.getSolutions(body)
      this.getAllSolutions(body)
      this.showEdit = true
    },
    chooseFile() {
      this.$refs.fileLoader.click();
    },

    removeFile(i) {
      this.files.splice(i, 1);
    },

    editProblem() {
      if (!this.data)
        return;

      if (this.location.trim() == '' || this.description.trim() == '' || this.description.trim() == '') {
        this.showNotFilled = true;
        return;
      }

      this.$store.dispatch('problem/editProblem', {
        data: {
          id: this.data.id,
          name: this.data.name,
          city: this.location,
          description: this.description,
          projectId: [...this.data.projects.map(v => v.id)],
          income: parseInt(this.data.income),
          stage: this.data.stage,
          scopeId: [...this.data.scopes.map(v => v.id)],
          linkProject: this.link
        },
        files: this.files
      });
      this.showEditModal = false;
    },

    remove() {
      if (this.data)
        this.$store.dispatch(`problem/deleteProblem`, this.data.id);
      this.closeEverything();
    },

    closeEverything() {
      this.showEditRemoveModal = false;
      this.showEditModal = false;
      this.showEdit = false;
    }
  }
}

</script>
