<template>
	<div class="step5-choose-location-input" v-on-clickaway="closeDropdown">
		<div class="step5-choose-location-input-body">
			<input class="input" type="text" name="location" :placeholder="placeholder" :value="value" @input="input = $event.target.value" :class="{ active: showDropdown }" @click="openDropdown()">
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
					<span class="step5-choose-location-input-dropdown-section-item" v-for="(option, k) in item.options" :key="k" @click="choose(option)">{{ option }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';

export default {
	props: ['options', 'placeholder', 'value'],

	directives: {
		onClickaway: onClickaway,
	},

	data() {
		return {
			showScroll: false,
			showDropdown: false,
			input: ''
		}
	},

	watch: {
		input(n,o) {
			this.$emit('input', n);
		}
	},

	computed: {
		list() {
			let list = [], curLet;
			for (let i = 0; i < this.options.length; i++) {
				curLet = list.find(v => v.title == this.options[i].charAt(0));
				if (!curLet) {
					list.push(curLet = {
						title: this.options[i].charAt(0),
						options: []
					})
				}

				curLet.options.push(this.options[i]);
			}

			return list.sort((a, b) => a.title < b.title ? -1 : 1);
		},

		filteredList() {
			let filtered = [], cur;
			for (let i = 0; i < this.list.length; i++) {
				cur = {
					title: this.list[i].title,
					options: this.list[i].options.filter(v => v.toLowerCase().indexOf(this.input.toLowerCase()) != -1)
				}

				if (cur.options.length > 0)
					filtered.push(cur);
			}

			if (filtered.length == 0)
				return [{
					title: 'Ничего не найдено',
					options: []
				}]
			else return filtered;
		}
	},

	methods: {
		choose(option) {
			this.input = option;
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
		}
	}
}
</script>
