import Vue from 'vue'
import Vuex from 'vuex'
import { USER_INFO, INIT_USER_LOGIN_INFO } from '../assets/js/global/globalMutationType'
import globalConsts from '../assets/js/global/globalConsts';
import router from '../router/index';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            loginInfo: null,
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
        }
    }
})