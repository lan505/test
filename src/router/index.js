import Vue from "vue";
import Router from "vue-router";
import { Modal } from "view-design";
import Login from "@/components/portal/Login";
import Index from "@/components/portal/Index";
import Content from "@/components/portal/Content";
import Error from "@/components/portal/Error";
import PersonalCenter from "@/components/portal/PersonalCenter";
import globalConsts from "@/assets/js/global/globalConsts";
import vuexIndex from "@/store/index";

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
            path: "/content",
            name: "content",
            component: Content,
            redirect: "/index",
            children: [
                {
                    path: "/index",
                    name: "index",
                    component: Index,
                    meta: {
                        pathText: "首页"
                    }
                },
                {
                    path: "/personalCenter",
                    name: "personalCenter",
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
    let userInfo = vuexIndex.state.user.loginInfo; //sessionStorage.getItem(USER_INFO);
    if (requiresAuth) {
        // vuexIndex.dispatch(
        //     globalConsts.vuex.action.initApplicationRouterPath,
        //     to.meta
        // );
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
