import axios from 'axios'
import qs from 'qs'
import { Message, Modal } from 'iview';
import VueCookies from 'vue-cookies';
import router from "../../../router/index";
import globalConstant from './globalConstant';

axios.defaults.timeout = globalConstant.timeout;
axios.defaults.baseURL = globalConstant.baseURL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(config => {
    config.headers.Authorization = VueCookies.get("token");
    if(config.method == "get"){
        config.paramsSerializer = () => {
            return qs.stringify(config.params, { 
                indices: false,
                skipNulls: true 
            });
        }
    }
    return config;
}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(res => {
    if (res.data.code != 0) {
        if(globalConstant.tokenExpire == res.data.code){
            Modal.warning({
                title: "提示框",
                content: "登录超时，请重新登录",
                onOk: () => {
                    router.replace({path: "/"});
                },
            });
        }else{
            Message.error(res.data.msg);
            return Promise.reject(res.data.msg);
        }
    }
    return res.data.data; 
}, error => {
    Message.error("请求失败");
    return Promise.reject(error);
})

export default axios