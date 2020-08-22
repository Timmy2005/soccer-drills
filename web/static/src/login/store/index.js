import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		darkTheme: false,
		routes: [
			'/login/',
			'/register/'
		],
		routeIndex: 0,
		transitionDirection: 'right',
		redirect: false
	},
	getters: {
		route(state) {
			return state.routes[state.routeIndex]
		}
	},
	actions: {
		toggleDarkTheme({commit, state}, value) {
			commit('setDarkTheme', typeof value !== 'undefined' ? value : !state.darkTheme)
		},
		setRoute({commit}, index) {
			commit('setRoute', index)
		},
		turnOffRedirect({commit}) {
			commit('setRedirect', false)
		}
	},
	mutations: {
		setDarkTheme(state, value) {
			state.darkTheme = value
			localStorage.setItem('darkTheme', value)
		},
		setRoute(state, index) {
			if (index > state.routeIndex) {
				state.transitionDirection = 'right'
			} else {
				state.transitionDirection = 'left'
			}
			state.routeIndex = JSON.parse(JSON.stringify(index))
			state.transitionMethod = 'slide'
			state.redirect = true
		},
		setRedirect(state, value) {
			state.redirect = value
		}
	}
})
