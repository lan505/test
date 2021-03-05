import axios from 'axios'
import { Message, Modal } from 'view-design';
import router from "../../../router/index";
import globalConsts from './globalConsts';
axios.defaults.timeout = globalConsts.system.timeout;
axios.defaults.baseURL = globalConsts.system.baseURL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(res => {
    // 如果是文件对象则构造a标签下载
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
        return res.data.data;
    }
    
    // 成功
    if(globalConsts.system.successCode === res.data.code){
        return res.data.data;
    }
    //如果是超时的失败则弹出重新登录，否则弹出提示信息
    if(globalConsts.system.loginExpireCode === res.data.code){
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
    
}, error => {
    Message.error("网络错误");
    return Promise.reject(error);
})

export default axios