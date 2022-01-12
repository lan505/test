/**
 * 请求系统接口的URL
 */

const actionUrl = {
    system: {
        // 系统用户
        user: {
            queryUserPage: "/user/queryUserPage",
            saveUser: "/user/saveUser",
            removeUser: "/user/removeUser",
            editUser: "/user/editUser",
            detailUser: "/user/detailUser",
            login: "/user/login",
            logout: "/user/logout",
            getLoginUserInfo: "/user/getLoginUserInfo",
            changeUserPassword: "/user/changeUserPassword",
            uploadUserAvatar: "/user/uploadUserAvatar",
            existsUserAccount: "/user/existsUserAccount",
            existsUserName: "/user/existsUserName",
            sex: "/user/sex",
        },
        // 系统角色
        role: {
            queryRolePage: "/role/queryRolePage",
            saveRole: "/role/saveRole",
            removeRole: "/role/removeRole",
            editRole: "/role/editRole",
            detailRole: "/role/detailRole",
            existsRoleCode: "/role/existsRoleCode",
            existsRoleName: "/role/existsRoleName",
            keyValue: "/role/keyValue",
            assignAuthority: "/role/assignAuthority",
            queryAuthority: "/role/queryAuthority",
        },

        // 系统菜单
        menu: {
            queryMenuPage: "/menu/queryMenuPage",
            saveMenu: "/menu/saveMenu",
            removeMenu: "/menu/removeMenu",
            editMenu: "/menu/editMenu",
            detailMenu: "/menu/detailMenu",
            keyValue: "/menu/keyValue",
            queryLeftMenu: "/menu/queryLeftMenu",
            queryTreeNode: "/menu/queryTreeNode",
            queryMenuChildren: "/menu/queryMenuChildren",
            queryMenuType: "/menu/queryMenuType",
            existsMenuName: "/menu/existsMenuName",
            existsMenuUrl: "/menu/existsMenuUrl",
            existsMenuRouter: "/menu/existsMenuRouter",
        },
        // 系统字典类别
        dictIndex: {
            queryDictIndexPage: "/dictIndex/queryDictIndexPage",
            saveDictIndex: "/dictIndex/saveDictIndex",
            removeDictIndex: "/dictIndex/removeDictIndex",
            editDictIndex: "/dictIndex/editDictIndex",
            detailDictIndex: "/dictIndex/detailDictIndex",
            existsDictIndexCode: "/dictIndex/existsDictIndexCode",
            existsDictIndexName: "/dictIndex/existsDictIndexName",
            listKeyValue: "/dictIndex/listKeyValue",
            listUserUsageStatus: "/dictIndex/listUserUsageStatus",
        },
        // 系统字典值
        dictItem: {
            queryDictItemPage: "/dictItem/queryDictItemPage",
            saveDictItem: "/dictItem/saveDictItem",
            removeDictItem: "/dictItem/removeDictItem",
            editDictItem: "/dictItem/editDictItem",
            detailDictItem: "/dictItem/detailDictItem",
            existsDictItemKey: "/dictItem/existsDictItemKey",
            existsDictItemValue: "/dictItem/existsDictItemValue",
            queryDictItemChildren: "/dictItem/queryDictItemChildren",
        }
    },
}

export default actionUrl