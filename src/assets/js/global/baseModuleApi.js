import axios from './globalAxios'
import actionUrl from './globalActionUrl'
import qs from 'qs'

const GET = "get";
const POST = "post";

// =====================================  规则API开始  =====================================
/**
 * 规则新增
 * @param {*} params 
 */
export function ruleBaseNew(params) {
    return axios({
        url: actionUrl.base.ruleBase.save,
        method: POST,
        data: params,
    })
}

/**
 * 规则删除
 * @param {*} params 
 */
export function ruleBaseRemove(params) {
    return axios({
        url: actionUrl.base.ruleBase.remove,
        method: POST,
        data: params,
    })
}

/**
 * 规则修改
 * @param {*} params 
 */
export function ruleBaseEdit(params) {
    return axios({
        url: actionUrl.base.ruleBase.edit,
        method: POST,
        data: params,
    })
}

/**
 * 规则分页列表
 * @param {*} params 
 */
export function ruleBaseList(params) {
    return axios({
        url: actionUrl.base.ruleBase.page,
        method: POST,
        data: params,
    })
}

/**
 * 规则详情
 * @param {*} params 
 */
export function ruleBaseDetail(params) {
    return axios({
        url: actionUrl.base.ruleBase.detail,
        method: GET,
        params: params,
    })
}

/**
 * 检查规则名称是否存在
 * @param {*} params 
 */
export function existsRuleBaseName(params) {
    return axios({
        url: actionUrl.base.ruleBase.existsRuleBaseName,
        method: GET,
        params: params,
    })
}

/**
 * 规则修改启用状态
 * @param {*} params 
 */
export function updateEnableStatus(params) {
    return axios({
        url: actionUrl.base.ruleBase.updateEnableStatus,
        method: POST,
        data: params,
    })
}

// =====================================  规则API结束  =====================================




// =====================================  字典API开始  =====================================
/**
 * 字典新增
 * @param {*} params 
 */
export function dictIndexNew(params) {
    return axios({
        url: actionUrl.base.dictIndex.save,
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
        url: actionUrl.base.dictIndex.remove,
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
        url: actionUrl.base.dictIndex.edit,
        method: GET,
        params: params,
    })
}

/**
 * 字典分页列表
 * @param {*} params 
 */
export function dictIndexList(params) {
    return axios({
        url: actionUrl.base.dictIndex.page,
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
        url: actionUrl.base.dictIndex.detail,
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
        url: actionUrl.base.dictItem.save,
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
        url: actionUrl.base.dictItem.remove,
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
        url: actionUrl.base.dictItem.edit,
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
        url: actionUrl.base.dictItem.page,
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
        url: actionUrl.base.dictItem.detail,
        method: GET,
        params: params,
    })
}

// =====================================  字典API结束  =====================================