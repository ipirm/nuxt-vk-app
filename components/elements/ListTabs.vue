<template>
    <div class="list-tabs">
        <a  :class="['list-tabs-item',selected ===item.id ? 'active': '']" href="" @click.prevent="selectItem(item)" v-for="item in data" :key="item.id">
            <span>{{ item.name }}</span>
        </a>
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                default:  () => ([
                    "Тест",
                    "Тест",
                    "Тест"
                ]),
                type: Array
            }
        },
        data(){
            return {
             selected: ''
            }
        },
        methods:{
          selectItem(item){
              this.selected = item.id;
              this.$store.commit('resource/SET_MODAL_DATA', this.selected);
          }
        },
    }
</script>

<style scoped>

</style>
