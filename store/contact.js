import apiRequest from '../utils/apiRequest'

export const state = () => ({
    myContacts: [],
    anotherContacts: []
})

export const mutations = {
    SET_MY_CONTACT: (state, payload) => state.myContacts = payload,
    SET_ANOTHER_CONTACT: (state, payload) => state.anotherContacts = payload,
}

export const actions = {
    async getMyContact({commit}) {
        const data = await apiRequest.get(`user/contact/my?vk_user_id=1`);
        commit('SET_MY_CONTACT', data.data)
    },
    async getAnother({commit}) {
        const data = await apiRequest.get(`user/contact/another?vk_user_id=1`);
        commit('SET_ANOTHER_CONTACT', data.data)
    }
}
