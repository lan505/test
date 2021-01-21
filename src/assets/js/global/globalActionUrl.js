/**
 * 请求系统接口的URL
 */

const actionUrl = {
    system: {
        // 系统用户
        user: {
            page: "/user/page",
            save: "/user/save",
            remove: "/user/remove",
            edit: "/user/edit",
            detail: "/user/detail",
            login: "/user/login",
            logout: "/user/logout",
            getLoginUserInfo: "/user/getLoginUserInfo",
            editPassword: "/user/editPassword",
            uploadAvatar: "/user/uploadAvatar",
            existsUserAccount: "/user/existsUserAccount",
            existsUserName: "/user/existsUserName",
            sex: "/user/sex",
        },

        // 系统角色
        role: {
            page: "/role/page",
            save: "/role/save",
            remove: "/role/remove",
            edit: "/role/edit",
            detail: "/role/detail",
            existsRoleCode: "/role/existsRoleCode",
            existsRoleName: "/role/existsRoleName",
            keyValue: "/role/keyValue",
            assignAuthority: "/role/assignAuthority",
        },

        // 系统菜单
        menu: {
            page: "/menu/page",
            save: "/menu/save",
            remove: "/menu/remove",
            edit: "/menu/edit",
            detail: "/menu/detail",
            getById: "/menu/getById",
            keyValue: "/menu/keyValue",
            listLeftMenu: "/menu/listLeftMenu",
            listTreeNode: "/menu/listTreeNode",
            listMenuType: "/menu/listMenuType",
            existsMenuName: "/menu/existsMenuName",
            existsMenuUrl: "/menu/existsMenuUrl",
            existsMenuRouter: "/menu/existsMenuRouter",
        },
        // 系统字典类别
        dictIndex: {
            page: "/dictIndex/page",
            save: "/dictIndex/save",
            remove: "/dictIndex/remove",
            edit: "/dictIndex/edit",
            detail: "/dictIndex/detail",
            existsDictIndexCode: "/dictIndex/existsDictIndexCode",
            existsDictIndexName: "/dictIndex/existsDictIndexName",
            listKeyValue: "/dictIndex/listKeyValue",
            listUserUsageStatus: "/dictIndex/listUserUsageStatus",
        },
        // 系统字典值
        dictItem: {
            page: "/dictItem/page",
            save: "/dictItem/save",
            remove: "/dictItem/remove",
            edit: "/dictItem/edit",
            detail: "/dictItem/detail",
            existsDictItemKey: "/dictItem/existsDictItemKey",
            existsDictItemValue: "/dictItem/existsDictItemValue",
            listChildren: "/dictItem/listChildren",
            listDictIndexCode: "/dictItem/listDictIndexCode",
        }
    },
    base: {
        // 规则管理
        ruleBase: {
            page: "/ruleBase/page",
            save: "/ruleBase/save",
            remove: "/ruleBase/remove",
            edit: "/ruleBase/edit",
            detail: "/ruleBase/detail",
            existsRuleBaseName: "/ruleBase/existsRuleBaseName",
            updateEnableStatus: "/ruleBase/updateEnableStatus",
            level: "/ruleBase/level",
        },
        // 任务管理
        taskBase: {
            page: "/taskBase/page",
            save: "/taskBase/save",
            detail: "/taskBase/detail",
            existsTaskBaseName: "/taskBase/existsTaskBaseName",
            downloadTemplate: "/taskBase/downloadTemplate",
        },

    },
}

export default actionUrl