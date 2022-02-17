import axios from "../global/globalAxios";
import actionUrl from "../global/globalActionUrl";
import qs from "qs";

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
    });
}

/**
 * 用户退出
 */
export function logout() {
    return axios({
        url: actionUrl.system.user.logout,
        method: POST
    });
}

/**
 * 用户登录信息获取
 */
export function queryLoginUserInfo() {
    return axios({
        url: actionUrl.system.user.queryLoginUserInfo,
        method: GET
    });
}

/**
 * 用户新增
 * @param {*} params
 */
export function saveUser(params) {
    return axios({
        url: actionUrl.system.user.saveUser,
        method: POST,
        data: params
    });
}

/**
 * 用户删除
 * @param {*} params
 */
export function removeUser(params) {
    return axios({
        url: actionUrl.system.user.removeUser,
        method: POST,
        data: params
    });
}

/**
 * 用户修改
 * @param {*} params
 */
export function editUser(params) {
    return axios({
        url: actionUrl.system.user.editUser,
        method: POST,
        data: params
    });
}

/**
 * 用户分页列表
 * @param {*} params
 */
export function queryUserPage(params) {
    return axios({
        url: actionUrl.system.user.queryUserPage,
        method: POST,
        data: params
    });
}

/**
 * 用户详情
 * @param {*} params
 */
export function detailUser(params) {
    return axios({
        url: actionUrl.system.user.detailUser,
        method: GET,
        params: params
    });
}

/**
 * 用户头像上传
 * @param {*} params
 */
