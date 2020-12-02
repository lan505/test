import axios from '../global/globalAxios'
import actionUrl from '../global/globalActionUrl'
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

/**
 * 获取规则级别
 * @param {*} params 
 */
export function ruleBaseLevel() {
    return axios({
        url: actionUrl.base.ruleBase.level,
        method: GET,
    })
}

// =====================================  规则API结束  =====================================



// =====================================  任务API开始  =====================================
/**
 * 任务新增
 * @param {*} params 
 */
export function taskBaseNew(params) {
    return axios({
        url: actionUrl.base.taskBase.save,
        method: POST,
        data: params,
    })
}

/**
 * 任务列表
 * @param {*} params 
 */
export function taskBaseList(params) {
    return axios({
        url: actionUrl.base.taskBase.page,
        method: POST,
        data: params,
    })
}

/**
 * 任务详情
 * @param {*} params 
 */
export function taskBaseDetail(params) {
    return axios({
        url: actionUrl.base.taskBase.detail,
        method: GET,
        params: params,
    })
}

/**
 * 检查任务名称是否存在
 * @param {*} params 
 */
export function existsTaskBaseName(params) {
    return axios({
        url: actionUrl.base.taskBase.existsTaskBaseName,
        method: GET,
        params: params,
    })
}


// =====================================  规则API结束  =====================================