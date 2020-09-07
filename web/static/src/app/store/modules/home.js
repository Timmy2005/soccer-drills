import axios from 'axios'
import Vue from 'vue'

export default {
	namespaced: true,
	state: {
		groupProgress: [],
		inputIndex: null,
		lastSessionDate: null,
		nextUpLinkIndex: -1,
		sessions: null,
		groups: [],
		selectedGroup: undefined,
		sessionsLoaded: false,
	},
	getters: {
		nextUp(state) {
			if (state.sessions && state.sessions.length > 0) {
				let runningIndex = 0
				
				state.nextUpLinkIndex = -1
				if (state.groupProgress.length > 0) {
					for (let i of state.groupProgress) {
						if (runningIndex !== i.index) {
							state.nextUpLinkIndex = runningIndex
							break
						}
						runningIndex++
					}
					if (state.nextUpLinkIndex === -1) {
						state.nextUpLinkIndex = state.groupProgress[state.groupProgress.length - 1].index + 1
					}
				} else {
					state.nextUpLinkIndex = 0
				}
				return state.sessions[state.nextUpLinkIndex]
			} else {
				return {
					sessionNum: null,
					href: null,
					id: null
				}
			}
		},
		status(state) {
			let value = 0
			if (state.sessionsLoaded) {
				if (state.sessions) {
					if (state.sessions.length > 0) {
						value = 1
					} else {
						value = 2
					}
				} else {
					value = 3
				}
			}
			return value
		}
	},
	actions: {
		init({commit}) {
			axios.post('/get-sessions/').then((response) => {
					commit('setSelectedGroup', response.data.selectedGroup)
					commit('setSessions', response.data.sessions)
					commit('setGroups', response.data.groups)
					commit('setGroupProgress', response.data.groupProgress)
					commit('setSessionsLoaded', true)
				})
				.catch((error) => {
					console.log(error)
				})
		},
		setInputIndexInputValue({commit}, value) {
			commit('setInputIndexInputValue', value)
		},
		setLastSessionDate({commit}) {
			let date = new Date()
			localStorage.setItem('lastSession', date.toString())
			commit('setLastSessionDate')
		},
		setSelectedGroup({commit}, value) {
			commit('setSessionsLoaded', false)
			commit('setSelectedGroup', value)
			commit('setSessions', null)
			axios.post('/select-new-group/', {
				groupId: value
			}).then((response) => {
					commit('setSessions', response.data.sessions)
					commit('setGroupProgress', response.data.groupProgress)
					commit('setSessionsLoaded', true)
				})
				.catch((error) => {
					console.log(error)
				})
		},
		sessionCompleted({commit}, id) {
			axios.post('/session-completed/', {
				'session_id': id
			}).then(response => {
				commit('sessionCompleted', response.data)
			}).catch(error => {
				console.log(error)
			})
		},
		setSessions({commit}, sessions) {
			commit('setSessions', sessions)
		}
	},
	mutations: {
		setGroupProgress(state, progress) {
			state.groupProgress = progress
		},
		setInputIndexInputValue(state, value) {
			state.inputIndex = value
		},
		setLastSessionDate(state) {
			state.lastSessionDate = localStorage.getItem('lastSession') ? new Date(Date.parse(localStorage.getItem('lastSession'))) : null
		},
		setSessions(state, sessionSet) {
			Vue.set(state, 'sessions', sessionSet)
		},
		setGroups(state, groupSet) {
			Vue.set(state, 'groups', groupSet)
		},
		setSelectedGroup(state, value) {
			state.selectedGroup = value
		},
		setSessionsLoaded(state, value) {
			state.sessionsLoaded = value
		},
		sessionCompleted(state, newGroupProgress) {
			Vue.set(state, 'groupProgress', newGroupProgress)
		},
	}
}
