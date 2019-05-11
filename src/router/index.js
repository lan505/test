import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";
import loadRouters from './loadRouter'
import { USER_INFO, USER_MENUS, RELOAD_ROUTER, CURRENT_ROUTER } from "../assets/js/global/globalMutationType";
import { Modal } from 'iview';
import VueCookies from 'vue-cookies';
import Login from "@/components/portal/Login";
import Error from "@/components/portal/Error";
import Index from "@/components/portal/Index";
import Content from "@/components/portal/Content";
import UserCenter from "@/components/system/user/UserCenter";

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
                    path: "/user/center",
                    name: "userCenter",
                    component: UserCenter
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
    let isLogin = sessionStorage.getItem(USER_INFO);
    if (requiresAuth && !isLogin) {
        Modal.warning({
            title: "提示框",
            content: "登录超时，请重新登录",
            onOk: () => {
                return next({ path: "/" });
            },
        });
    }
    if (store.state.isRefresh) {
        store.commit(RELOAD_ROUTER, { router: router });
        next(to.fullPath);
    }else{
        next();
    }
});

export default router