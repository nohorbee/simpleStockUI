// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLocalStorage from 'vue-ls'

let options = {
  namespace: 'vuejs__'
}

Vue.use(VueLocalStorage, options)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
    apiUri: 'https://stock-calc.herokuapp.com/data',
    token: Vue.ls.get('token')
  }
})
