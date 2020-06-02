<template>
  <div class="resources-tab-card problems-card-outer" style="margin-top: 10px" :style="{'z-index': showEdit ? 4 : 3}">
    <div class="problems-card">
      <div class="problems-card-simple" v-show="!showEdit" @click="showEdits()">
        <div class="pic-area"><img :src="data.pic"></div>
        <div class="info-area"><span>{{ data.description }}</span></div>
      </div>
      <div class="problems-card-edit problems-card-edit--mine" v-show="showEdit">
        <div class="problems-card-tabs">
          <div class="problems-card-tabs-item" @click="problemTabShown = 1" :class="{ active: problemTabShown == 1 }">
            <img class="active" src="~/static/problems/others-card-problem-active.svg">
            <img class="passive" src="~/static/problems/others-card-problem-passive.svg">
            <span>О проблеме</span>
          </div>
          <div class="problems-card-tabs-item" @click="problemTabShown = 2" :class="{ active: problemTabShown == 2 }">
            <img class="active" src="~/static/problems/others-card-solutions-active.svg">
            <img class="passive" src="~/static/problems/others-card-solutions-passive.svg">
            <span>Решения</span>
          </div>
        </div>
        <div class="problems-card-tab about-problem" v-show="problemTabShown == 1">
          <div class="about-problem-infos">
            <div class="about-problem-info">
              <span class="about-problem-info-title">Сфера проекта:</span>
              <span class="about-problem-info-text">текст</span>
            </div>
            <div class="about-problem-info">
              <span class="about-problem-info-title">Этап развития проекта:</span>
              <span class="about-problem-info-text">текст</span>
            </div>
            <div class="about-problem-info">
              <span class="about-problem-info-title">Доход проекта:</span>
              <span class="about-problem-info-text">текст</span>
            </div>
            <div class="about-problem-info">
              <span class="about-problem-info-title">Сфера проблемы:</span>
              <span class="about-problem-info-text">текст</span>
            </div>
            <div class="about-problem-info">
              <span class="about-problem-info-title">Тип проблемы:</span>
              <span class="about-problem-info-text">текст</span>
            </div>
            <div class="about-problem-info">
              <span class="about-problem-info-title">О проблеме:</span>
              <span class="about-problem-info-text">текст</span>
            </div>
          </div>
          <ProblemsCardSlider :slides="['', '']" />
        </div>
        <div class="problems-card-tab solutions" v-show="problemTabShown == 2">
          <a href="" class="tabs-navigation-button solutions-add" @click.prevent="showSolutionsModal = true">
            <img src="/main-page/add-card.png">
            <span>Предложить решение</span>
          </a>
          <div class="solutions-block">
            <div class="solutions-date">21.06.2020. 13:05</div>
            <div class="solutions-name">Карина Ковальчук</div>
            <div class="solutions-text">Текст</div>
            <ProblemsCardSlider :slides="['', '']" />
          </div>
          <div class="solutions-modal" v-show="showSolutionsModal" v-body-scroll-lock="showSolutionsModal">
            <div class="problems-card-edit-modal-remove-modal" v-show="showNotFilled">
              <span class="title">Обязательные поля не указаны</span>
              <button class="step5-modal-button cancel" style="margin: 0 auto" @click="showNotFilled = false"><span>Ок</span></button>
            </div>
            <div class="solutions-modal-inner">
              <div class="solutions-modal-close" @click="showSolutionsModal = false">
                <img src="~/static/main-page/modal-close.png">
              </div>
              <div class="step5-resource-description solutions-description">
                <h3 class="step5-title">Предложить решение:</h3>
                <div class="step5-textarea">
                  <textarea maxlength="1000" placeholder="текст" v-model="solution"></textarea>
                </div>
              </div>
              <div class="step5-add-file solutions-add-file">
                <h3 class="step5-title">Вы можете прикрепить файлы:</h3>
                <div class="solutions-add-file-items">
                  <div class="step5-add-file-item">
                    <button>
                      <img src="~/static/main-page/modal-close.png">
                    </button>
                  </div>
                  <button class="step5-add-file-button">
                    <img src="~/static/step5/add-file.svg">
                  </button>
                </div>
              </div>
              <button class="step5-modal-button solutions-button" @click="publish()"><span>Опубликовать</span></button>
            </div>
          </div>
        </div>
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
      showNotFilled: false,
      problemTabShown: 1,
      showSolutionsModal: false,

      location: '',

      solution: '',
      files: []
    }
  },

  methods: {
    publish() {
      if (!this.solution.trim()) {
        this.showNotFilled = true;
        return;
      }

      this.showEdit = false;

      // this.$store.dispatch('resource/updateResource', {
      //   id: parseInt(this.data.id),
      //   name: this.resourceName,
      //   description: this.resourceDescription,
      //   city: this.location,
      //   scopeId: [1, ...this.data.scopes.map(v => v.id)],

      //   // files: this.files.slice()
      // });
    },

    showEdits() {
      // this.$bus.$emit('resources-card-edit-hide');
      this.showEdit = true
    }
  }
}

</script>
