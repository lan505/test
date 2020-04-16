/**
 * 全局常量
 */
const consts = {
    system: {
        title: "后台管理系统",
        // 后端token超时时间（y、m、d、h、min、s：年月日时分秒)
        cookieExpire: "2h",
        // 后端token无效代码
        tokenExpireCode: "20000",
        // 登录超时
        loginExpireCode: "10000",
        // axios 请求超时（毫秒）
        timeout: 30000,
        // axios 请求地址
        baseURL: "http://123.56.98.190/lan-admin",
        // 图片服务器
        imagesServerUrl: "http://localhost:82/",
    }
}

export default consts