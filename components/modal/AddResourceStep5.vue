<template>
	<div class="step5">
		<h2 class="step5-title step5-title--main">Заполните информацию о ресурсе:</h2>
		<div class="step5-choose-location">
			<h3 class="step5-title">Выберете местоположение ресурса:</h3>
			<CustomSelectInput :options="$store.state.russianRegions.regions" placeholder="Город_" v-model="location" />
		</div>
		<div class="step5-resource-name">
			<h3 class="step5-title">Добавьте название для ресурса (не более 50 символов):</h3>
			<div class="step5-textarea">
				<textarea :maxlength="maxResourceNameLength" v-model="resourceName" placeholder="Краткое название для ресурса менее 50и символов"></textarea>
				<div class="count">{{ resourceName.length }}/{{ maxResourceNameLength }}</div>
			</div>
		</div>
		<div class="step5-resource-description">
			<h3 class="step5-title">Расскажите о ресурсе:</h3>
			<div class="step5-textarea">
				<textarea :maxlength="maxResourceDescriptionLength" v-model="resourceDescription"></textarea>
				<div class="count">{{ resourceDescription.length }}/{{ maxResourceDescriptionLength }}</div>
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

		<div class="step5-modal" v-body-scroll-lock="showModal" v-show="showModal">
			<p>{{ modalMsg }}</p>
			<button class="step5-modal-button" @click="showModal = false"><span>Ок</span></button>
		</div>
    <input v-show="false" class="file-loader" type="file" ref="fileLoader">
	</div>
</template>

<script>
import CustomSelectInput from '~/components/elements/CustomSelectInput';

export default {
	components: {
		CustomSelectInput
	},

	data() {
		return {
			location: '',
			resourceName: '',
			resourceDescription: '',

			modalMsg: '',
			showModal: false,

			maxResourceNameLength: 50,
			maxResourceDescriptionLength: 1000,

			files: []
		}
	},

	mounted() {
		this.$bus.$on('step5-cleanup', () => {
			this.location = '';
			this.resourceName = '';
			this.resourceDescription = '';
			this.files = [];
		});

		this.$bus.$on('step5-finish', () => {
			if (this.location == '') {
				this.modalMsg = 'Вы не заполнили поле "Выберите местоположение ресурса"';
				this.showModal = true;
			} else if (this.resourceName == '') {
				this.modalMsg = 'Вы не заполнили поле "Добавьте название для ресурса"'
				this.showModal = true;
			} else if (this.resourceDescription == '') {
				this.modalMsg = 'Вы не заполнили поле "Расскажите о ресурсе"'
				this.showModal = true;
			} else {
				this.$bus.$emit('modal-step-done', {
					name: this.resourceName,
					city: this.location,
					description: this.resourceDescription,
					files: this.files
				});
				this.$bus.$emit('hideStepModalplease');
			}
		});

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
    }
	}
}
</script>
