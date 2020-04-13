
/**
 * 是否拥有权限
 * @param {*} authorities 拥有的权限
 * @param {*} target 目标权限
 */
function hasAuthority(authorities, target) {
    let show = false;
    for(let i=0; i<authorities.length; i++){
        if(authorities[i] === target){
            show = true;
            break;
        }
    }
    return show;
}

export default {
    hasAuthority
}