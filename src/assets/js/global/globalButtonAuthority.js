/**
 * vuex mutation 常量
 */
function authority(context, own) {
    let show = false;
    for(let i=0; i<context.$route.meta.button.length; i++){
        if(context.$route.meta.button[i].menuUrl === own){
            show = true;
            break;
        }
    }
    return show;
}

export default authority