import Vue from 'vue'
import Vuex from 'vuex'
import config from './modules/config.js'
import groups from './modules/groups.js'
import home from './modules/home.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		menu: {
			open: false
		}
	},
	modules: {
		groups: groups,
		home: home,
		config: config,
	},
	actions: {
		openMenu({commit}) {
			commit('setMenuState', true)
		},
		closeMenu({commit}) {
			commit('setMenuState', false)
		}
	},
	mutations: {
		setMenuState(state, value) {
			state.menu.open = value
		}
	}
})
