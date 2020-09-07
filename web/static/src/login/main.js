import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './routes.js'
import axios from 'axios'

console.log(store)

import '../../css/icons.css'
import '../../css/material.css'
import '../../css/common-login.css'

import VueRouter from 'vue-router'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

Vue.config.productionTip = false

let darkTheme = localStorage.getItem('darkTheme') === 'true'

Vue.use(VueRouter)

Vue.prototype.$http = axios


store.dispatch('toggleDarkTheme', darkTheme).then(() => {
    new Vue({
        store,
        router,
        render: h => h(App),
    }).$mount('#app')
})


