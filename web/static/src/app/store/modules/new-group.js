export default {
	namespaced: true,
	state: {
		name: null,
		description: null
	},
	actions: {
		setName({commit}, value) {
			commit('setName', value)
		},
		setDescription({commit}, value) {
			commit('setDescription', value)
		},
		reset({commit}) {
			commit('reset')
		}
	},
	mutations: {
		setName(state, value) {
			state.name = value
		},
		setDescription(state, value) {
			state.description = value
		},
		reset(state) {
			state.name = null
			state.description = null
		}
	}
}
