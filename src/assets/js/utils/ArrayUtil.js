/*
 * @Description   
 * @Autor         lan505
 * @Version       1.0
 * @Date          2022-02-08 11:05:03
 * @LastEditTime  2022-02-08 11:07:20
 */

/**
 * 判断是否为空数组
 * @param {*} array 数组
 */
function isEmpty(array) {
    return array === null || array === undefined || array.length == 0;
}
/**
 * 判断是否不为空数组
 * @param {*} array 
 * @returns 
 */
function isNotEmpty(array) {
    return !isEmpty(array);
}

export default {
    isEmpty,
    isNotEmpty
};
