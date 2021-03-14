import Vue from 'vue'
import Vuex from 'vuex'
import { USER_INFO, INIT_USER_LOGIN_INFO, INIT_WEBSOCKET } from '../assets/js/global/globalMutationType'
import globalConsts from '../assets/js/global/globalConsts';
import router from '../router/index';

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
        [INIT_USER_LOGIN_INFO](state, data) {
            var loginInfo = JSON.parse(sessionStorage.getItem(USER_INFO));;
            if(data == null) {
                data = loginInfo;
            }else{
                data.userAvatar = data.userAvatar == null ? require("../assets/images/avatar.jpg") : globalConsts.system.base64Prefix + data.userAvatar;
                sessionStorage.setItem(USER_INFO, JSON.stringify(data));
            }
            this.state.user.loginInfo = data;
            router.rebuild();
        },
        [INIT_WEBSOCKET](state, data) {
            if ("WebSocket" in window) {
                var ws = new WebSocket(globalConsts.system.websocketUrl + data.userAccount);
                ws.onopen = function() {
                    ws.send("发送数据");
                };
                ws.onmessage = function (evt) {
                    var received_msg = evt.data;
                    console.log("数据已接收...");
                    console.log(evt);
                };
                ws.onclose = function () {
                    // 关闭 websocket
                    console.log("连接已关闭...");
                };
            } else {
                console.log("您的浏览器不支持WebSocket");
            }
        },
    }
})