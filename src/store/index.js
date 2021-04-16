import Vue from 'vue'
import Vuex from 'vuex'
import { USER_INFO, INIT_USER_LOGIN_INFO, INIT_WEBSOCKET } from '@/assets/js/global/globalMutationType'
import globalConsts from '@/assets/js/global/globalConsts';
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
                data.userAvatar = data.userAvatar == null ? require("@/assets/images/avatar.jpg") : globalConsts.system.base64Prefix + data.userAvatar;
                sessionStorage.setItem(USER_INFO, JSON.stringify(data));
            }
            this.state.user.loginInfo = data;
            router.rebuild();
        },
        [INIT_WEBSOCKET](state, vueInstance) {
            if ("WebSocket" in window) {
                console.log('init websocket');
                let ws = new WebSocket(globalConsts.system.websocketUrl + state.user.loginInfo.userAccount);
                ws.onopen = function() {
                    console.log("ws connection successful");
                    ws.send(123);
                };
                ws.onmessage = function (evt) {
                    console.log(evt);
                    var json = JSON.parse(evt.data);
                    console.log(json.topic);
                    vueInstance.bus.$emit(json.topic, json);
                };
                ws.onclose = function () {
                    console.log("ws close");
                };
            } else {
                console.log("您的浏览器不支持WebSocket");
            }
        },
    }
})