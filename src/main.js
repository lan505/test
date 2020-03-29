// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import ViewUI  from 'view-design';
import VueCookies from 'vue-cookies';
import store from './store'
import 'view-design/dist/styles/iview.css';
import './assets/css/custom.css';
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import VueAxios from 'vue-axios';
import LxTablePage from './components/common/LxTablePage';
import LxSelect from './components/common/LxSelect';
import LxRadio from './components/common/LxRadio';
import LxCheckBox from './components/common/LxCheckBox';
import globalAxios from './assets/js/global/globalAxios';
import globalActionUrl from './assets/js/global/globalActionUrl';
import globalConsts from './assets/js/global/globalConsts';
import globalDict from './assets/js/global/globalDict';
import buttonAuthority from "./assets/js/global/globalButtonAuthority";
import Treeselect from "@riophae/vue-treeselect";
import VueCropper from 'vue-cropper';

Vue.config.productionTip = false;
Vue.use(ViewUI );
Vue.use(VueAxios, globalAxios);
Vue.use(VueCookies);
Vue.use(Vuex);
Vue.use(VueCropper);

//自定义组件
Vue.component("LxTablePage", LxTablePage);
Vue.component("Treeselect", Treeselect);
Vue.component("LxSelect", LxSelect);
Vue.prototype.globalActionUrl = globalActionUrl;
Vue.prototype.globalConsts = globalConsts;
Vue.prototype.globalDict = globalDict;
Vue.prototype.buttonAuthority = buttonAuthority;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
})
