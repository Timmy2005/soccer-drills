import axios from 'axios'
import Vue from 'vue'

export default {
	namespaced: true,
	state: {
		icon: {
			iconColor: null,
			iconText: null,
		},
		username: null,
		darkTheme: false,
	},
	actions: {
		getUserSettings({commit}) {
			axios.post('/get-user-settings/').then((response) => {
					console.log(response)
					commit('setUserSettings', response.data.userSettings)
					commit('setUser', response.data.user)
				})
				.catch((error) => {
					console.log(error)
				})
		},
		toggleDarkTheme({commit, state}, value) {
			return new Promise((resolve, reject) => {
				let darkTheme = typeof value !== 'undefined' ? value : !state.darkTheme
				commit('setDarkTheme', darkTheme)
				axios.post('/set-dark-theme/', {
					'dark_theme': darkTheme
				}).catch((error) => {
					console.log(error)
				})
				resolve()
			})
			
		},
	},
	mutations: {
		setUserSettings(state, userSettings) {
			console.log(userSettings)
			state.icon.iconColor = userSettings.iconColor
			state.icon.iconText = userSettings.iconText.toUpperCase()
		},
		setUser(state, user) {
			console.log(user)
			state.username = user.username
		},
		setDarkTheme(state, value) {
			state.darkTheme = value
			localStorage.setItem('darkTheme', value)
		},
	}
}
