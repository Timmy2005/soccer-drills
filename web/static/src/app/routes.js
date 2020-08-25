import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Groups from './components/Groups.vue'
import NewGroup from './components/groups/NewGroup.vue'

export default new VueRouter({
	mode: 'history',
	base: '/app',
	routes: [
		{
			path: '/', component: Home
		},
		{
			path: '/groups/', component: Groups
		},
		{
			path: '/groups/new', component: NewGroup
		},
	]
})
