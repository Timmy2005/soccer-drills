import VueRouter from 'vue-router'
const Home = () => import('./components/Home.vue')
const Groups = () => import('./components/Groups.vue')
const NewGroup = () => import('./components/groups/NewGroup.vue')
const EditGroup = () => import('./components/groups/EditGroup.vue')
const NotFound = () => import('./components/NotFound.vue')

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
		{
			path: '/groups/edit/:id', component: EditGroup, props: true
		},
		{
			path: '*', component: NotFound
		}
	]
})
