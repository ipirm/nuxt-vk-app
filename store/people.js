import apiRequest from '../utils/apiRequest'

export const state = () => ({
  responded: [],
  invited: []
})

export const mutations = {
  SET_RESPONDED: (state, payload) => state.responded = payload,
  SET_INVITED: (state, payload) => state.invited = payload
}

export const actions = {
  async getResponded({ commit, rootState }, body) {
    const data = await apiRequest.get(`user/problem/users/accepted?vk_user_id=${rootState.auth.user.id}&problemId=${body.problemId}&limit=10&page=1`)
    commit('SET_RESPONDED', data.data)
  },

  async getInvited({ commit, rootState }, body) {
    const data = await apiRequest.get(`users/invited?vk_user_id=${rootState.auth.user.id}&problemId=${body.problemId}&limit=10&page=1`)
    commit('SET_INVITED', data.data)
  }
}
