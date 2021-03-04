/**
 * 全局常量
 */
const consts = {
    system: {
        title: "欺诈识别大数据平台",
        // 后端token超时时间（y、m、d、h、min、s：年月日时分秒)
        cookieExpire: "2h",
        // 后端token无效代码
        tokenExpireCode: "20000",
        // 登录超时
        loginExpireCode: "10000",
        // axios 请求超时（毫秒）
        timeout: 30000,
        // axios 请求地址
        baseURL: process.env.BASE_URL + '/lan-malicious',//"http://localhost:9090/lan-malicious",  process.env.BASE_URL + 
        // baseURL: "http://123.56.98.190/lan-malicious",
        // 图片服务器
        imagesServerUrl: "http://localhost:82/",
        // 图片Base64格式前缀
        base64Prefix: "data:image/jpeg;base64,",
    }
}

export default consts