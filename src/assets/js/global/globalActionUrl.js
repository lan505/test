/*
 * @Description   
 * @Autor         lan505
 * @Version       1.0
 * @Date          2021-02-25 12:09:38
 * @LastEditTime  2022-02-17 18:08:55
 */
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
            queryLoginUserInfo: "/user/queryLoginUserInfo",
            changeUserPassword: "/user/changeUserPassword",
            uploadUserAvatar: "/user/uploadUserAvatar",
            existsUserAccount: "/user/existsUserAccount",
            existsUserName: "/user/existsUserName"
        },
        // 系统角色
        role: {
            queryRolePage: "/role/queryRolePage",
            saveRole: "/role/saveRole",
            removeRole: "/role/removeRole",
            editRole: "/role/editRole",
            detailRole: "/role/detailRole",
            queryRoleAll: "/role/queryRoleAll",
            existsRoleCode: "/role/existsRoleCode",
            existsRoleName: "/role/existsRoleName",
            assignAuthority: "/role/assignAuthority",
            queryAuthority: "/role/queryAuthority"
        },

        // 系统菜单
        menu: {
            queryMenuPage: "/menu/queryMenuPage",
            saveMenu: "/menu/saveMenu",
            removeMenu: "/menu/removeMenu",
            editMenu: "/menu/editMenu",
            detailMenu: "/menu/detailMenu",
            queryMenuTreeNode: "/menu/queryMenuTreeNode",
            queryMenuChildren: "/menu/queryMenuChildren",
            existsMenuName: "/menu/existsMenuName",
            existsMenuUrl: "/menu/existsMenuUrl",
            existsMenuRouter: "/menu/existsMenuRouter"
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
            listUserUsageStatus: "/dictIndex/listUserUsageStatus"
        },
        // 系统字典值
        dictItem: {
            queryDictItemPage: "/dictItem/queryDictItemPage",
            saveDictItem: "/dictItem/saveDictItem",
            removeDictItem: "/dictItem/removeDictItem",
            editDictItem: "/dictItem/editDictItem",
            detailDictItem: "/dictItem/detailDictItem",
            queryDictItemAll: "/dictItem/queryDictItemAll",
            existsDictItemKey: "/dictItem/existsDictItemKey",
            existsDictItemValue: "/dictItem/existsDictItemValue",
            queryDictItemChildren: "/dictItem/queryDictItemChildren"
        },
        // 系统部门
        depart: {
            queryDepartPage: "/depart/queryDepartPage",
            saveDepart: "/depart/saveDepart",
            removeDepart: "/depart/removeDepart",
            editDepart: "/depart/editDepart",
            detailDepart: "/depart/detailDepart",
            existsDepartCode: "/depart/existsDepartCode",
            existsDepartName: "/depart/existsDepartName",
            queryDepartChildren: "/depart/queryDepartChildren"
        }
    }
};

export default actionUrl;
