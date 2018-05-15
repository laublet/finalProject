/* eslint-disable no-new */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import swal from 'sweetalert2';
import App from './App';
import router from './router';
import './assets/sass/main.scss';
import { store } from './store/store';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://localhost:8000';
// axios.defaults.headers.common["Authorization"] = localStorage.getItem("Clef");
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const reqInterceptor = axios.interceptors.request.use((config) => {
  config.headers.common.Authorization = localStorage.getItem('Clef');
  console.log('Request Interceptor', config);
  return config;
});
const resInterceptor = axios.interceptors.response.use((res) => {
  console.log('Response Interceptor', res);
  return res;
});

// axios.interceptors.request.eject(reqInterceptor);
// axios.interceptors.response.eject(resInterceptor);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
