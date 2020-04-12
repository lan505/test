
function hasAuthority(authorities, own) {
    let show = false;
    for(let i=0; i<authorities.length; i++){
        if(authorities[i] === own){
            show = true;
            break;
        }
    }
    return show;
}

export default {
    hasAuthority
}