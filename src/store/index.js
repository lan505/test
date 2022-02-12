import Vue from "vue";
import Vuex from "vuex";
import loadRouter from "@/router/loadRouter";
import {
    USER_INFO,
    INIT_USER_LOGIN_INFO,
    INIT_WEBSOCKET,
    INIT_ROUTER,
    INIT_MENU,
    SET_SESSION_STORAGE_MENU_OPEN_NAMES,
    SET_MENU_OPEN_NAMES
} from "@/assets/js/global/globalMutationType";
import globalConsts from "@/assets/js/global/globalConsts";
import router from "@/router/index";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            loginInfo: null
        },
        menuInfo: {
            // 激活的菜单
            activeName: 0,
            // 展开的菜单
            openNames: [],
            // 菜单集合
            menus: []
        },
        sessionStorage: {
            openNames: "openNames"
        },
        currentRouter: []
    },
    mutations: {
        /**
         * 初始化用户登录信息
         * @param {*} state
         * @param {*} data
         */
        [INIT_USER_LOGIN_INFO](state, data) {
            console.log("mutation：初始化用户信息");
            var loginInfo = JSON.parse(sessionStorage.getItem(USER_INFO));
            if (data == null) {
                data = loginInfo;
            } else {
                data.userAvatar =
                    data.userAvatar == null
                        ? require("@/assets/images/avatar.jpg")
                        : data.userAvatar;
                sessionStorage.setItem(USER_INFO, JSON.stringify(data));
            }
            this.state.user.loginInfo = data;
        },
        /**
         * 初始化路由
         * @param {*} state
         * @returns
         */
        [INIT_ROUTER](state, data) {
            console.log("mutation：初始化路由");
            let sessionUserInfo = JSON.parse(sessionStorage.getItem(USER_INFO));
            let leftMenus = null;
            if (data == null) {
                leftMenus =
                    sessionUserInfo == null ? null : sessionUserInfo.lsUserMenu;
            } else {
                leftMenus = data.lsUserMenu;
            }
            if (leftMenus == null) {
                return;
            }
            let lastRouter =
                router.options.routes[router.options.routes.length - 1];
            leftMenus = loadRouter.build(leftMenus);
            leftMenus.push({
                path: "*",
                component: Error
            });
            lastRouter.children.push(...leftMenus);
            router.addRoutes(router.options.routes);
            console.log(state);
        },
        /**
         * 初始化菜单
         * @param {*} state
         * @param {*} data
         */
        [INIT_MENU](state, data) {
            console.log("mutation：初始化菜单");
            state.menuInfo.menus = data.lsUserMenu;
            var childMenu = data.lsUserMenu[0].children;
            if (childMenu != null && childMenu.length > 0) {
                state.menuInfo.activeName = childMenu[0].menuUrl;
            }
        },
        /**
         * 设置展开菜单的数组到sessionStorage
         * @param {*} state
         */
        [SET_SESSION_STORAGE_MENU_OPEN_NAMES](state) {
            console.log("mutation：设置展开菜单数据到sessionStorage");
            sessionStorage.setItem(
                state.sessionStorage.openNames,
                state.menuInfo.openNames
            );
        },
        /**
         * 设置展开菜单的数组，每次设置都清空上次的记录
         * @param {*} state
         * @param {*} data
         */
        [SET_MENU_OPEN_NAMES](state, data) {
            console.log("mutation：设置展开菜单数据");
            if (
                data != null &&
                data.length > 0 &&
                state.menuInfo.openNames[0] != data[0]
            ) {
                state.menuInfo.openNames.push(data[0]);
            } else {
                state.menuInfo.openNames = [];
            }
            // if (
            //     state.menuInfo.openNames.length > 0 ||
            //     state.menuInfo.openNames[0] == data[0]
            // ) {
            //     state.menuInfo.openNames = [];
            // } else {
            //     state.menuInfo.openNames.push(data);
            // }
        },
        /**
         * 初始化websocket
         * @param {*} state
         * @param {*} vueInstance
         */
        [INIT_WEBSOCKET](state, vueInstance) {
            if ("WebSocket" in window) {
                console.log("mutation：初始化websocket");
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
        /**
         * 初始化应用数据
         * @param {*} context
         */
        [globalConsts.vuex.action.initApplicationData](context, data) {
            console.log("action：初始化应用数据action");
            context.commit(INIT_USER_LOGIN_INFO, data);
            context.commit(INIT_ROUTER, data);
            context.commit(INIT_MENU, data);
        },
        /**
         * 初始化应用菜单
         * @param {*} context
         * @param {*} data
         */
        [globalConsts.vuex.action.initApplicationMenu](context, data) {
            console.log("action：初始化应用菜单");
            context.commit(INIT_MENU, data);
            // context.commit(SET_MENU_OPEN_NAMES, data.lsUserMenu[0].menuUrl);
        },
        /**
         * 初始化应用菜单展开值
         */
        [globalConsts.vuex.action.initApplicationMenuOpenNamesValue](context) {
            console.log("action：重置展开菜单的数组");
            var openNames = sessionStorage.getItem(
                context.state.sessionStorage.openNames
            );
            context.commit(SET_MENU_OPEN_NAMES, [openNames]);
        }
    },
    getters: {}
});
