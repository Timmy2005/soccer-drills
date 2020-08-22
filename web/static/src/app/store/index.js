import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		visitedArr: [],
		inputIndex: null,
		lastSessionDate: null,
		nextUpLinkIndex: null,
		links: [
			'https://www.facebook.com/318748909507/videos/649968942464224',
			'https://www.facebook.com/318748909507/videos/2612971758972997/',
			'https://www.facebook.com/318748909507/videos/498942800766464/',
			'https://www.facebook.com/318748909507/videos/527572888153782/',
			'https://www.facebook.com/318748909507/videos/926772904410122/',
			'https://www.facebook.com/318748909507/videos/2574431759464489/',
			'https://www.facebook.com/318748909507/videos/247198643102613/',
			'https://www.facebook.com/318748909507/videos/1588663631296750/',
			'https://www.facebook.com/318748909507/videos/2665635223721596/',
			'https://www.facebook.com/318748909507/videos/2669484819990940/',
			'https://www.facebook.com/318748909507/videos/535514280498748/',
			'https://www.facebook.com/318748909507/videos/3697736870267369/',
			'https://www.facebook.com/318748909507/videos/705004410305115/',
			'https://www.facebook.com/318748909507/videos/3025730300817570/',
			'https://www.facebook.com/318748909507/videos/222023952224132/',
			'https://www.facebook.com/318748909507/videos/659991487900808/',
			'https://www.facebook.com/318748909507/videos/629913900921785/',
			'https://www.facebook.com/318748909507/videos/2911103542318651/',
			'https://www.facebook.com/318748909507/videos/836336946858397/',
			'https://www.facebook.com/318748909507/videos/245310483493661/',
			'https://www.facebook.com/318748909507/videos/251541702868527/',
			'https://www.facebook.com/318748909507/videos/2614751715434132/',
			'https://www.facebook.com/318748909507/videos/165132848228069/',
			'https://www.facebook.com/318748909507/videos/184435959355973/',
			'https://www.facebook.com/318748909507/videos/244576203543813/',
			'https://www.facebook.com/318748909507/videos/276445793512600/',
			'https://www.facebook.com/318748909507/videos/710323713052933/',
			'https://www.facebook.com/318748909507/videos/246632956586240/',
			'https://www.facebook.com/318748909507/videos/556846081927489/',
			'https://www.facebook.com/318748909507/videos/171019884353180/'
		],
		menu: {
			open: false
		},
		darkTheme: false
	},
	getters: {
		nextUp(state) {
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
				href: state.links[state.nextUpLinkIndex - 1]
			}
		},
		setDarkTheme({commit}, value) {
			commit('setDarkTheme', value)
		}
	},
	actions: {
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
			console.log(value)
			commit('setDarkTheme', typeof value !== 'undefined' ? value : !state.darkTheme)
		}
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
		}
	}
})
