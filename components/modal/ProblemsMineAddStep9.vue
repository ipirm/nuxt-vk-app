<template>
	<div class="step5">
		<div class="step5-choose-location">
			<h3 class="step5-title">Выберете местоположение:</h3>
			<div class="step5-choose-location-input" v-on-clickaway="closeDropdown">
				<div class="step5-choose-location-input-body">
					<input type="text" placeholder="Город_" v-model="location" :class="{ active: showDropdown }" @click="openDropdown()">
					<button @click="closeDropdown()" v-show="showDropdown">
						<img src="~/static/step5/check.png">
					</button>
				</div>
				<div class="step5-choose-location-input-dropdown" v-show="showDropdown">
					<div class="step5-choose-location-input-dropdown-scroll" v-show="showScroll">
						<div class="step5-choose-location-input-dropdown-scroll-bar">
							<div class="step5-choose-location-input-dropdown-scroll-pin"></div>
						</div>
					</div>
					<div class="step5-choose-location-input-dropdown-content">
						<div class="step5-choose-location-input-dropdown-section" v-for="(item, i) in filteredList" :key="i">
							<span class="step5-choose-location-input-dropdown-section-title">{{ item.title }}</span>
							<span class="step5-choose-location-input-dropdown-section-item" v-for="(loc, k) in item.locations" :key="k" @click="chooseLocation(loc)">{{ loc }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="step5-resource-name">
			<h3 class="step5-title">Добавьте название для проблемы (не более 50 символов):</h3>
			<div class="step5-textarea">
				<textarea :maxlength="maxResourceNameLength" v-model="resourceName" placeholder="Краткое название для ресурса менее 50и символов"></textarea>
				<div class="count">{{ resourceName.length }}/{{ maxResourceNameLength }}</div>
			</div>
		</div>
		<div class="step5-resource-description">
			<h3 class="step5-title">Расскажите о проблеме:</h3>
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

		<input v-show="false" id="step9-file-loader" type="file" ref="fileLoader">
	</div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';

export default {
	directives: {
		onClickaway: onClickaway,
	},

	data() {
		return {
			location: '',
			resourceName: '',
			resourceDescription: '',

			showScroll: false,
			showDropdown: false,
			modalMsg: '',
			showModal: false,

			maxResourceNameLength: 50,
			maxResourceDescriptionLength: 1000,

			files: []
		}
	},

	computed: {
		list() {
			let list = [], curLet;
			for (let i = 0; i < this.$store.state.russianRegions.regions.length; i++) {
				curLet = list.find(v => v.title == this.$store.state.russianRegions.regions[i].charAt(0));
				if (!curLet) {
					list.push(curLet = {
						title: this.$store.state.russianRegions.regions[i].charAt(0),
						locations: []
					})
				}

				curLet.locations.push(this.$store.state.russianRegions.regions[i]);
			}

			return list.sort((a, b) => a.title < b.title ? -1 : 1);
		},

		filteredList() {
			let filtered = [], cur;
			for (let i = 0; i < this.list.length; i++) {
				cur = {
					title: this.list[i].title,
					locations: this.list[i].locations.filter(v => v.toLowerCase().indexOf(this.location.toLowerCase()) != -1)
				}

				if (cur.locations.length > 0)
					filtered.push(cur);
			}

			if (filtered.length == 0)
				return [{
					title: 'Ничего не найдено',
					locations: []
				}]
			else return filtered;
		}
	},

	mounted() {
		this.$bus.$on('step9-cleanup', () => {
			this.location = '';
			this.resourceName = '';
			this.resourceDescription = '';
			this.files = [];
		});

		this.$bus.$on('step9-mine-add-finish', () => {
			if (this.location == '') {
				this.modalMsg = 'Вы не заполнили поле "Выберите местоположение"';
				this.showModal = true;
			} else if (this.resourceName == '') {
				this.modalMsg = 'Вы не заполнили поле "Добавьте название для проблемы"'
				this.showModal = true;
			} else if (this.resourceDescription == '') {
				this.modalMsg = 'Вы не заполнили поле "Расскажите о проблеме"'
				this.showModal = true;
			} else {
				this.$bus.$emit('problem-mine-add-done', {
					name: this.resourceName,
					city: this.location,
					description: this.resourceDescription,
					files: this.files
				});
				this.$bus.$emit('hideStepModalPlease');
			}
		});

		let fileLoader = document.querySelector('#step9-file-loader')
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

		chooseLocation(loc) {
			this.location = loc;
			this.closeDropdown();
		},

		openDropdown() {
			this.showDropdown = true;
			setTimeout(() => {
				if (this.$el.querySelector('.step5-choose-location-input-dropdown-content').offsetHeight == 560)
					this.showScroll = true;
				else this.showScroll = false;
			}, 1)
		},

		closeDropdown() {
			this.showDropdown = false;
			this.showScroll = false;
		},
	}
}
</script>
