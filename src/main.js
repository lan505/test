/*
 * @Description   
 * @Autor         lan505
 * @Version       1.0
 * @Date          2021-02-25 12:09:38
 * @LastEditTime  2022-02-23 13:04:28
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
import LxAuth from "@/components/common/LxAuth";
import LxCheckBox from "@/components/common/LxCheckBox";
import LxCropper from "@/components/common/LxCropper";
import LxDatePicker from "@/components/common/LxDatePicker";
import LxDepart from "@/components/common/LxDepart";
import LxDialog from "@/components/common/LxDialog";
import LxRadio from "@/components/common/LxRadio";
import LxSelect from "@/components/common/LxSelect";
import LxSwitch from "@/components/common/LxSwitch";
import LxTablePage from "@/components/common/LxTablePage";
import LxCard from "@/components/common/LxCard";
import LxTreeSelect from "@/components/common/LxTreeSelect";
import globalAxios from "@/assets/js/global/globalAxios";
import globalActionUrl from "@/assets/js/global/globalActionUrl";
import globalConsts from "@/assets/js/global/globalConsts";
import globalHelper from "@/assets/js/global/globalHelper";
import ArrayUtil from "@/assets/js/utils/ArrayUtil";
import Treeselect from "@riophae/vue-treeselect";
import VueCropper from "vue-cropper";
import "@/assets/js/global/globalDirective";

Vue.config.productionTip = false;
Vue.use(ViewUI);
Vue.use(VueAxios, globalAxios);
Vue.use(VueCookies);
Vue.use(VueCropper);
Vue.use(Vuex);

//自定义组件
Vue.component("LxAuth", LxAuth);
Vue.component("LxCheckBox", LxCheckBox);
Vue.component("LxCropper", LxCropper);
Vue.component("LxDatePicker", LxDatePicker);
Vue.component("LxDepart", LxDepart);
Vue.component("LxDialog", LxDialog);
Vue.component("LxRadio", LxRadio);
Vue.component("LxSelect", LxSelect);
Vue.component("LxSwitch", LxSwitch);
Vue.component("LxTablePage", LxTablePage);
Vue.component("LxCard", LxCard);
Vue.component("LxTreeSelect", LxTreeSelect);
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
