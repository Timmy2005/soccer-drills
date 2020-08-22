import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

let darkTheme = localStorage.getItem('darkTheme') === 'true'

import '../../css/icons.css'
import 'material-components-web/dist/material-components-web.css'

store.dispatch('toggleDarkTheme', darkTheme).then(() => {
    new Vue({
        store,
        render: h => h(App),
    }).$mount('#app')
})


