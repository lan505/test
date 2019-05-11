/**
 * 请求系统接口的URL
 */

const actionUrl = {
    //系统用户
    userLogin: "user/login",
    userList: "user/list",
    userSave: "user/save",
    userRemove: "user/remove",
    userEdit: "user/edit",
    userDetail: "user/detail",
    userGetById: "user/getById",
    userUniqueAccount: "user/uniqueAccount",

    //系统角色
    roleList: "role/list",
    roleSave: "role/save",
    roleRemove: "role/remove",
    roleEdit: "role/edit",
    roleDetail: "role/detail",
    roleGetById: "role/getById",
    roleListKeyValue: "role/listKeyValue",

    //系统菜单
    menuList: "menu/list",
    menuSave: "menu/save",
    menuRemove: "menu/remove",
    menuEdit: "menu/edit",
    menuDetail: "menu/detail",
    menuGetById: "menu/getById",
    menuListUserMenu: "menu/listUserMenu",

    //系统字典类别
    dictTypeList: "dictType/list",
    dictTypeSave: "dictType/save",
    dictTypeRemove: "dictType/remove",
    dictTypeEdit: "dictType/edit",
    dictTypeDetail: "dictType/detail",
    dictTypeGetById: "dictType/getById",

    //系统字典值
    dictItemList: "dictItem/list",
    dictItemSave: "dictItem/save",
    dictItemRemove: "dictItem/remove",
    dictItemEdit: "dictItem/edit",
    dictItemDetail: "dictItem/detail",
    dictItemGetById: "dictItem/getById",
    dictItemListKeyValue: "dictItem/listKeyValue",

}

export default actionUrl