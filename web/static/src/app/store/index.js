import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import newGroup from './modules/new-group.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		visitedArr: [],
		inputIndex: null,
		lastSessionDate: null,
		nextUpLinkIndex: null,
		sessions: [],
		groups: [],
		menu: {
			open: false
		},
		darkTheme: false,
	},
	modules: {
		newGroup: newGroup
	},
	getters: {
		nextUp(state) {
			if (state.sessions.length > 0) {
				let runningIndex = 1
				let lastIndex = null
				
				state.nextUpLinkIndex = null
				if (state.visitedArr.length > 0) {
					for (let i of state.visitedArr) {
						if (lastIndex === i) {
							continue
						} else if (runningIndex !== i) {
							state.nextUpLinkIndex = runningIndex
							break
						}
						lastIndex = i
						runningIndex++
					}
					if (!state.nextUpLinkIndex) {
						state.nextUpLinkIndex = state.visitedArr[state.visitedArr.length - 1] + 1
					}
				} else {
					state.nextUpLinkIndex = 1
				}
				return {
					sessionNum: state.nextUpLinkIndex,
					href: state.sessions[state.nextUpLinkIndex - 1]
				}
			} else {
				return {
					sessionNum: null,
					href: null
				}
			}
		},
		setDarkTheme({commit}, value) {
			commit('setDarkTheme', value)
		}
	},
	actions: {
		initHome({commit}) {
			axios.post('/get-sessions/', {
				group: 'Soccer Drills'
			}).then((response) => {
					console.log(response.data)
					commit('setSessions', response.data)
				})
				.catch((error) => {
					console.log(error)
				})
		},
		initGroups({commit}) {
			axios.post('/get-groups/')
				.then((response) => {
					commit('setGroups', response.data)
				})
				.catch((error) => {
					console.log(error)
				})
		},
		setVisitedArr({commit}) {
			commit('setVisitedArr')
		},
		setInputIndexInputValue({commit}, value) {
			commit('setInputIndexInputValue', value)
		},
		setLastSessionDate({commit}) {
			let date = new Date()
			localStorage.setItem('lastSession', date.toString())
			commit('setLastSessionDate')
		},
		openMenu({commit}) {
			commit('setMenuState', true)
		},
		closeMenu({commit}) {
			commit('setMenuState', false)
		},
		toggleDarkTheme({commit, state}, value) {
			let darkTheme = typeof value !== 'undefined' ? value : !state.darkTheme
			commit('setDarkTheme', darkTheme)
			axios.post('/set-dark-theme/', {
				'dark_theme': darkTheme
			}).catch((error) => {
				console.log(error)
			})
		},
	},
	mutations: {
		setVisitedArr(state) {
			state.visitedArr = JSON.parse(localStorage.getItem('visitedLinks')) ? JSON.parse(localStorage.getItem('visitedLinks')).sort((a, b) => a - b) : []
		},
		setInputIndexInputValue(state, value) {
			state.inputIndex = value
		},
		setLastSessionDate(state) {
			state.lastSessionDate = localStorage.getItem('lastSession') ? new Date(Date.parse(localStorage.getItem('lastSession'))) : null
		},
		setMenuState(state, value) {
			state.menu.open = value
		},
		setDarkTheme(state, value) {
			state.darkTheme = value
			localStorage.setItem('darkTheme', value)
		},
		setSessions(state, sessionSet) {
			Vue.set(state, 'sessions', sessionSet)
		},
		setGroups(state, groupSet) {
			Vue.set(state, 'groups', groupSet)
		}
	}
})
