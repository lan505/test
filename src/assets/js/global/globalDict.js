import axios from 'axios'
import globalActionUrl from './globalActionUrl';

const getDict = function getDict(data) {
    return axios.get(globalActionUrl.dictItemListKeyValue, {
        params: { name: data }
    });
}
export default getDict