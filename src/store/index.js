import Vue from 'vue'
import Vuex from 'vuex'
import loadRouter from '@/router/loadRouter'
import { USER_INFO, INIT_USER_LOGIN_INFO, INIT_ROUTER, INIT_WEBSOCKET } from '@/assets/js/global/globalMutationType'
import globalConsts from '@/assets/js/global/globalConsts'
import router from '@/router/index';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            loginInfo: null,
        },
        task: {
            taskBaseId: null,
            percents: 0,
        }
    },
    mutations: {
        /**
         * 初始化用户登录信息
         * @param {*} state 
         * @param {*} data 
         */
        [INIT_USER_LOGIN_INFO](state, data) {
            console.log("初始化用户信息");
            var loginInfo = JSON.parse(sessionStorage.getItem(USER_INFO));;
            if (data == null) {
                data = loginInfo;
            } else {
                data.userAvatar = data.userAvatar == null ? require("@/assets/images/avatar.jpg") : data.userAvatar;
                sessionStorage.setItem(USER_INFO, JSON.stringify(data));
            }
            this.state.user.loginInfo = data;
            // router.rebuild();
        },
        /**
         * 初始化路由
         * @param {*} state 
         * @returns 
         */
        [INIT_ROUTER](stat, data) {
            console.log("初始化路由");
            let sessionUserInfo = JSON.parse(sessionStorage.getItem(USER_INFO));
            let leftMenus = null;
            if (data == null) {
                leftMenus = sessionUserInfo == null ? null : sessionUserInfo.lsUserMenu;
            } else {
                leftMenus = data.lsUserMenu;
            }
            if (leftMenus == null) {
                return;
            }
            let lastRouter = router.options.routes[
                router.options.routes.length - 1
            ];
            leftMenus = loadRouter.build(leftMenus);
            leftMenus.push({
                path: "*",
                component: Error
            });
            lastRouter.children.push(...leftMenus);
            console.log(lastRouter);
            router.addRoutes(router.options.routes);
        },
        /**
         * 初始化websocket
         * @param {*} state 
         * @param {*} vueInstance 
         */
        [INIT_WEBSOCKET](state, vueInstance) {
            if ("WebSocket" in window) {
                console.log('init websocket');
                // let ws = new WebSocket(globalConsts.system.websocketUrl + state.user.loginInfo.userAccount);
                // ws.onopen = function() {
                //     console.log("ws connection successful");
                //     ws.send(123);
                // };
                // ws.onmessage = function (evt) {
                //     console.log(evt);
                //     var json = JSON.parse(evt.data);
                //     console.log(json.topic);
                //     vueInstance.bus.$emit(json.topic, json);
                // };
                // ws.onclose = function () {
                //     console.log("ws close");
                // };
            } else {
                console.log("您的浏览器不支持WebSocket");
            }
        }
    },
    actions: {
        [globalConsts.vuexAction.initApplicationData] (context) {
            context.commit('INIT_USER_LOGIN_INFO');
            context.commit('INIT_ROUTER');
        }
    }
})