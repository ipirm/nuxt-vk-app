<template>
    <div class="overlay-checkboxes">
        <div class="overlay-checkboxes-container" style="width: fit-content">
        <label class="container-check" v-for="item in data" :key="item.id" :for="item.name">
            {{ item.name }}
            <input :id="item.name" type="checkbox" :value="item.name" v-model="selected" @change="selectItem">
            <div class="checkmark">
                <img src="~/static/ic_check_mark.svg">
            </div>
        </label>
    </div>
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                default: '5'
            }
        },
        data(){
          return {
              selected: []
          }
        },
        methods: {
            selectItem() {
                this.$store.commit('resource/SET_CHECKOBOXES_DATA', this.selected);
            },
        }
    }
</script>
