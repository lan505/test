/*
 * @Description   
 * @Autor         lan505
 * @Version       1.0
 * @Date          2022-02-07 17:07:21
 * @LastEditTime  2022-02-23 17:16:47
 */
import Vue from "vue";

/**权限指令**/
Vue.directive("permission", {
    inserted: function (el, binding, vnode) {
        var hasPermission = vnode.context.$store.state.user.loginInfo.lsAuthString.indexOf(binding.value) > -1;
        if (!hasPermission) {
            el.parentNode.removeChild(el);
        }
    }
});
