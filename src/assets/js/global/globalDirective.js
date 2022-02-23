/*
 * @Description   
 * @Autor         lan505
 * @Version       1.0
 * @Date          2022-02-07 17:07:21
 * @LastEditTime  2022-02-23 17:16:47
 */
import Vue from "vue";
import globalConsts from "@/assets/js/global/globalConsts";
import { Message } from "view-design";

/**权限指令**/
Vue.directive("permission", {
    inserted: function (el, binding, vnode) {
        var loginInfo = vnode.context.$store.state.user.loginInfo;
        var hasPermission = loginInfo.lsAuthString.indexOf(binding.value) > -1;
        if (!hasPermission) {
            var permissionProcessType = loginInfo.systemCustomData.permissionProcessType;
            if (permissionProcessType === globalConsts.permissionProcessType.hide) {
                el.parentNode.removeChild(el);
            } else if (permissionProcessType === globalConsts.permissionProcessType.show) {
                el.addEventListener("click", function (event) {
                    Message.warning("权限不足");
                    return false;
                });
            }
        }
    }
});
