// const children = []

function build(menus) {
    const result = [];
    menus.forEach(menu => {
        let moduleName = menu.menuUrl;
        menu.children.forEach(child => {
            console.log(`打印组件：@/components/${moduleName}${child.menuRouter}`);
            result.push({
                path: child.menuUrl,
                name: child.menuRouter.split("/")[2],
                // component: resolve => require([`../components/${moduleName}/${upperCamelCase(child.menuUrl.split("/"))}`]),
                component: () => import(`@/components/${moduleName}${child.menuRouter}`),
                meta: {
                    requiresAuth: true,
                    button: child.children.map(value => value.menuUrl)
                }
            });
        });
    });
    return result;
}

function camelCase(data) {
    var result = "";
    for (var i = 0; i < data.length; i++) {
        if (data[i]) {
            result += data[i].substring(0, 1).toUpperCase() + data[i].substring(1);
        }
    }
    result = result.substring(0, 1).toLowerCase() + result.substring(1);
    console.log("路由名：" + result);
    return result;
}

function upperCamelCase(data) {
    var result = "";
    for (var i = 0; i < data.length; i++) {
        if (data[i]) {
            result += data[i].substring(0, 1).toUpperCase() + data[i].substring(1);
        }
    }
    return result;
}

export default {
    build
}