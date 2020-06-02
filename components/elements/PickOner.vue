<template>
	<div class="pickoner">
		<div class="pickoner-circular" v-show="type == 'circular'">
			<div class="pickoner-circular-item" :class="{ active: value == i+1 || item && value == item.id && returnId }" v-for="(item, i) in picks" :key="i" @click="pick(i)">
				<img class="active" :src="item.picActive">
				<img class="passive" :src="item.picPassive">
				<span v-if="item.title">{{ item.title }}</span>
				<span v-if="item.name"> {{ item.name }}</span>
			</div>
		</div>
		<div class="pickoner-list" v-show="type == 'list'">
			<div class="pickoner-list-item" :class="{ active: item && value == item.id }" v-for="(item, i) in picks" :key="i" @click="pick(i)">
				<span v-if="item.title">{{ item.title }}</span>
				<span v-if="item.name">{{ item.name }}</span>
			</div>
		</div>
		<div class="pickoner-checkboxes" v-show="type == 'checkboxes' || type == 'checkboxes-radio'">
			<div class="pickoner-checkboxes-item" :class="{ active: returnId && item && value && value.length != 0 && value[i] == item.id || item && value && value.length != 0&& value[i] == item.name && type == 'checkboxes' || item && value && value.length != 0 && value[i] && value[i] == item.title && type == 'checkboxes' || value == i+1 && type == 'checkboxes-radio' }" v-for="(item, i) in customPicks" :key="i" @click="pick(i)">
				<div class="checkbox">
					<div class="tick">
						<img src="step5/checked.png">
					</div>
				</div>
				<span v-if="item.title">{{ item.title }}</span>
				<span v-if="item.name">{{ item.name }}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['picks', 'value', 'type', 'returnId', 'sort', 'uncheckAllWhen', 'chooseOneByDefault'],

	data() {
		return {
			pickedOne: -1,
			pickedOnes: this.picks ? new Array(this.picks.length).fill('') : []
		}
	},

	computed: {
		customPicks() {
			if (this.sort && this.picks) {
				let n = this.picks.slice();
				return n.sort((a,b) => a.id - b.id);
			}

			return this.picks;
		}
	},

	mounted() {
		if (this.type == 'checkboxes' && !this.returnId) {
			if (this.chooseOneByDefault) {
				for (let i = 0; i < this.picks.length; i++) {
					if (this.picks[i].title == this.chooseOneByDefault) {
						this.pickedOnes[i] = this.chooseOneByDefault;
						this.pickedOnes.push({});
						this.pickedOnes.pop();
					}
				}
			}

			this.$emit('input', this.pickedOnes);
		}
	},

	methods: {
		pick(i) {
			if (this.returnId) {
				if (this.type == 'circular' || this.type == 'checkboxes-radio' || this.type == 'list') {
					if (this.picks[i])
						this.$emit('input', this.picks[i].id);
				} else if (this.type == 'checkboxes') {
					if (this.pickedOnes[i])
						this.pickedOnes[i] = '';
					else
						this.pickedOnes[i] = this.picks[i].id
					this.pickedOnes.push({});
					this.pickedOnes.pop();
					this.$emit('input', []);
					this.$emit('input', this.pickedOnes);
				}
			} else if (this.type == 'circular'  || this.type == 'checkboxes-radio') {
				this.pickedOne = i;
				this.$emit('input', i+1);
			} else if (this.type == 'checkboxes') {
				if (this.pickedOnes[i])
					this.pickedOnes[i] = '';
				else
					this.pickedOnes[i] = this.picks[i].title !== undefined ? this.picks[i].title : this.picks[i].name ;
				this.pickedOnes.push({});
				this.pickedOnes.pop();

				if (this.uncheckAllWhen && this.value.includes(this.uncheckAllWhen)) {
					this.pickedOnes = new Array(this.picks.length).fill('');
					this.pickedOnes[i] = this.picks[i].title;
					this.pickedOnes.push({});
					this.pickedOnes.pop();
				}
				
				this.$emit('input', []);
				this.$emit('input', this.pickedOnes);
			} else if(this.type == 'list'){
				this.pickedOne = i;
				if(this.pickedOne >=0)
				this.$emit('input',this.picks[i].id);
			}
		}
	}
}
</script>