export function uploadUserAvatar(params) {
    return axios({
        url: actionUrl.system.user.uploadUserAvatar,
        method: POST,
        data: params,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

/**
 * 用户密码修改
 * @param {*} params
 */
export function changeUserPassword(params) {
    return axios({
        url: actionUrl.system.user.changeUserPassword,
        method: POST,
        data: params
    });
}

/**
 * 用户账号检测是否存在
 * @param {*} params
 */
export function existsUserAccount(params) {
    return axios({
        url: actionUrl.system.user.existsUserAccount,
        method: GET,
        params: params
    });
}

/**
 * 用户名称检测是否存在
 * @param {*} params
 */
export function existsUserName(params) {
    return axios({
        url: actionUrl.system.user.existsUserName,
        method: GET,
        params: params
    });
}

// =====================================  用户API结束  =====================================

// =====================================  角色API开始  =====================================
/**
 * 角色新增
 * @param {*} params
 */
export function saveRole(params) {
    return axios({
        url: actionUrl.system.role.saveRole,
        method: POST,
        data: params
    });
}

/**
 * 角色删除
 * @param {*} params
 */
export function removeRole(params) {
    return axios({
        url: actionUrl.system.role.removeRole,
        method: POST,
        data: params
    });
}

/**
 * 角色修改
 * @param {*} params
 */
export function editRole(params) {
    return axios({
        url: actionUrl.system.role.editRole,
        method: GET,
        params: params
    });
}

/**
 * 角色分页列表
 * @param {*} params
 */
export function queryRolePage(params) {
    return axios({
        url: actionUrl.system.role.queryRolePage,
        method: POST,
        data: params
    });
}

/**
 * 角色详情
 * @param {*} params
 */
export function detailRole(params) {
    return axios({
        url: actionUrl.system.role.detailRole,
        method: GET,
        params: params
    });
}

/**
 * 角色编号检测是否存在
 * @param {*} params
 */
export function existsRoleCode(params) {
    return axios({
        url: actionUrl.system.role.existsRoleCode,
        method: GET,
        params: params
    });
}

/**
 * 角色名称检测是否存在
 * @param {*} params
 */
export function existsRoleName(params) {
    return axios({
        url: actionUrl.system.role.existsRoleName,
        method: GET,
        params: params
    });
}

/**
 * 获取所有角色
 * @param {*} params
 */
export function queryRoleAll(params) {
    return axios({
        url: actionUrl.system.role.queryRoleAll,
        method: GET,
        params: params
    });
}

/**
 * 角色权限分配
 * @param {*} params
 */
export function assignAuthority(params) {
    return axios({
        url: actionUrl.system.role.assignAuthority,
        method: POST,
        data: params
    });
}

/**
 * 获取角色权限
 * @param {*} params
 */
export function queryAuthority(params) {
    return axios({
        url: actionUrl.system.role.queryAuthority,
        method: GET,
        params: params
    });
}
queryAuthority;
// =====================================  角色API结束  =====================================

// =====================================  部门API开始  =====================================
/**
 * 部门新增
 * @param {*} params
 */
export function saveDepart(params) {
    return axios({
        url: actionUrl.system.role.saveDepart,
        method: POST,
        data: params
    });
}

/**
 * 部门删除
 * @param {*} params
 */
export function removeDepart(params) {
    return axios({
        url: actionUrl.system.role.removeDepart,
        method: POST,
        data: params
    });
}

/**
 * 部门修改
 * @param {*} params
 */
export function editDepart(params) {
    return axios({
        url: actionUrl.system.role.editDepart,
        method: GET,
        params: params
    });
}

/**
 * 部门分页列表
 * @param {*} params
 */
export function queryDepartPage(params) {
    return axios({
        url: actionUrl.system.depart.queryDepartPage,
        method: POST,
        data: params
    });
}

/**
 * 部门详情
 * @param {*} params
 */
export function detailDepart(params) {
    return axios({
        url: actionUrl.system.depart.detailDepart,
        method: GET,
        params: params
    });
}

/**
 * 部门编号检测是否存在
 * @param {*} params
 */
export function existsDepartCode(params) {
    return axios({
        url: actionUrl.system.depart.existsDepartCode,
        method: GET,
        params: params
    });
}

/**
 * 部门名称检测是否存在
 * @param {*} params
 */
export function existsDepartName(params) {
    return axios({
        url: actionUrl.system.depart.existsDepartName,
        method: GET,
        params: params
    });
}

/**
 * 查询部门树结构
 * @param {*} params
 */
export function queryDepartTreeNode(params) {
    return axios({
        url: actionUrl.system.depart.queryDepartTreeNode,
        method: GET,
        params: params
    });
}
/**
 * 查询部门子节点
 * @param {*} params
 */
export function queryDepartChildren(params) {
    return axios({
        url: actionUrl.system.depart.queryDepartChildren,
        method: GET,
        params: params
    });
}

// =====================================  部门API结束  =====================================

// =====================================  菜单API开始  =====================================
/**
 * 菜单新增
 * @param {*} params
 */
export function saveMenu(params) {
    return axios({
        url: actionUrl.system.menu.saveMenu,
        method: POST,
        data: params
    });
}

/**
 * 菜单删除
 * @param {*} params
 */
export function removeMenu(params) {
    return axios({
        url: actionUrl.system.menu.removeMenu,
        method: POST,
        data: params
    });
}

/**
 * 菜单修改
 * @param {*} params
 */
export function editMenu(params) {
    return axios({
        url: actionUrl.system.menu.editMenu,
        method: POST,
        data: params
    });
}

/**
 * 菜单分页列表
 * @param {*} params
 */
export function queryMenuPage(params) {
    return axios({
        url: actionUrl.system.menu.queryMenuPage,
        method: POST,
        data: params
    });
}

/**
 * 菜单详情
 * @param {*} params
 */
export function detailMenu(params) {
    return axios({
        url: actionUrl.system.menu.detailMenu,
        method: GET,
        params: params
    });
}

/**
 * 菜单树结构节点
 * @param {*} params
 */
export function queryMenuTreeNode(params) {
    return axios({
        url: actionUrl.system.menu.queryMenuTreeNode,
        method: GET,
        params: params
    });
}

/**
 * 检查菜单名称是否存在
 * @param {*} params
 */
export function existsMenuName(params) {
    return axios({
        url: actionUrl.system.menu.existsMenuName,
        method: GET,
        params: params
    });
}

/**
 * 检查菜单路由是否存在
 * @param {*} params
 */
export function existsMenuRouter(params) {
    return axios({
        url: actionUrl.system.menu.existsMenuRouter,
        method: GET,
        params: params
    });
}

/**
 * 加载菜单子节点
 * @param {*} params
 */
export function queryMenuChildren(params) {
    return axios({
        url: actionUrl.system.menu.queryMenuChildren,
        method: GET,
        params: params
    });
}

// =====================================  菜单API结束  =====================================

// =====================================  字典API开始  =====================================
/**
 * 字典新增
 * @param {*} params
 */
export function saveDictIndex(params) {
    return axios({
        url: actionUrl.system.dictIndex.saveDictIndex,
        method: POST,
        data: params
    });
}

/**
 * 字典删除
 * @param {*} params
 */
export function removeDictIndex(params) {
    return axios({
        url: actionUrl.system.dictIndex.removeDictIndex,
        method: POST,
        data: params
    });
}

/**
 * 字典修改
 * @param {*} params
 */
export function editDictIndex(params) {
    return axios({
        url: actionUrl.system.dictIndex.editDictIndex,
        method: POST,
        data: params
    });
}

/**
 * 字典分页列表
 * @param {*} params
 */
export function queryDictIndexPage(params) {
    return axios({
        url: actionUrl.system.dictIndex.queryDictIndexPage,
        method: POST,
        data: params
    });
}

/**
 * 字典详情
 * @param {*} params
 */
export function detailDictIndex(params) {
    return axios({
        url: actionUrl.system.dictIndex.detailDictIndex,
        method: GET,
        params: params
    });
}

/**
 * 检测字典编号是否存在
 * @param {*} params
 */
export function existsDictIndexCode(params) {
    return axios({
        url: actionUrl.system.dictIndex.existsDictIndexCode,
        method: GET,
        params: params
    });
}

/**
 * 检测字典名称是否存在
 * @param {*} params
 */
export function existsDictIndexName(params) {
    return axios({
        url: actionUrl.system.dictIndex.existsDictIndexName,
        method: GET,
        params: params
    });
}

// =====================================  字典API结束  =====================================

// =====================================  字典API开始  =====================================
/**
 * 字典项新增
 * @param {*} params
 */
export function saveDictItem(params) {
    return axios({
        url: actionUrl.system.dictItem.saveDictItem,
        method: POST,
        data: params
    });
}

/**
 * 字典项删除
 * @param {*} params
 */
export function removeDictItem(params) {
    return axios({
        url: actionUrl.system.dictItem.removeDictItem,
        method: POST,
        data: params
    });
}

/**
 * 字典项修改
 * @param {*} params
 */
export function editDictItem(params) {
    return axios({
        url: actionUrl.system.dictItem.editDictItem,
        method: GET,
        params: params
    });
}

/**
 * 字典项分页列表
 * @param {*} params
 */
export function queryDictItemPage(params) {
    return axios({
        url: actionUrl.system.dictItem.queryDictItemPage,
        method: POST,
        data: params
    });
}

/**
 * 字典项详情
 * @param {*} params
 */
export function detailDictItem(params) {
    return axios({
        url: actionUrl.system.dictItem.detailDictItem,
        method: GET,
        params: params
    });
}

/**
 * 获取字典列表根据字典分类编号
 * @param {*} params
 * @returns
 */
export function queryDictItemAll(params) {
    return axios({
        url: actionUrl.system.dictItem.queryDictItemAll,
        method: GET,
        params: params
    });
}

/**
 * 字典项子节点
 * @param {*} params
 */
export function queryDictItemChildren(params) {
    return axios({
        url: actionUrl.system.dictItem.queryDictItemChildren,
        method: GET,
        params: params
    });
}

/**
 * 检测字典键是否存在
 * @param {*} params
 */
export function existsDictItemKey(params) {
    return axios({
        url: actionUrl.system.dictItem.existsDictItemKey,
        method: GET,
        params: params
    });
}

/**
 * 检测字典值是否存在
 * @param {*} params
 */
export function existsDictItemValue(params) {
    return axios({
        url: actionUrl.system.dictItem.existsDictItemValue,
        method: GET,
        params: params
    });
}

// =====================================  字典API结束  =====================================
