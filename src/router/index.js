/*
 * @Description   
 * @Autor         lan505
 * @Version       1.0
 * @Date          2021-02-25 12:09:38
 * @LastEditTime  2022-03-11 16:51:31
 */
import Vue from "vue";
import Router from "vue-router";
import { Modal } from "view-design";
import Login from "@/views/portal/Login";
import Index from "@/views/portal/Index";
import Content from "@/views/portal/Content";
import PersonalCenter from "@/views/portal/PersonalCenter";
import globalConsts from "@/assets/js/global/globalConsts";
import vuex from "@/store/index";

Vue.use(Router);

const router = new Router({
    mode: "hash",
    routes: [
        {
            path: "/",
            name: globalConsts.staticRouterName.login,
            component: Login
        },
        {
            path: "/Content",
            name: globalConsts.staticRouterName.content,
            component: Content,
            redirect: "/Index",
            children: [
                {
                    path: "/Index",
                    name: globalConsts.staticRouterName.index,
                    component: Index,
                    meta: {
                        pathText: "首页"
                    }
                },
                {
                    path: "/PersonalCenter",
                    name: globalConsts.staticRouterName.personalCenter,
                    component: PersonalCenter,
                    meta: {
                        pathText: "用户中心"
                    }
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    let requiresAuth = to.matched.some(item => item.meta.requiresAuth);
    let userInfo = vuex.state.user.loginInfo;

    if (requiresAuth) {
        vuex.dispatch(
            globalConsts.vuex.action.initApplicationRouterPath,
            to.meta
        );
        if (!userInfo) {
            Modal.warning({
                title: "提示框",
                content: "登录超时，请重新登录",
                onOk: () => {
                    return next({ path: "/" });
                }
            });
        }
    }
    next();
});

export default router;
