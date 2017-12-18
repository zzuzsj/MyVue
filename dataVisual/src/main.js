// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vueResource from 'vue-resource'
import router from './router'
import Vuex from 'vuex';
Vue.use(Vuex);

Vue.config.productionTip = false
Vue.use(vueResource);

const vuex_store = new Vuex.Store({
  state: {
    personData: {} // 定义你的数据源
  },
  mutations: {
    showUserName(state) {
      alert(state);
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store: vuex_store,
})
