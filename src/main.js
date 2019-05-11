// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import iView from 'iview';
import VueCookies from 'vue-cookies';
import store from './store'
import 'iview/dist/styles/iview.css';
import './assets/css/custom.css';
import VueAxios from 'vue-axios';
import TablePage from './components/common/TablePage';
import globalAxios from './assets/js/global/globalAxios';
import globalActionUrl from './assets/js/global/globalActionUrl';
import globalConstant from './assets/js/global/globalConstant';
import globalDict from './assets/js/global/globalDict';

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(VueAxios, globalAxios);
Vue.use(VueCookies);
Vue.use(Vuex)

//自定义组件
Vue.component("TablePage", TablePage);
Vue.prototype.globalActionUrl = globalActionUrl;
Vue.prototype.globalConstant = globalConstant;
Vue.prototype.globalDict = globalDict;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
})
