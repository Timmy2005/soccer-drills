import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

export default new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/login/', component: Login
		},
		{
			path: '/register/', component: Register
		},
	]
})
