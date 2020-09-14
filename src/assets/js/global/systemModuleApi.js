import axios from './globalAxios'
import actionUrl from './globalActionUrl'
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
export function userPage(params) {
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
            "Content-Type": "application/x-www-form-urlencoded"
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
export function rolePage(params) {
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
 * 角色权限分配
 * @param {*} params 
 */
export function assignAuthority(params) {
    return axios({
        url: actionUrl.system.role.assignAuthority,
        method: GET,
        params: params,
    })
}

// =====================================  角色API结束  =====================================