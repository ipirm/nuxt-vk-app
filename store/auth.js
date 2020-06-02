import apiRequest from '../utils/apiRequest'

export const state = () => ({
    user: {},
    loggedIn: false
})

export const mutations = {
    SET_USER: (state, payload) => {
        state.user = payload
    },
    LOGGED_IN: (state, payload) => state.loggedIn = payload,
    SET_PROBLEMS: (state, payload) => {
        state.user.problems = payload;
    }
}

export const actions = {
    async getUser({commit}) {
        try {
            await apiRequest.get('auth/me?vk_user_id=1').then(async () => {
                const data = await apiRequest.get('user?vk_user_id=1')
                commit('SET_USER', data.data)
                commit('LOGGED_IN', true)
            })
        } catch (e) {
            try {
                await apiRequest.post('user?vk_user_id=1&', {
                    "firstName": "vasya",
                    "lastName": "Slysh",
                    "city": "Ogon'",
                    "photo": "moe"
                }).then(async () => {
                    const data = await apiRequest.get('user?vk_user_id=1')
                    commit('SET_USER', data.data)
                    commit('LOGGED_IN', true)
                })
            } catch (e) {
                commit('SET_USER', {})
                commit('LOGGED_IN', false)
            }
        }
    },
    async updateUser({commit,dispatch},data) {
        let formData = new FormData();
        formData.append('user', JSON.stringify(data.data));
        if (data.file) {
            formData.append('file', data.file);
        }
        await apiRequest.put(`user?vk_user_id=1`, formData).then(async () => {
          console.log('Success')
          await dispatch('getUser');
        })
    },
    async getProblems({commit}) {
        const data = await apiRequest.get('user/problems?vk_user_id=1');
        if (data.data) {
            commit('SET_PROBLEMS', data.data);
        }
    }
}
