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
import LxCropper from './components/common/LxCropper';
import LxRadio from './components/common/LxRadio';
import LxSelect from './components/common/LxSelect';
import LxCheckBox from './components/common/LxCheckBox';
import LxSwitch from './components/common/LxSwitch';
import globalAxios from './assets/js/global/globalAxios';
import globalActionUrl from './assets/js/global/globalActionUrl';
import globalConsts from './assets/js/global/globalConsts';
import globalHelper from "./assets/js/global/globalHelper";
import Treeselect from "@riophae/vue-treeselect";
import VueCropper from 'vue-cropper';

Vue.config.productionTip = false;
Vue.use(ViewUI);
Vue.use(VueAxios, globalAxios);
Vue.use(VueCookies);
Vue.use(Vuex);
Vue.use(VueCropper);

//自定义组件
Vue.component("LxTablePage", LxTablePage);
Vue.component("LxCropper", LxCropper);
Vue.component("Treeselect", Treeselect);
Vue.component("LxRadio", LxRadio);
Vue.component("LxSelect", LxSelect);
Vue.component("LxCheckBox", LxCheckBox);
Vue.component("LxSwitch", LxSwitch);
Vue.prototype.bus = new Vue();
Vue.prototype.globalActionUrl = globalActionUrl;
Vue.prototype.globalConsts = globalConsts;
Vue.prototype.globalHelper = globalHelper;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
})
