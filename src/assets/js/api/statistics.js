import axios from '../global/globalAxios'
import actionUrl from '../global/globalActionUrl'
import qs from 'qs'

const GET = "get";
const POST = "post";

/**
 * 任务总数统计
 */
export function today() {
    return axios({
        url: actionUrl.statistics.today,
        method: GET,
    })
}
/**
 * 任务月度统计
 */
export function month() {
    return axios({
        url: actionUrl.statistics.month,
        method: GET,
    })
}
/**
 * 获取全球域名命中数统计
 * @param {*} params 
 */
 export function globalDomainHits() {
    return axios({
        url: actionUrl.statistics.globalDomainHits,
        method: GET,
    })
}