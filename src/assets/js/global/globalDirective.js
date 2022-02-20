import Vue from "vue";

import { USER_INFO } from "@/assets/js/global/globalMutationType";

/**权限指令**/
const permission = Vue.directive("permission", {
    bind: function(el, binding, vnode) {
        console.warn("binding.value：" + binding.value);
        if (!Vue.prototype.$_has(binding.value)) {
            console.log(el.parentNode);
            el.parentNode.removeChild(el);
        }
    }
});
// 权限检查方法

Vue.prototype.$_has = function(value) {
    let isExist = false;
    // 获取用户按钮权限
    var userInfo = JSON.parse(sessionStorage.getItem(USER_INFO));
    if (userInfo != null) {
        if (userInfo.lsAuthString.indexOf(value) > -1) {
            isExist = true;
        }
    } else {
        console.warn("_has：userInfo is null");
    }
    return isExist;
};
export { permission };
