import axios from 'axios'

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
		nextSessionId: -1,
		next: '/groups'
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
		},
		createNewGroup({state, commit}) {
			axios.post('/create-group/', {
				name: state.name,
				description: state.description,
				sessions: state.sessions
			}).then(response => {
				commit('reset')
			}).catch(error => {
				console.log(error)
			})
		},
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
			state.sessions = [
				{
					name: null,
					link: null,
					id: -1
				}
			]
			
		},
		addSession(state) {
			state.sessions.push({
				name: null,
				link: null,
				id: state.nextSessionId
			})
			state.nextSessionId--
		},
		setSessionName(state, payload) {
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
