/*
 * @Description   
 * @Autor         lan505
 * @Version       1.0
 * @Date          2021-02-25 12:09:38
 * @LastEditTime  2022-03-11 15:14:29
 */
import Vue from "vue";
import Router from "vue-router";
import { Modal } from "view-design";
import Login from "@/views/portal/Login";
import Index from "@/views/portal/Index";
import Content from "@/views/portal/Content";
import Error from "@/views/portal/Error";
import PersonalCenter from "@/views/portal/PersonalCenter";
import globalConsts from "@/assets/js/global/globalConsts";
import vuex from "@/store/index";

Vue.use(Router);

const router = new Router({
    mode: "hash",
    routes: [
        {
            path: "/",
            name: "login",
            component: Login
        },
        {
            path: "/Content",
            name: "Content",
            component: Content,
            redirect: "/Index",
            children: [
                {
                    path: "/Index",
                    name: "Index",
                    component: Index,
                    meta: {
                        pathText: "首页"
                    }
                },
                {
                    path: "/PersonalCenter",
                    name: "PersonalCenter",
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
    vuex.dispatch(
        globalConsts.vuex.action.initApplicationRouterPath,
        to.meta
    );
    if (requiresAuth) {
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

router.defaultErrorPage = {
    path: "/*",
    component: Error
};

export default router;
