import Vue from 'vue'
import Vuex from 'vuex'
import { USER_INFO, USER_MENUS, RELOAD_ROUTER, CURRENT_ROUTER } from '../assets/js/global/globalMutationType'
import loadRouters from '../router/loadRouter'
import loadRouter from '../router/loadRouter';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isRefresh: true,
    },
    mutations: {
        [USER_INFO](state, data) {
            sessionStorage.setItem(USER_INFO, JSON.stringify(data));
        },
        [USER_MENUS](state, data) {
            sessionStorage.setItem(USER_MENUS, JSON.stringify(data.menus));
            this.commit(RELOAD_ROUTER, data);
        },
        [RELOAD_ROUTER](state, data) {
            state.isRefresh = false;
            if(data.menus == null){
                data.menus = JSON.parse(sessionStorage.getItem(USER_MENUS));
            }
            if(data != null && data.menus != null && data.router != null){
                let menus = data.menus == null ? JSON.parse(sessionStorage.getItem(USER_MENUS)) : data.menus;
                let lastRouter = data.router.options.routes[
                    data.router.options.routes.length - 1
                ];
                console.log("删除前");
                console.log(data.router);
                // 删除存在的路由
                if(lastRouter.children.length > 2){
                    lastRouter.children.splice(2, lastRouter.children.length - 2);
                }
                console.log("删除后");
                console.log(data.router);
                menus = loadRouter.build(menus);
                lastRouter.children.push(...menus);
                data.router.addRoutes(data.router.options.routes);
            }
            console.log("加载后");
            console.log(data.router);
        }
    }
})