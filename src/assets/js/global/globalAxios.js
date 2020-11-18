import axios from 'axios'
import { Message, Modal } from 'iview';
import router from "../../../router/index";
import globalConsts from './globalConsts';
axios.defaults.timeout = globalConsts.system.timeout;
axios.defaults.baseURL = globalConsts.system.baseURL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
    console.log(process.env.BASE_URL);
    return config;
}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(res => {
    if (res.data.code > 0) {
        if(123456789 === res.data.code){
            Modal.info({
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
    Message.error("网络错误");
    return Promise.reject(error);
})

export default axios