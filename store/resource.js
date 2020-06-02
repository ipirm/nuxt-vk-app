import apiRequest from '../utils/apiRequest'

export const state = () => ({
    stages: [],
    modalData:
        {
            name: "asdf",
            city: "Moscow",
            description: "asdf",
            scopeId: [1, 2, 3]
        },

    dataFromModals: {
        myResourcesAdd: {},
        editResourcesCard: {},
        editResourcesCardFilters: {}
    }
})

export const mutations = {
    SET_RESOURCE_STAGE: (state, payload) => state.stages = payload,
    SET_MODAL_DATA: (state, payload) => state.modalData.scopeId.push(payload),
    SET_CHECKOBOXES_DATA: (state, payload) => state.modalData.checkboxes = payload,
    SET_ERRORS: (state, payload) => state.error = payload,
    SET_MY_RESOURCES_ADD: (state, payload) => state.dataFromModals.myResourcesAdd = payload,
    SET_EDIT_RESOURCES_CARD: (state, payload) => state.dataFromModals.editResourcesCard = payload,
    SET_EDIT_RESOURCES_CARD_FILTERS: (state, payload) => state.dataFromModals.editResourcesCardFilters = payload,
}

export const actions = {
    async getResource({commit}, step) {
       if(step === 0){
           const data = await apiRequest.get(`scope/level/?vk_user_id=1&scopeLevel=${step+1}`);
           commit('SET_RESOURCE_STAGE', data.data)
       }else{
           const data = await apiRequest.get(`scope/parent/?vk_user_id=1&parentId=${step}`);
           commit('SET_RESOURCE_STAGE', data.data)
       }
    },
    async addResource({commit}, data) {
        let formData = new FormData();
        formData.append('resource', JSON.stringify(data.data));
        if (data.files) {
          for (let i = 0; i < data.files.length; i++) {
            formData.append('file', data.files[i].file);
          }
        }
        await apiRequest.postFormData(`user/resource?vk_user_id=1`, formData).then(() => {
            console.log('Success')
        });
    },
    async updateResource({commit}, data) {
        let formData = new FormData();
        formData.append('resource', JSON.stringify(data.data));
        if (data.files) {
          for (let i = 0; i < data.files.length; i++) {
            formData.append('file', data.files[i].file);
          }
        }
        await apiRequest.put(`user/resource?vk_user_id=1`, formData).then(() => {
            console.log('Success')
        });
    },
    async deleteResource({commit},id){
        await apiRequest.delete(`user/resource/${id}?vk_user_id=1`).then(() => {
            console.log('Success')
        });
    },
    async setEditResourcesCard({commit}, data) {
        console.log(data);
        commit('SET_EDIT_RESOURCES_CARD', data);
    },
    async setEditResourcesCardFilters({commit}, data) {
        console.log(data);
        commit('SET_EDIT_RESOURCES_CARD_FILTERS', data);
    }
}
