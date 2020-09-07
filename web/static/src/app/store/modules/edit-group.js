import axios from 'axios'

export default {
	namespaced: true,
	state: {
		name: null,
		description: null,
		sessions: [],
		nextSessionId: -1,
		next: '/groups',
		groupId: null,
		nextSessionIndex: 0
	},
	actions: {
		init({commit}, groupId) {
			commit('reset')
			commit('setGroupId', groupId)
			axios.post('/get-editable-group/', {
				'id': groupId
			}).then(response => {
				commit('setName', response.data.name)
				commit('setDescription', response.data.description)
				commit('setSessions', response.data)
			}).catch(error => {
				console.log(error)
			})
		},
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
		saveChanges({state, commit, dispatch}) {
			axios.post('/save-group/', {
				id: state.groupId,
				name: state.name,
				description: state.description,
				sessions: state.sessions
			}).then(response => {
				commit('reset')
				dispatch('home/setSessions', response.data, {root:true})
			}).catch(error => {
				console.log(error)
			})
		},
		setNext({commit}, path) {
			commit('setNext', path)
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
			state.sessions = []
			
		},
		addSession(state) {
			state.sessions.push({
				name: null,
				link: null,
				id: state.nextSessionId,
				index: state.nextSessionIndex
			})
			state.nextSessionId--
			state.nextSessionIndex++
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
		},
		setSessions(state, payload) {
			for (let session of payload.sessions) {
				state.sessions.push({
					name: session.name,
					link: session.link,
					id: session.id,
					index: session.index
				})
				state.nextSessionIndex = session.index + 1
			}
		},
		setGroupId(state, groupId) {
			state.groupId = groupId
		},
		setNext(state, path) {
			state.next = path
		}
	}
}
