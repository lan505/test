/**
 * 请求系统接口的URL
 */

const actionUrl = {
    //系统用户
    loginCheck: "user/login",
    userList: "user/list",
    userSave: "user/save",
    userRemove: "user/remove",
    userEdit: "user/edit",
    userDetail: "user/detail",
    userGetUserById: "user/getUserById",
    userUniqueAccount: "user/uniqueAccount",

    //系统角色
    roleList: "role/list",
    roleSave: "role/save",
    roleRemove: "role/remove",
    roleEdit: "role/edit",

    //系统菜单
    menuList: "menu/list",
    menuSave: "menu/save",
    menuRemove: "menu/remove",
    menuEdit: "menu/edit",
    menuListUserMenu: "menu/listUserMenu",

    //系统字典类别
    dictTypeList: "dictType/list",
    dictTypeSave: "dictType/save",
    dictTypeRemove: "dictType/remove",
    dictTypeEdit: "dictType/edit",

    //系统字典值
    dictItemList: "dictItem/list",
    dictItemSave: "dictItem/save",
    dictItemRemove: "dictItem/remove",
    dictItemEdit: "dictItem/edit",
    dictItemListKeyValue: "dictItem/listKeyValue",

}

export default actionUrl