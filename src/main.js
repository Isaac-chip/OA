import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import qs from 'qs'
import constants from './constants'
import 'iview/dist/styles/iview.css'
import './css/login.css'
import './css/app.css'
import './css/icon.css'
import ZkTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';


Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
Vue.prototype.$constants = constants
Vue.use(VueQuillEditor);

Vue.prototype.$convertDate = function (dateA) {
  var dateee = new Date(dateA).toJSON()
  var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  return date
}
Vue.filter('date', (value) => {
  var dateee = new Date(value).toJSON()
  var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  return date
});

Vue.use(iView)
Vue.use(ZkTable)

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach(route => {
  iView.LoadingBar.finish()
})

axios.interceptors.request.use(config => {
  iView.LoadingBar.start()
  if (constants.access_token !=null && constants.access_token !='') {
      config.headers['Authorization'] = "bearer "+constants.access_token;
  }
  return config
}, error => {
  iView.LoadingBar.finish()
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  iView.LoadingBar.finish();
  return response
}, error => {
  iView.LoadingBar.finish()
  return Promise.reject(error)
})

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<app/>'
})
