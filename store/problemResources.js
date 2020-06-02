import apiRequest from '../utils/apiRequest'

export const state = () => ({
    resources: [],
    requestResources: [],
    searchResults: []
})

export const mutations = {
    SET_RESOURCES: (state, payload) => state.resources = payload,
    SET_REQUEST_RESOURCES: (state, payload) => state.requestResources = payload,
    SET_SEARCH_RESULTS: (state, payload) => state.searchResults = payload
}

export const actions = {
    async getAddResources({commit}, id) {
        const data = await apiRequest.get(`user/problem/resource/accept?vk_user_id=1&problemId=${id}&limit=30&page=1`)
        commit('SET_RESOURCES', data.data)
    },
    async getRequestResources({commit}, id) {
        const data = await apiRequest.get(`user/problem/resource/request?vk_user_id=1&problemId=${id}&limit=30&page=1`)
        commit('SET_REQUEST_RESOURCES', data.data)
    },
    async deleteRequestResources({commit}, body) {
        await apiRequest.deleteWdata(`user/problem/resource/request?vk_user_id=1`, JSON.stringify(body))
    },
    async deleteAcceptedResources({commit}, body) {
        await apiRequest.deleteWdata(`user/problem/resource/accept?vk_user_id=1`, JSON.stringify(body))
    },
    async search({commit}, body) {
        const data = await apiRequest.get(`user/resource/search?vk_user_id=1&city=${body.city}&page=1&limit=10&scopeId=${body.id}`);
        commit('SET_SEARCH_RESULTS', data.data);
    }
}
