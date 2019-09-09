import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import qs from 'qs'
import constants from './constants'
import Utils from './utils';
import 'iview/dist/styles/iview.css'
import './css/login.css'
import './css/app.css'
import './css/icon.css'
import ZkTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap,{
  ak:'UXTxGY2P3obB5GZ0IBEYBPui0NkUdG0o'
});


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

Vue.prototype.$timeToDate = function(value){
  let date = new Date(value); 
  let y = date.getFullYear(); 
  let MM = date.getMonth() + 1; 
  MM = MM < 10 ? ('0' + MM) : MM; 
  let d = date.getDate(); 
  d = d < 10 ? ('0' + d) : d; 
  let h = date.getHours(); 
  h = h < 10 ? ('0' + h) : h; 
  let m = date.getMinutes(); 
  m = m < 10 ? ('0' + m) : m; 
  let s = date.getSeconds(); 
  s = s < 10 ? ('0' + s) : s; 
  return y+'-'+MM+'-'+d+' '+h+':'+m;
}

Vue.use(iView)
Vue.use(ZkTable)

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach(route => {
  iView.LoadingBar.finish()
})

let access_token = '';

axios.interceptors.request.use(config => {
  iView.LoadingBar.start();
  var url = config.url;
  //如果是登录请求则不需要带token
  if(url.indexOf('oauth/token') == -1){
    access_token = constants.access_token;
    if (access_token ==null || access_token =='') {
      var userInfo =window.localStorage.getItem('userInfo');
      if(userInfo !=null && userInfo!=''){
        constants.userInfo = JSON.parse(userInfo);
        access_token = JSON.parse(userInfo).access_token;
      }
    }
    if(access_token !=null && access_token !=''){
      config.headers['Authorization'] = "bearer "+ access_token;
    }
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


Vue.filter('status', function (value) {
  if(value==true) {
    return '禁用'
  }else {
    return '启用'
  }
})