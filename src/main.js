/*
 * @Description   
 * @Autor         lan505
 * @Version       1.0
 * @Date          2021-02-25 12:09:38
 * @LastEditTime  2022-02-10 13:41:31
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import Vuex from "vuex";
import ViewUI from "view-design";
import VueCookies from "vue-cookies";
import "view-design/dist/styles/iview.css";
import "@/assets/css/custom.css";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import VueAxios from "vue-axios";
import LxTablePage from "@/components/common/LxTablePage";
import LxDatePicker from "@/components/common/LxDatePicker";
import LxCropper from "@/components/common/LxCropper";
import LxRadio from "@/components/common/LxRadio";
import LxSelect from "@/components/common/LxSelect";
import LxCheckBox from "@/components/common/LxCheckBox";
import LxSwitch from "@/components/common/LxSwitch";
import LxDepart from "@/components/common/LxDepart";
import globalAxios from "@/assets/js/global/globalAxios";
import globalActionUrl from "@/assets/js/global/globalActionUrl";
import globalConsts from "@/assets/js/global/globalConsts";
import globalHelper from "@/assets/js/global/globalHelper";
import ArrayUtil from "@/assets/js/utils/ArrayUtil";
import Treeselect from "@riophae/vue-treeselect";
import VueCropper from "vue-cropper";

Vue.config.productionTip = false;
Vue.use(ViewUI);
Vue.use(VueAxios, globalAxios);
Vue.use(VueCookies);
Vue.use(VueCropper);
Vue.use(Vuex);

//自定义组件
Vue.component("LxTablePage", LxTablePage);
Vue.component("LxCropper", LxCropper);
Vue.component("LxRadio", LxRadio);
Vue.component("LxSelect", LxSelect);
Vue.component("LxCheckBox", LxCheckBox);
Vue.component("LxSwitch", LxSwitch);
Vue.component("LxDatePicker", LxDatePicker);
Vue.component("LxDepart", LxDepart);
Vue.component("Treeselect", Treeselect);

Vue.prototype.bus = new Vue();
Vue.prototype.globalActionUrl = globalActionUrl;
Vue.prototype.globalConsts = globalConsts;
Vue.prototype.globalHelper = globalHelper;
Vue.prototype.ArrayUtil = ArrayUtil;

document.title = globalConsts.system.title;
/* eslint-disable no-new */
new Vue({
    el: "#app",
    store,
    router,
    components: { App },
    template: "<App/>"
});
