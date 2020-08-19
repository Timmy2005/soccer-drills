import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'

Vue.config.productionTip = false

let darkTheme = localStorage.getItem('darkTheme') === 'true'

console.log(darkTheme)

store.dispatch('toggleDarkTheme', darkTheme).then(() => {
    new Vue({
        store,
        render: h => h(App),
    }).$mount('#app')
})


