import Vue from "vue";
import Router from "vue-router";
import { Modal } from 'iview';
import VueCookies from 'vue-cookies';
import Login from "@/components/portal/Login";
import Error from "@/components/portal/Error";
import Index from "@/components/portal/Index";
import UserCenter from "@/components/system/user/UserCenter";

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            name: "login",
            component: Login
        },
        {
            path: "/index",
            name: "index",
            component: Index,
            children: [
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
    console.log("beforeEach");
    // console.log(from);
    // console.log(to);
    // console.log(next);
    let requiresAuth = to.matched.some(item => item.meta.requiresAuth);
    debugger;
    let token = VueCookies.get("token");
    if (requiresAuth && !token) {
        Modal.warning({
            title: "提示框",
            content: "登录超时，请重新登录",
            onOk: () => {
                return next({ path: "/" });
            },
        });
    }
    next();
});

export default router