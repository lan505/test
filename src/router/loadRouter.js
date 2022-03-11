/*
 * @Description   
 * @Autor         lan505
 * @Version       1.0
 * @Date          2021-02-25 12:09:38
 * @LastEditTime  2022-03-11 16:51:14
 */

import dynamicRouter from './dynamicRouter'
import Error from "@/views/portal/Error";

function create(data) {
    // 最终路由结果
    var result = [];
    // 转换name为key，对象为value的Map结构
    var mapDynamicRouter = new Map(dynamicRouter.map(item => [item.name, item]));
    // 默认匹配拦截错误路由页面
    var defaultErrorPage = {
        path: "/*",
        component: Error
    };

    data.forEach(module => {
        module.children.forEach(menu => {
            if(menu.menuRouter){
                // 根据后端路由数据顺序，从mapDynamicRouter获取出路由对象，添加到result集合里
                var routerObject = mapDynamicRouter.get(menu.menuRouter);
                // 把后端路由数据的部分值，设置到路由对象的meta属性
                routerObject.meta = {
                    requiresAuth: true,
                    parentPathText: menu.menuName,
                    pathText: module.menuName,
                    button: menu.children.map(value => value.menuAuthority)
                }
                result.push(routerObject);
            }else{
                console.warn(`${menu.menuName}的menuRouter为空`);
            }
        });
    });

    result.push(defaultErrorPage);

    return result;
}

export default {
    create
};
