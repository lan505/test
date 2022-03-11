/*
 * @Description   
 * @Autor         lan505
 * @Version       1.0
 * @Date          2021-02-25 12:09:38
 * @LastEditTime  2022-03-11 16:41:49
 */
/**
 * 全局常量
 */
const consts = {
    /**
     * 系统常量
     */
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
        baseURL: process.env.BASE_URL + "/lan-admin",
        // baseURL: "http://123.56.98.190/lan-admin",
        // 图片服务器
        imagesServerUrl: "http://localhost:82/",
        // websocket地址
        websocketUrl: process.env.WEBSOCKET_URL + "/lan-admin/ws/",
        // 图片Base64格式前缀
        base64Prefix: "data:image/jpeg;base64,"
    },
    /**
     * 静态路由名称
     */
    staticRouterName: {
        login: "Login",
        index: "Index",
        content: "Content",
        personalCenter: "PersonalCenter",
    },
    /**
     * 菜单类型
     */
    menuType: {
        module: 0,
        menu: 1,
        button: 2
    },
    /**
     * 权限处理类型
     */
    permissionProcessType: {
        hide: "HIDE",
        show: "SHOW"
    },
    /**
     * 操作按钮处理类型
     */
    operateButtonProcessType: {
        add: "ADD",
        edit: "EDIT",
        detail: "DETAIL"
    },
    /**
     * 对话框打开处理类型
     */
    dialogOpenProcessType: {
        dialog: "DIALOG",
        page: "PAGE",
        drawer: "DRAWER"
    },
    /**
     * 字典类默认类型
     */
    dictIndexCode: {
        menuType: "menu_type",
        userUsageStatus: "user_usage_status",
        userSex: "sex",
        pageSizeMax: "page_size_max",
        boolean: "boolean"
    },
    /**
     * vuex常量
     */
    vuex: {
        action: {
            initApplicationRouterPath: "INIT_APPLICATION_DATA_ROUTER_PATH",
            initApplicationData: "INIT_APPLICATION_DATA",
            initApplicationMenu: "INIT_APPLICATION_MENU",
            initApplicationMenuOpenNamesValue:
                "INIT_APPLICATION_MENU_OPEN_NAMES_VALUE"
        }
    }
};
export default consts;
