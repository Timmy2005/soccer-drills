import axios from 'axios'
import Vue from 'vue'
import newGroup from './new-group.js'
import editGroup from './edit-group.js'

export default {
	namespaced: true,
	state: {
		groups: [],
		groupsMounted: false,
	},
	modules: {
		newGroup: newGroup,
		editGroup: editGroup
	},
	actions: {
		init({commit}) {
			axios.post('/get-groups/')
				.then((response) => {
					commit('setGroups', response.data)
					commit('setGroupsMounted')
				})
				.catch((error) => {
					console.log(error)
				})
		},
		setGroupsMounted({commit}) {
			commit('setGroupsMounted')
		}
	},
	mutations: {
		setGroupsMounted(state) {
			state.groupsMounted = true
		},
		setGroups(state, groupSet) {
			Vue.set(state, 'groups', groupSet)
		},
	}
}
