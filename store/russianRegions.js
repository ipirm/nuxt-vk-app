// export const strict = false;

export const state = () => ({
	regions: []
})

export const mutations = {
	SET_REGIONS: (state, payload) => {
		if (payload.data)
			state.regions = payload.data.map(v => v.city);
	}
}

export const actions = {
	async getRegions({commit}) {
	// 	commit('SET_REGIONS', await this.$axios.get('https://gist.githubusercontent.com/gorborukov/0722a93c35dfba96337b/raw/435b297ac6d90d13a68935e1ec7a69a225969e58/russia'));
	}
}
