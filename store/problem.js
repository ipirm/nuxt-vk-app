import apiRequest from '../utils/apiRequest'

export const state = () => ({
  stagesProblem: [],
  problemCardsData: {}
})

export const mutations = {
  SET_STAGES: (state, payload) => state.stagesProblem = payload,
  SET_CARD_DATA: (state, payload) => {
    state.problemCardsData[payload.id] = payload.data;
  }
}

export const actions = {
  async getProblem({ commit }, step) {
    if (step === 0) {
      const data = await apiRequest.get(`scope/project/level/?vk_user_id=1&projectLevel=${step+1}`);
      commit('SET_STAGES', data.data)
    } else {
      const data = await apiRequest.get(`scope/project/parent/?vk_user_id=1&parentId=${step}`);
      commit('SET_STAGES', data.data)
    }
  },

  async addProblem({ commit, dispatch }, data) {
    let formData = new FormData();
    formData.append('problem', JSON.stringify(data.data));
    if (data.files) {
      for (let i = 0; i < data.files.length; i++) {
        formData.append('file', data.files[i].file);
      }
    }
    await apiRequest.postFormData(`user/problem?vk_user_id=1`, formData).then(() => {
      console.log('Success')
      dispatch('auth/getProblems', null, { root: true });
    });
  },

  async editProblem({ commit, dispatch }, data) {
    let formData = new FormData();
    formData.append('problem', JSON.stringify(data.data));
    if (data.files) {
      for (let i = 0; i < data.files.length; i++) {
        formData.append('file', data.files[i].file);
      }
    }
    await apiRequest.put(`user/problem?vk_user_id=1`, formData).then(() => {
      console.log('Success')
      dispatch('auth/getProblems', null, { root: true });
    });
  },

  async deleteProblem({ commit, dispatch }, id) {
    await apiRequest.delete(`user/problem/${id}?vk_user_id=1`).then(() => {
      console.log('Success');
      dispatch('auth/getProblems', null, { root: true });
    });
  },

  async searchFilter({ commit }, data) {
    console.log(data);
    // await apiRequest.postFormData(`user/problem?vk_user_id=1`, JSON.stringify(data)).then(() => {
    //   console.log('Success')
    //   dispatch('auth/getProblems', null, { root: true });
    // });
  },

  async getAllFromProblem({commit}, data) {
    // let res = await apiRequest.get(`user/problem/solutions?vk_user_id=1&problemId=${data.id}&userStatus=${data.status}`).then(() => {
    //   console.log('Success');
    // });
    // if (res)
    //   return res.data;
    // return []
  }
}
