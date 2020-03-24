/**
 * 请求系统接口的URL
 */

const actionUrl = {
    //系统用户
    user: {
        list: "/user/list",
        save: "/user/save",
        remove: "/user/remove",
        edit: "/user/edit",
        detail: "/user/detail",
        login: "/user/login",
        getLoginUserInfo: "/user/getLoginUserInfo",
        uniqueAccount: "/user/uniqueAccount",
    },

    //系统角色
    role: {
        list: "/role/list",
        save: "/role/save",
        remove: "/role/remove",
        edit: "/role/edit",
        detail: "/role/detail",
        listKeyValue: "/role/listKeyValue",
        assignAuthority: "/role/assignAuthority",
    },

    //系统菜单
    menu: {
        list: "/menu/list",
        save: "/menu/save",
        remove: "/menu/remove",
        edit: "/menu/edit",
        detail: "/menu/detail",
        getById: "/menu/getById",
        listLeftMenu: "/menu/listLeftMenu",
        listByPid: "/menu/listByPid",
    },

    //系统字典类别
    dictIndex: {
        list: "/dictIndex/list",
        save: "/dictIndex/save",
        remove: "/dictIndex/remove",
        edit: "/dictIndex/edit",
        detail: "/dictIndex/detail",
        //根据字典编号获取
        listKeyValue: "/dictIndex/listKeyValue",
        listSex: "/dictIndex/listSex",
        listMenuType: "/dictIndex/listMenuType",
        listUserUsageStatus: "/dictIndex/listUserUsageStatus",
    },

    //系统字典值
    dictItem: {
        list: "/dictItem/list",
        save: "/dictItem/save",
        remove: "/dictItem/remove",
        edit: "/dictItem/edit",
        detail: "/dictItem/detail",
    }

}

export default actionUrl