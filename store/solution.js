import apiRequest from '../utils/apiRequest'

export const state = () => ({
    stages: [],
    solutions: [],
    allSolutions: []
})

export const mutations = {
    SET_STAGES: (state, payload) => state.stages = payload,
    SET_SOLUTIONS: (state, payload) => state.solutions = payload,
    SET_CONFIRMED_SOLUTIONS: (state, payload) => state.solutions.push(...payload),
    SET_ALL_SOLUTIONS: (state, payload) => state.allSolutions = payload,
    SET_ALL_CONFIRMED_SOLUTIONS: (state, payload) => state.allSolutions.push(...payload),
}

export const actions = {
    async addSolution({commit}, data) {
        await apiRequest.post(`user/problem/solutions?vk_user_id=1`, {problem: JSON.stringify(data)}).then(() => {
            console.log('Success')
        });
    },
    async getSolutions({commit}, body) {
        const data = await apiRequest.get(`user/problem/solutions?vk_user_id=1&problemId=${body.id}&status=CONFIRMED&userStatus=INVITED`)
            commit('SET_SOLUTIONS', data.data)
        const dataConfirmed = await apiRequest.get(`user/problem/solutions?vk_user_id=1&problemId=${body.id}&status=NOT_CONFIRMED&userStatus=INVITED`)
            commit('SET_CONFIRMED_SOLUTIONS', dataConfirmed.data)
    },
    async getAllSolutions({commit}, body) {
        const data = await apiRequest.get(`user/problem/solutions?vk_user_id=1&problemId=${body.id}&status=CONFIRMED&userStatus=ALL`)
        commit('SET_ALL_SOLUTIONS', data.data)
        const dataConfirmed = await apiRequest.get(`user/problem/solutions?vk_user_id=1&problemId=${body.id}&status=NOT_CONFIRMED&userStatus=ALL`)
        commit('SET_ALL_CONFIRMED_SOLUTIONS', dataConfirmed.data)
    },
    async removeSolutions({commit},item){
        await apiRequest.delete(`user/solution/${item.id}?vk_user_id=1`)
    }
}
