import axios from '../global/globalAxios'
import actionUrl from '../global/globalActionUrl'
import qs from 'qs'

const GET = "get";
const POST = "post";

// =====================================  用户API开始  =====================================

/**
 * 用户登录
 * @param {*} params 
 */
export function login(params) {
    return axios({
        url: actionUrl.system.user.login,
        method: POST,
        data: qs.stringify(params),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

/**
 * 用户退出
 */
export function logout() {
    return axios({
        url: actionUrl.system.user.logout,
        method: POST,
    })
}

/**
 * 用户登录信息获取
 */
export function userInfo() {
    return axios({
        url: actionUrl.system.user.getLoginUserInfo,
        method: GET,
    })
}

/**
 * 用户新增
 * @param {*} params 
 */
export function userNew(params) {
    return axios({
        url: actionUrl.system.user.save,
        method: POST,
        data: params,
    })
}

/**
 * 用户删除
 * @param {*} params 
 */
export function userRemove(params) {
    return axios({
        url: actionUrl.system.user.remove,
        method: POST,
        data: params,
    })
}

/**
 * 用户修改
 * @param {*} params 
 */
export function userEdit(params) {
    return axios({
        url: actionUrl.system.user.edit,
        method: POST,
        data: params,
    })
}

/**
 * 用户分页列表
 * @param {*} params 
 */
export function userList(params) {
    return axios({
        url: actionUrl.system.user.page,
        method: POST,
        data: params,
    })
}

/**
 * 用户详情
 * @param {*} params 
 */
export function userDetail(params) {
    return axios({
        url: actionUrl.system.user.detail,
        method: GET,
        params: params,
    })
}

/**
 * 用户头像上传
 * @param {*} params 
 */
export function userAvatarUpload(params) {
    return axios({
        url: actionUrl.system.user.uploadAvatar,
        method: POST,
        data: params,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

/**
 * 用户性别获取
 * @param {*} params 
 */
export function userSex() {
    return axios({
        url: actionUrl.system.user.sex,
        method: GET,
    })
}

/**
 * 用户密码修改
 * @param {*} params 
 */
export function userPasswordEdit(params) {
    return axios({
        url: actionUrl.system.user.editPassword,
        method: POST,
        data: params,
    })
}

/**
 * 用户账号检测是否存在
 * @param {*} params 
 */
export function existsUserAccount(params) {
    return axios({
        url: actionUrl.system.user.existsUserAccount,
        method: GET,
        params: params,
    })
}

/**
 * 用户名称检测是否存在
 * @param {*} params 
 */
export function existsUserName(params) {
    return axios({
        url: actionUrl.system.user.existsUserName,
        method: GET,
        params: params,
    })
}

// =====================================  用户API结束  =====================================




// =====================================  角色API开始  =====================================
/**
 * 角色新增
 * @param {*} params 
 */
export function roleNew(params) {
    return axios({
        url: actionUrl.system.role.save,
        method: POST,
        data: params,
    })
}

/**
 * 角色删除
 * @param {*} params 
 */
export function roleRemove(params) {
    return axios({
        url: actionUrl.system.role.remove,
        method: POST,
        data: params,
    })
}

/**
 * 角色修改
 * @param {*} params 
 */
export function roleEdit(params) {
    return axios({
        url: actionUrl.system.role.edit,
        method: GET,
        params: params,
    })
}

/**
 * 角色分页列表
 * @param {*} params 
 */
export function roleList(params) {
    return axios({
        url: actionUrl.system.role.page,
        method: POST,
        data: params,
    })
}

/**
 * 角色详情
 * @param {*} params 
 */
export function roleDetail(params) {
    return axios({
        url: actionUrl.system.role.detail,
        method: GET,
        params: params,
    })
}

/**
 * 角色编号检测是否存在
 * @param {*} params 
 */
export function existsRoleCode(params) {
    return axios({
        url: actionUrl.system.role.existsRoleCode,
        method: GET,
        params: params,
    })
}

/**
 * 角色名称检测是否存在
 * @param {*} params 
 */
export function existsRoleName(params) {
    return axios({
        url: actionUrl.system.role.existsRoleName,
        method: GET,
        params: params,
    })
}

/**
 * 角色键值对
 * @param {*} params 
 */
export function roleKeyValue(params) {
    return axios({
        url: actionUrl.system.role.keyValue,
        method: GET,
        params: params,
    })
}

/**
 * 角色权限分配
 * @param {*} params 
 */
export function roleAssignAuthority(params) {
    return axios({
        url: actionUrl.system.role.assignAuthority,
        method: GET,
        params: params,
    })
}

// =====================================  角色API结束  =====================================




// =====================================  菜单API开始  =====================================
/**
 * 菜单新增
 * @param {*} params 
 */
export function menuNew(params) {
    return axios({
        url: actionUrl.system.menu.save,
        method: POST,
        data: params,
    })
}

/**
 * 菜单删除
 * @param {*} params 
 */
export function menuRemove(params) {
    return axios({
        url: actionUrl.system.menu.remove,
        method: POST,
        data: params,
    })
}

/**
 * 菜单修改
 * @param {*} params 
 */
export function menuEdit(params) {
    return axios({
        url: actionUrl.system.menu.edit,
        method: POST,
        data: params,
    })
}

/**
 * 菜单分页列表
 * @param {*} params 
 */
export function menuList(params) {
    return axios({
        url: actionUrl.system.menu.page,
        method: POST,
        data: params,
    })
}

/**
 * 菜单详情
 * @param {*} params 
 */
export function menuDetail(params) {
    return axios({
        url: actionUrl.system.menu.detail,
        method: GET,
        params: params,
    })
}

/**
 * 菜单类别
 * @param {*} params 
 */
export function listMenuType() {
    return axios({
        url: actionUrl.system.menu.listMenuType,
        method: GET,
    })
}

/**
 * 菜单树结构节点
 * @param {*} params 
 */
export function listTreeNode(params) {
    return axios({
        url: actionUrl.system.menu.listTreeNode,
        method: GET,
        params: params,
    })
}

/**
 * 检查菜单名称是否存在
 * @param {*} params 
 */
export function existsMenuName(params) {
    return axios({
        url: actionUrl.system.menu.existsMenuName,
        method: GET,
        params: params,
    })
}

/**
 * 检查菜单url是否存在
 * @param {*} params 
 */
export function existsMenuUrl(params) {
    return axios({
        url: actionUrl.system.menu.existsMenuUrl,
        method: GET,
        params: params,
    })
}

/**
 * 检查菜单路由是否存在
 * @param {*} params 
 */
export function existsMenuRouter(params) {
    return axios({
        url: actionUrl.system.menu.existsMenuRouter,
        method: GET,
        params: params,
    })
}

/**
 * 加载菜单子节点
 * @param {*} params 
 */
export function menuChildren(params) {
    return axios({
        url: actionUrl.system.menu.listChildren,
        method: GET,
        params: params,
    })
}

// =====================================  菜单API结束  =====================================




// =====================================  字典API开始  =====================================
/**
 * 字典新增
 * @param {*} params 
 */
export function dictIndexNew(params) {
    return axios({
        url: actionUrl.system.dictIndex.save,
        method: POST,
        data: params,
    })
}

/**
 * 字典删除
 * @param {*} params 
 */
export function dictIndexRemove(params) {
    return axios({
        url: actionUrl.system.dictIndex.remove,
        method: POST,
        data: params,
    })
}

/**
 * 字典修改
 * @param {*} params 
 */
export function dictIndexEdit(params) {
    return axios({
        url: actionUrl.system.dictIndex.edit,
        method: POST,
        data: params,
    })
}

/**
 * 字典分页列表
 * @param {*} params 
 */
export function dictIndexList(params) {
    return axios({
        url: actionUrl.system.dictIndex.page,
        method: POST,
        data: params,
    })
}

/**
 * 字典详情
 * @param {*} params 
 */
export function dictIndexDetail(params) {
    return axios({
        url: actionUrl.system.dictIndex.detail,
        method: GET,
        params: params,
    })
}

/**
 * 检测字典编号是否存在
 * @param {*} params 
 */
export function existsDictIndexCode(params) {
    return axios({
        url: actionUrl.system.dictIndex.existsDictIndexCode,
        method: GET,
        params: params,
    })
}

/**
 * 检测字典名称是否存在
 * @param {*} params 
 */
export function existsDictIndexName(params) {
    return axios({
        url: actionUrl.system.dictIndex.existsDictIndexName,
        method: GET,
        params: params,
    })
}

// =====================================  字典API结束  =====================================




// =====================================  字典API开始  =====================================
/**
 * 字典项新增
 * @param {*} params 
 */
export function dictItemNew(params) {
    return axios({
        url: actionUrl.system.dictItem.save,
        method: POST,
        data: params,
    })
}

/**
 * 字典项删除
 * @param {*} params 
 */
export function dictItemRemove(params) {
    return axios({
        url: actionUrl.system.dictItem.remove,
        method: POST,
        data: params,
    })
}

/**
 * 字典项修改
 * @param {*} params 
 */
export function dictItemEdit(params) {
    return axios({
        url: actionUrl.system.dictItem.edit,
        method: GET,
        params: params,
    })
}

/**
 * 字典项分页列表
 * @param {*} params 
 */
export function dictItemList(params) {
    return axios({
        url: actionUrl.system.dictItem.page,
        method: POST,
        data: params,
    })
}

/**
 * 字典项详情
 * @param {*} params 
 */
export function dictItemDetail(params) {
    return axios({
        url: actionUrl.system.dictItem.detail,
        method: GET,
        params: params,
    })
}

/**
 * 字典项子节点
 * @param {*} params 
 */
export function dictItemChildren(params) {
    return axios({
        url: actionUrl.system.dictItem.listChildren,
        method: GET,
        params: params,
    })
}

/**
 * 检测字典键是否存在
 * @param {*} params 
 */
export function existsDictItemKey(params) {
    return axios({
        url: actionUrl.system.dictItem.existsDictItemKey,
        method: GET,
        params: params,
    })
}

/**
 * 检测字典值是否存在
 * @param {*} params 
 */
export function existsDictItemValue(params) {
    return axios({
        url: actionUrl.system.dictItem.existsDictItemValue,
        method: GET,
        params: params,
    })
}

// =====================================  字典API结束  =====================================