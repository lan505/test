/**
 * 请求系统接口的URL
 */

const actionUrl = {
    //系统用户
    user: {
        list: "user/list",
        save: "user/save",
        remove: "user/remove",
        edit: "user/edit",
        detail: "user/detail",
        login: "user/login",
        getUserInfo: "user/getUserInfo",
        uniqueAccount: "user/uniqueAccount",
    },
    // userLogin: "user/login",
    // userList: "user/list",
    // userSave: "user/save",
    // userRemove: "user/remove",
    // userEdit: "user/edit",
    // userDetail: "user/detail",
    // userUniqueAccount: "user/uniqueAccount",

    //系统角色
    role: {
        list: "role/list",
        save: "role/save",
        remove: "role/remove",
        edit: "role/edit",
        detail: "role/detail",
        listKeyValue: "role/listKeyValue",
    },

    //系统菜单
    menu: {
        list: "menu/list",
        save: "menu/save",
        remove: "menu/remove",
        edit: "menu/edit",
        detail: "menu/detail",
        getById: "menu/getById",
        listLeftMenu: "menu/listLeftMenu",
        listByPid: "menu/listByPid",
    },

    //系统字典类别
    dictIndex: {
        list: "dictIndex/list",
        save: "dictIndex/save",
        remove: "dictIndex/remove",
        edit: "dictIndex/edit",
        detail: "dictIndex/detail",
        listKeyValue: "dictIndex/listKeyValue",
    },

    //系统字典值
    dictItem: {
        list: "dictItem/list",
        save: "dictItem/save",
        remove: "dictItem/remove",
        edit: "dictItem/edit",
        detail: "dictItem/detail",
        //根据字典编号获取
        listBySex: "dictItem/listBySex",
        listByMenuType: "dictItem/listByMenuType",
        listByUsageStatus: "dictItem/listByUsageStatus",
    }

}

export default actionUrl