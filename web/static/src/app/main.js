import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './routes.js'

Vue.config.productionTip = false

let darkTheme = localStorage.getItem('darkTheme') === 'true'

// import '../../css/icons.css'
import '../../css/material.css'
import '../../css/common.css'

import VueRouter from 'vue-router'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

Vue.use(VueRouter)

Vue.prototype.$http = axios

store.dispatch('toggleDarkTheme', darkTheme).then(() => {
    new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount('#app')
})


