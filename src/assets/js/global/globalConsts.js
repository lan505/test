/**
 * 全局常量
 */
const consts = {
    // 系统常量
    system: {
        title: "基础后台管理系统",
        // 后端token超时时间（y、m、d、h、min、s：年月日时分秒)
        cookieExpire: "2h",
        // 后端token无效代码
        tokenExpireCode: "20000",
        // 登录超时
        loginExpireCode: "A0100",
        // 登录超时
        successCode: "00000",
        // axios 请求超时（毫秒）
        timeout: 30000,
        // axios 请求地址
        baseURL: process.env.BASE_URL + '/lan-admin',
        // baseURL: "http://123.56.98.190/lan-admin",
        // 图片服务器
        imagesServerUrl: "http://localhost:82/",
        // websocket地址
        websocketUrl: process.env.WEBSOCKET_URL + "/lan-admin/ws/",
        // 图片Base64格式前缀
        base64Prefix: "data:image/jpeg;base64,",
    },
    // 系统字典分类编号
    dictIndexCode: {
        menuType: "menu_type",
        userUsageStatus: "user_usage_status",
        sex: "sex",
        pageSizeMax: "page_size_max",
    }
}
export default consts