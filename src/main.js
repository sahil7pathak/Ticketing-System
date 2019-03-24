import Vue from 'vue'
import App from './App.vue'
import './components/FirebaseInit'
Vue.config.productionTip = false
import router from './router'
import firebase from 'firebase'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueGoogleCharts from 'vue-google-charts'
Vue.use(BootstrapVue)
Vue.use(VueGoogleCharts)
firebase.auth().onAuthStateChanged(function (user) {
  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')
})