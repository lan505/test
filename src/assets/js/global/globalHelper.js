/*
 * @Description   
 * @Autor         lan505
 * @Version       1.0
 * @Date          2021-02-25 12:09:38
 * @LastEditTime  2022-01-13 19:38:36
 */

/**
 * 是否拥有权限
 * @param {*} authorities 拥有的权限
 * @param {*} target 目标权限
 */
function hasAuthority(authorities, target) {
    let show = false;
    for (let i = 0; i < authorities.length; i++) {
        if (authorities[i] === target) {
            show = true;
            break;
        }
    }
    return show;
}

/**
 * 初始化树的数据字段
 * @param {*} data 
 */
function initTreeDataFields(context, data) {
    for (let i = 0; i < data.length; i++) {
        var hasChildren = data[i].treeSubNum > 0;
        if (hasChildren) {
            context.$set(data[i], "_loading", false);
            context.$set(data[i], "children", []);
        }
    }
}

/**
 * 数组对象转换为数组的key、value对象返回
 * @param {*} data 
 */
function toKeyValueArray(data) {
    return data.map(function (item) {
        return { key: item.dictItemKey, value: item.dictItemValue };
    });
}

export default {
    hasAuthority,
    initTreeDataFields
}

