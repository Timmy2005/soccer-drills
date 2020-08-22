import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './routes.js'
import axios from 'axios'

import '../../css/icons.css'
import 'material-components-web/dist/material-components-web.css'
import '../../css/common-login.css'

import VueRouter from 'vue-router'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

Vue.config.productionTip = false

let darkTheme = localStorage.getItem('darkTheme') === 'true'

console.log(darkTheme)

Vue.use(VueRouter)

Vue.prototype.$http = axios

store.dispatch('toggleDarkTheme', darkTheme).then(() => {
    new Vue({
        store,
        router,
        render: h => h(App),
    }).$mount('#app')
})

