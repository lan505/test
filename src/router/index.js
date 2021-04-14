import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";
import loadRouter from './loadRouter'
import { USER_INFO } from "../assets/js/global/globalMutationType";
import { Modal } from 'view-design';
import Login from "@/components/portal/Login";
import Error from "@/components/portal/Error";
import Index from "@/components/portal/Index";
import Content from "@/components/portal/Content";
import PersonalCenter from "@/components/portal/PersonalCenter";

Vue.use(Router);

const router = new Router({
    mode: 'hash',
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
                },
                {
                    path: "/personalCenter",
                    name: "personalCenter",
                    component: PersonalCenter
                }
            ]
        },
        // {
        //     path: "*",
        //     component: Error
        // },
    ]
});

router.beforeEach((to, from, next) => {
    let requiresAuth = to.matched.some(item => item.meta.requiresAuth);
    let userInfo = sessionStorage.getItem(USER_INFO);
    if (requiresAuth && !userInfo) {
        Modal.warning({
            title: "提示框",
            content: "登录超时，请重新登录",
            onOk: () => {
                return next({ path: "/" });
            },
        });
    }
    console.log("router beforeEach");
    next();
});

router.rebuild = (data) => {
    let sessionUserInfo = JSON.parse(sessionStorage.getItem(USER_INFO));
    let leftMenus = null;
    // 如果不为空则是登录后进入，否则为路由重新加载
    if (data == null) {
        leftMenus = sessionUserInfo == null ? null : sessionUserInfo.lsLeftMenu;
    } else {
        leftMenus = data.lsLeftMenu;
    }
    if (leftMenus == null) {
        return;
    }
    let lastRouter = router.options.routes[
        router.options.routes.length - 1
    ];
    leftMenus = loadRouter.build(leftMenus);
    lastRouter.children.push(...leftMenus);
    router.addRoutes(router.options.routes);
}

export default router