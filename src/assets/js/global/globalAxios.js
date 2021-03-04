import axios from 'axios'
import { Message, Modal } from 'view-design';
import router from "../../../router/index";
import globalConsts from './globalConsts';
axios.defaults.timeout = globalConsts.system.timeout;
axios.defaults.baseURL = globalConsts.system.baseURL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
    console.log("打印请求：" + globalConsts.system.baseURL);
    return config;
}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(res => {
    console.log(res);
    if (res.data.code != "00000") {
        if("A0100" === res.data.code){
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
    }else{
        if(res.config.responseType == "blob" && res.config.method == "get"){
            const blob = new Blob([res.data], {
                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
            });
            const downloadElement = document.createElement("a");
            const href = window.URL.createObjectURL(blob);
            let contentDisposition = res.headers["content-disposition"];
            let patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
            let result = patt.exec(contentDisposition);
            let filename = decodeURI(result[1]);
            downloadElement.style.display = "none";
            downloadElement.href = href;
            downloadElement.download = filename;
            document.body.appendChild(downloadElement);
            downloadElement.click();
            document.body.removeChild(downloadElement);
            window.URL.revokeObjectURL(href);
        }
        return res.data.data; 
    }
}, error => {
    Message.error("网络错误");
    return Promise.reject(error);
})

export default axios