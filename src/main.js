import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import axios from 'axios';
import qs from 'qs';
import constants from './constants'
import 'iview/dist/styles/iview.css';
import './css/app.css'
import './css/icon.css'
import ZkTable from 'vue-table-with-tree-grid'

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$constants = constants;

Vue.prototype.$convertDate = function(dateA){
    var dateee = new Date(dateA).toJSON();
    var date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
    return date;
}

Vue.use(iView);
Vue.use(ZkTable);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});


axios.interceptors.request.use(config => {
  iView.LoadingBar.start();
	//if (store.getters.token) {
		//config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
	//}
	return config
}, error => {
  iView.LoadingBar.finish();
	console.log('err' + error)// for debug
	return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  iView.LoadingBar.finish();
	return response
}, error => {
  iView.LoadingBar.finish();
	console.log('err' + error)// for debug
	return Promise.reject(error)
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
