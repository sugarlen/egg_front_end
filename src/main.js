import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
// import '@/styles/index.less'
import 'element-ui/lib/theme-chalk/index.css';
// markdown
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
// showdown
import showdown from 'showdown';
import * as echarts from 'echarts';

import axios from 'axios';

Vue.use(mavonEditor);
Vue.prototype.converter = new showdown.Converter();

Vue.prototype.$axios = axios;    //全局注册，使用方法为:this.$axios

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
