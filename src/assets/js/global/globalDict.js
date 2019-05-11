import axios from 'axios'
import globalActionUrl from './globalActionUrl';

const getDict = function getDict(data) {
    return axios.get(globalActionUrl.dictItemListKeyValue, {
        params: { code: data }
    });
}
export default getDict