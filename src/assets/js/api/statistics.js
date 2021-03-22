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
export function month() {
    return axios({
        url: actionUrl.statistics.month,
        method: GET,
    })
}