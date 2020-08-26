export default {
	namespaced: true,
	state: {
		name: null,
		description: null,
		sessions: [
			{
				name: null,
				link: null,
				id: -1
			}
		],
		nextSessionId: -2
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
		},
		newSession({commit}, number) {
			let sessionsAdded = 0
			while (sessionsAdded < number) {
				commit('addSession')
				sessionsAdded++
			}
		},
		setSessionName({commit}, payload) {
			commit('setSessionName', payload)
		},
		setSessionLink({commit}, payload) {
			commit('setSessionLink', payload)
		},
		removeSession({commit}, index) {
			commit('removeSession', index)
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
		},
		addSession(state) {
			state.sessions.push({
				name: null,
				link: null,
				id: state.nextSessionId
			})
			state.nextSessionId--
		},
		setSessionName(state, payload){
			state.sessions.find(x => x.id === payload.id).name = payload.value
		},
		setSessionLink(state, payload) {
			state.sessions.find(x => x.id === payload.id).link = payload.value
		},
		removeSession(state, id) {
			let index = state.sessions.findIndex(x => x.id === id)
			state.sessions.splice(index, 1)
		}
	}
}
